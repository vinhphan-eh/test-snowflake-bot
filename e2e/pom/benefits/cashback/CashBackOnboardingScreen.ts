import { getElementByText, getElementById } from '../../../utils/common-actions';
import { BaseScreen } from '../../BaseScreen';

export class CashBackOnboardingScreen extends BaseScreen {
  async goToBenefitsCashback() {
    await (await getElementByText('Cashback')).tap();
  }

  async selectGetStarted() {
    await (await getElementById('cashback-onboarding-get-started-select')).tap();
  }

  async viewIntro() {
    await (await getElementById('cashback-onboarding-intro')).swipe('left', 'fast');
    await (await getElementById('cashback-onboarding-intro')).swipe('left', 'fast');
  }

  async onboardingGoToTermAndCondition() {
    await this.selectGetStarted();
    await this.viewIntro();
    await (await getElementByText("Let's go!")).tap();
  }

  async scrollDownTermAndCondition() {
    await (await getElementById('cashback-terms-and-conditions')).scrollTo('bottom');
  }

  async acceptTermAndCondition() {
    await (await getElementById('accept-btn')).tap();
  }
}
