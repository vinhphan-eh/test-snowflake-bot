import { expect } from 'detox';
import { benefitsTestAccount } from '../../data/personal-info';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { InStoreOfferDetailsV2Screen } from '../../pom/benefits/cashback/InStoreOfferDetailsV2Screen';
import { InstoreTab } from '../../pom/benefitsV2/InstoreTab';
import { getElementById, getElementByText, sleep } from '../../utils/common-actions';
import { buildDeeplink } from '../../utils/utils';

describe('Benefits V2 deep link', () => {
  let authScreen: AuthScreen;
  let instoreTab: InstoreTab;
  let inStoreOfferDetailsV2Screen: InStoreOfferDetailsV2Screen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    instoreTab = new InstoreTab();
    inStoreOfferDetailsV2Screen = new InStoreOfferDetailsV2Screen();
  });

  beforeEach(async () => {
    await device.launchApp({
      permissions: {
        location: 'always',
      },
    });
    await device.setURLBlacklist([
      '.*swag-personal-bff.staging-ehfintech.*',
      '.*ebf-bff-mobile.staging-ehfintech.*',
      '.*marketplace-service.cdn.*',
    ]);
  });

  afterEach(async () => {
    await device.terminateApp();
  });
  it('should work correctly for bill detail screen', async () => {
    const deeplink = buildDeeplink('platform_redirect/benefits/bill-management/offers/1');
    await sleep(5000);
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      deeplink,
    });
    await expect(await getElementByText('Electricity & Gas')).toBeVisible();
  });

  it('should work correctly for online cashback offer details', async () => {
    const deeplink = buildDeeplink('platform_redirect/benefits/cashback-offers/919901');
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      deeplink,
    });
    await expect(await getElementByText('Online offer')).toBeVisible();
    await expect(await getElementByText('How this Online offer works')).toBeVisible();
  });

  it('should work correctly for in-store tab without postcode', async () => {
    const deeplink = buildDeeplink('platform_redirect/benefits/cashback-instore-offers');
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      deeplink,
    });
    await instoreTab.openNearByDrawer();
  });

  it('should work correctly for in-store tab with postcode provided', async () => {
    const deeplink = buildDeeplink('platform_redirect/benefits/cashback-instore-offers/postcode/2026/region/AU');
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      deeplink,
    });
    await instoreTab.openNearByDrawer();
    await expect(await getElementByText('North Bondi NSW 2026, Australia')).toBeVisible();
  });

  it('should work correctly for in-store offer details', async () => {
    const deeplink = buildDeeplink('platform_redirect/benefits/cashback-instore-offers/919647_927831');
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      deeplink,
    });
    await inStoreOfferDetailsV2Screen.getScreen();
  });

  it('should work correctly for search all offers screen', async () => {
    const deeplink = buildDeeplink('platform_redirect/benefits/cashback-offers');
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      deeplink,
    });
    await expect(await getElementById('bill-carousel')).toBeVisible();
    await expect(await getElementById('online-cashback-carousel')).toBeVisible();
  });

  it('should work correctly for search gift-cards screen', async () => {
    const deeplink = buildDeeplink('platform_redirect/benefits/store-products');
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      deeplink,
    });
    await expect(await getElementById('vertical-giftcard-product-list')).toBeVisible();
  });

  it('should work correctly for gift-cards detail screen', async () => {
    const deeplink = buildDeeplink('platform_redirect/benefits/store-products/jb-hi-fi-gift-card');
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      deeplink,
    });
    await expect(await getElementByText('Payment details')).toBeVisible();
    await waitFor(element(by.text('Description')))
      .toBeVisible()
      .whileElement(by.id('product-detail-screen'))
      .scroll(75, 'down', 0.5, 0.5);
  });

  it('should work correctly for search bills screen', async () => {
    const deeplink = buildDeeplink('platform_redirect/benefits/bill-management/offers');
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      deeplink,
    });
    await expect(await getElementById('bill-carousel')).toBeVisible();
  });

  it.skip('should work correctly for cashback subtab in purchases tab', async () => {
    const deeplink = buildDeeplink('platform_redirect/benefits/cashback-transactions');
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      deeplink,
    });
    await expect(await getElementByText('Lifetime cashback')).toBeVisible();
  });

  it('should work correctly for benefits home screen', async () => {
    const deeplink = buildDeeplink('platform_redirect/benefits/home');
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      deeplink,
    });
    await expect(await getElementById('benefits-home-screen-v2')).toBeVisible();
  });
});
