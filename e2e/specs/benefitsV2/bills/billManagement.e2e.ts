import { expect } from 'detox';
import { benefitsTestAccount } from '../../../data/personal-info';
import { AuthScreen } from '../../../pom/auth/AuthScreen';
import { BillManagementOfferScreen } from '../../../pom/benefits/bill-management/BillManagementOfferScreen';
import { backToMoneyPillar, getElementByText, getElementByTextWithIndex } from '../../../utils/common-actions';

describe('Empty state for bill mgmt', () => {
  let authScreen: AuthScreen;
  let billManagementOfferScreen: BillManagementOfferScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    billManagementOfferScreen = new BillManagementOfferScreen();
    await device.setURLBlacklist(['.*swag-personal-bff.staging-ehfintech.*']);
  });

  describe('users with active bills', () => {
    beforeAll(async () => {
      authScreen = new AuthScreen();
      billManagementOfferScreen = new BillManagementOfferScreen();
      await device.launchApp({
        permissions: {
          location: 'always',
        },
      });
      await device.setURLBlacklist(['.*swag-personal-bff.staging-ehfintech.*']);
      await authScreen.loginWith(
        benefitsTestAccount.benefitsIaV2ActiveBill.email,
        benefitsTestAccount.benefitsIaV2ActiveBill.password
      );
    });

    beforeEach(async () => {
      await backToMoneyPillar();
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    it('should work correctly for user with active bills', async () => {
      await (await getElementByText('Bill Management')).tap();
      await (await getElementByText('ENGIE')).tap();
      await expect(await getElementByText('Gas Bill')).toBeVisible();
      await expect(await getElementByText('Bill activity')).toBeVisible();
    });
  });

  describe('users with no active bills', () => {
    beforeAll(async () => {
      authScreen = new AuthScreen();
      billManagementOfferScreen = new BillManagementOfferScreen();
      await device.launchApp({
        permissions: {
          location: 'always',
        },
      });
      await device.setURLBlacklist(['.*swag-personal-bff.staging-ehfintech.*']);
      await authScreen.loginWith(
        benefitsTestAccount.benefitsIaV2NoActiveBill.email,
        benefitsTestAccount.benefitsIaV2NoActiveBill.password
      );
    });

    beforeEach(async () => {
      await backToMoneyPillar();
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    it('should work correctly for user with no active bills', async () => {
      await (await getElementByText('Bill Management')).tap();
      await expect(await getElementByText('Electricity')).toBeVisible();
      await expect(await getElementByText('Gas')).toBeVisible();
      await expect(await getElementByText('Join communities asking for deals')).toBeVisible();
      await (await getElementByTextWithIndex({ value: 'Sign up', index: 0 })).tap();
      await billManagementOfferScreen.closeDisclaimer();
      await expect(await getElementByText('Electricity & Gas')).toBeVisible();
    });

    it('should work correctly for user with no active health insurance bills', async () => {
      await (await getElementByText('Bill Management')).tap();
      await expect(await getElementByTextWithIndex({ value: 'Health Insurance' })).toBeVisible();
      await expect(await getElementByText('Join communities asking for deals')).toBeVisible();
      await (await getElementByTextWithIndex({ value: 'Sign up', index: 2 })).tap();
      await billManagementOfferScreen.closeDisclaimer();
      await expect(await getElementByText('Health Insurance')).toBeVisible();
    });
  });

  describe('terminated users with active bills', () => {
    beforeAll(async () => {
      authScreen = new AuthScreen();
      billManagementOfferScreen = new BillManagementOfferScreen();
      await device.launchApp({
        permissions: {
          location: 'always',
        },
      });
      await device.setURLBlacklist(['.*swag-personal-bff.staging-ehfintech.*']);
      await authScreen.loginWith(
        benefitsTestAccount.terminatedWithActiveBill.email,
        benefitsTestAccount.terminatedWithActiveBill.password
      );
    });

    beforeEach(async () => {
      await backToMoneyPillar();
    });

    afterAll(async () => {
      await device.terminateApp();
    });

    it('should work correctly', async () => {
      await (await getElementByText('Bill Management')).tap();
      await (await getElementByText('ENGIE')).tap();
      await expect(await getElementByText('Gas Bill')).toBeVisible();
      await expect(await getElementByText('Bill activity')).toBeVisible();
    });
  });
});
