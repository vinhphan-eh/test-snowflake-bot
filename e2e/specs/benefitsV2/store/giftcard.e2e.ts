import { expect } from 'detox';
import { benefitsTestAccount } from '../../../data/personal-info';
import { AuthScreen } from '../../../pom/auth/AuthScreen';
import { StorePaymentScreen } from '../../../pom/benefits/swag-store/StorePaymentScreen';
import { backToBenefitsPillar, getElementById, getElementByText, sleep } from '../../../utils/common-actions';
import { itIos } from '../../../utils/jest-wrapper';

describe('Giftcard', () => {
  let authScreen: AuthScreen;
  let storePayment: StorePaymentScreen;

  describe('Eh account with HP', () => {
    beforeAll(async () => {
      authScreen = new AuthScreen();
      storePayment = new StorePaymentScreen();
      await device.launchApp();
      await authScreen.loginWith(
        benefitsTestAccount.withHeroPoints.email,
        benefitsTestAccount.withHeroPoints.password,
        {
          pillar: 'benefits',
        }
      );
    });

    beforeEach(async () => {
      await backToBenefitsPillar('benefits-online');
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    it('pay with hero points', async () => {
      await storePayment.findTestProduct();
      await (await getElementById('buy-button')).tap();

      await expect(await getElementByText('Your order has been processed', 15000)).toBeVisible();
    });

    it('pay with hero points after adjusing quantity', async () => {
      await storePayment.findTestProduct();
      await expect(await getElementByText('Pay 42 PTS')).toBeVisible();
      await storePayment.increaseQuantity(1);
      // quantity 2, expected it reset HP slider to full amount which is 88
      await expect(await getElementByText('Pay 84 PTS')).toBeVisible();
      await (await getElementById('buy-button')).tap();
      await expect(await getElementByText('Your order has been processed', 15000)).toBeVisible();
    });

    // can't perform card payment on android
    // detail in https://github.com/stripe/stripe-react-native/issues/1326
    itIos('pay with credit card and hero points', async () => {
      await storePayment.findTestProduct();
      await storePayment.adjustHeroPointsSlider(0.1);
      await storePayment.clickBuyAndEnterCardDetails();
      await expect(await getElementByText('Your order has been processed', 15000)).toBeVisible();
    });

    // can't perform card payment on android
    // detail in https://github.com/stripe/stripe-react-native/issues/1326
    itIos('pay with credit card and hero points after adjusting quantity', async () => {
      await storePayment.findTestProduct();
      await storePayment.adjustHeroPointsSlider(0.1);
      await storePayment.increaseQuantity(1);
      // quantity 2, expected it reset HP slider to full amount which is 88, and credit card is 0
      await expect(await getElementByText('Pay 84 PTS')).toBeVisible();
      await storePayment.adjustHeroPointsSlider(0.1);
      await storePayment.clickBuyAndEnterCardDetails();
      await expect(await getElementByText('Your order has been processed', 15000)).toBeVisible();
    });
  });

  describe('EH account with no HP', () => {
    beforeAll(async () => {
      authScreen = new AuthScreen();
      storePayment = new StorePaymentScreen();
      await device.launchApp();
      await authScreen.loginWith(
        benefitsTestAccount.benefitsIaV2NoHp.email,
        benefitsTestAccount.benefitsIaV2NoHp.password,
        {
          pillar: 'benefits',
        }
      );
    });

    beforeEach(async () => {
      await backToBenefitsPillar('benefits-home');
    });

    afterAll(async () => {
      await device.terminateApp();
    });
    // can't perform card payment on android
    // detail in https://github.com/stripe/stripe-react-native/issues/1326
    itIos('pay with credit card', async () => {
      await storePayment.goToOnlineTab();
      await storePayment.findTestProduct();
      await storePayment.clickBuyAndEnterCardDetails();
      await expect(await getElementByText('Your order has been processed', 15000)).toBeVisible();
    });

    itIos('pay with credit card after adjusting quantity', async () => {
      await storePayment.goToOnlineTab();
      await storePayment.findTestProduct();
      await expect(await getElementByText('Pay $2.03')).toBeVisible();
      await storePayment.increaseQuantity(1);
      await expect(await getElementByText('Pay $4.06')).toBeVisible();

      await storePayment.clickBuyAndEnterCardDetails();
      await expect(await getElementByText('Your order has been processed', 15000)).toBeVisible();
    });

    it('display correct giftcard detail in search all', async () => {
      await storePayment.accessGiftCardInSearchAll();
      await sleep(2000);
      await storePayment.assertColesGiftCard();
      await (await getElementById('topbar-back-icon')).tap();
      await storePayment.scrollToGiftCard('JB Hi-Fi Gift Card', 'vertical-giftcard-product-list-listview', 'down');
      await storePayment.assertJBHifiGiftCard();
    });

    it('display correct giftcard detail in giftcard carousel', async () => {
      await storePayment.goToOnlineTab();
      await (await getElementById('online-tab-v2')).scrollTo('bottom');
      await storePayment.scrollToGiftCard('Coles Gift Card', 'gift-cards-list', 'right');
      await storePayment.assertColesGiftCard();
      await (await getElementById('topbar-back-icon')).tap();
      await storePayment.scrollToGiftCard('UBER', 'gift-cards-list', 'right');
      await storePayment.assertUberGiftCard();
    });

    it('display correct giftcard detail in giftcard search screen', async () => {
      await storePayment.goToOnlineTab();
      await (await getElementById('online-tab-v2')).scrollTo('bottom');
      await (await getElementById('gift-cards-header-icon')).tap();
      await storePayment.assertColesGiftCard();
      await (await getElementById('topbar-back-icon')).tap();
      await storePayment.scrollToGiftCard('JB Hi-Fi Gift Card', 'giftcard-search-screen-listview', 'down');
      await storePayment.assertJBHifiGiftCard();
    });
  });
});
