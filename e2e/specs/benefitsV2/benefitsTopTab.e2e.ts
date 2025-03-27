import { expect } from 'detox';
import { benefitsTestAccount } from '../../data/personal-info';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { backToBenefitsPillar, checkIfNotVisible, getElementById, getElementByText } from '../../utils/common-actions';

const checkIAV2Tabs = async () => {
  const tabs = ['benefits-home', 'benefits-online', 'benefits-instore', 'benefits-purchases']; // IAv2

  // eslint-disable-next-line no-restricted-syntax
  for (const tab of tabs) {
    // eslint-disable-next-line no-await-in-loop
    await expect(await getElementById(tab)).toBeVisible();
  }
  await (await getElementById('benefits-online')).swipe('left', 'slow');
  await expect(await getElementById('benefits-settings')).toBeVisible();
};

describe('Benefits Top Tabs', () => {
  let authScreen: AuthScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    await device.setURLBlacklist(['.*swag-personal-bff.staging-ehfintech.*', '.*ebf-bff-mobile.staging-ehfintech.*']);
  });

  describe('UK account', () => {
    beforeAll(async () => {
      await device.launchApp({
        permissions: {
          location: 'always',
        },
      });
      await authScreen.loginWith(
        benefitsTestAccount.benefitsIaV2UK.email,
        benefitsTestAccount.benefitsIaV2UK.password,
        {
          pillar: 'benefits',
        }
      );
    });

    beforeEach(async () => {
      await backToBenefitsPillar();
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    it('should show tabs correctly', async () => {
      await expect(await getElementById('benefits-online')).toBeVisible();
      await expect(await getElementById('benefits-purchases')).toBeVisible();

      await waitFor(element(by.id('benefits-home')))
        .not.toBeVisible()
        .withTimeout(5000);
      await waitFor(element(by.id('benefits-instore')))
        .not.toBeVisible()
        .withTimeout(5000);
    });
  });

  describe('NZ account', () => {
    beforeAll(async () => {
      await device.launchApp({
        permissions: {
          location: 'always',
        },
      });
      await authScreen.loginWith(
        benefitsTestAccount.benefitsIaV2NZ.email,
        benefitsTestAccount.benefitsIaV2NZ.password,
        {
          pillar: 'benefits',
        }
      );
    });

    beforeEach(async () => {
      await backToBenefitsPillar();
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    it('should show tabs correctly', async () => {
      await expect(await getElementById('benefits-online')).toBeVisible();
      await expect(await getElementById('benefits-purchases')).toBeVisible();

      await checkIfNotVisible('benefits-home');
      await checkIfNotVisible('benefits-instore');
    });
  });

  describe('AU account', () => {
    beforeAll(async () => {
      await device.launchApp({
        permissions: {
          location: 'always',
        },
      });
      await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
        pillar: 'benefits',
      });
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    beforeEach(async () => {
      await backToBenefitsPillar();
    });

    it('should show tabs correctly', async () => {
      await expect(await getElementById('benefits-home')).toBeVisible();
      await expect(await getElementById('benefits-online')).toBeVisible();
      await expect(await getElementById('benefits-instore')).toBeVisible();
      await expect(await getElementById('benefits-purchases')).toBeVisible();
    });

    it('should switching tabs correctly', async () => {
      await (await getElementById('benefits-online')).tap();
      await expect(await getElementById('search-box')).toBeVisible();

      await (await getElementById('benefits-instore')).tap();
      await expect(await getElementById('partial-map-list-view')).toBeVisible();

      await (await getElementById('benefits-purchases')).tap();
      await expect(await getElementByText('Gift cards')).toBeVisible();
      await expect(await getElementByText('Bills')).toBeVisible();
    });
  });

  describe('candidate account', () => {
    beforeAll(async () => {
      await device.launchApp({
        permissions: {
          location: 'always',
        },
      });
      await authScreen.loginWith(
        benefitsTestAccount.candidateAccount.email,
        benefitsTestAccount.candidateAccount.password,
        {
          pillar: 'benefits',
        }
      );
    });

    beforeEach(async () => {
      await backToBenefitsPillar();
    });
    afterAll(async () => {
      await device.terminateApp();
    });

    it('should show correct tabs', async () => {
      await checkIAV2Tabs();
    });
  });

  describe('workzone account', () => {
    beforeAll(async () => {
      await device.launchApp({
        permissions: {
          location: 'always',
        },
      });
      await authScreen.loginWith(
        benefitsTestAccount.workzoneAccount.email,
        benefitsTestAccount.workzoneAccount.password,
        {
          pillar: 'benefits',
          isKeyPay: true,
        }
      );
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    it('should show tabs correctly', async () => {
      await checkIAV2Tabs();
    });
  });

  describe('invalid country with purchase history', () => {
    beforeAll(async () => {
      await device.launchApp({
        permissions: {
          location: 'always',
        },
      });
      await authScreen.loginWith(
        benefitsTestAccount.invalidCountryWithPurchaseHistory.email,
        benefitsTestAccount.invalidCountryWithPurchaseHistory.password,
        {
          pillar: 'benefits',
        }
      );
    });

    beforeEach(async () => {
      await backToBenefitsPillar();
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    it('should show purchases and setting tabs', async () => {
      await expect(await getElementById('benefits-purchases')).toBeVisible();
      await expect(await getElementById('benefits-settings')).toBeVisible();
    });
  });

  describe('terminated account with giftcard history and onboard cashback', () => {
    beforeAll(async () => {
      await device.launchApp({
        permissions: {
          location: 'always',
        },
      });
      await authScreen.loginWith(
        benefitsTestAccount.terminatedWithPurchaseHistory.email,
        benefitsTestAccount.terminatedWithPurchaseHistory.password,
        {
          pillar: 'benefits',
        }
      );
    });

    beforeEach(async () => {
      await backToBenefitsPillar();
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    it('should work correctly', async () => {
      await checkIAV2Tabs();
    });
  });

  describe('terminated account with no giftcard history and no onboard cashback', () => {
    beforeAll(async () => {
      await device.launchApp({
        permissions: {
          location: 'always',
        },
      });
      await authScreen.loginWith(
        benefitsTestAccount.terminatedNoOnboardCashbackNoAnyPurchase.email,
        benefitsTestAccount.terminatedNoOnboardCashbackNoAnyPurchase.password,
        {
          pillar: 'benefits',
        }
      );
    });

    beforeEach(async () => {
      await backToBenefitsPillar();
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    it('should work correctly', async () => {
      const tabs = ['benefits-home', 'benefits-online', 'benefits-instore', 'benefits-settings'];

      // eslint-disable-next-line no-restricted-syntax
      for (const tab of tabs) {
        // eslint-disable-next-line no-await-in-loop
        await expect(await getElementById(tab)).toBeVisible();
      }
      await waitFor(element(by.id('benefits-order')))
        .not.toBeVisible()
        .withTimeout(5000);
    });
  });
});
