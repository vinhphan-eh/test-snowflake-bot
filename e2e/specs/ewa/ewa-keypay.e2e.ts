import { expect as jestExpect } from '@jest/globals';
import dayjs from 'dayjs';
import { expect } from 'detox';
import type { MoneyV2 } from '../../new-graphql/generated';
import { IncomeDashboardScreen } from '../../pom/earn-wage-access/IncomeDashboardScreen';
import { WalletDashboardScreen } from '../../pom/wallet/WalletDashboardScreen';
import { getWalletData, getKPAuthTokens } from '../../utils/api';
import { getElementByLabelWithIndex, getElementByText, sleep } from '../../utils/common-actions';
import { loginAndGoToIncomeTab } from '../../utils/earn-wage-access/common-actions';
import { createLeaveRequest, deleteLeaveRequest } from '../../utils/instapay/keypay-api';
import {
  calculateEstInstapayBalanceForPermanentEmployee,
  getExpectedBalanceState,
  getInstaPayBalanceOfEmployee,
  prepareBalanceForCasualEmployee,
  prepareBalanceForPermanentEmployee,
  type InstapayExpectedBalanceState,
  type KPAccountDetails,
  type KPAccountWithPayRate,
} from '../../utils/instapay/prepare-instapay-account';
import { PayFrequency, UserSource, getTimezoneByAccount } from '../../utils/instapay/utils';
import { getFloatAmountFromMoneyV2 } from '../../utils/utils';

const PermanentEmployee: KPAccountDetails = {
  userSource: UserSource.KP,
  email: 'nhan.nguyencao+au_kp_permanent@employmenthero.com',
  password: 'EmploymentHero123',
  kpBusinessId: '437521',
  kpEmployeeId: '9798428',
  payFrequency: PayFrequency.Weekly,
  country: 'AU',
};

const CasualEmployee: KPAccountDetails = {
  userSource: UserSource.KP,
  email: 'nhan.nguyencao+au_kp_casual_no_ssa@employmenthero.com',
  password: 'EmploymentHero123',
  kpBusinessId: '437521',
  kpEmployeeId: '9798429',
  payFrequency: PayFrequency.Weekly,
  country: 'AU',
};

const CasualEmployeeWithSSA: KPAccountDetails = {
  userSource: UserSource.KP,
  email: 'nhan.nguyencao+au_kp_casual_ssa@employmenthero.com',
  password: 'EmploymentHero123',
  kpBusinessId: '437521',
  kpEmployeeId: '9798430',
  payFrequency: PayFrequency.Weekly,
  country: 'AU',
};

const PermanentEmployeeBalanceUpdatedOnceDaily: KPAccountWithPayRate = {
  userSource: UserSource.KP,
  email: 'nhan.nguyencao+au_kp_permanent_balance@employmenthero.com',
  password: 'EmploymentHero123',
  country: 'AU',
  kpBusinessId: '437521',
  kpEmployeeId: '9798460',
  payFrequency: PayFrequency.Weekly,
  payRatePerHour: 42,
  orgHrsPerWeek: 38,
};

const employeeWithLeave: KPAccountDetails = {
  userSource: UserSource.KP,
  email: 'nhan.nguyencao+au_kp_leave@employmenthero.com',
  password: 'EmploymentHero123',
  kpBusinessId: '437521',
  kpEmployeeId: '9798432',
  country: 'AU',
  payFrequency: PayFrequency.Weekly,
};

const MinWithdrawLimit = 1; // $10

describe('InstaPay for Keypay users', () => {
  let incomeDashboardScreen: IncomeDashboardScreen;
  let walletScreen: WalletDashboardScreen;

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
            } else {
              throw new Error(`Balance not available: ${JSON.stringify(orgBalance)}`);
            }
          }
        } catch (error) {
          throw new Error(`Not able to prepare balance for employee: ${error}`);
        }

        await device.launchApp();
        incomeDashboardScreen = new IncomeDashboardScreen();
        await loginAndGoToIncomeTab(account.email, account.password, true);
      });

      afterEach(async () => {
        await device.terminateApp();
      });

      it('should attempt withdraw correctly', async () => {
        const withdrawAmount = 10;
        switch (expectedBalanceState) {
          case 'empty-balance':
            await expect(await getElementByText('Current earned pay')).toBeVisible();
            await expect(await getElementByText(/\$0.00/)).toBeVisible();
            break;
          case 'payment-date-restricted':
            await expect(await getElementByText('This is due to your pay cycle.')).toBeVisible();
            break;
          default:
            await incomeDashboardScreen.enterInstaPayAmount(withdrawAmount);
            await incomeDashboardScreen.nextOnSelectBankAccount();
            await incomeDashboardScreen.confirmInstaPayDetails();

            await expect(await getElementByText('Cha-ching! Your request has been processed! 💸🎉')).toBeVisible();
            await incomeDashboardScreen.finishInstaPayFlow();

            await sleep(2000);
            await expect(await getElementByText(`$${(accTotalBalance - withdrawAmount).toFixed(2)}`)).toBeVisible();
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
          PermanentEmployeeBalanceUpdatedOnceDaily.password,
          true
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
            const formattedBalance = new Intl.NumberFormat('en-AU', {
              style: 'currency',
              currency: 'AUD',
            });
            await expect(await getElementByText(`${formattedBalance.format(estimatedBalance)}`)).toBeVisible();
        }
      });
    });
  });

  describe('Casual employee', () => {
    const withdrawAmount = 10;

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
            } else {
              throw new Error(`Balance not available: ${JSON.stringify(orgBalance)}`);
            }
          }
        } catch (error) {
          throw new Error(`Not able to prepare balance for employee: ${error}`);
        }

        await device.launchApp();
        incomeDashboardScreen = new IncomeDashboardScreen();
        await loginAndGoToIncomeTab(account.email, account.password, true);
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
            await incomeDashboardScreen.enterInstaPayAmount(withdrawAmount);
            await incomeDashboardScreen.nextOnSelectBankAccount();
            await incomeDashboardScreen.confirmInstaPayDetails();

            await expect(await getElementByText('Cha-ching! Your request has been processed! 💸🎉')).toBeVisible();
            await incomeDashboardScreen.finishInstaPayFlow();

            await sleep(2000);
            await expect(await getElementByText(`$${(accTotalBalance - withdrawAmount).toFixed(2)}`)).toBeVisible();
        }
      });
    });

    describe('With SSA and has enough balance', () => {
      let accTotalBalance: number;
      const account = CasualEmployeeWithSSA;
      let expectedBalanceState: InstapayExpectedBalanceState;
      let spendAccountBalanceBeforeWithdraw: number;

      const spendAccountBalance = async (email: string, password: string) => {
        const { ebenToken, kpToken } = await getKPAuthTokens({ email, password });
        const wallet = await getWalletData({ eBenToken: ebenToken, kpToken });
        return getFloatAmountFromMoneyV2(wallet?.me?.wallet?.details.availableBalance as MoneyV2) || 0;
      };

      const goToWallet = async () => {
        await walletScreen.accessWalletSection();
        await walletScreen.acknowledgeATMWithdrawalAlert();
        await walletScreen.refreshPage();
      };

      beforeEach(async () => {
        try {
          expectedBalanceState = await getExpectedBalanceState(account);
          if (expectedBalanceState === 'ready') {
            await prepareBalanceForCasualEmployee(CasualEmployeeWithSSA);
            const { orgBalance, totalBalance } = await getInstaPayBalanceOfEmployee(account);
            const balance = orgBalance?.balance?.balance || 0;
            if (balance >= MinWithdrawLimit) {
              accTotalBalance = totalBalance;
            } else {
              throw new Error(`Balance not available: ${JSON.stringify(orgBalance)}`);
            }
          }
        } catch (error) {
          throw new Error(`Not able to prepare balance for employee: ${error}`);
        }
        await device.launchApp();
        incomeDashboardScreen = new IncomeDashboardScreen();
        walletScreen = new WalletDashboardScreen();

        await loginAndGoToIncomeTab(CasualEmployeeWithSSA.email, CasualEmployeeWithSSA.password, true);
        // Store the balance before withdraw
        spendAccountBalanceBeforeWithdraw = await spendAccountBalance(
          CasualEmployeeWithSSA.email,
          CasualEmployeeWithSSA.password
        );
      });

      afterEach(async () => {
        await device.terminateApp();
      });

      test('should attempt withdraw correctly', async () => {
        switch (expectedBalanceState) {
          case 'payment-date-restricted':
            await expect(await getElementByText('This is due to your pay cycle.')).toBeVisible();
            break;
          default:
            await incomeDashboardScreen.enterInstaPayAmount(withdrawAmount);
            await incomeDashboardScreen.nextOnSelectBankAccount();
            await incomeDashboardScreen.confirmInstaPayDetails();

            await expect(await getElementByText('Cha-ching! Your request has been processed! 💸🎉')).toBeVisible();
            await incomeDashboardScreen.finishInstaPayFlow();

            await expect(await getElementByText(`$${(accTotalBalance - withdrawAmount).toFixed(2)}`)).toBeVisible();

            // Check the balance and transactions in the wallet
            await goToWallet();

            const finalSpendBalance = spendAccountBalanceBeforeWithdraw + withdrawAmount;
            const transactionDateToday = dayjs.tz(undefined);
            const formattedNumber = new Intl.NumberFormat('en-AU').format(finalSpendBalance);
            await expect(await getElementByText(`$${formattedNumber}.00`)).toBeVisible();

            const accountTransactionsElement = await getElementByText('Account transactions');
            await accountTransactionsElement.swipe('up', 'slow', 0.25, 0.5, 0.5);

            const latestTransactionItem = await getElementByLabelWithIndex({
              value: /^Earned Wage Access/,
              index: 0,
            });
            await expect(latestTransactionItem).toBeVisible();
            await latestTransactionItem.tap();

            await expect(await getElementByText('You received')).toBeVisible();
            await expect(await getElementByText(`$${withdrawAmount.toFixed(2)}`)).toBeVisible();
            await expect(await getElementByText('Description')).toBeVisible();

            await expect(
              // eslint-disable-next-line prefer-regex-literals
              await getElementByText(new RegExp(`.*IP${transactionDateToday.format('DDMMYY')}.*`))
            ).toBeVisible();

            await (await getElementByText('Done')).tap();
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
        const timezone = getTimezoneByAccount(account);
        const currentDate = dayjs.tz(undefined, timezone);
        leaveRequestId = await createLeaveRequest(account, {
          startDate: currentDate,
          endDate: currentDate,
          leaveCategoryId: 242765,
        });
      } catch (error) {
        throw new Error(`Failed to create leave request: ${error}`);
      }

      await loginAndGoToIncomeTab(account.email, account.password, true);
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
          await expect(await getElementByText(new RegExp(`\\$${accTotalBalance.toFixed(2)}`))).toBeVisible();

          // withdraw to invalidate cache balance
          await incomeDashboardScreen.enterInstaPayAmount(1);
          await incomeDashboardScreen.nextOnSelectBankAccount();
          await incomeDashboardScreen.confirmInstaPayDetails();
          await incomeDashboardScreen.finishInstaPayFlow();

          const { totalBalance: newTotalBalance } = await getInstaPayBalanceOfEmployee(employeeWithLeave);
          // ensure newBalance less than oldBalance - withdrawAmount
          jestExpect(newTotalBalance).toBeLessThan(accTotalBalance - 1);
          await sleep(2000);
          await expect(await getElementByText(new RegExp(`\\$${newTotalBalance.toFixed(2)}`))).toBeVisible();
      }
    });
  });
});
