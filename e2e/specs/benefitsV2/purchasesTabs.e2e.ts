import { expect } from 'detox';
import { benefitsTestAccount } from '../../data/personal-info';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { BillManagementOfferScreen } from '../../pom/benefits/bill-management/BillManagementOfferScreen';
import { PurchasesTab } from '../../pom/benefitsV2/purchases/PurchasesTab';
import {
  backToBenefitsPillar,
  checkTextIfNotVisible,
  getElementById,
  getElementByText,
  getElementByTextWithIndex,
} from '../../utils/common-actions';

describe('Benefits Purchase Tab:', () => {
  let authScreen: AuthScreen;
  let purchasesTab: PurchasesTab;
  let billManagementOffer: BillManagementOfferScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    purchasesTab = new PurchasesTab();
    billManagementOffer = new BillManagementOfferScreen();
    await device.setURLBlacklist(['.*swag-personal-bff.staging-ehfintech.*']);
    await device.setURLBlacklist(['.*ebf-bff-mobile.staging-ehfintech.*']);
  });

  describe('benefitsIaV2 account', () => {
    beforeAll(async () => {
      await device.launchApp();
      await authScreen.loginWith(
        benefitsTestAccount.benefitsIaV2NoSSACard.email,
        benefitsTestAccount.benefitsIaV2NoSSACard.password,
        {
          pillar: 'benefits',
        }
      );
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    beforeEach(async () => {
      await backToBenefitsPillar('benefits-purchases');
    });

    it('should display 3 tabs correctly AU', async () => {
      await expect(await getElementByText('Gift cards')).toBeVisible();
      await expect(await getElementByText('Cashback')).toBeVisible();
      await expect(await getElementByText('Bills')).toBeVisible();
    });

    it('should work correctly for Bills tab with pending transaction', async () => {
      await purchasesTab.goToBillsSubtab();
      await expect(await getElementByText('Electricity')).toBeVisible();
      await expect(await getElementByText('Gas')).toBeVisible();
      await expect(await getElementByTextWithIndex({ value: 'Health Insurance' })).toBeVisible();

      await (await getElementById('go-to-bill-management')).tap();
      await expect(await getElementByText('Gas')).toBeVisible();

      await purchasesTab.accessBenefitsPillar();
      // go back to purchases tab
      await purchasesTab.goToBenefitsPurchasesTab();
      await purchasesTab.goToBillsSubtab();

      // should navigate to Simply Energy

      await (await getElementById('electricity-bill-category-sign-up-btn')).tap();
      await billManagementOffer.closeDisclaimer();
      await billManagementOffer.selectState();
      await billManagementOffer.expectBillDetailScreen();
    });

    it('should show gift card order list for AU account', async () => {
      await purchasesTab.goToGiftCardsSubtab();

      await expect(await getElementByText('Gift card order history')).toBeVisible();
    });

    it('should work correctly on cashback subtab list for AU account', async () => {
      await purchasesTab.goToCashbackSubtab();
      await expect(await getElementByText('Cashback history')).toBeVisible();

      // navigate to open wallet screen
      await (await getElementByText('Claim your cashback!')).tap();
      await expect(await getElementByText('Legal agreement')).toBeVisible();
    });
  });

  describe('benefitsIaV2NewAcc', () => {
    beforeAll(async () => {
      await device.launchApp();
      await authScreen.loginWith(
        benefitsTestAccount.benefitsIaV2NewAcc.email,
        benefitsTestAccount.benefitsIaV2NewAcc.password,
        {
          pillar: 'benefits',
        }
      );
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    beforeEach(async () => {
      await backToBenefitsPillar('benefits-purchases');
    });

    it('should work correctly for Bills tab', async () => {
      await purchasesTab.goToBillsSubtab();
      await expect(await getElementByText('Electricity')).toBeVisible();
      await expect(await getElementByText('Gas')).toBeVisible();
      await expect(await getElementByTextWithIndex({ value: 'Health Insurance' })).toBeVisible();

      await (await getElementByText('Exclusive energy discount')).tap();
      // await billManagementOffer.selectState();
      await billManagementOffer.expectBillDetailScreen();

      await (await getElementById('topbar-back-icon')).tap();

      await (await getElementById('go-to-bill-management')).tap();
      await expect(await getElementByText('Join communities asking for deals')).toBeVisible();

      await purchasesTab.accessBenefitsPillar();

      // go back to purchases tab
      await purchasesTab.goToBenefitsPurchasesTab();
      await purchasesTab.goToBillsSubtab();

      await (await getElementById('bills-tab-scrollview')).scrollTo('bottom');

      // should navigate to Simply Energy
      await (await getElementById('electricity-bill-category-sign-up-btn')).tap();
      await billManagementOffer.closeDisclaimer();
      await billManagementOffer.selectState();
      await billManagementOffer.expectBillDetailScreen();

      await (await getElementById('topbar-back-icon')).tap();

      await (await getElementById('gas-bill-category-sign-up-btn')).tap();
      await billManagementOffer.expectBillDetailScreen();

      await (await getElementById('topbar-back-icon')).tap();

      await (await getElementById('ahm-bill-category-sign-up-btn')).tap();
      await billManagementOffer.closeDisclaimer();
      await billManagementOffer.expectBillDetailScreen();

      await (await getElementById('topbar-back-icon')).tap();

      await (await getElementById('medibank-bill-category-sign-up-btn')).tap();
      await billManagementOffer.closeDisclaimer();
      await billManagementOffer.expectBillDetailScreen();
    });
  });

  describe('benefitsIaV2UK account', () => {
    beforeAll(async () => {
      await device.launchApp();
      await authScreen.loginWith(
        benefitsTestAccount.benefitsIaV2UK.email,
        benefitsTestAccount.benefitsIaV2UK.password,
        {
          pillar: 'benefits',
        }
      );
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    beforeEach(async () => {
      await backToBenefitsPillar('benefits-purchases');
    });

    it('should display only gift card order history for UK account', async () => {
      await purchasesTab.goToBenefitsPurchasesTab();

      await waitFor(element(by.text('Bills')))
        .not.toBeVisible()
        .withTimeout(5000);
      await waitFor(element(by.text('Cashback')))
        .not.toBeVisible()
        .withTimeout(5000);
      await waitFor(element(by.text('Gift cards')))
        .not.toBeVisible()
        .withTimeout(5000);

      await expect(await getElementByText('Gift card order history')).toBeVisible();
    });
  });

  describe('benefitsIaV2NZ account', () => {
    beforeAll(async () => {
      await device.launchApp();
      await authScreen.loginWith(
        benefitsTestAccount.benefitsIaV2NZ.email,
        benefitsTestAccount.benefitsIaV2NZ.password,
        {
          pillar: 'benefits',
        }
      );
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    beforeEach(async () => {
      await backToBenefitsPillar('benefits-purchases');
    });

    it('should display only gift card order history for NZ account', async () => {
      await purchasesTab.goToBenefitsPurchasesTab();

      await checkTextIfNotVisible('Bills');
      await checkTextIfNotVisible('Cashback');
      await checkTextIfNotVisible('Gift cards');

      await expect(await getElementByText('Gift card order history')).toBeVisible();
    });
  });

  describe('invalidCountryWithPurchaseHistory account', () => {
    beforeAll(async () => {
      await device.launchApp();
      await authScreen.loginWith(
        benefitsTestAccount.invalidCountryWithPurchaseHistory.email,
        benefitsTestAccount.invalidCountryWithPurchaseHistory.password,
        {
          pillar: 'benefits',
        }
      );
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    beforeEach(async () => {
      await backToBenefitsPillar('');
    });

    it('invalid country with purchase history should show only gift card', async () => {
      await expect(await getElementById('benefits-purchases')).toBeVisible();

      await expect(await getElementByText('Gift card order history')).toBeVisible();

      await waitFor(element(by.text('Bills')))
        .not.toBeVisible()
        .withTimeout(5000);
      await waitFor(element(by.text('Cashback')))
        .not.toBeVisible()
        .withTimeout(5000);
    });
  });

  describe('candidateAccount', () => {
    beforeAll(async () => {
      await device.launchApp();
      await authScreen.loginWith(
        benefitsTestAccount.candidateAccount.email,
        benefitsTestAccount.candidateAccount.password,
        {
          pillar: 'benefits',
        }
      );
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    beforeEach(async () => {
      await backToBenefitsPillar('benefits-purchases');
    });

    it('show bill & cashback tab for candidate', async () => {
      await expect(await getElementByText('Cashback')).toBeVisible();
      await expect(await getElementByText('Bills')).toBeVisible();

      await waitFor(element(by.text('Gift cards')))
        .not.toBeVisible()
        .withTimeout(5000);
    });
  });

  describe('workzoneAccount', () => {
    beforeAll(async () => {
      await device.launchApp();
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

    beforeEach(async () => {
      await backToBenefitsPillar('benefits-purchases');
    });
    it('show bill & cashback tab for workzone', async () => {
      await expect(await getElementByText('Cashback')).toBeVisible();
      await expect(await getElementByText('Bills')).toBeVisible();

      await waitFor(element(by.text('Gift cards')))
        .not.toBeVisible()
        .withTimeout(5000);
    });
  });

  describe('terminatedWithPurchaseHistory account', () => {
    beforeAll(async () => {
      await device.launchApp();
      await authScreen.loginWith(
        benefitsTestAccount.terminatedWithPurchaseHistory.email,
        benefitsTestAccount.terminatedWithPurchaseHistory.password,
        {
          pillar: 'benefits',
        }
      );
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    beforeEach(async () => {
      await backToBenefitsPillar('benefits-purchases');
    });

    it('show cashback tab & giftcard history for terminated when having giftcard purchase', async () => {
      await waitFor(element(by.text('Bills')))
        .not.toBeVisible()
        .withTimeout(5000);

      await expect(await getElementByText('Gift cards')).toBeVisible();
      await expect(await getElementByText('Gift card order history')).toBeVisible();

      await purchasesTab.goToCashbackSubtab();
      await expect(await getElementByText('Cashback')).toBeVisible();
      await expect(await getElementByText('Lifetime cashback')).toBeVisible();
    });
  });
});
