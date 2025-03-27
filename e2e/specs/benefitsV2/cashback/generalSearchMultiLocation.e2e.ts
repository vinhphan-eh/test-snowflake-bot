import { expect } from 'detox';
import { benefitsTestAccount } from '../../../data/personal-info';
import { AuthScreen } from '../../../pom/auth/AuthScreen';
import { InStoreOfferDetailsV2Screen } from '../../../pom/benefits/cashback/InStoreOfferDetailsV2Screen';
import { InstoreTab } from '../../../pom/benefitsV2/InstoreTab';
import { SearchInstoreCashback } from '../../../pom/benefitsV2/searchOffers/SearchInstoreCashback';
import { SearchOffersScreen } from '../../../pom/benefitsV2/searchOffers/SearchOffers';
import { backToBenefitsPillar, getElementById, getElementByText } from '../../../utils/common-actions';
import { itIos } from '../../../utils/jest-wrapper';

describe('Benefits General Search - Multi location', () => {
  let authScreen: AuthScreen;
  let searchOffersScreen: SearchOffersScreen;
  let searchInstoreCashbackScreen: SearchInstoreCashback;
  let inStoreOfferDetailsV2Screen: InStoreOfferDetailsV2Screen;
  let instoreTab: InstoreTab;

  const setup = async (permissions: Detox.DevicePermissions) => {
    await device.launchApp({
      permissions,
    });
    await device.setURLBlacklist(['.*swag-personal-bff.staging-ehfintech.*', '.*ebf-bff-mobile.staging-ehfintech.*']);

    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      pillar: 'benefits',
    });
  };

  describe('With location permission', () => {
    beforeAll(async () => {
      authScreen = new AuthScreen();
      searchOffersScreen = new SearchOffersScreen();
      searchInstoreCashbackScreen = new SearchInstoreCashback();
      inStoreOfferDetailsV2Screen = new InStoreOfferDetailsV2Screen();
      instoreTab = new InstoreTab();

      await setup({
        location: 'always',
      });
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    describe('Online Cashback', () => {
      beforeEach(async () => {
        await device.setLocation(-37.8394047, 144.978661); // 24-88 Commercial Rd, South Yarra VIC 3141, Australia
        await backToBenefitsPillar('benefits-home');
        await (await getElementById('search-box')).tap();
      });

      itIos('should handle changing location correctly', async () => {
        await searchOffersScreen.searchLocation('Sydney Road, Campbellfield Victoria, Australia');
        await searchOffersScreen.checkSelectedLocation('Campbellfield VIC 3061');
        await expect(await searchOffersScreen.getInstoreCashbackItem(0)).toBeVisible();

        await searchOffersScreen.openInstoreCashback();
        await searchInstoreCashbackScreen.getScreen();
        await searchInstoreCashbackScreen.checkSelectedLocation('Campbellfield VIC 3061');

        await (await searchInstoreCashbackScreen.getItem(0)).tap();

        await inStoreOfferDetailsV2Screen.getScreen();
        await inStoreOfferDetailsV2Screen.checkSelectedLocation('Campbellfield VIC 3061');
      });

      itIos('should show nearest store correctly in case no store found in range of 20km', async () => {
        await searchOffersScreen.searchLocation('1 Hùng Vương, Điện Biên, Ba Đình, Hà Nội, Vietnam');

        await (await getElementByText('No store found near this location, try Clarkson WA 6030')).tap();

        await searchOffersScreen.checkSelectedLocation('Clarkson WA 6030');
      });
    });

    describe('In-store cashback', () => {
      beforeEach(async () => {
        await backToBenefitsPillar('benefits-home');
        await (await getElementById('search-box')).tap();
        await searchOffersScreen.openInstoreCashback();
      });

      itIos('should presrve location and filters when clicking map button', async () => {
        await searchInstoreCashbackScreen.searchLocation('Sydney Road, Campbellfield Victoria, Australia');
        await searchInstoreCashbackScreen.switchTab('fashion');
        await searchInstoreCashbackScreen.searchText('Forever\n');
        await (await searchInstoreCashbackScreen.getShowMapViewButton()).tap();
        await instoreTab.getScreen();
        await (await instoreTab.getActivatedFilterButton()).tap();
        await (await instoreTab.getSelectedCategory('fashion')).tap();
        await expect(await instoreTab.getSearchBar()).toHaveText('Forever');
      });
    });
  });

  describe('Without location permission', () => {
    beforeAll(async () => {
      authScreen = new AuthScreen();
      searchOffersScreen = new SearchOffersScreen();
      searchInstoreCashbackScreen = new SearchInstoreCashback();
      inStoreOfferDetailsV2Screen = new InStoreOfferDetailsV2Screen();
      instoreTab = new InstoreTab();

      await setup({
        location: 'never',
      });
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    beforeEach(async () => {
      await backToBenefitsPillar('benefits-home');
      await (await getElementById('search-box')).tap();
    });

    itIos('should set use a default location if user no location permission provided', async () => {
      await searchOffersScreen.checkSelectedLocation('Sydney NSW 2000');
    });
  });
});
