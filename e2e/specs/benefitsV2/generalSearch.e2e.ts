import { expect } from 'detox';
import { benefitsTestAccount } from '../../data/personal-info';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { SearchOffersScreen } from '../../pom/benefitsV2/searchOffers/SearchOffers';
import { getElementById, getElementByText } from '../../utils/common-actions';

describe('Benefits General Search', () => {
  let authScreen: AuthScreen;
  let searchOffersScreen: SearchOffersScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    searchOffersScreen = new SearchOffersScreen();
  });

  beforeEach(async () => {
    await device.launchApp({
      permissions: {
        location: 'always',
      },
    });
    await device.setURLBlacklist(['.*swag-personal-bff.staging-ehfintech.*']);
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('should work correctly', async () => {
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      pillar: 'benefits',
    });

    await (await getElementById('search-box')).tap();

    await expect(await getElementById('bill-carousel')).toBeVisible();
    await expect(await getElementById('online-cashback-carousel')).toBeVisible();

    // search for products that only appears in online cashback
    await searchOffersScreen.searchText('Puma\n');
    await expect(await getElementById('vertical-online-product-list')).toBeVisible();

    // go to product detail
    await (await getElementById('online-offer-0')).tap();
    await expect(await getElementByText('Online offer')).toBeVisible();
    await (await getElementById('topbar-back-icon')).tap();

    // clear search box
    await searchOffersScreen.clearText();

    // search for product
    await searchOffersScreen.searchText('Pu');
    await expect(await getElementById('online-cashback-carousel')).toBeVisible();

    // go to search online cashback screen
    await (await getElementById('online-cashback-carousel-header-icon')).tap();
    await expect(await getElementById('online-search-screen')).toBeVisible();

    await (await getElementById('back-btn')).tap();

    // go to product detail
    await (await getElementById('cashback-item-0')).tap();
    await expect(await getElementByText('Online offer')).toBeVisible();
    await (await getElementById('topbar-back-icon')).tap();

    // clear search box
    await searchOffersScreen.clearText();
    await searchOffersScreen.searchText('\n'); // Hide the keyboard

    // change category
    await searchOffersScreen.selectCategory('travel');
    // this category has online online offers
    await expect(await getElementById('vertical-online-product-list')).toBeVisible();
  });
});
