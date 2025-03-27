import { expect } from 'detox';
import { benefitsTestAccount } from '../../data/personal-info';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { BenefitsTopTabScreen } from '../../pom/benefits/BenefitsTopTabScreen';
import { getElementById, getElementByText } from '../../utils/common-actions';

describe('Benefits Home Tabs', () => {
  let authScreen: AuthScreen;
  let benefitsTopTab: BenefitsTopTabScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    benefitsTopTab = new BenefitsTopTabScreen();
  });

  beforeEach(async () => {
    await device.launchApp({
      permissions: {
        location: 'always',
      },
    });
    await device.setURLBlacklist(['.*swag-personal-bff.staging-ehfintech.*', '.*ebf-bff-mobile.staging-ehfintech.*']);
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('should work correctly for new user', async () => {
    await authScreen.loginWith(
      benefitsTestAccount.benefitsIaV2NewAcc.email,
      benefitsTestAccount.benefitsIaV2NewAcc.password,
      {
        pillar: 'benefits',
      }
    );

    // go to general search screen after tapping on search bar
    await (await getElementById('search-box')).tap();
    await expect(await getElementById('bill-carousel')).toBeVisible();
    await expect(await getElementById('online-cashback-carousel')).toBeVisible();

    await (await getElementById('back-btn')).tap();

    // go to search bills category after tapping bill category tile
    await (await getElementById('Bills')).tap();
    await expect(await getElementById('bill-carousel')).toBeVisible();

    await (await getElementById('back-btn')).tap();

    await waitFor(element(by.id('bill-promoted-entry-point')))
      .toBeVisible()
      .whileElement(by.id('benefits-home-screen-v2'))
      .scroll(75, 'down', 0.5, 0.5);
  });

  it('should work correctly for existing user', async () => {
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      pillar: 'benefits',
    });

    // go to manage cards screen after tapping link a card tile
    await (await getElementById('promote-feature-widgets-list')).scrollTo('right');
    await (await getElementByText('Link a card, start earning cashback')).tap();
    await expect(await getElementByText('Your enrolled cards')).toBeVisible();

    await benefitsTopTab.tapOnBackButton();

    // go to group detail after tapping on group tile
    await waitFor(element(by.id('megadeal-group-item-0')))
      .toBeVisible()
      .whileElement(by.id('benefits-home-screen-v2'))
      .scroll(100, 'down', 0.5, 0.5);
    await (await getElementById('megadeal-group-item-0')).tap();
    await expect(await getElementByText('Join Group')).toBeVisible();

    await (await getElementById('topbar-back-icon')).tap();

    await waitFor(element(by.id('buy-again-shop-item-1')))
      .toBeVisible()
      .whileElement(by.id('benefits-home-screen-v2'))
      .scroll(100, 'down', 0.5, 0.5);

    await (await getElementById('buy-again-shop-item-1')).tap();
    await expect(await getElementById('buy-button')).toBeVisible();
  });

  it('does not show giftcard related for candidate', async () => {
    await authScreen.loginWith(
      benefitsTestAccount.candidateAccount.email,
      benefitsTestAccount.candidateAccount.password,
      {
        pillar: 'benefits',
      }
    );

    await (await getElementById('benefits-home-screen-v2')).scrollTo('bottom');
    await waitFor(element(by.text('Buy again')))
      .not.toBeVisible()
      .withTimeout(5000);
  });

  it('does not show giftcard related for workzone', async () => {
    await authScreen.loginWith(
      benefitsTestAccount.workzoneAccount.email,
      benefitsTestAccount.workzoneAccount.password,
      {
        pillar: 'benefits',
        isKeyPay: true,
      }
    );

    await (await getElementById('benefits-home-screen-v2')).scrollTo('bottom');
    await waitFor(element(by.text('Buy again')))
      .not.toBeVisible()
      .withTimeout(5000);
  });

  it('does not show giftcard related for terminated', async () => {
    await authScreen.loginWith(
      benefitsTestAccount.terminatedWithPurchaseHistory.email,
      benefitsTestAccount.terminatedWithPurchaseHistory.password,
      {
        pillar: 'benefits',
      }
    );

    await (await getElementById('benefits-home-screen-v2')).scrollTo('bottom');
    await waitFor(element(by.text('Buy again')))
      .not.toBeVisible()
      .withTimeout(5000);
  });
});
