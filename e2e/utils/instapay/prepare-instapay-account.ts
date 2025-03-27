import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { getInstaPayBalance } from './api';
import * as keypayApi from './keypay-api';
import { getNextPayPeriod, getPreviousPayPeriod } from './pay-period';
import { getTimezoneByAccount, PayFrequency, type SupportedCountries, UserSource } from './utils';
import { isInstapayError } from '../../../src/features/income/instapay/utils/graphql-processor';
import { InstapayErrorCode } from '../../new-graphql/generated';
import { authenticateEhMobile, exchangeEhToken, exchangeKpToken } from '../api';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.tz.setDefault('Australia/Sydney');

const WEEKS_PER_YEAR = 52;
const DAYS_PER_YEAR = 365;
const RISK_FACTOR = 2.0;

const noBalanceErrMsg = 'No InstaPay balance found';

export type AccountDetails = KPAccountDetails | EHAccountDetails;

export type KPAccountDetails = {
  userSource: UserSource.KP;
  email: string;
  password: string;
  kpBusinessId: string;
  kpEmployeeId: string;
  payFrequency: PayFrequency;
  payScheduleName?: string;
  isPaidInArrears?: boolean;
  country?: `${SupportedCountries}`;
  orgName?: string;
};

export type EHAccountDetails = {
  userSource: UserSource.EH;
  email: string;
  password: string;
  targetOrgUuid: string;
  kpBusinessId: string;
  kpEmployeeId: string;
  payFrequency: PayFrequency;
  payScheduleName?: string;
  isPaidInArrears?: boolean;
  orgId?: number;
  memberId?: number;
  country?: `${SupportedCountries}`;
  orgName?: string;
};

export type KPAccountWithPayRate = KPAccountDetails & {
  payRatePerHour: number;
  orgHrsPerWeek: number;
};

export type EHAccountWithPayRate = EHAccountDetails & {
  payRatePerHour: number;
  orgHrsPerWeek: number;
};

export type InstaPayBalanceInfo = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orgBalance: any;
  totalBalance: number;
};

const createTimesheetAndApprove = async (params: {
  startWorkingTime: Dayjs;
  endingWorkingTime: Dayjs;
  employeeId: string;
  businessId: string;
  country: `${SupportedCountries}`;
}) => {
  const timesheetResponse = await keypayApi.createTimesheet({
    startTime: params.startWorkingTime,
    endDate: params.endingWorkingTime,
    employeeId: params.employeeId,
    businessId: params.businessId,
    country: params.country,
  });
  // Approve the timesheet
  await keypayApi.approveTimesheet({
    businessId: params.businessId,
    timesheetId: timesheetResponse.id,
    timesheetData: timesheetResponse,
    country: params.country,
  });
};

const startWorkingTime = (day: Dayjs) => day.startOf('day').add(9, 'hour');

const endWorkingTime = (day: Dayjs) => day.startOf('day').add(17, 'hour');

const createApprovedTimesheetForADay = async (params: {
  targetDate: Dayjs;
  employeeId: string;
  businessId: string;
  country: `${SupportedCountries}`;
}) => {
  const approvedTimesheets = await keypayApi.getApprovedTimesheets({
    businessId: params.businessId,
    employeeId: params.employeeId,
    startTime: params.targetDate.startOf('day'),
    endTime: params.targetDate.add(1, 'day'),
    country: params.country,
  });
  // No approved timesheet found, create one
  if (approvedTimesheets.length === 0) {
    await createTimesheetAndApprove({
      startWorkingTime: startWorkingTime(params.targetDate),
      endingWorkingTime: endWorkingTime(params.targetDate),
      employeeId: params.employeeId,
      businessId: params.businessId,
      country: params.country,
    });
  }
};

/**
 * Get InstaPay balance in the account in the given business
 * @param accountDetails
 */
const getInstaPayBalanceOfKpEmployee = async (accountDetails: KPAccountDetails): Promise<InstaPayBalanceInfo> => {
  // Login to the account
  const loginKpResponse = await keypayApi.login(
    {
      email: accountDetails.email,
      password: accountDetails.password,
    },
    accountDetails.country
  );
  const kpToken = loginKpResponse.access_token;
  // Exchange EBF token
  const ebfTokenExchangeResponse = await exchangeKpToken(kpToken, accountDetails.country);
  const ebfToken = ebfTokenExchangeResponse.access_token;

  // Get the balance
  const balanceResponse = await getInstaPayBalance(ebfToken, kpToken, '', accountDetails.country);

  // Get corresponding org balance
  const orgBalance = balanceResponse?.me?.orgs.find(org => org.kpBusinessId === +accountDetails.kpBusinessId);
  // No org balance found => error
  if (!orgBalance?.instapay) {
    // Create pay run
    throw new Error(noBalanceErrMsg);
  }

  const totalBalance = (balanceResponse?.me?.orgs || []).reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unsafe-optional-chaining
    (acc, org) => acc + ((org?.instapay?.balance as any)?.balance || 0),
    0
  );
  return { orgBalance: orgBalance.instapay, totalBalance };
};

const getInstaPayBalanceOfEhEmployee = async (accountDetails: EHAccountDetails): Promise<InstaPayBalanceInfo> => {
  const loginResponse = await authenticateEhMobile({
    username: accountDetails.email,
    password: accountDetails.password,
  });
  const sessionToken = loginResponse.ehToken;
  // Exchange EBF token
  const ebfTokenExchangeResponse = await exchangeEhToken(sessionToken);
  const ebfToken = ebfTokenExchangeResponse.access_token;
  // Get the balance
  const balanceResponse = await getInstaPayBalance(ebfToken, undefined, sessionToken);

  const totalBalance = (balanceResponse?.me?.orgs || []).reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unsafe-optional-chaining
    (acc, org) => acc + (org?.instapay?.balance as any)?.balance || 0,
    0
  );

  const orgBalance = balanceResponse?.me?.orgs.find(org => org.uuid === accountDetails.targetOrgUuid);
  // No org balance found => error
  if (!orgBalance?.instapay) {
    // Create pay run
    throw new Error(noBalanceErrMsg);
  }

  return { orgBalance: orgBalance.instapay, totalBalance };
};

export const getInstaPayBalanceOfEmployeeInner = async (
  accountDetails: AccountDetails
): Promise<InstaPayBalanceInfo> => {
  if (accountDetails.userSource === UserSource.KP) {
    console.log('Getting InstaPay balance for KP employee');
    console.log('accountDetails', accountDetails);
    return getInstaPayBalanceOfKpEmployee(accountDetails);
  }
  console.log('Getting InstaPay balance for EH employee');
  console.log('accountDetails', accountDetails);
  return getInstaPayBalanceOfEhEmployee(accountDetails);
};

const retryWithDelay = async (fn: () => Promise<InstaPayBalanceInfo>, delay: number, retries: number) => {
  return new Promise((resolve: (value: InstaPayBalanceInfo) => void, reject: (reason: Error) => void) => {
    fn()
      .then(resolve)
      .catch(err => {
        console.log(`Retries left: ${retries}`);
        if (retries > 0) {
          setTimeout(() => retryWithDelay(fn, delay, retries - 1), delay);
        } else {
          reject(err);
        }
      });
  });
};

export const getInstaPayBalanceOfEmployee = async (accountDetails: AccountDetails): Promise<InstaPayBalanceInfo> => {
  return retryWithDelay(() => getInstaPayBalanceOfEmployeeInner(accountDetails), 2000, 5);
};

const createNewPayRun = async (accountDetails: AccountDetails, latestPayRun: any) => {
  const country = accountDetails.country || 'AU';
  const accountTimezone = getTimezoneByAccount(accountDetails);
  // Get pay schedule ID
  const targetedPaySchedule = await keypayApi.getPaySchedule(
    accountDetails.kpBusinessId,
    accountDetails.payFrequency,
    accountDetails.payScheduleName,
    country
  );
  const lastPaySlipPayPeriod = {
    begin: dayjs.tz(latestPayRun.payPeriodStarting, accountTimezone),
    end: dayjs.tz(latestPayRun.payPeriodEnding, accountTimezone),
    payment: dayjs.tz(latestPayRun.datePaid, accountTimezone),
  };
  const today = dayjs.tz(undefined, accountTimezone).startOf('day');

  let newPaySlipPayPeriod = getNextPayPeriod(accountDetails.payFrequency, lastPaySlipPayPeriod);
  if (today.diff(newPaySlipPayPeriod.begin) <= 0 || today.diff(newPaySlipPayPeriod.end) <= 0) {
    throw new Error('Cannot create future payrun');
  }
  // propagate until get correct pay period P: [today within P.next]
  while (today.diff(newPaySlipPayPeriod.end) > 0) {
    newPaySlipPayPeriod = getNextPayPeriod(accountDetails.payFrequency, newPaySlipPayPeriod);
  }
  newPaySlipPayPeriod = getPreviousPayPeriod(accountDetails.payFrequency, newPaySlipPayPeriod);

  const payRun = await keypayApi.createPayRun({
    businessId: accountDetails.kpBusinessId,
    paymentDate: newPaySlipPayPeriod.payment,
    payPeriodEnding: newPaySlipPayPeriod.end,
    payScheduleId: targetedPaySchedule.id,
    country,
  });

  if (!payRun.id) {
    throw new Error('Pay run not created. No ID found');
  }

  await keypayApi.publishPayRun({
    businessId: accountDetails.kpBusinessId,
    payRunId: payRun.id,
    country,
  });
};

/**
 * Make sure given KP permanent employee has InstaPay balance
 * @note: the given KP employee
 * - must be a permanent employee
 * - must have InstaPay visibility
 * - not blocked
 * @description: it will create a pay run if the employee doesn't have enough balance
 */
export const prepareBalanceForPermanentEmployee = async (accountDetails: AccountDetails) => {
  const { orgBalance: instapayBalance } = await getInstaPayBalanceOfEmployee(accountDetails);

  if (isInstapayError(instapayBalance.balance)) {
    switch (instapayBalance.balance.code) {
      case InstapayErrorCode.InstapayOnlyAvailableNextPayPeriod:
        const latestPayRun = await keypayApi.getLatestPayRun({
          businessId: accountDetails.kpBusinessId,
          employeeId: accountDetails.kpEmployeeId,
          country: accountDetails.country || 'AU',
        });
        await createNewPayRun(accountDetails, latestPayRun);
        break;
      case InstapayErrorCode.PaymentDateRestricted:
      case InstapayErrorCode.AfterPaymentDateRestricted:
        // Raise nothing, so we can expect paycycle restriction in the test
        break;
      default:
        throw new Error(`Failed to get InstaPay balance: ${instapayBalance.balance.code}`);
    }

    return;
  }

  if (instapayBalance.balance.balance === 0) {
    // Balance is still 0, need to wait for next day so that balance can increase
    throw new Error('InstaPay balance is 0. Need to wait for next day');
  }
};

// Make sure today has an approved timesheet
// This approved timesheet creation can be optional when we have
// auto-approved timesheet or support pending timesheet
const createApprovedTimesheetsForToday = async (accountDetails: AccountDetails) => {
  const accountTimezone = getTimezoneByAccount(accountDetails);
  const today = dayjs.tz(undefined, accountTimezone);
  await createApprovedTimesheetForADay({
    targetDate: today,
    employeeId: accountDetails.kpEmployeeId,
    businessId: accountDetails.kpBusinessId,
    country: accountDetails.country || 'AU',
  });
};

/**
 * Make sure given KP casual employee has InstaPay balance
 * @note: the given KP employee
 * - must be a casual employee
 * - must have InstaPay visibility
 * - not blocked
 * @description: it will create a pay run and timesheet if needed, if the employee doesn't have enough balance
 */
export const prepareBalanceForCasualEmployee = async (accountDetails: AccountDetails) => {
  const accountTimezone = getTimezoneByAccount(accountDetails);
  const country = accountDetails.country || 'AU';
  await createApprovedTimesheetsForToday(accountDetails);

  const { orgBalance: instapayBalance } = await getInstaPayBalanceOfEmployee(accountDetails);

  if (isInstapayError(instapayBalance.balance)) {
    // Employee needs to wait for next pay period => Create pay run so that employee can have balance
    switch (instapayBalance.balance.code) {
      case InstapayErrorCode.InstapayOnlyAvailableNextPayPeriod: {
        const latestPayRun = await keypayApi.getLatestPayRun({
          businessId: accountDetails.kpBusinessId,
          employeeId: accountDetails.kpEmployeeId,
          country: accountDetails.country || 'AU',
        });
        const latestPayRunPayPeriod = {
          begin: dayjs.tz(latestPayRun.payPeriodStarting, accountTimezone),
          end: dayjs.tz(latestPayRun.payPeriodEnding, accountTimezone),
          payment: dayjs.tz(latestPayRun.datePaid, accountTimezone),
        };
        const lastPayPeriod = getNextPayPeriod(accountDetails.payFrequency, latestPayRunPayPeriod);

        const approvedTimesheets = await keypayApi.getApprovedTimesheets({
          businessId: accountDetails.kpBusinessId,
          employeeId: accountDetails.kpEmployeeId,
          startTime: lastPayPeriod.begin,
          endTime: lastPayPeriod.end,
          country,
        });

        // No approved timesheet found, create one
        if (approvedTimesheets.length === 0) {
          await createTimesheetAndApprove({
            startWorkingTime: startWorkingTime(lastPayPeriod.end),
            endingWorkingTime: endWorkingTime(lastPayPeriod.end),
            employeeId: accountDetails.kpEmployeeId,
            businessId: accountDetails.kpBusinessId,
            country,
          });
        }

        await createNewPayRun(accountDetails, latestPayRun);
        break;
      }
      case InstapayErrorCode.PaymentDateRestricted:
      case InstapayErrorCode.AfterPaymentDateRestricted:
        // Raise nothing, so we can expect paycycle restriction in the test
        break;
      default:
        throw new Error(`Failed to get InstaPay balance: ${instapayBalance.balance.code}`);
    }

    return;
  }

  // Balance is still 0, need to wait for next day so that balance can increase
  if (instapayBalance.balance.balance === 0) {
    throw new Error('InstaPay balance is 0. Need to wait for next day');
  }
};

export const calculateNextPaymentDate = (latestPayRun: { datePaid: string }, accountDetails: AccountDetails) => {
  const accountTimezone = getTimezoneByAccount(accountDetails);
  switch (accountDetails.payFrequency) {
    case PayFrequency.Weekly:
      return dayjs.tz(latestPayRun.datePaid, accountTimezone).add(7, 'days');
    case PayFrequency.Fortnightly:
      return dayjs.tz(latestPayRun.datePaid, accountTimezone).add(14, 'days');
    case PayFrequency.Monthly:
      return dayjs.tz(latestPayRun.datePaid, accountTimezone).add(1, 'months');
    default:
      return dayjs.tz(latestPayRun.datePaid, accountTimezone);
  }
};

export const isRestrictedByPaymentDate = async (accountDetails: AccountDetails) => {
  const latestPayRun = await keypayApi.getLatestPayRun({
    businessId: accountDetails.kpBusinessId,
    employeeId: accountDetails.kpEmployeeId,
    country: accountDetails.country || 'AU',
  });
  const accountTimezone = getTimezoneByAccount(accountDetails);
  const diff = dayjs
    .tz(undefined, accountTimezone)
    .startOf('day')
    .diff(calculateNextPaymentDate(latestPayRun, accountDetails));

  return diff >= 0;
};

// Employee should be paid per hour WEEKLY
// Should use EHAccountWithPayRate or KPAccountWithPayRate type
export const calculateEstInstapayBalanceForPermanentEmployee = async ({
  accountDetails,
}: {
  accountDetails: EHAccountWithPayRate | KPAccountWithPayRate;
}) => {
  try {
    const latestPayRun = await keypayApi.getLatestPayRun({
      businessId: accountDetails.kpBusinessId,
      employeeId: accountDetails.kpEmployeeId,
      country: accountDetails.country || 'AU',
    });

    const accountTimezone = getTimezoneByAccount(accountDetails);
    const payPeriodStartingDate = dayjs.tz(latestPayRun.payPeriodStarting, accountTimezone);
    const payPeriodEndingDate = dayjs.tz(latestPayRun.payPeriodEnding, accountTimezone);

    const today = dayjs.utc().tz(accountTimezone);

    const payCycle = payPeriodEndingDate.diff(payPeriodStartingDate, 'day') + 1;
    const diffBetweenTodayAndStartDate = today.diff(payPeriodStartingDate, 'day');

    const workingDays = diffBetweenTodayAndStartDate % payCycle;

    const annualSalary = accountDetails.payRatePerHour * accountDetails.orgHrsPerWeek * WEEKS_PER_YEAR;
    const ipAmount = (annualSalary / DAYS_PER_YEAR) * workingDays;
    const estimatedBalance = Math.floor(ipAmount / RISK_FACTOR);

    // Capped at $1000 for AU and £500 for UK
    const cappedMaximumAmount = accountDetails.country === 'GB' ? 500 : 1000;
    const ipBalanceMaximumWithdrawable = Math.min(estimatedBalance, cappedMaximumAmount);

    return ipBalanceMaximumWithdrawable;
  } catch (error) {
    console.error('Failed to calculate estimated InstaPay balance:', error);
    throw error;
  }
};

export type InstapayExpectedBalanceState = 'ready' | 'payment-date-restricted' | 'empty-balance';

export const getExpectedBalanceState = async (
  account: AccountDetails,
  usingTimesheet = false
): Promise<InstapayExpectedBalanceState> => {
  const latestPayRun = await keypayApi.getLatestPayRun({
    businessId: account.kpBusinessId,
    employeeId: account.kpEmployeeId,
    country: account.country || 'AU',
  });
  const accountTimezone = getTimezoneByAccount(account);
  const lastPayPeriod = {
    begin: dayjs.tz(latestPayRun.payPeriodStarting, accountTimezone),
    end: dayjs.tz(latestPayRun.payPeriodEnding, accountTimezone),
    payment: dayjs.tz(latestPayRun.datePaid, accountTimezone),
  };
  const currentPayPeriod = getNextPayPeriod(account.payFrequency, lastPayPeriod);

  const today = dayjs.tz(undefined, accountTimezone).startOf('day');

  const paymentDiffToday = today.diff(currentPayPeriod.payment);
  const endingDiffToday = today.diff(currentPayPeriod.end);

  let expectedState: InstapayExpectedBalanceState = 'ready';
  if (paymentDiffToday >= 0 && endingDiffToday <= 0) {
    expectedState = 'payment-date-restricted';
  }

  const startingDiffToday = today.diff(currentPayPeriod.begin);
  if (!usingTimesheet && startingDiffToday === 0) {
    expectedState = 'empty-balance';
  }

  console.log(`Expect balance is <${expectedState}> for ${account.email}`);
  return expectedState;
};
