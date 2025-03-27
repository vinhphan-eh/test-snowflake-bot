/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
import { expect as jestExpect } from '@jest/globals';
import dayjs from 'dayjs';
import { expect } from 'detox';
import sample from 'lodash/sample';
import { IncomeDashboardScreen } from '../../pom/earn-wage-access/IncomeDashboardScreen';
import { getElementByLabel, getElementByText } from '../../utils/common-actions';
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
    email: 'thang.tranviet+support1@employmenthero.com',
    password: 'y^%Ut%yzi3DJrC75',
    country: 'AU',
    targetOrgUuid: '0005f375-7130-4b9a-8b51-ba663f8182d9',
    kpBusinessId: '420018',
    kpEmployeeId: '8665417',
    payFrequency: PayFrequency.Weekly,
  },
  {
    userSource: UserSource.EH,
    email: 'thang.tranviet+support1@employmenthero.com',
    password: 'y^%Ut%yzi3DJrC75',
    country: 'AU',
    targetOrgUuid: '3bb3da31-b9cf-4d59-bccd-0475bb84bd4c',
    kpBusinessId: '427193',
    kpEmployeeId: '8665418',
    payFrequency: PayFrequency.Weekly,
  },
];

describe('Intapay EH user who is in multiple orgs', () => {
  let incomeDashboardScreen: IncomeDashboardScreen;
  let totalBalance = 0;
  let targetAccount: EHAccountDetails;
  const withdrawAmount = 10;

  beforeEach(async () => {
    targetAccount = sample(Employees) as EHAccountDetails;
    totalBalance = 0;

    for (const account of Employees) {
      await prepareBalanceForPermanentEmployee(account);
      // Double check balance, if it's enough, we can use this account
      const { orgBalance } = await getInstaPayBalanceOfEmployee(account);
      const balance = orgBalance?.balance?.balance || 0;
      if (balance >= withdrawAmount) {
        totalBalance += balance;
      } else {
        throw new Error(`Balance not available: ${JSON.stringify(orgBalance)}`);
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

    await incomeDashboardScreen.enterInstaPayAmount(withdrawAmount);
    await incomeDashboardScreen.nextOnSelectBankAccount();
    await incomeDashboardScreen.confirmInstaPayDetails();

    await expect(await getElementByText('Cha-ching! Your request has been processed! 💸🎉')).toBeVisible();

    await incomeDashboardScreen.finishInstaPayFlow();

    const formatter = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    });

    await expect(await getElementByLabel(`${formatter.format(totalBalance - withdrawAmount)}`)).toBeVisible();

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
