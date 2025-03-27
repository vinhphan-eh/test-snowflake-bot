import { expect } from 'detox';
import { withActivatedCardAccount } from '../../data/personal-info';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { CardManagementScreen } from '../../pom/card/CardManagementScreen';
import { SetupWalletScreen } from '../../pom/wallet/SetupWalletScreen';
import { WalletDashboardScreen } from '../../pom/wallet/WalletDashboardScreen';
import { createAndOnboardAUWallet } from '../../utils/api';
import { getElementById, getElementByLabel, getElementByText, sleep } from '../../utils/common-actions';

const DEFAULT_WAIT_TIME = 5 * 1000; // 5 seconds
const timeout = 30000;

describe('Card Management', () => {
  let authScreen: AuthScreen;
  let cardMgtScreen: CardManagementScreen;
  let walletScreen: SetupWalletScreen;
  let walletDashboardScreen: WalletDashboardScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    walletScreen = new SetupWalletScreen();
    cardMgtScreen = new CardManagementScreen();
    walletDashboardScreen = new WalletDashboardScreen();
  });

  beforeEach(async () => {
    await device.launchApp();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  test('Card management flow', async () => {
    const { email, password } = await createAndOnboardAUWallet();
    await authScreen.loginWith(email, password);
    await walletScreen.updateRegionToAustralia();
    await walletDashboardScreen.acknowledgeATMWithdrawalAlert();

    await cardMgtScreen.goToCardMgt();

    await cardMgtScreen.ensureCardIsDeactivated(
      withActivatedCardAccount.appPassCode,
      withActivatedCardAccount.cardPassCode
    );

    await (await getElementByText('Activate physical card', timeout)).tap();
    await expect(await getElementByText('Do you have your card?')).toBeVisible();
    await sleep(500);
    await (await getElementByText('Confirm')).tap();
    await getElementByText('Enter Passcode');
    await (await getElementById('pin-hidden-input')).typeText(withActivatedCardAccount.appPassCode);
    await expect(await getElementByText('Card is enabled')).toBeVisible();

    // Swipe card at terminal setting
    await getElementByText('You can swipe your card at terminal.');
    await (await getElementByLabel('You can swipe your card at terminal. toggle')).tap();
    await getElementByText('Swipe is disabled.');
    await (await getElementByLabel('Swipe is disabled. toggle')).tap();
    await expect(await getElementByText('You can swipe your card at terminal.')).toBeVisible();

    // Reset card PIN
    await (await getElementById('card-management-screen')).swipe('up');
    await sleep(DEFAULT_WAIT_TIME);
    await (await getElementByText('Reset card PIN')).tap();

    await getElementByText('Enter Passcode');
    await (await getElementById('pin-hidden-input')).typeText(withActivatedCardAccount.appPassCode);
    await getElementByText('Choose a new PIN.');
    await (await getElementById('pin-hidden-input')).typeText(withActivatedCardAccount.cardPassCode);
    await getElementByText('Repeat your PIN.');
    // TODO: this style is deprecated, use getElement* methods instead
    await element(by.id('pin-hidden-input').withAncestor(by.id('repeated-pin-input-wrapper'))).typeText(
      withActivatedCardAccount.cardPassCode
    );
    await getElementByText('Nice one!');
    await getElementByText('Your Visa debit card PIN has been updated.');
    await (await getElementByText('Done')).tap();

    // Toggle contactless setting
    await getElementByText('You can make contactless payments.');
    await (await getElementByLabel('You can make contactless payments. toggle')).tap();
    await getElementByText('Contactless payments are disabled.');
    await (await getElementByLabel('Contactless payments are disabled. toggle')).tap();
    await expect(await getElementByText('You can make contactless payments.')).toBeVisible();

    // Deactivate the card
    await cardMgtScreen.deactivateCard(withActivatedCardAccount.appPassCode, withActivatedCardAccount.cardPassCode);
  });
});
