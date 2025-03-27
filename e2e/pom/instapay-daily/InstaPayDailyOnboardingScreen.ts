import { getElementById, getElementByText } from '../../utils/common-actions';
import { BaseScreen } from '../BaseScreen';

export class InstaPayDailyOnboardingScreen extends BaseScreen {
  async goToOnboarding() {
    await (await getElementById('instapay-daily-opt-in')).tap();
    await (await getElementByText('Next')).tap();
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
    await (await getElementById('instapay-daily-unsubscribe')).tap();
  }

  async selectOptOutReason(reason = 'Infrequent use') {
    await (await getElementByText(reason)).tap();
  }

  async confirmUnsubscribeInstaPayDaily() {
    await (await getElementById('instapay-daily-unsubscribe-confirm')).tap();
  }
}
