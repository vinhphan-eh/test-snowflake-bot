/* eslint-disable no-restricted-syntax */
import sample from 'lodash/sample';
import { IncomeDashboardScreen } from '../../pom/earn-wage-access/IncomeDashboardScreen';
import { EWARecurringScreen } from '../../pom/ewa-recurring/EWARecurringScreen';
import { loginAndGoToIncomeTab } from '../../utils/earn-wage-access/common-actions';
import { type EHAccountDetails, type KPAccountDetails } from '../../utils/instapay/prepare-instapay-account';
import { PayFrequency, UserSource } from '../../utils/instapay/utils';

const PermanentEmployees: EHAccountDetails[] = [
  {
    userSource: UserSource.EH,
    email: 'yan.yu+e2euk_recurring_multiorgs_eh@employmenthero.com',
    password: 'EmploymentHero123',
    targetOrgUuid: 'db62b5fe-bfd5-4a82-8d82-22a8551f772b',
    kpBusinessId: '431499',
    kpEmployeeId: '9263382',
    payFrequency: PayFrequency.Monthly,
    country: 'GB',
    orgName: 'E2E UK Test Org',
  },
  {
    userSource: UserSource.EH,
    email: 'yan.yu+e2euk_recurring_multiorgs_eh@employmenthero.com',
    password: 'EmploymentHero123',
    targetOrgUuid: '39c3e91d-2cf1-4cee-9a15-01d19dbb5450',
    kpBusinessId: '430566',
    kpEmployeeId: '9263385',
    payFrequency: PayFrequency.Monthly,
    country: 'GB',
    orgName: 'Backstreet Boys LLC',
  },
];

const PermanentKPEmployee: KPAccountDetails[] = [
  {
    userSource: UserSource.KP,
    email: 'nhan.nguyencao+uk_recurring_multi_org@employmenthero.com',
    password: 'EmploymentHero123',
    kpBusinessId: '431499',
    kpEmployeeId: '9263380',
    payFrequency: PayFrequency.Monthly,
    country: 'GB',
    orgName: 'Eben E2E Test',
  },
  {
    userSource: UserSource.KP,
    email: 'nhan.nguyencao+uk_recurring_multi_org@employmenthero.com',
    password: 'EmploymentHero123',
    kpBusinessId: '430566',
    kpEmployeeId: '9263381',
    payFrequency: PayFrequency.Monthly,
    country: 'GB',
    orgName: 'Spice Girls LLC',
  },
];

describe('EWA Recurring for UK EH Multi-org users', () => {
  let incomeDashboardScreen: IncomeDashboardScreen;
  let recurringScreen: EWARecurringScreen;

  describe('Permanent employee', () => {
    let targetAccount: EHAccountDetails;

    beforeEach(async () => {
      targetAccount = sample(PermanentEmployees) as EHAccountDetails;

      await device.launchApp();
      incomeDashboardScreen = new IncomeDashboardScreen();
      recurringScreen = new EWARecurringScreen();
      await loginAndGoToIncomeTab(targetAccount.email, targetAccount.password);
    });

    afterEach(async () => {
      await device.terminateApp();
    });

    it('should CRUD a scheduling subscription successfully', async () => {
      await incomeDashboardScreen.selectHeaderMiniTab('Recurring');
      await recurringScreen.closeRecurringGettingStartedBts();
      await recurringScreen.selectEmployer(targetAccount.orgName ?? '');

      try {
        await recurringScreen.cancelSubscription(targetAccount.orgName ?? '');
      } catch (e) {
        console.error('No subscription to cancel', e);
      }

      await recurringScreen.checkSubTitle();
      const customAmount = 26;
      await incomeDashboardScreen.enterCustomAmount(customAmount);
      await recurringScreen.goToBankSelection(customAmount, '£');
      await recurringScreen.confirmAtBankSelection('creation');

      // update the amount
      // this is the minimum amount to subscribe for recurring subscription
      await recurringScreen.updateSubscriptionAmount(25, true);

      // cancel the subscription
      await recurringScreen.cancelSubscription(targetAccount.orgName ?? '');
      await recurringScreen.checkSubTitle();
    });
  });
});

describe('EWA Recurring for UK KP Multi-org users', () => {
  let incomeDashboardScreen: IncomeDashboardScreen;
  let recurringScreen: EWARecurringScreen;

  describe('Permanent employee', () => {
    let targetAccount: KPAccountDetails;

    beforeEach(async () => {
      targetAccount = sample(PermanentKPEmployee) as KPAccountDetails;

      await device.launchApp();
      incomeDashboardScreen = new IncomeDashboardScreen();
      recurringScreen = new EWARecurringScreen();
      await loginAndGoToIncomeTab(targetAccount.email, targetAccount.password, true, targetAccount.country);
    });

    afterEach(async () => {
      await device.terminateApp();
    });

    it('should CRUD a scheduling subscription successfully', async () => {
      await incomeDashboardScreen.selectHeaderMiniTab('Recurring');
      await recurringScreen.closeRecurringGettingStartedBts();
      await recurringScreen.selectEmployer(targetAccount.orgName ?? '');

      try {
        await recurringScreen.cancelSubscription(targetAccount.orgName ?? '');
      } catch (e) {
        console.error('No subscription to cancel', e);
      }

      await recurringScreen.checkSubTitle();
      // this is the minimum amount to subscribe for recurring subscription
      const customAmount = 26;
      await incomeDashboardScreen.enterCustomAmount(customAmount);
      await recurringScreen.goToBankSelection(customAmount, '£');
      await recurringScreen.confirmAtBankSelection('creation');

      // update the amount
      // this is the minimum amount to subscribe for recurring subscription
      await recurringScreen.updateSubscriptionAmount(25, true);

      // cancel the subscription
      await recurringScreen.cancelSubscription(targetAccount.orgName ?? '');
      await recurringScreen.checkSubTitle();
    });
  });
});
