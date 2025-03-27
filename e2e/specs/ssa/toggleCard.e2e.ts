import { expect } from 'detox';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { CardManagementScreen } from '../../pom/card/CardManagementScreen';
import { SetupWalletScreen } from '../../pom/wallet/SetupWalletScreen';
import { WalletDashboardScreen } from '../../pom/wallet/WalletDashboardScreen';
import { createAndOnboardAUWallet } from '../../utils/api';
import { getElementById, getElementByText } from '../../utils/common-actions';

describe('Toggle card', () => {
  let authScreen: AuthScreen;
  let cardManagementScreen: CardManagementScreen;
  let walletScreen: SetupWalletScreen;
  let walletDashboardScreen: WalletDashboardScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    walletScreen = new SetupWalletScreen();
    cardManagementScreen = new CardManagementScreen();
    walletDashboardScreen = new WalletDashboardScreen();
  });

  beforeEach(async () => {
    await device.launchApp();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  test('User can enable/disable physical card', async () => {
    const { email, password } = await createAndOnboardAUWallet();
    await authScreen.loginWith(email, password);
    await walletScreen.updateRegionToAustralia();
    await walletDashboardScreen.acknowledgeATMWithdrawalAlert();

    await cardManagementScreen.goToCardMgt();

    await (await getElementByText('Activate physical card')).tap();
    await (await getElementByText('Confirm')).tap();
    await (await getElementById('pin-hidden-input')).typeText('222222');

    const isCardEnabled = await cardManagementScreen.isCardEnabled();

    if (isCardEnabled) {
      await cardManagementScreen.toggleCardIsEnabled();
    }

    await cardManagementScreen.toggleCardIsEnabled();
    await expect(await getElementByText('You can make contactless payments.')).toBeVisible();
  });
});
