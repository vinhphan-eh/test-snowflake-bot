import { withStashAccount } from '../../data/personal-info';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { WalletDashboardScreen } from '../../pom/wallet/WalletDashboardScreen';
import { authenticateEhMobile, closeStashReq, exchangeEhToken } from '../../utils/api';
import { getElementById, getElementByText, sleep, typeTextById } from '../../utils/common-actions';

// #region
const getAccessToken = async (email: string, password: string) => {
  const { ehToken } = await authenticateEhMobile({
    username: email,
    password,
  });
  const { access_token: token } = await exchangeEhToken(ehToken);
  return {
    token,
    ehToken,
  };
};
// #endregion

describe('Create stash', () => {
  let authScreen: AuthScreen;
  let walletScreen: WalletDashboardScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    walletScreen = new WalletDashboardScreen();
  });

  beforeEach(async () => {
    await device.launchApp();
    const { ehToken, token } = await getAccessToken(withStashAccount.email, withStashAccount.password);
    await closeStashReq(token, ehToken);
  });

  afterEach(async () => {
    await device.terminateApp();
    const { ehToken, token } = await getAccessToken(withStashAccount.email, withStashAccount.password);
    await closeStashReq(token, ehToken);
  });

  it('can create a stash', async () => {
    await authScreen.loginWith(withStashAccount.email, withStashAccount.password);
    await walletScreen.acknowledgeATMWithdrawalAlert();
    await sleep(5000);
    await (await getElementByText('Stash')).tap();
    await (await getElementByText('Create Stash')).tap();
    await typeTextById('stashName-input', `Automation Test Stash ${new Date().toString()}`);
    await sleep(5000);
    await (await getElementByText('Next')).tap();
    await typeTextById('targetAmount-input', '1000');
    await sleep(5000);
    await (await getElementById('targetAmount-submit')).tap();
    await getElementByText('Select an image for your Stash');
    await (await getElementById('stashImage-skip')).tap();
    await (await getElementByText('Confirm')).tap();
  });
});
