import { expect } from 'detox';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { PINPasscodeScreen } from '../../pom/pin/PINPasscodeScreen';
import { ProfileScreen } from '../../pom/profile/ProfileScreen';
import { WalletDashboardScreen } from '../../pom/wallet/WalletDashboardScreen';
import { getElementById, getElementByText, getElementByType, sleep } from '../../utils/common-actions';
import { randomAlphaString } from '../../utils/utils';

const account = {
  email: 'e2e.updateprofile4@gmail.com',
  password: '1234asdf!?',
};

describe('Update Profile', () => {
  let authScreen: AuthScreen;
  let pinPasscodeScreen: PINPasscodeScreen;
  let profileScreen: ProfileScreen;
  let walletDashboardScreen: WalletDashboardScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    pinPasscodeScreen = new PINPasscodeScreen();
    profileScreen = new ProfileScreen();
    walletDashboardScreen = new WalletDashboardScreen();
  });

  beforeEach(async () => {
    await device.launchApp();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  test('user can update profile', async () => {
    await authScreen.loginWith(account.email, account.password);
    await walletDashboardScreen.acknowledgeATMWithdrawalAlert();

    await (await getElementById('profile-button')).tap();
    await pinPasscodeScreen.fillPassCode('222222', 'Enter Passcode');
    await getElementByText('Mimic Profile Screen');
    await sleep(500);

    await (await getElementByText('Full name')).tap();
    await getElementByText('Edit');
    const newFirstName = randomAlphaString(5);
    const newMiddleName = randomAlphaString(5);
    const newLastName = randomAlphaString(5);
    await profileScreen.typeTextByInputId('firstName-input', newFirstName);
    await profileScreen.typeTextByInputId('middleName-input', newMiddleName);
    await profileScreen.typeTextByInputId('lastName-input', newLastName);
    await (await getElementById('back')).tap();
    await getElementByText('Mimic Profile Screen');

    await profileScreen.updatePhoneNumberTo('0430750008');
    await profileScreen.updatePhoneNumberTo('0430750007');

    await (await getElementByText('Birthday')).tap();
    await getElementByText('Your birthday');
    await (await getElementById('dob-input')).tap();
    if (device.getPlatform() === 'ios') {
      await (await getElementByType('RNDateTimePicker')).swipe('down', 'fast', 1, 0.9, 0.5);
      await (await getElementByType('RNDateTimePicker')).swipe('down', 'fast', 1, 0.9, 0.5);
      await (await getElementByText('Confirm')).tap();
    } else {
      const datePicker = element(by.type('android.widget.DatePicker'));
      await datePicker.setDatePickerDate('2000/02/06', 'yyyy/MM/dd');
      await (await getElementByText('OK')).tap();
    }
    await sleep(5000);
    await (await getElementById('back')).tap();

    await profileScreen.fillResidentialAddress({
      streetNumber: '1',
      streetName: 'Keith Smith',
      streetType: 'Ave',
      townOrCity: 'Mascot',
      state: 'NSW',
      postcode: '2020',
    });
    await profileScreen.fillResidentialAddress({
      streetNumber: '1',
      streetName: 'Great Ocean',
      streetType: 'Rd',
      townOrCity: 'Anglesea',
      state: 'VIC',
      postcode: '3230',
    });
    await getElementByText('Mimic Profile Screen');
    await expect(await getElementByText('1 Great Ocean Rd, Anglesea VIC 3230')).toBeVisible();

    // Change the value back to the original, so that later run will not be trivial
    await profileScreen.fillResidentialAddress({
      streetNumber: '1',
      streetName: 'Keith Smith',
      streetType: 'Ave',
      townOrCity: 'Mascot',
      state: 'NSW',
      postcode: '2020',
    });
  });
});
