import { expect } from 'detox';
import { heroPointsAccounts } from '../../data/personal-info';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { HeroPointsScreen } from '../../pom/heroPoints/HeroPointsScreen';
import { WalletDashboardScreen } from '../../pom/wallet/WalletDashboardScreen';
import { getElementByText, sleep } from '../../utils/common-actions';

jest.retryTimes(2);

describe('Hero Points', () => {
  let authScreen: AuthScreen;
  let heroPointsScreen: HeroPointsScreen;
  let walletDashboardScreen: WalletDashboardScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    heroPointsScreen = new HeroPointsScreen();
    walletDashboardScreen = new WalletDashboardScreen();
  });

  beforeEach(async () => {
    await device.launchApp();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  Object.keys(heroPointsAccounts).forEach(country => {
    const account = heroPointsAccounts[country as keyof typeof heroPointsAccounts];

    it(`should view balance, transactions list and transaction detail for ${country}`, async () => {
      await authScreen.loginWith(account.email, account.password);

      if (country === 'au') {
        await walletDashboardScreen.acknowledgeATMWithdrawalAlert();
        await heroPointsScreen.gotoHeroPoints();
      }

      await heroPointsScreen.viewHeroPointsCarousel();

      await expect(await getElementByText('Points balance')).toBeVisible();
      await expect(await getElementByText('Points transactions')).toBeVisible();

      await heroPointsScreen.goToTransactionDetail();
      await sleep(500);
      await expect(await getElementByText('You received')).toBeVisible();
      await expect(await getElementByText('When')).toBeVisible();
      await expect(await getElementByText('Done')).toBeVisible();

      await heroPointsScreen.goBackToHeroPointsDashboard();
      await heroPointsScreen.minimizeTransactionDrawer();
      await expect(await getElementByText('Points balance')).toBeVisible();
    });
  });
});
