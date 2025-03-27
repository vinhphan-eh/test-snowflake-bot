/* eslint-disable no-restricted-syntax */
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
  type EHAccountDetails,
} from '../../utils/instapay/prepare-instapay-account';
import { PayFrequency, UserSource } from '../../utils/instapay/utils';

const Employees: EHAccountDetails[] = [
  {
    userSource: UserSource.EH,
    email: 'eh.eben.multi-orgs.uk@gmail.com',
    password: 'EmploymentHero123',
    targetOrgUuid: 'db62b5fe-bfd5-4a82-8d82-22a8551f772b',
    kpBusinessId: '431499',
    kpEmployeeId: '9263283',
    payFrequency: PayFrequency.Monthly,
    country: 'GB',
  },
];
jest.retryTimes(2);
describe('EWA UK EH user who is in multiple orgs', () => {
  let incomeDashboardScreen: IncomeDashboardScreen;
  let totalBalance = 0;
  let targetAccount: EHAccountDetails;
  const withdrawAmount = 1;

  beforeEach(async () => {
    targetAccount = sample(Employees) as EHAccountDetails;
    totalBalance = 0;

    for await (const account of Employees) {
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
    await loginAndGoToIncomeTab(targetAccount.email, targetAccount.password);
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('should withdraw successfully', async () => {
    await expect(await getElementByText('Choose an employer to get paid from')).toBeVisible();

    await incomeDashboardScreen.enterInstaPayAmount(withdrawAmount, '£');
    await incomeDashboardScreen.nextOnSelectBankAccount();
    await incomeDashboardScreen.confirmInstaPayDetails();

    await expect(await getElementByText('Cha-ching! Your request has been processed! 💸🎉')).toBeVisible();

    await incomeDashboardScreen.finishInstaPayFlow();

    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    });

    await expect(await getElementByText(`${formatter.format(totalBalance - withdrawAmount)}`)).toBeVisible();

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

    jestExpect(label.includes(`${formatter.format(withdrawAmount)}`)).toBe(true); // Amount
    jestExpect(label.includes(dayjs().format('D MMM YYYY'))); // Today
  });
});
