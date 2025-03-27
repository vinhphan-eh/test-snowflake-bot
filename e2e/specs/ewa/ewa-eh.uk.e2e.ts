/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
import { expect as jestExpect } from '@jest/globals';
import dayjs from 'dayjs';
import { expect } from 'detox';
import { createCurrencyFormatter } from '../../../src/common/utils/numbers';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { IncomeDashboardScreen } from '../../pom/earn-wage-access/IncomeDashboardScreen';
import { createLeaveRequest, deleteLeaveRequest } from '../../utils/api';
import { getElementByText, getElementById, checkIfNotVisible, sleep } from '../../utils/common-actions';
import { loginAndGoToIncomeTab } from '../../utils/earn-wage-access/common-actions';
import {
  calculateEstInstapayBalanceForPermanentEmployee,
  type EHAccountDetails,
  type EHAccountWithPayRate,
  getExpectedBalanceState,
  getInstaPayBalanceOfEmployee,
  type InstapayExpectedBalanceState,
  prepareBalanceForCasualEmployee,
  prepareBalanceForPermanentEmployee,
} from '../../utils/instapay/prepare-instapay-account';
import { getTimezoneByAccount, PayFrequency, UserSource } from '../../utils/instapay/utils';

const CasualEmployeeWithNoSSA: EHAccountDetails = {
  userSource: UserSource.EH,
  email: 'yan.yu+e2euktestorg_03@employmenthero.com',
  password: 'EmploymentHero123',
  targetOrgUuid: 'db62b5fe-bfd5-4a82-8d82-22a8551f772b',
  kpBusinessId: '431499',
  kpEmployeeId: '9263278',
  payFrequency: PayFrequency.Monthly,
  country: 'GB',
};

const PermanentEmployees: EHAccountDetails[] = [
  {
    userSource: UserSource.EH,
    email: 'yan.yu+e2euktestorg_01@employmenthero.com',
    password: 'EmploymentHero123',
    targetOrgUuid: 'db62b5fe-bfd5-4a82-8d82-22a8551f772b',
    kpBusinessId: '431499',
    kpEmployeeId: '9263275',
    payFrequency: PayFrequency.Monthly,
    country: 'GB',
  },
];

const PermanentEmployeeBalanceUpdatedOnceDaily: EHAccountWithPayRate = {
  userSource: UserSource.EH,
  email: 'yan.yu+e2euktestorg_02@employmenthero.com',
  password: 'EmploymentHero123',
  targetOrgUuid: 'db62b5fe-bfd5-4a82-8d82-22a8551f772b',
  kpBusinessId: '431499',
  kpEmployeeId: '9263277',
  country: 'GB',
  payFrequency: PayFrequency.Monthly,
  payRatePerHour: 15,
  orgHrsPerWeek: 38,
};

const CasualWithPaidInArrearsEmployees: EHAccountDetails[] = [
  {
    userSource: UserSource.EH,
    email: 'yan.yu+e2euktestorg_casualpia@employmenthero.com',
    password: 'EmploymentHero123',
    targetOrgUuid: '39c3e91d-2cf1-4cee-9a15-01d19dbb5450',
    kpBusinessId: '430566',
    kpEmployeeId: '9263364',
    payFrequency: PayFrequency.Monthly,
    isPaidInArrears: true,
    country: 'GB',
  },
];

const terminatedEHAccount: EHAccountDetails = {
  userSource: UserSource.EH,
  email: 'yan.yu+e2euktestorg_05@employmenthero.com',
  password: 'EmploymentHero123',
  targetOrgUuid: 'db62b5fe-bfd5-4a82-8d82-22a8551f772b',
  kpBusinessId: '431499',
  kpEmployeeId: '9263280',
  payFrequency: PayFrequency.Weekly,
  country: 'GB',
};

const employeeWithLeave: EHAccountDetails = {
  userSource: UserSource.EH,
  email: 'yan.yyu+e2euktestorg_e2e.leave@employmenthero.com',
  password: 'EmploymentHero123',
  targetOrgUuid: 'db62b5fe-bfd5-4a82-8d82-22a8551f772b',
  kpBusinessId: '431499',
  kpEmployeeId: '9263365',
  payFrequency: PayFrequency.Weekly,
  country: 'GB',
  orgId: 56847,
  memberId: 545046,
};

const MinWithdrawLimit = 5; // £5
jest.retryTimes(2);
describe('InstaPay for EH users from UK', () => {
  let incomeDashboardScreen: IncomeDashboardScreen;

  describe('Casual employee', () => {
    const withdrawAmount = 5;

    // Skip this case for UK since Weavr transaction on staging is not two-sided
    // so cannot confirm the update to SSA balance
    test.todo('With SSA and has enough balance');

    describe('No SSA and has enough balance', () => {
      let accTotalBalance: number;
      const account = CasualEmployeeWithNoSSA;
      let expectedBalanceState: InstapayExpectedBalanceState;

      beforeEach(async () => {
        try {
          expectedBalanceState = await getExpectedBalanceState(account);
          if (expectedBalanceState === 'ready') {
            await prepareBalanceForCasualEmployee(account);
            // Double check balance, if it's enough, we can use this account
            const { orgBalance, totalBalance } = await getInstaPayBalanceOfEmployee(account);
            const balance = orgBalance?.balance?.balance || 0;
            if (balance >= MinWithdrawLimit) {
              accTotalBalance = totalBalance;
            }
          }
        } catch (error) {
          throw new Error(`Not able to prepare balance for employee: ${error}`);
        }

        await device.launchApp();
        incomeDashboardScreen = new IncomeDashboardScreen();
        await loginAndGoToIncomeTab(account.email, account.password);
      });

      afterEach(async () => {
        await device.terminateApp();
      });

      it('should attempt withdraw correctly', async () => {
        switch (expectedBalanceState) {
          case 'payment-date-restricted':
            await expect(await getElementByText('This is due to your pay cycle.')).toBeVisible();
            break;
          default:
            await incomeDashboardScreen.enterInstaPayAmount(withdrawAmount, '£');
            await incomeDashboardScreen.nextOnSelectBankAccount();
            await incomeDashboardScreen.confirmInstaPayDetails();

            await expect(await getElementByText('Cha-ching! Your request has been processed! 💸🎉')).toBeVisible();
            await incomeDashboardScreen.finishInstaPayFlow();

            await sleep(2000);
            await expect(await getElementByText(`£${(accTotalBalance - withdrawAmount).toFixed(2)}`)).toBeVisible();
        }
      });
    });
  });

  describe('Permanent employee', () => {
    describe('When has enough balance', () => {
      let targetAccount: EHAccountDetails;
      let accTotalBalance: number;
      let expectedBalanceState: InstapayExpectedBalanceState;

      beforeEach(async () => {
        for (const account of PermanentEmployees) {
          targetAccount = account;
          try {
            expectedBalanceState = await getExpectedBalanceState(account);
            if (expectedBalanceState === 'ready') {
              await prepareBalanceForPermanentEmployee(account);
              // Double check balance, if it's enough, we can use this account
              const { orgBalance, totalBalance } = await getInstaPayBalanceOfEmployee(account);

              const balance = orgBalance?.balance?.balance || 0;
              if (balance >= MinWithdrawLimit) {
                accTotalBalance = totalBalance;
                targetAccount = account;
                break;
              }
            }
          } catch (error) {
            throw new Error(`Not able to prepare balance for employee: ${error}`);
          }
        }

        await device.launchApp();
        incomeDashboardScreen = new IncomeDashboardScreen();
        await loginAndGoToIncomeTab(targetAccount.email, targetAccount.password);
      });

      afterEach(async () => {
        await device.terminateApp();
      });

      it('should attempt withdraw correctly', async () => {
        switch (expectedBalanceState) {
          case 'empty-balance': {
            await expect(await getElementByText('Current earned pay')).toBeVisible();
            // eslint-disable-next-line prefer-regex-literals
            await expect(await getElementByText(new RegExp(`\\£0.00`))).toBeVisible();
            break;
          }
          case 'payment-date-restricted':
            await expect(await getElementByText('This is due to your pay cycle.')).toBeVisible();
            break;
          default: {
            const withdrawAmount = 5;
            await incomeDashboardScreen.enterInstaPayAmount(withdrawAmount, '£');
            await incomeDashboardScreen.nextOnSelectBankAccount();
            await incomeDashboardScreen.confirmInstaPayDetails();

            await expect(await getElementByText('Cha-ching! Your request has been processed! 💸🎉')).toBeVisible();
            await incomeDashboardScreen.finishInstaPayFlow();

            await sleep(2000);
            await expect(await getElementByText(`£${(accTotalBalance - withdrawAmount).toFixed(2)}`)).toBeVisible();
          }
        }
      });
    });

    describe('When balance is updated once per day', () => {
      const account = PermanentEmployeeBalanceUpdatedOnceDaily;
      let expectedBalanceState: InstapayExpectedBalanceState;

      beforeEach(async () => {
        try {
          expectedBalanceState = await getExpectedBalanceState(account);
          if (expectedBalanceState === 'ready') {
            await prepareBalanceForPermanentEmployee(account);
          }
        } catch (error) {
          throw new Error(`Not able to prepare balance for employee: ${error}`);
        }

        await device.launchApp();
        incomeDashboardScreen = new IncomeDashboardScreen();
        await loginAndGoToIncomeTab(
          PermanentEmployeeBalanceUpdatedOnceDaily.email,
          PermanentEmployeeBalanceUpdatedOnceDaily.password
        );
      });

      afterEach(async () => {
        await device.terminateApp();
      });

      it('should display the correct balance today', async () => {
        switch (expectedBalanceState) {
          case 'payment-date-restricted':
            await expect(await getElementByText('This is due to your pay cycle.')).toBeVisible();
            break;
          default: {
            const estimatedBalance = await calculateEstInstapayBalanceForPermanentEmployee({
              accountDetails: PermanentEmployeeBalanceUpdatedOnceDaily,
            });
            const formatCurrency = createCurrencyFormatter();
            await expect(await getElementByText(formatCurrency(estimatedBalance, { currency: 'GBP' }))).toBeVisible();
          }
        }
      });
    });

    describe('When having IP transactions', () => {
      beforeEach(async () => {
        await device.launchApp();
        incomeDashboardScreen = new IncomeDashboardScreen();
        await loginAndGoToIncomeTab(PermanentEmployees[0].email, PermanentEmployees[0].password);
      });

      afterEach(async () => {
        await device.terminateApp();
      });

      it('can access earned pay history in support tab', async () => {
        await incomeDashboardScreen.goToHistoryScreen();
        await expect(await getElementById('instapay-transaction-0')).toBeVisible();
      });
    });
  });

  describe('Casual employee with paid in arrears', () => {
    const [targetAccount] = CasualWithPaidInArrearsEmployees;
    let accTotalBalance: number;
    let expectedBalanceState: InstapayExpectedBalanceState;

    beforeEach(async () => {
      try {
        expectedBalanceState = await getExpectedBalanceState(targetAccount, true);
        if (expectedBalanceState === 'ready') {
          await prepareBalanceForCasualEmployee(targetAccount);
          // Double check balance, if it's enough, we can use this account
          const { orgBalance, totalBalance } = await getInstaPayBalanceOfEmployee(targetAccount);

          const balance = orgBalance?.balance?.balance || 0;
          if (balance >= MinWithdrawLimit) {
            accTotalBalance = totalBalance;
          }
        }
      } catch (error) {
        throw new Error(`Not able to prepare balance for employee: ${error}`);
      }

      await device.launchApp();
      incomeDashboardScreen = new IncomeDashboardScreen();
      await loginAndGoToIncomeTab(targetAccount.email, targetAccount.password);
    });

    afterEach(async () => {
      await device.terminateApp();
    });

    it('should handle scenario correctly', async () => {
      switch (expectedBalanceState) {
        case 'payment-date-restricted':
          await expect(await getElementByText('This is due to your pay cycle.')).toBeVisible();
          break;
        default: {
          const withdrawAmount = 5;
          await incomeDashboardScreen.enterInstaPayAmount(withdrawAmount, '£');
          await incomeDashboardScreen.nextOnSelectBankAccount();
          await incomeDashboardScreen.confirmInstaPayDetails();

          await expect(await getElementByText('Cha-ching! Your request has been processed! 💸🎉')).toBeVisible();
          await incomeDashboardScreen.finishInstaPayFlow();

          const remainingBalance = (accTotalBalance - withdrawAmount).toFixed(2);
          await expect(await getElementByText('Current earned pay')).toBeVisible();
          await expect(await getElementByText(new RegExp(`\\£${remainingBalance}`))).toBeVisible();
        }
      }
    });
  });

  describe('Terminated employee', () => {
    let authScreen: AuthScreen;

    beforeAll(async () => {
      authScreen = new AuthScreen();
    });

    beforeEach(async () => {
      await device.launchApp();
    });

    afterEach(async () => {
      await device.terminateApp();
    });

    it('should not see income tab', async () => {
      await authScreen.loginWith(terminatedEHAccount.email, terminatedEHAccount.password);
      await checkIfNotVisible('income-tab');
    });
  });

  describe('User take leave', () => {
    let leaveRequestId: number;
    const account = employeeWithLeave;
    let accTotalBalance: number;
    let expectedBalanceState: InstapayExpectedBalanceState;

    beforeEach(async () => {
      await device.launchApp();
      incomeDashboardScreen = new IncomeDashboardScreen();
      try {
        expectedBalanceState = await getExpectedBalanceState(account, true);
        if (expectedBalanceState === 'ready') {
          await prepareBalanceForPermanentEmployee(account);

          const { totalBalance } = await getInstaPayBalanceOfEmployee(account);
          accTotalBalance = totalBalance;
        }
      } catch (error) {
        console.log(error);
        throw new Error(`Not able to prepare balance for employee: ${error}`);
      }

      try {
        const account = employeeWithLeave;
        const timezone = getTimezoneByAccount(account);
        const currentDate = dayjs.tz(undefined, timezone);
        leaveRequestId = await createLeaveRequest(account, {
          startDate: currentDate,
          endDate: currentDate,
          leaveCategoryId: 219236,
          unitType: 'days',
        });
      } catch (error) {
        throw new Error(`Failed to create leave request: ${error}`);
      }

      await loginAndGoToIncomeTab(account.email, account.password, false);
    });

    afterEach(async () => {
      if (leaveRequestId) {
        deleteLeaveRequest(employeeWithLeave, leaveRequestId).catch(e => {
          // eslint-disable-next-line no-console
          console.error('Failed to delete leave request', e);
          throw e;
        });
      }
      await device.terminateApp();
    });

    it('should reduce balance after user take leave', async () => {
      switch (expectedBalanceState) {
        case 'payment-date-restricted':
          await expect(await getElementByText('This is due to your pay cycle.')).toBeVisible();
          break;
        default:
          // withdraw to invalidate cache balance
          await incomeDashboardScreen.enterInstaPayAmount(1, '£');
          await incomeDashboardScreen.nextOnSelectBankAccount();
          await incomeDashboardScreen.confirmInstaPayDetails();
          await incomeDashboardScreen.finishInstaPayFlow();
          await sleep(2000);

          const { totalBalance: newTotalBalance } = await getInstaPayBalanceOfEmployee(employeeWithLeave);
          // ensure newBalance less than oldBalance - withdrawAmount
          jestExpect(newTotalBalance).toBeLessThan(accTotalBalance - 1);
          await expect(await getElementByText(new RegExp(`\\£${newTotalBalance.toFixed(2)}`))).toBeVisible();
      }
    });
  });
});
