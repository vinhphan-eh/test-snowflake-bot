import { expect } from 'detox';
import { moneySourceAccount } from '../../data/personal-info';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { SupportDashboardScreen } from '../../pom/support/SupportDashboardScreen';
import { WalletDashboardScreen } from '../../pom/wallet/WalletDashboardScreen';
import { getElementByText, sleep } from '../../utils/common-actions';

describe('Support Request', () => {
  let authScreen: AuthScreen;
  let supportDashboardScreen: SupportDashboardScreen;
  let walletDashboardScreen: WalletDashboardScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    supportDashboardScreen = new SupportDashboardScreen();
    walletDashboardScreen = new WalletDashboardScreen();
  });

  beforeEach(async () => {
    await device.launchApp();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('Spend account complaint', async () => {
    await authScreen.loginWith(moneySourceAccount.email, moneySourceAccount.password);
    await walletDashboardScreen.acknowledgeATMWithdrawalAlert();
    await supportDashboardScreen.accessSupportSection();
    await sleep(1000);
    await supportDashboardScreen.goToSpendAccountComplaint();

    await expect(
      await getElementByText("We're sorry you're not satisfied with your Swag Spend account.")
    ).toBeVisible();
    await expect(
      await getElementByText(
        'If you would like to make a formal complaint, please provide details including the product or service in question, what went wrong and how we can make things right.'
      )
    ).toBeVisible();
    await supportDashboardScreen.fillOutSupportRequestForm();
    await supportDashboardScreen.submitSupportRequestForm();

    await expect(await getElementByText('Your complaint has been submitted.')).toBeVisible();
    await expect(
      await getElementByText('Our team will look into it and get back to you soon via email.')
    ).toBeVisible();
    await expect(await getElementByText('Done')).toBeVisible();
    await supportDashboardScreen.finishSupportRequest();

    await expect(await getElementByText('Need a hand?')).toBeVisible();
  });
});
