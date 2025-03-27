import { expect } from 'detox';
import { benefitsTestAccount } from '../../../data/personal-info';
import { AuthScreen } from '../../../pom/auth/AuthScreen';
import { StorePaymentScreen } from '../../../pom/benefits/swag-store/StorePaymentScreen';
import {
  backToBenefitsPillar,
  backToMoneyPillar,
  getElementById,
  getElementByText,
  getElementByTextWithIndex,
} from '../../../utils/common-actions';
import { itIos } from '../../../utils/jest-wrapper';

describe('Giftcard UK', () => {
  let authScreen: AuthScreen;
  let storePayment: StorePaymentScreen;

  describe('Eh account with HP', () => {
    beforeAll(async () => {
      authScreen = new AuthScreen();
      storePayment = new StorePaymentScreen();
      await device.launchApp();
      await authScreen.loginWith(benefitsTestAccount.UkWithHP.email, benefitsTestAccount.UkWithHP.password, {
        pillar: 'benefits',
      });
    });

    beforeEach(async () => {
      await backToBenefitsPillar('benefits-online');
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    it('pay with hero points', async () => {
      await storePayment.findTestProductUK();
      await (await getElementById('buy-button')).tap();

      await expect(await getElementByText('Your order has been processed', 15000)).toBeVisible();
      await backToMoneyPillar();

      await (await getElementByTextWithIndex({ value: 'Swag Store' })).tap();

      await expect(await getElementByText('You spent')).toBeVisible();
    });

    // skip to wait for giftcards which can be used in the test
    it.skip('pay with hero points after adjusing quantity', async () => {
      await storePayment.findTestProductUK();
      await expect(await getElementByText('Pay 103 PTS')).toBeVisible();
      await storePayment.increaseQuantity(1);
      // quantity 2, expected it reset HP slider to full amount which is 88
      await expect(await getElementByText('Pay 206 PTS')).toBeVisible();
      await (await getElementById('buy-button')).tap();
      await expect(await getElementByText('Your order has been processed', 15000)).toBeVisible();
    });

    // can't perform card payment on android
    // detail in https://github.com/stripe/stripe-react-native/issues/1326
    itIos('pay with credit card and hero points', async () => {
      await storePayment.findTestProductUK();
      await storePayment.adjustHeroPointsSlider(0.1);
      await storePayment.clickBuyAndEnterCardDetails();
      await expect(await getElementByText('Your order has been processed', 15000)).toBeVisible();
    });

    // can't perform card payment on android
    // detail in https://github.com/stripe/stripe-react-native/issues/1326
    // skip to wait for giftcards which can be used in the test
    it.skip('pay with credit card and hero points after adjusting quantity', async () => {
      await storePayment.findTestProductUK();
      await storePayment.adjustHeroPointsSlider(0.1);
      await storePayment.increaseQuantity(1);
      // quantity 2, expected it reset HP slider to full amount which is 88, and credit card is 0
      await expect(await getElementByText('Pay 206 PTS')).toBeVisible();
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
        benefitsTestAccount.benefitsIaV2UK.email,
        benefitsTestAccount.benefitsIaV2UK.password,
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
    // can't perform card payment on android
    // detail in https://github.com/stripe/stripe-react-native/issues/1326
    itIos('pay with credit card', async () => {
      await storePayment.goToOnlineTab();
      await storePayment.findTestProductUK();
      await storePayment.clickBuyAndEnterCardDetails();
      await expect(await getElementByText('Your order has been processed', 15000)).toBeVisible();
    });

    // skip to wait for giftcards which can be used in the test
    it.skip('pay with credit card after adjusting quantity', async () => {
      await storePayment.goToOnlineTab();
      await storePayment.findTestProductUK();
      await expect(await getElementByText('Pay £4.70')).toBeVisible();
      await storePayment.increaseQuantity(1);
      await expect(await getElementByText('Pay £9.40')).toBeVisible();

      await storePayment.clickBuyAndEnterCardDetails();
      await expect(await getElementByText('Your order has been processed', 15000)).toBeVisible();
    });
  });
});
