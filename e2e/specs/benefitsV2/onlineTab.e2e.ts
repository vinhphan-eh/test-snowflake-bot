import { expect } from 'detox';
import { benefitsTestAccount } from '../../data/personal-info';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { getElementById, getElementByText } from '../../utils/common-actions';

describe('Online tab', () => {
  let authScreen: AuthScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
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

  it('should work correctly for UK account', async () => {
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2UK.email, benefitsTestAccount.benefitsIaV2UK.password, {
      pillar: 'benefits',
    });
    await expect(await getElementById('online-tab-giftcard-search')).toBeVisible();

    // search gift card
    await (await getElementById('search-bar-container')).tap();
    await (await getElementById('search-bar')).typeText('uber');

    // go to gift card detail
    await (await getElementById('gift-card-item-0')).tap();
    await (await getElementById('product-detail-screen')).scroll(500, 'down', NaN, 0.5);
    await expect(await getElementByText('Description')).toBeVisible();
    await expect(await getElementByText('How it works')).toBeVisible();

    await (await getElementById('topbar-back-icon')).tap();

    // empty screen
    await (await getElementById('search-bar-container')).tap();
    await (await getElementById('search-bar')).typeText('Empty');
    await expect(await getElementByText('No results found!')).toBeVisible();
  });

  it('should work correctly for NZ account', async () => {
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2NZ.email, benefitsTestAccount.benefitsIaV2NZ.password, {
      pillar: 'benefits',
    });
    await expect(await getElementById('online-tab-giftcard-search')).toBeVisible();

    // search gift card
    await (await getElementById('search-bar-container')).tap();
    await (await getElementById('search-bar')).typeText('cue');

    // go to gift card detail
    await (await getElementById('gift-card-item-0')).tap();
    await (await getElementById('product-detail-screen')).scroll(500, 'down', NaN, 0.5);
    await expect(await getElementByText('Description')).toBeVisible();
    await expect(await getElementByText('How it works')).toBeVisible();

    await (await getElementById('topbar-back-icon')).tap();

    // empty screen
    await (await getElementById('search-bar-container')).tap();
    await (await getElementById('search-bar')).typeText('Empty');
    await expect(await getElementByText('No results found!')).toBeVisible();
  });

  it('should work correctly for AU account', async () => {
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      pillar: 'benefits',
    });

    // go to general search screen after tapping on search bar
    await (await getElementById('benefits-online')).tap();

    await (await getElementById('search-box')).tap();
    await expect(await getElementById('online-cashback-carousel')).toBeVisible();

    await (await getElementById('back-btn')).tap();

    await expect(await getElementByText('Enjoy up to 12 weeks free!')).toBeVisible();

    await waitFor(element(by.id('featured-offers-header-icon')))
      .toBeVisible()
      .whileElement(by.id('online-tab-v2'))
      .scroll(75, 'down', 0.5, 0.5);

    await (await getElementById('featured-offers-header-icon')).tap();

    await expect(await getElementById('featured-offers-search-screen')).toBeVisible();
    await (await getElementById('topbar-back-icon')).tap();

    await waitFor(element(by.id('gift-cards')))
      .toBeVisible()
      .whileElement(by.id('online-tab-v2'))
      .scroll(75, 'down', 0.5, 0.5);
    await (await getElementById('gift-cards-header-icon')).tap();
    await expect(await getElementById('giftcard-search-screen')).toBeVisible();
  });

  it('should show group, bills, cashback for candidate', async () => {
    await authScreen.loginWith(
      benefitsTestAccount.candidateAccount.email,
      benefitsTestAccount.candidateAccount.password,
      {
        pillar: 'benefits',
      }
    );
    await (await getElementById('benefits-online')).tap();

    await expect(await getElementById('bill-carousel')).toBeVisible();

    await expect(await getElementById('featured-offers-header-icon')).toBeVisible();

    await (await getElementById('online-tab-v2')).scrollTo('bottom');

    await expect(await getElementById('group-list')).toBeVisible();
    await waitFor(element(by.id('gift-cards')))
      .not.toBeVisible()
      .withTimeout(5000);
  });

  it('should show group, bills, cashback for workzone', async () => {
    await authScreen.loginWith(
      benefitsTestAccount.workzoneAccount.email,
      benefitsTestAccount.workzoneAccount.password,
      {
        pillar: 'benefits',
        isKeyPay: true,
      }
    );
    await (await getElementById('benefits-online')).tap();

    await expect(await getElementById('bill-carousel')).toBeVisible();

    await expect(await getElementById('featured-offers-header-icon')).toBeVisible();

    await (await getElementById('online-tab-v2')).scrollTo('bottom');

    await expect(await getElementById('group-list')).toBeVisible();
    await waitFor(element(by.id('gift-cards')))
      .not.toBeVisible()
      .withTimeout(5000);
  });

  it('should show group, cashback for terminated', async () => {
    await authScreen.loginWith(
      benefitsTestAccount.terminatedWithPurchaseHistory.email,
      benefitsTestAccount.terminatedWithPurchaseHistory.password,
      {
        pillar: 'benefits',
      }
    );
    await (await getElementById('benefits-online')).tap();

    await waitFor(element(by.id('bill-carousel')))
      .not.toBeVisible()
      .withTimeout(5000);

    await expect(await getElementById('featured-offers-header-icon')).toBeVisible();

    await (await getElementById('online-tab-v2')).scrollTo('bottom');

    await expect(await getElementById('group-list')).toBeVisible();
    await waitFor(element(by.id('gift-cards')))
      .not.toBeVisible()
      .withTimeout(5000);
  });
});
