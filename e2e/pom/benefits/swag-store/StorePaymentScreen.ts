import type { Direction } from 'detox/detox';
import { getElementById, getElementByText, sleep } from '../../../utils/common-actions';
import { BaseScreen } from '../../BaseScreen';

export class StorePaymentScreen extends BaseScreen {
  async goToOnlineTab() {
    await (await getElementById('benefits-online')).tap();
  }

  async findTestProduct() {
    await (await getElementById('online-tab-v2')).swipe('up');
    await this.scrollToGiftCard('E2E Test Product', 'gift-cards-list', 'right');
    await (await getElementByText('E2E Test Product')).tap();
  }

  async findTestProductUK() {
    await sleep(2000);

    await this.scrollToGiftCard('Prezzee', 'online-tab-giftcard-search-listview', 'down');
    await (await getElementByText('Prezzee')).tap();
  }

  async findTestProductNZ() {
    await sleep(2000);
    await (await getElementByText('Cue')).tap();
  }

  async increaseQuantity(numberOfTimes = 1) {
    const addQuantityButton = await getElementById('add-quantity-button');
    for (let i = 0; i < numberOfTimes; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await addQuantityButton.tap();
    }
  }

  async fillInStripePaymentSheet() {
    // do not edit
    await waitFor(element(by.label('Card number').and(by.type('UITextField'))))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.label('Card number').and(by.type('UITextField'))).typeText('4000000000003220');
    await element(by.label('expiration date').and(by.type('UITextField'))).typeText('12/25');
    await element(by.label('CVC').and(by.type('UITextField'))).typeText('123');
    try {
      await element(by.label('ZIP').and(by.type('UITextField'))).typeText('12345');
    } catch {
      console.log(`Element ZIP is not visible. Continuing execution...`);
    }
    await element(by.type('_TtCC18StripePaymentSheet13ConfirmButton9BuyButton')).tap();
  }

  async clickBuyAndEnterCardDetails() {
    await (await getElementById('buy-button')).tap();
    await this.fillInStripePaymentSheet();
    await (await getElementByText('Complete Authentication')).tap();
  }

  async adjustHeroPointsSlider(position: number) {
    const sliderItem = await getElementById('hero-point-slider');
    await sliderItem.longPressAndDrag(1000, NaN, NaN, sliderItem, position, NaN, 'slow', 0);
  }

  async accessGiftCardInSearchAll() {
    await (await getElementById('search-box')).tap();
    await (await getElementById('giftcard')).tap();
  }

  async scrollToGiftCard(name: string, parentId: string, direction: Direction) {
    await waitFor(element(by.text(name)))
      .toBeVisible()
      .whileElement(by.id(parentId))
      .scroll(200, direction, 0.5, 0.5);
  }

  async assertColesGiftCard() {
    await (await getElementByText('Coles Gift Card')).tap();
    await expect(await getElementByText('Coles Gift Card')).toBeVisible();
    await (await getElementById('product-detail-screen')).scroll(500, 'down', NaN, 0.5);
    await expect(await getElementByText('Description')).toBeVisible();
    await expect(await getElementByText('How it works')).toBeVisible();
  }

  async assertJBHifiGiftCard() {
    await (await getElementByText('JB Hi-Fi Gift Card')).tap();
    await expect(await getElementByText('JB Hi-Fi Gift Card')).toBeVisible();
    await (await getElementById('product-detail-screen')).scroll(500, 'down', NaN, 0.5);
    await expect(await getElementByText('Description')).toBeVisible();
    await expect(await getElementByText('How it works')).toBeVisible();
  }

  async assertUberGiftCard() {
    await (await getElementByText('UBER')).tap();
    await expect(await getElementByText('UBER')).toBeVisible();
    await (await getElementById('product-detail-screen')).scroll(500, 'down', NaN, 0.5);
    await expect(await getElementByText('Description')).toBeVisible();
    await expect(await getElementByText('How it works')).toBeVisible();
  }
}
