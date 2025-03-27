import { expect } from 'detox';
import { billManagementTestAccount } from '../../../data/personal-info';
import { AuthScreen } from '../../../pom/auth/AuthScreen';
import { BillManagementOfferScreen } from '../../../pom/benefits/bill-management/BillManagementOfferScreen';
import { backToBenefitsPillar, getElementByText } from '../../../utils/common-actions';

describe('Benefits Bills', () => {
  let authScreen: AuthScreen;
  let billManagementOfferScreen: BillManagementOfferScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    billManagementOfferScreen = new BillManagementOfferScreen();
    await device.launchApp();
    await device.setURLBlacklist(['.*ebf-bff-mobile.staging-ehfintech.*']);
    await authScreen.loginWith(billManagementTestAccount.email, billManagementTestAccount.password, {
      pillar: 'benefits',
    });
  });

  beforeEach(async () => {
    await backToBenefitsPillar();
  });

  afterAll(async () => {
    await device.terminateApp();
  });

  it('view SE offer', async () => {
    await billManagementOfferScreen.goToOnlineBills();
    await billManagementOfferScreen.goToBillSEOffer();
    await billManagementOfferScreen.selectState();
    await billManagementOfferScreen.expectBillDetailScreen();
  });

  it('signup SE offer', async () => {
    await billManagementOfferScreen.goToOnlineBills();
    await billManagementOfferScreen.goToBillSEOffer();
    await billManagementOfferScreen.selectState();
    await billManagementOfferScreen.goToSignUp();
    await expect(await getElementByText('Reminder')).toBeVisible();
    await expect(
      await getElementByText('Please use your Employment Hero account email to sign up for the offer.')
    ).toBeVisible();
    // comment out due to ENGIE staging not stable
    // await billManagementOfferScreen.acceptReminder();
    // await expect(await getElementByText('Billing sign up', 60000)).toBeVisible();
  });

  it('view bills and payments', async () => {
    await billManagementOfferScreen.goToPurchase();
    await billManagementOfferScreen.goToBillsTab();
    await billManagementOfferScreen.goToBillManagement();
    await billManagementOfferScreen.goToBillManagementSubscriptionDetail();
    await expect(await getElementByText('Contact ENGIE')).toBeVisible();
    await expect(await getElementByText('Bill activity')).toBeVisible();
    await expect(await getElementByText('Total saved')).toBeVisible();
  });
});
