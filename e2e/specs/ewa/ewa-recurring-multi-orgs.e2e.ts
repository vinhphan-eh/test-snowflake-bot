/* eslint-disable no-restricted-syntax */
import { IncomeDashboardScreen } from '../../pom/earn-wage-access/IncomeDashboardScreen';
import { EWARecurringScreen } from '../../pom/ewa-recurring/EWARecurringScreen';
import { loginAndGoToIncomeTab } from '../../utils/earn-wage-access/common-actions';
import { type EHAccountDetails, type KPAccountDetails } from '../../utils/instapay/prepare-instapay-account';
import { PayFrequency, UserSource } from '../../utils/instapay/utils';
import sample from 'lodash/sample';

const PermanentEmployees: EHAccountDetails[] = [
  {
    userSource: UserSource.EH,
    email: 'nhan.nguyencao+au_multiorg_recurring_eh@employmenthero.com',
    password: 'EmploymentHero123',
    targetOrgUuid: '39c3e91d-2cf1-4cee-9a15-01d19dbb5450',
    kpBusinessId: '411987',
    kpEmployeeId: '8689898',
    payFrequency: PayFrequency.Monthly,
    country: 'AU',
    orgName: 'Backstreet Boys LLC',
  },
  {
    userSource: UserSource.EH,
    email: 'nhan.nguyencao+au_multiorg_recurring_eh@employmenthero.com',
    password: 'EmploymentHero123',
    targetOrgUuid: '37fe161a-296e-43e6-adda-a7b4eaf8fc9c',
    kpBusinessId: '324141',
    kpEmployeeId: '8689899',
    payFrequency: PayFrequency.Monthly,
    country: 'AU',
    orgName: 'Kez Test Business AU4',
  },
];

const PermanentKPEmployee: KPAccountDetails[] = [
  {
    userSource: UserSource.KP,
    email: 'nhan.nguyencao+au_recurring_multi_org@employmenthero.com',
    password: 'EmploymentHero123',
    kpBusinessId: '411987',
    kpEmployeeId: '8689892',
    payFrequency: PayFrequency.Monthly,
    country: 'AU',
    orgName: 'Backstreet Boys LLC',
  },
  {
    userSource: UserSource.KP,
    email: 'nhan.nguyencao+au_recurring_multi_org@employmenthero.com',
    password: 'EmploymentHero123',
    kpBusinessId: '437521',
    kpEmployeeId: '9798444',
    payFrequency: PayFrequency.Monthly,
    country: 'AU',
    orgName: 'E2E Test - KP only Biz',
  },
];

describe('EWA Recurring for EH Multi-org users', () => {
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

      try {
        await recurringScreen.cancelSubscription(targetAccount.orgName ?? '');
      } catch (e) {
        console.error('No subscription to cancel', e);
      }

      await recurringScreen.checkSubTitle();
      const customAmount = 51;
      await incomeDashboardScreen.enterCustomAmount(customAmount);
      await recurringScreen.goToBankSelection(customAmount);
      await recurringScreen.confirmAtBankSelection('creation');

      // update the amount
      // this is the minimum amount to subscribe for recurring subscription
      await recurringScreen.updateSubscriptionAmount(50);

      // cancel the subscription
      await recurringScreen.cancelSubscription(targetAccount.orgName ?? '');
      await recurringScreen.checkSubTitle();
    });
  });
});

describe('EWA Recurring for KP Multi-org users', () => {
  let incomeDashboardScreen: IncomeDashboardScreen;
  let recurringScreen: EWARecurringScreen;

  describe('Permanent employee', () => {
    let targetAccount: KPAccountDetails;

    beforeEach(async () => {
      targetAccount = sample(PermanentKPEmployee) as KPAccountDetails;

      await device.launchApp();
      incomeDashboardScreen = new IncomeDashboardScreen();
      recurringScreen = new EWARecurringScreen();
      await loginAndGoToIncomeTab(targetAccount.email, targetAccount.password, true);
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
      const customAmount = 51;
      await incomeDashboardScreen.enterCustomAmount(customAmount);
      await recurringScreen.goToBankSelection(customAmount);
      await recurringScreen.confirmAtBankSelection('creation');

      // update the amount
      // this is the minimum amount to subscribe for recurring subscription
      await recurringScreen.updateSubscriptionAmount(50);

      // cancel the subscription
      await recurringScreen.cancelSubscription(targetAccount.orgName ?? '');
      await recurringScreen.checkSubTitle();
    });
  });
});
