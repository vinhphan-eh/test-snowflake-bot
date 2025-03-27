import { expect } from 'detox';
import { testAccounts } from '../../data/personal-info';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { PaySplitScreen } from '../../pom/paysplit/PaySplitScreen';
import type { TestAccountInfo } from '../../utils/api';
import { setupWalletForPaySplit } from '../../utils/api';
import { getElementById, getElementByText } from '../../utils/common-actions';

describe('Onboarding PaySplit', () => {
  let authScreen: AuthScreen;
  let paySplitScreen: PaySplitScreen;
  let testAccountInfo: TestAccountInfo;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    paySplitScreen = new PaySplitScreen();
    testAccountInfo = await setupWalletForPaySplit(testAccounts.manager);
  });

  beforeEach(async () => {
    await device.launchApp();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it.skip('onboarding', async () => {
    const { orgId } = testAccountInfo;
    await authScreen.loginWith(testAccounts.manager.username, testAccounts.manager.password);
    await paySplitScreen.accessIncomeSection();
    await paySplitScreen.onboardingGoToPaySplit();
    await paySplitScreen.selectEmployerToSplit(orgId);
    await paySplitScreen.selectSplitByPercentage();

    await expect(await getElementById('paysplit-15%')).toBeVisible();
    await expect(await getElementById('paysplit-10%')).toBeVisible();
    await expect(await getElementById('paysplit-5%')).toBeVisible();
    await expect(await getElementByText('Other')).toBeVisible();

    await paySplitScreen.selectPercentageOption(5);

    await expect(await getElementByText('Depositing each pay cycle')).toBeVisible();
    await expect(await getElementByText('To this account')).toBeVisible();
    await expect(await getElementByText(`Tester\n636-220 1231323121`)).toBeVisible();
    // disable synchronization to avoid waiting endlessly for button animation to complete
    await device.disableSynchronization();
    await paySplitScreen.confirmPaySplitDetail();
    await waitFor(await getElementByText('Nice! Your Pay Split has been set up.'))
      .toBeVisible()
      .withTimeout(10000);
    await expect(await getElementByText('Nice! Your Pay Split has been set up.')).toBeVisible();
    await paySplitScreen.finishPaySplitFlow();
  });
});
