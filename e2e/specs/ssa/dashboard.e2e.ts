import { moneySourceAccount } from '../../data/personal-info';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { WalletDashboardScreen } from '../../pom/wallet/WalletDashboardScreen';
import { getElementByText, sleep } from '../../utils/common-actions';

describe('Spend Account Dashboard', () => {
  let authScreen: AuthScreen;
  let walletScreen: WalletDashboardScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    walletScreen = new WalletDashboardScreen();
  });

  beforeEach(async () => {
    await device.launchApp();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('can share the account details', async () => {
    await authScreen.loginWith(moneySourceAccount.email, moneySourceAccount.password);
    await sleep(1000);
    await walletScreen.accessWalletSection();
    await walletScreen.acknowledgeATMWithdrawalAlert();
    await (await getElementByText('Account details')).tap();

    // FIXME: at this moment, detox cannot work with native share dialog
    if (device.getPlatform() === 'android') {
      await device.pressBack();
      await getElementByText('Account details');
      return;
    }

    await getElementByText(
      'Here are my Swag Spend account details:\nName: Testfirst Testlast\nBSB: 636220\nAccount number: 25939644'
    );
    await (await getElementByText('OK')).tap();
  });
});
