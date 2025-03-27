import { expect } from 'detox';
import { getElementById, getElementByLabel, getElementByText, sleep, tapByText } from '../../utils/common-actions';
import { BaseScreen } from '../BaseScreen';

export class CardManagementScreen extends BaseScreen {
  async goToCardMgt() {
    await (await getElementByText('Spend')).swipe('left');
    waitFor(element(by.text('Card'))).toBeVisible();
    await element(by.text('Bill Management')).swipe('left');
    await sleep(2000);
    await (await getElementByText('Card')).tap();
  }

  async toggleCardIsEnabled() {
    await (await getElementById('toggle card enable')).tap();
  }

  async isCardEnabled() {
    try {
      await expect(await getElementByText('Card is enabled')).toBeVisible();
      return true;
    } catch {
      return false;
    }
  }

  async goToDamagedLostCard(appPassCode: string) {
    await (await getElementByText('Reimburse with Hero Points')).swipe('up', 'slow');
    await sleep(1000);
    await (await getElementByLabel('Damaged, lost or stolen card')).tap();
    await (await getElementById('pin-hidden-input')).typeText(appPassCode);
    await (await getElementByLabel('Cancel and order a card')).tap();
    await tapByText('Order card');
  }

  async ensureCardIsDeactivated(appPassCode: string, cardPassCode: string) {
    const timeout = 20000;
    try {
      await getElementByText('Activate physical card', timeout);
    } catch {
      await this.deactivateCard(appPassCode, cardPassCode);
      await getElementByText('Activate physical card', timeout);
    }
  }

  async deactivateCard(appPassCode: string, cardPassCode: string) {
    await this.goToDamagedLostCard(appPassCode);
    waitFor(await getElementByText('Choose a PIN for your new card.')).toBeVisible();
    await (await getElementById('pin-hidden-input')).typeText(cardPassCode);

    waitFor(await getElementByText('Repeat your PIN.')).toBeVisible();

    await element(by.id('pin-hidden-input').withAncestor(by.id('repeated-pin-input-wrapper'))).typeText(cardPassCode);

    await waitFor(await getElementByText('Your card is on the way!'))
      .toBeVisible()
      .withTimeout(5000);
    await (await getElementByText('Done')).tap();
  }
}
