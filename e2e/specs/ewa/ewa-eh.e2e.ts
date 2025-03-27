/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { expect as jestExpect } from '@jest/globals';
import dayjs from 'dayjs';
import { expect } from 'detox';
import { formatCurrency } from '../../../src/common/utils/numbers';
import type { MoneyV2 } from '../../new-graphql/generated';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { IncomeDashboardScreen } from '../../pom/earn-wage-access/IncomeDashboardScreen';
import { WalletDashboardScreen } from '../../pom/wallet/WalletDashboardScreen';
import { createLeaveRequest, deleteLeaveRequest, getEHAuthTokens, getWalletData } from '../../utils/api';
import {
  checkIfNotVisible,
  getElementById,
  getElementByLabelWithIndex,
  getElementByText,
  sleep,
} from '../../utils/common-actions';
import { loginAndGoToIncomeTab } from '../../utils/earn-wage-access/common-actions';
import {
  calculateEstInstapayBalanceForPermanentEmployee,
  getExpectedBalanceState,
  getInstaPayBalanceOfEmployee,
  prepareBalanceForCasualEmployee,
  prepareBalanceForPermanentEmployee,
  type EHAccountDetails,
  type EHAccountWithPayRate,
  type InstapayExpectedBalanceState,
} from '../../utils/instapay/prepare-instapay-account';
import { PayFrequency, UserSource, getTimezoneByAccount } from '../../utils/instapay/utils';
import { getFloatAmountFromMoneyV2 } from '../../utils/utils';

const CasualEmployeeWithNoSSA: EHAccountDetails = {
  userSource: UserSource.EH,
  email: 'thang.huynh+ip_e2e_02_casual@employmenthero.com',
  password: 'EmploymentHero123',
  targetOrgUuid: '0c217ea0-c539-4fd6-b03e-6950c3a0ffdb',
  kpBusinessId: '437519',
  kpEmployeeId: '9798421',
  payFrequency: PayFrequency.Weekly,
};

const CasualEmployeeWithSSA: EHAccountDetails = {
  userSource: UserSource.EH,
  email: 'thang.huynh+ip_e2e_03_casual@employmenthero.com',
  password: 'EmploymentHero123!',
  targetOrgUuid: '0c217ea0-c539-4fd6-b03e-6950c3a0ffdb',
  kpBusinessId: '437519',
  kpEmployeeId: '9798423',
  payFrequency: PayFrequency.Weekly,
};

const PermanentEmployees: EHAccountDetails[] = [
  {
    userSource: UserSource.EH,
    email: 'thang.huynh+ip_e2e_04_perm@employmenthero.com',
    password: 'EmploymentHero123',
    targetOrgUuid: '0c217ea0-c539-4fd6-b03e-6950c3a0ffdb',
    kpBusinessId: '437519',
    kpEmployeeId: '9798435',
    country: 'AU',
    payFrequency: PayFrequency.Weekly,
  },
];

const PermanentEmployeeBalanceUpdatedOnceDaily: EHAccountWithPayRate = {
  userSource: UserSource.EH,
  email: 'thang.huynh+ip_e2e_06_perm@employmenthero.com',
  password: 'EmploymentHero123',
  targetOrgUuid: '0c217ea0-c539-4fd6-b03e-6950c3a0ffdb',
  kpBusinessId: '437519',
  kpEmployeeId: '9798464',
  country: 'AU',
  payFrequency: PayFrequency.Monthly,
  payRatePerHour: 200,
  orgHrsPerWeek: 38,
};

const CasualWithPaidInArrearsEmployees: EHAccountDetails[] = [
  {
    userSource: UserSource.EH,
    email: 'thang.huynh+ip_e2e_07_casual_in_arrear@employmenthero.com',
    password: 'EmploymentHero123',
    targetOrgUuid: '0c217ea0-c539-4fd6-b03e-6950c3a0ffdb',
    country: 'AU',
    kpBusinessId: '437519',
    kpEmployeeId: '9798458',
    payFrequency: PayFrequency.Weekly,
    isPaidInArrears: true,
  },
];

const employeeWithLeave: EHAccountDetails = {
  userSource: UserSource.EH,
  email: 'thang.huynh+e2e.leave@employmenthero.com',
  password: 'EmploymentHero123',
  targetOrgUuid: '0c217ea0-c539-4fd6-b03e-6950c3a0ffdb',
  kpBusinessId: '437519',
  kpEmployeeId: '9798463',
  country: 'AU',
  payFrequency: PayFrequency.Monthly,
  orgId: 58784,
  memberId: 546475,
};

const terminatedEHAccount: EHAccountDetails = {
  userSource: UserSource.EH,
  email: 'e2e.instapay.terminated+1@gmail.com',
  password: 'Khoa@10AMM',
  targetOrgUuid: '',
  kpBusinessId: '',
  kpEmployeeId: '',
  country: 'AU',
  payFrequency: PayFrequency.Weekly,
};

const MinWithdrawLimit = 1; // $1

describe('InstaPay for EH users', () => {
  let incomeDashboardScreen: IncomeDashboardScreen;
  let walletScreen: WalletDashboardScreen;

  describe('Casual employee', () => {
    const withdrawAmount = 1;

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
            } else {
              throw new Error(`Balance not available: ${JSON.stringify(orgBalance)}`);
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
        const { ebenToken, ehToken } = await getEHAuthTokens({
          username: email,
          password,
        });
        const wallet = await getWalletData({ eBenToken: ebenToken, ehToken });
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

        await loginAndGoToIncomeTab(CasualEmployeeWithSSA.email, CasualEmployeeWithSSA.password);
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
          default: {
            await incomeDashboardScreen.enterInstaPayAmount(withdrawAmount);
            await incomeDashboardScreen.nextOnSelectBankAccount();
            await incomeDashboardScreen.confirmInstaPayDetails();

            await expect(await getElementByText('Cha-ching! Your request has been processed! 💸🎉')).toBeVisible();
            await incomeDashboardScreen.finishInstaPayFlow();

            await sleep(2000);
            await expect(await getElementByText(`$${(accTotalBalance - withdrawAmount).toFixed(2)}`)).toBeVisible();

            // Check the balance and transactions in the wallet
            await goToWallet();

            const finalSpendBalance = spendAccountBalanceBeforeWithdraw + withdrawAmount;
            const transactionDateToday = dayjs.tz(undefined);

            const formattedNumber = new Intl.NumberFormat('en-AU').format(finalSpendBalance);
            await expect(await getElementByText(`$${formattedNumber}.00`)).toBeVisible();

            const accountTransactionsElement = await getElementByText('Account transactions');
            await accountTransactionsElement.swipe('up', 'slow', 0.2);

            const latestTransactionItem = await getElementByLabelWithIndex({
              value: /^Earned Wage Access/,
              index: 0,
            });
            await sleep(2000);
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
          case 'empty-balance':
            await expect(await getElementByText('Current earned pay')).toBeVisible();
            await expect(await getElementByText(/\$0.00/)).toBeVisible();
            break;
          case 'payment-date-restricted':
            await expect(await getElementByText('This is due to your pay cycle.')).toBeVisible();
            break;
          default: {
            const withdrawAmount = 1;
            await incomeDashboardScreen.enterInstaPayAmount(withdrawAmount);
            await incomeDashboardScreen.nextOnSelectBankAccount();
            await incomeDashboardScreen.confirmInstaPayDetails();

            await expect(await getElementByText('Cha-ching! Your request has been processed! 💸🎉')).toBeVisible();
            await incomeDashboardScreen.finishInstaPayFlow();

            await sleep(2000);
            await expect(await getElementByText(`$${(accTotalBalance - withdrawAmount).toFixed(2)}`)).toBeVisible();
          }
        }
      });
    });

    describe('When balance is updated once per day', () => {
      const permanentEmployeeAccount = PermanentEmployeeBalanceUpdatedOnceDaily;
      let expectedBalanceState: InstapayExpectedBalanceState;

      beforeEach(async () => {
        try {
          expectedBalanceState = await getExpectedBalanceState(permanentEmployeeAccount);
          if (expectedBalanceState === 'ready') {
            await prepareBalanceForPermanentEmployee(permanentEmployeeAccount);
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
            const formattedBalance = new Intl.NumberFormat('en-AU', {
              style: 'currency',
              currency: 'AUD',
            });
            await expect(await getElementByText(`${formattedBalance.format(estimatedBalance)}`)).toBeVisible();
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
          } else {
            throw new Error(`Balance not available: ${JSON.stringify(orgBalance)}`);
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
          const withdrawAmount = 1;
          await incomeDashboardScreen.enterInstaPayAmount(withdrawAmount);
          await incomeDashboardScreen.nextOnSelectBankAccount();
          await incomeDashboardScreen.confirmInstaPayDetails();

          await expect(await getElementByText('Cha-ching! Your request has been processed! 💸🎉')).toBeVisible();
          await incomeDashboardScreen.finishInstaPayFlow();

          const remainingBalance = (accTotalBalance - withdrawAmount).toFixed(2);
          await expect(await getElementByText('Current earned pay')).toBeVisible();
          await expect(await getElementByText(new RegExp(`\\$${remainingBalance}`))).toBeVisible();
        }
      }
    });
  });

  describe('User take leave', () => {
    let leaveRequestId: number;
    let account = employeeWithLeave;
    let accTotalBalance: number;
    let expectedBalanceState: InstapayExpectedBalanceState;

    beforeEach(async () => {
      await device.launchApp();
      incomeDashboardScreen = new IncomeDashboardScreen();
      try {
        expectedBalanceState = await getExpectedBalanceState(account);
        if (expectedBalanceState === 'ready') {
          await prepareBalanceForPermanentEmployee(account);

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

      try {
        account = employeeWithLeave;
        const timezone = getTimezoneByAccount(account);
        const currentDate = dayjs.tz(undefined, timezone);
        leaveRequestId = await createLeaveRequest(account, {
          startDate: currentDate,
          endDate: currentDate,
          leaveCategoryId: 222709,
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
        case 'empty-balance':
          await expect(await getElementByText('Current earned pay')).toBeVisible();
          await expect(await getElementByText(/\$0.00/)).toBeVisible();
          break;
        default: {
          // ensure current balance in the screen
          await expect(await getElementByText(formatCurrency(accTotalBalance))).toBeVisible();

          // withdraw to invalidate cache balance
          await incomeDashboardScreen.enterInstaPayAmount(1);
          await incomeDashboardScreen.nextOnSelectBankAccount();
          await incomeDashboardScreen.confirmInstaPayDetails();
          await incomeDashboardScreen.finishInstaPayFlow();

          const { totalBalance: newTotalBalance } = await getInstaPayBalanceOfEmployee(employeeWithLeave);
          // ensure newBalance less than oldBalance - withdrawAmount
          jestExpect(newTotalBalance).toBeLessThanOrEqual(accTotalBalance - 1);
          await sleep(2000);
          await expect(await getElementByText(formatCurrency(newTotalBalance))).toBeVisible();
        }
      }
    });
  });

  describe('Terminated employee', () => {
    let authScreen: AuthScreen;

    beforeAll(() => {
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
});
