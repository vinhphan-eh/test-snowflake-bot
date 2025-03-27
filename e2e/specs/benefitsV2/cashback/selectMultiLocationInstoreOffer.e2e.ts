import { benefitsTestAccount } from '../../../data/personal-info';
import { AuthScreen } from '../../../pom/auth/AuthScreen';
import { InStoreOfferDetailsV2Screen } from '../../../pom/benefits/cashback/InStoreOfferDetailsV2Screen';
import { SearchInstoreCashback } from '../../../pom/benefitsV2/searchOffers/SearchInstoreCashback';
import { SearchOffersScreen } from '../../../pom/benefitsV2/searchOffers/SearchOffers';
import { backToBenefitsPillar, getElementById, getElementByText } from '../../../utils/common-actions';

describe('Select Instore Offer - Multi location', () => {
  let authScreen: AuthScreen;
  let searchOffersScreen: SearchOffersScreen;
  let searchInstoreCashbackScreen: SearchInstoreCashback;
  let inStoreOfferDetailsV2Screen: InStoreOfferDetailsV2Screen;

  const setup = async (permissions: Detox.DevicePermissions) => {
    await device.launchApp({
      permissions,
    });
    await device.setURLBlacklist(['.*swag-personal-bff.staging-ehfintech.*', '.*ebf-bff-mobile.staging-ehfintech.*']);

    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      pillar: 'benefits',
    });
  };

  beforeAll(async () => {
    authScreen = new AuthScreen();
    searchOffersScreen = new SearchOffersScreen();
    searchInstoreCashbackScreen = new SearchInstoreCashback();
    inStoreOfferDetailsV2Screen = new InStoreOfferDetailsV2Screen();
    await setup({
      location: 'always',
    });
  });

  beforeEach(async () => {
    await backToBenefitsPillar('benefits-home');
    await (await getElementById('search-box')).tap();
  });

  afterAll(async () => {
    await device.terminateApp();
  });

  it('should display merchant with various offers', async () => {
    await searchOffersScreen.openInstoreCashback();
    await searchInstoreCashbackScreen.searchLocation('Sussex Street, Sydney NSW, Australia');
    await searchInstoreCashbackScreen.expectMerchantWithVariousOffers(5);
    await (await searchInstoreCashbackScreen.getItem(5)).tap();
    await getElementByText('2 exclusive offers');
  });

  it('should display merchant with many locations', async () => {
    await (await searchOffersScreen.getInstoreCashbackItem(0)).tap();
    await getElementById('nearby-location-item-0');
    await getElementById('nearby-location-item-1');
    await getElementById('nearby-location-item-2');
    await (await inStoreOfferDetailsV2Screen.getViewAllStoresButton()).tap();
    await getElementById('all-nearby-locations');
  });
});
