import { getElementById, getElementByText, sleep } from '../utils/common-actions';

export class BaseScreen {
  async accessWalletSection() {
    await (await getElementById('spend-tab')).tap();
  }

  async getSuccessfulText(text: string) {
    return getElementByText(text);
  }

  async accessIncomeSection() {
    await (await getElementByText('Income')).tap();
  }

  async accessSupportSection() {
    await (await getElementByText('Spend')).swipe('left');
    try {
      await element(by.text('Bill Management')).swipe('left');
    } catch (e) {
      // Do nothing
    }
    await sleep(1000);
    await (await getElementByText('Support')).multiTap(2);
  }

  async accessBenefitsPillar() {
    await sleep(1000);
    await (await getElementById('swag-switch-arrow-button')).tap();
    await (await getElementById('test-id-BenefitsApp')).tap();
  }

  async accessSwagAppPillar() {
    await sleep(1000);
    await (await getElementById('swag-switch-arrow-button')).tap();
    await (await getElementById('test-id-SwagApp')).tap();
  }

  async pickSupportCountryInBenefits() {
    await (await getElementByText('Update your region.')).tap();
    await (await getElementByText('Australia')).tap();
  }

  async accessSuperSection() {
    await (await getElementByText('Super')).tap();
    await sleep(1000);
  }

  async tapOnBackButton() {
    await (await getElementById('topbar-back-icon')).tap();
  }
}
