/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
import { expect as jestExpect } from '@jest/globals';
import dayjs from 'dayjs';
import { expect } from 'detox';
import sample from 'lodash/sample';
import { IncomeDashboardScreen } from '../../pom/earn-wage-access/IncomeDashboardScreen';
import { getElementByText } from '../../utils/common-actions';
import { loginAndGoToIncomeTab } from '../../utils/earn-wage-access/common-actions';
import {
  getInstaPayBalanceOfEmployee,
  prepareBalanceForPermanentEmployee,
  type KPAccountDetails,
} from '../../utils/instapay/prepare-instapay-account';
import { PayFrequency, UserSource } from '../../utils/instapay/utils';
import { createCurrencyFormatter } from '../../../src/common/utils/numbers';

const Employees: KPAccountDetails[] = [
  {
    userSource: UserSource.KP,
    email: 'nhan.nguyencao+e2e_uk_kp_05@employmenthero.com',
    password: 'EmploymentHero123',
    kpBusinessId: '431499',
    kpEmployeeId: '9263375',
    payFrequency: PayFrequency.Monthly,
    country: 'GB',
    orgName: 'Eben E2E Test',
  },
  {
    userSource: UserSource.KP,
    email: 'nhan.nguyencao+e2e_uk_kp_05@employmenthero.com',
    password: 'EmploymentHero123',
    kpBusinessId: '430566',
    kpEmployeeId: '9263376',
    payFrequency: PayFrequency.Monthly,
    country: 'GB',
    orgName: 'Spice Girls LLC',
  },
];

describe('Intapay KP user from UK who is in multiple orgs', () => {
  let incomeDashboardScreen: IncomeDashboardScreen;
  let totalBalance = 0;
  let targetAccount: KPAccountDetails;
  const withdrawAmount = 5;

  beforeEach(async () => {
    targetAccount = sample(Employees) as KPAccountDetails;
    totalBalance = 0;

    for (const account of Employees) {
      await prepareBalanceForPermanentEmployee(account);
      // Double check balance, if it's enough, we can use this account
      const { orgBalance: balance } = await getInstaPayBalanceOfEmployee(account);
      totalBalance += balance.balance.balance;
      if ('balance' in balance.balance && balance.balance.balance < withdrawAmount) {
        throw new Error('Not enough balance');
      }
    }

    await device.launchApp();

    incomeDashboardScreen = new IncomeDashboardScreen();
    await loginAndGoToIncomeTab(targetAccount.email, targetAccount.password, true, targetAccount.country);
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('should withdraw successfully', async () => {
    await incomeDashboardScreen.selectEmployer(targetAccount.orgName ?? '');

    await incomeDashboardScreen.enterInstaPayAmount(withdrawAmount, '£');
    await incomeDashboardScreen.nextOnSelectBankAccount();
    await incomeDashboardScreen.confirmInstaPayDetails();

    await expect(await getElementByText('Cha-ching! Your request has been processed! 💸🎉')).toBeVisible();

    await incomeDashboardScreen.finishInstaPayFlow();

    const formatCurrency = createCurrencyFormatter();

    const expectedBalance = formatCurrency(totalBalance - withdrawAmount, { currency: 'GBP' });
    await expect(await getElementByText(expectedBalance)).toBeVisible();

    await incomeDashboardScreen.goToHistoryScreen();
    await waitFor(element(by.id('instapay-transaction-0')))
      .toBeVisible()
      .withTimeout(10 * 1000);

    const item = element(by.id('instapay-transaction-0'));
    const attrs = (await item.getAttributes()) as Detox.IosElementAttributes;

    const { label } = attrs;

    if (!label) {
      throw new Error('Text is null');
    }

    jestExpect(label.includes(`£${withdrawAmount.toFixed(2)}`)).toBe(true); // Amount
    jestExpect(label.includes(dayjs().format('D MMM YYYY'))); // Today
  });
});
