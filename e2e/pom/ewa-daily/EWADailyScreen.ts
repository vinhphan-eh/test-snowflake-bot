import { getElementById, getElementByLabel, getElementByText } from '../../utils/common-actions';
import { BaseScreen } from '../BaseScreen';

export class EWADailyScreen extends BaseScreen {
  async goToOnboarding() {
    await (await getElementByLabel('Daily')).tap();
    await (await getElementById('daily-section-cta')).tap();
    await (await getElementByLabel('Next')).tap();
  }

  async acceptTermsAndConditions() {
    await (await getElementById('instapay-daily-terms-and-conditions')).tap();
    await (await getElementById('instapay-daily-terms-and-conditions-cta')).tap();
  }

  async subscribeInstaPayDaily() {
    await (await getElementById('instapay-daily-subscribe')).tap();
  }

  async finishOnboardingFlow() {
    await (await getElementByText('Access your pay daily')).tap();
  }

  async unsubscribeInstaPayDaily() {
    await (await getElementByText('Cancel daily subscription')).tap();
    await (await getElementById('daily-cancellation-confirmation-yes')).tap();
  }

  async selectOptOutReason(reason = 'Infrequent use') {
    await (await getElementByText(reason)).tap();
  }

  async confirmUnsubscribeInstaPayDaily() {
    await (await getElementById('instapay-daily-unsubscribe-confirm')).tap();
  }

  async accessManageSection() {
    await this.accessIncomeSection();
    await (await getElementById('header-tab-Daily')).tap();
    await (await getElementById('ewa-manage')).tap();
  }
}
