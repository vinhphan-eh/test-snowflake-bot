import { device } from 'detox';
import { getElementById, getElementByText } from '../../utils/common-actions';
import { BaseScreen } from '../BaseScreen';

export class AuthScreen extends BaseScreen {
  async loginWith(
    userName: string,
    password: string,
    options?: { deeplink?: string; pillar?: 'wallet' | 'benefits' | 'swag'; isKeyPay?: boolean }
  ) {
    await (await getElementById('username')).replaceText(userName);
    await (await getElementById('password')).replaceText(password);
    await (await getElementById('password')).tapReturnKey();
    if (options?.deeplink) {
      await (await getElementById('deeplink-input')).replaceText(options.deeplink);
      await (await getElementById('deeplink-input')).tapReturnKey();
    }
    if (options?.isKeyPay) {
      await (await getElementById('login-server-select')).tap();
      await (await getElementByText('https://test20.keypay.dev')).longPress();
    }
    if (options?.pillar) {
      switch (options.pillar) {
        case 'wallet':
          await (await getElementById('wallet-app-radio-button')).tap();
          break;
        case 'benefits':
          await (await getElementById('benefits-app-radio-button')).tap();
          break;
        case 'swag':
          await (await getElementById('swag-app-radio-button')).tap();
          break;
        default:
          await (await getElementById('wallet-app-radio-button')).tap();
      }
    }
    await (await getElementById('loginBtn')).tap();
  }

  async loginWithDeeplink(userName: string, password: string, deeplink: string) {
    await (await getElementById('username')).replaceText(userName);
    await (await getElementById('password')).replaceText(password);
    await (await getElementById('deeplink-input')).replaceText(deeplink);
    await (await getElementById('deeplink-input')).tapReturnKey();
    await (await getElementById('loginBtn')).tap();
  }

  async loginWithKp(userName: string, password: string, country: string = 'AU') {
    const kpHost = country === 'GB' ? 'https://test16.keypay.dev' : 'https://test20.keypay.dev';

    await (await getElementById('username')).replaceText(userName);
    await (await getElementById('password')).replaceText(password);
    await (await getElementById('password')).tapReturnKey();
    await (await getElementById('login-server-select')).tap();
    await (await getElementByText(kpHost)).longPress();

    await (await getElementById('loginBtn')).tap();
  }

  async enterPassCode() {
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 6; i++) {
      // eslint-disable-next-line no-await-in-loop
      await (await getElementById(`passphrase_number_${i}`)).atIndex(0).tap();
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 6; i++) {
      // eslint-disable-next-line no-await-in-loop
      await (await getElementById(`passphrase_number_${i}`)).atIndex(1).tap();
    }
  }

  async ignoreFaceID() {
    if (device.getPlatform() === 'ios') {
      await (await getElementById('no_thanks')).tap();
    }
  }

  async ignoreWaitList() {
    await (await getElementById('close_btn')).tap();
  }
}
