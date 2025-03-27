/* eslint-disable no-restricted-syntax */
import { IncomeDashboardScreen } from '../../pom/earn-wage-access/IncomeDashboardScreen';
import { EWARecurringScreen } from '../../pom/ewa-recurring/EWARecurringScreen';
import { loginAndGoToIncomeTab } from '../../utils/earn-wage-access/common-actions';
import { type EHAccountDetails, type KPAccountDetails } from '../../utils/instapay/prepare-instapay-account';
import { PayFrequency, UserSource } from '../../utils/instapay/utils';

const PermanentEHEmployee: EHAccountDetails = {
  userSource: UserSource.EH,
  email: 'eh.eben.scheduling_subscription@gmail.com',
  password: 'Automation@EH',
  targetOrgUuid: '37fe161a-296e-43e6-adda-a7b4eaf8fc9c',
  kpBusinessId: '324141',
  kpEmployeeId: '8665438',
  payFrequency: PayFrequency.Monthly,
};

const PermanentKPEmployee: KPAccountDetails = {
  userSource: UserSource.KP,
  email: 'nhan.nguyencao+au_recurring@employmenthero.com',
  password: 'EmploymentHero123',
  kpBusinessId: '437521',
  kpEmployeeId: '9798445',
  payFrequency: PayFrequency.Monthly,
};

describe('EWA Recurring for EH users', () => {
  let incomeDashboardScreen: IncomeDashboardScreen;
  let recurringScreen: EWARecurringScreen;

  describe('Permanent employee', () => {
    describe('When has enough balance', () => {
      let targetAccount: EHAccountDetails;

      beforeEach(async () => {
        targetAccount = PermanentEHEmployee;

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
          await recurringScreen.cancelSubscription();
        } catch (_) {
          console.error('No subscription to cancel');
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
        await recurringScreen.cancelSubscription();
        await recurringScreen.checkSubTitle();
      });
    });
  });
});

describe('EWA Recurring for KP users', () => {
  let incomeDashboardScreen: IncomeDashboardScreen;
  let recurringScreen: EWARecurringScreen;

  describe('Permanent employee', () => {
    describe('When has enough balance', () => {
      let targetAccount: KPAccountDetails;

      beforeEach(async () => {
        targetAccount = PermanentKPEmployee;

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

        try {
          await recurringScreen.cancelSubscription();
        } catch (_) {
          console.error('No subscription to cancel');
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
        await recurringScreen.cancelSubscription();
        await recurringScreen.checkSubTitle();
      });
    });
  });
});
