import { expect as jestExpect } from '@jest/globals';
import dayjs from 'dayjs';
import { expect } from 'detox';
import { IncomeDashboardScreen } from '../../pom/earn-wage-access/IncomeDashboardScreen';
import { getElementByText, sleep } from '../../utils/common-actions';
import { loginAndGoToIncomeTab } from '../../utils/earn-wage-access/common-actions';
import { createLeaveRequest, deleteLeaveRequest } from '../../utils/instapay/keypay-api';
import {
  type KPAccountDetails,
  prepareBalanceForCasualEmployee,
  prepareBalanceForPermanentEmployee,
  getInstaPayBalanceOfEmployee,
  calculateEstInstapayBalanceForPermanentEmployee,
  type KPAccountWithPayRate,
  type InstapayExpectedBalanceState,
  getExpectedBalanceState,
} from '../../utils/instapay/prepare-instapay-account';
import { getTimezoneByAccount, PayFrequency, UserSource } from '../../utils/instapay/utils';
import { createCurrencyFormatter } from '../../../src/common/utils/numbers';

const PermanentEmployee: KPAccountDetails = {
  userSource: UserSource.KP,
  email: 'nhan.nguyencao+e2e_uk_kp_01@employmenthero.com',
  password: 'EmploymentHero123',
  kpBusinessId: '431499',
  kpEmployeeId: '9263371',
  payFrequency: PayFrequency.Monthly,
  country: 'GB',
};

const CasualEmployee: KPAccountDetails = {
  userSource: UserSource.KP,
  email: 'nhan.nguyencao+e2e_uk_kp_02@employmenthero.com',
  password: 'EmploymentHero123',
  kpBusinessId: '431499',
  kpEmployeeId: '9263372',
  payFrequency: PayFrequency.Monthly,
  country: 'GB',
};

const PermanentEmployeeBalanceUpdatedOnceDaily: KPAccountWithPayRate = {
  userSource: UserSource.KP,
  email: 'nhan.nguyencao+e2e_uk_kp_03@employmenthero.com',
  password: 'EmploymentHero123',
  kpBusinessId: '431499',
  kpEmployeeId: '9263373',
  payFrequency: PayFrequency.Monthly,
  payRatePerHour: 15,
  orgHrsPerWeek: 38,
  country: 'GB',
};

const employeeWithLeave: KPAccountDetails = {
  userSource: UserSource.KP,
  email: 'nhan.nguyencao+e2e_uk_kp_04@employmenthero.com',
  password: 'EmploymentHero123',
  kpBusinessId: '431499',
  kpEmployeeId: '9263374',
  payFrequency: PayFrequency.Monthly,
  country: 'GB',
};

const MinWithdrawLimit = 5; // £5

describe('InstaPay for Keypay users from UK', () => {
  let incomeDashboardScreen: IncomeDashboardScreen;

  describe('Permanent employee', () => {
    describe('When has enough balance', () => {
      const account = PermanentEmployee;
      let accTotalBalance: number;
      let expectedBalanceState: InstapayExpectedBalanceState;

      beforeEach(async () => {
        try {
          expectedBalanceState = await getExpectedBalanceState(account);
          if (expectedBalanceState === 'ready') {
            await prepareBalanceForPermanentEmployee(account);
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
        await loginAndGoToIncomeTab(account.email, account.password, true, account.country);
      });

      afterEach(async () => {
        await device.terminateApp();
      });

      it('should attempt withdraw correctly', async () => {
        switch (expectedBalanceState) {
          case 'empty-balance':
            await expect(await getElementByText('Current earned pay')).toBeVisible();
            await expect(await getElementByText(new RegExp(`\\£0.00`))).toBeVisible();
            break;
          case 'payment-date-restricted':
            await expect(await getElementByText('This is due to your pay cycle.')).toBeVisible();
            break;
          default:
            const withdrawAmount = 5;
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

    describe('When balance is updated once per day', () => {
      let account = PermanentEmployeeBalanceUpdatedOnceDaily;
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
          PermanentEmployeeBalanceUpdatedOnceDaily.password,
          true,
          account.country
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
          default:
            const estimatedBalance = await calculateEstInstapayBalanceForPermanentEmployee({
              accountDetails: PermanentEmployeeBalanceUpdatedOnceDaily,
            });
            const formatCurrency = createCurrencyFormatter();
            await expect(await getElementByText(formatCurrency(estimatedBalance, { currency: 'GBP' }))).toBeVisible();
        }
      });
    });
  });

  describe('Casual employee', () => {
    const withdrawAmount = 5;

    // Skip this case for UK since Weavr transaction on staging is not two-sided
    // so cannot confirm the update to SSA balance
    test.todo('With SSA and has enough balance');

    describe('No SSA and has enough balance', () => {
      let accTotalBalance: number;
      const account = CasualEmployee;
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
        await loginAndGoToIncomeTab(account.email, account.password, true, account.country);
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
        throw new Error(`Not able to prepare balance for employee: ${error}`);
      }

      try {
        const account = employeeWithLeave;
        const timezone = getTimezoneByAccount(account);
        const currentDate = dayjs.tz(undefined, timezone);
        leaveRequestId = await createLeaveRequest(account, {
          startDate: currentDate,
          endDate: currentDate,
          leaveCategoryId: 9649,
        });
      } catch (error) {
        throw new Error(`Failed to create leave request: ${error}`);
      }

      await loginAndGoToIncomeTab(account.email, account.password, true, account.country);
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
          // ensure current balance in the screen
          await expect(await getElementByText(new RegExp(`\\£${accTotalBalance.toFixed(2)}`))).toBeVisible();

          // withdraw to invalidate cache balance
          await incomeDashboardScreen.enterInstaPayAmount(1, '£');
          await incomeDashboardScreen.nextOnSelectBankAccount();
          await incomeDashboardScreen.confirmInstaPayDetails();
          await incomeDashboardScreen.finishInstaPayFlow();

          const { totalBalance: newTotalBalance } = await getInstaPayBalanceOfEmployee(employeeWithLeave);
          // ensure newBalance less than oldBalance - withdrawAmount
          jestExpect(newTotalBalance).toBeLessThan(accTotalBalance - 1);
          await sleep(2000);
          await expect(await getElementByText(new RegExp(`\\£${newTotalBalance.toFixed(2)}`))).toBeVisible();
      }
    });
  });
});
