import { getElementByLabel, getElementByText } from '../../utils/common-actions';
import { BaseScreen } from '../BaseScreen';

export class WalletDashboardScreen extends BaseScreen {
  async visitPayAnyoneScreen() {
    await (await getElementByLabel('Payments')).tap();
    await (await getElementByLabel('Pay Someone')).tap();
  }

  async acknowledgeATMWithdrawalAlert() {
    try {
      const bannerAlert = await getElementByText('ATM withdrawal alert');
      if (bannerAlert) {
        await (await getElementByText('I acknowledge')).tap();
      }
    } catch (error) {
      console.log('No ATM withdrawal alert');
    }
  }

  async refreshPage() {
    try {
      // Refresh the page
      waitFor(element(by.id('refreshControl'))).toBeVisible(50);
      await element(by.id('refreshControl')).swipe('down', 'slow', 1);
      // Refresh the page again
      waitFor(element(by.id('refreshControl'))).toBeVisible(50);
      await element(by.id('refreshControl')).swipe('down', 'slow', 1);
    } catch (e) {
      // Prevent occasionally failed to refresh events stopped the test
    }
  }
}
