import {
  getElementById,
  getElementByLabel,
  getElementByLabelWithIndex,
  getElementByText,
  inputNumberOnAndroid,
  sleep,
  typeTextById,
} from '../../utils/common-actions';
import { BaseScreen } from '../BaseScreen';

export class InstaPayScreen extends BaseScreen {
  async viewIntro() {
    await (await getElementById('instapay-intro')).swipe('left', 'slow');
    await (await getElementById('instapay-intro')).swipe('left', 'slow');
  }

  async onboardingGoToInstaPay() {
    await (await getElementById('instapay-now-tile')).tap();
    await this.viewIntro();
    await (await getElementByText("Let's go")).tap();
  }

  /**
   * Open InstaPay from the Income section
   * The onboarding screen will be shown if the user has not completed the onboarding
   */
  async openInstaPay() {
    await (await getElementById('instapay-now-tile')).tap();
    try {
      await this.viewIntro();
      await (await getElementByText("Let's go")).tap();
    } catch {
      // If the user has already completed the onboarding, no intro screen will be shown
    }
  }

  async enterInstaPayAmount(amount: number) {
    // Sometimes next button is not visible, so we need to scroll up
    await (await getElementByLabel('Where are we sending it?')).swipe('up', 'fast');
    if (device.getPlatform() === 'ios') {
      await typeTextById('instapay-amount-input', amount.toString());
      await (await getElementById('instapay-amount-input')).tapReturnKey();
      await (await getElementByLabel('Next')).tap();
    } else {
      await inputNumberOnAndroid('instapay-amount-input', amount.toString());
      await sleep(1000);
      await (await getElementByLabelWithIndex({ value: 'Next', index: 1 })).tap();
    }
  }

  async selectBankAccount() {
    await (await getElementById('instapay-bank-account-select')).tap();
  }

  async confirmInstaPayDetails() {
    await (await getElementById('instapay-details-confirm')).tap();
  }

  async finishInstaPayFlow() {
    // The close can be either 'Done' or 'Maybe later' depending on the SSA setup status
    const closeBtnMatcher = /Done|Maybe later/;
    if (device.getPlatform() === 'ios') {
      await (await getElementByText(closeBtnMatcher)).tap();
    } else {
      await (await getElementByLabelWithIndex({ value: closeBtnMatcher, index: 1 })).tap();
    }
  }

  async selectOrg(orgId: string) {
    const orgItem = await getElementById(orgId);
    await orgItem.tap();
  }

  /**
   * This is to handle the case when there is only one org
   * The number of orgs of an employee can be changed, when we reuse 1 Keypay business for more than 1 EH orgs
   * @param orgId
   */
  async trySelectOrg(orgId: string) {
    try {
      await this.selectOrg(orgId);
    } catch {
      // In case of single org, select org will fail. So we can ignore this case
      // If not able to select, it can be the case of single org
    }
  }
}
