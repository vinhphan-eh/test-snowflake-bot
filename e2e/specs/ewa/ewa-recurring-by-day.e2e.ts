import { IncomeDashboardScreen } from "../../pom/earn-wage-access/IncomeDashboardScreen";
import { EWARecurringByDayScreen } from "../../pom/ewa-recurring/EWARecurringByDayScreen";
import { getElementById } from "../../utils/common-actions";
import { loginAndGoToIncomeTab } from "../../utils/earn-wage-access/common-actions";
import { prepareBalanceForCasualEmployee, prepareBalanceForPermanentEmployee, type KPAccountDetails } from "../../utils/instapay/prepare-instapay-account";
import { PayFrequency, UserSource } from "../../utils/instapay/utils";

const CasualEmployee: KPAccountDetails = {
  userSource: UserSource.KP,
  email: 'thanhtan.do+e2e_recurring_by_day.01@employmenthero.com',
  password: 'Thanh@10AM',
  kpBusinessId: '437518',
  kpEmployeeId: '9809695',
  payFrequency: PayFrequency.Fortnightly,
  country: 'AU',
  orgName: 'eBenefits E2E 01',
};

const PermanentEmployee: KPAccountDetails = {
  userSource: UserSource.KP,
  email: 'thanhtan.do+e2e_recurring_by_day.02@employmenthero.com',
  password: 'Thanh@10AM',
  kpBusinessId: '437518',
  kpEmployeeId: '9809703',
  payFrequency: PayFrequency.Fortnightly,
  country: 'AU',
  orgName: 'eBenefits E2E 01',
};

describe('EWA Recurring By Day', () => {
  describe('Casual fortnightly employee', () => {
    const targetAccount = CasualEmployee;
    let incomeDashboardScreen: IncomeDashboardScreen;
    let recurringScreen: EWARecurringByDayScreen;

    beforeEach(async () => {
      try {
        await prepareBalanceForCasualEmployee(targetAccount);
      } catch (error) {
        throw new Error(`Not able to prepare balance for employee: ${error}`);
      }

      await device.launchApp();
      incomeDashboardScreen = new IncomeDashboardScreen();
      recurringScreen = new EWARecurringByDayScreen();
      await loginAndGoToIncomeTab(targetAccount.email, targetAccount.password, true);
    });

    afterEach(async () => {
      await device.terminateApp();
    });

    it('should subscribe successfully', async () => {
      let selectedDay = 'Tuesday';
      let selectedMaxAmount = 100;

      await incomeDashboardScreen.selectHeaderMiniTab('Recurring');
      await recurringScreen.closeRecurringGettingStartedBts();
      try {
        await recurringScreen.cancelSubscription();
      } catch (_) {
        console.error('No subscription to cancel');
      }

      await recurringScreen.selectRecurringByDayOptIn();
      await recurringScreen.setupRecurringByDaySubscription(selectedDay, selectedMaxAmount);

      selectedDay = 'Wednesday';
      selectedMaxAmount = 150;
      await recurringScreen.updateSubscription(selectedDay, selectedMaxAmount);

      await recurringScreen.cancelSubscription();
      await expect(await getElementById('schedule-by-day')).toBeVisible();
    });
  });

  describe('Permanent fortnightly employee', () => {
    const targetAccount = PermanentEmployee;
    let incomeDashboardScreen: IncomeDashboardScreen;
    let recurringScreen: EWARecurringByDayScreen;

    beforeEach(async () => {
      try {
        await prepareBalanceForPermanentEmployee(targetAccount);
      } catch (error) {
        throw new Error(`Not able to prepare balance for employee: ${error}`);
      }

      await device.launchApp();
      incomeDashboardScreen = new IncomeDashboardScreen();
      recurringScreen = new EWARecurringByDayScreen();
      await loginAndGoToIncomeTab(targetAccount.email, targetAccount.password, true);
    });

    afterEach(async () => {
      await device.terminateApp();
    });

    it('should subscribe successfully', async () => {
      let selectedDay = 'Tuesday';
      let selectedMaxAmount = 100;

      await incomeDashboardScreen.selectHeaderMiniTab('Recurring');
      await recurringScreen.closeRecurringGettingStartedBts();
      try {
        await recurringScreen.cancelSubscription();
      } catch (_) {
        console.error('No subscription to cancel');
      }

      await recurringScreen.selectRecurringByDayOptIn();
      await recurringScreen.setupRecurringByDaySubscription(selectedDay, selectedMaxAmount);

      selectedDay = 'Wednesday';
      selectedMaxAmount = 150;
      await recurringScreen.updateSubscription(selectedDay, selectedMaxAmount);

      await recurringScreen.cancelSubscription();
      await expect(await getElementById('schedule-by-day')).toBeVisible();
    });
  });
});
