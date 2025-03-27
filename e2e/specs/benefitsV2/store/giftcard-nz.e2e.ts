import { expect } from 'detox';
import { benefitsTestAccount } from '../../../data/personal-info';
import { AuthScreen } from '../../../pom/auth/AuthScreen';
import { StorePaymentScreen } from '../../../pom/benefits/swag-store/StorePaymentScreen';
import { backToBenefitsPillar, getElementByText } from '../../../utils/common-actions';
import { itIos } from '../../../utils/jest-wrapper';

describe('Giftcard NZ', () => {
  let authScreen: AuthScreen;
  let storePayment: StorePaymentScreen;

  describe('EH account with no HP', () => {
    beforeAll(async () => {
      authScreen = new AuthScreen();
      storePayment = new StorePaymentScreen();
      await device.launchApp();
      await authScreen.loginWith(
        benefitsTestAccount.benefitsIaV2NZ.email,
        benefitsTestAccount.benefitsIaV2NZ.password,
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
      await storePayment.findTestProductNZ();
      await storePayment.clickBuyAndEnterCardDetails();
      await expect(await getElementByText('Your order has been processed', 15000)).toBeVisible();
    });
  });
});
