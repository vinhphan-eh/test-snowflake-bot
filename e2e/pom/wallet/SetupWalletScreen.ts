/* eslint-disable class-methods-use-this */
import {
  getElementById,
  getElementByLabel,
  getElementByText,
  getElementByType,
  sleep,
  tapByText,
  typeTextById,
} from '../../utils/common-actions';
import { randomAlphaString } from '../../utils/utils';
import { BaseScreen } from '../BaseScreen';

export class SetupWalletScreen extends BaseScreen {
  async updateRegionToAustralia() {
    await (await getElementByText('Update your region.')).tap();
    await sleep(1000);
    await (await getElementByText('Australia')).tap();
  }

  async processWalletSetupAndCarousel() {
    await (await getElementByText('Set up now')).tap();
    await (await getElementByText('Unlock the power of a Swag Spend account')).swipe('left', 'slow');
    await (await getElementByText('Get all the benefits')).swipe('left', 'slow');
    await (await getElementByText('How to set it up')).swipe('up', 'slow');
    await (await getElementByText("Let's go!")).tap();
  }

  async selectIdVerification(isPassport = true) {
    if (isPassport) {
      await (await getElementByLabel('Australian passport')).tap();
    } else {
      await (await getElementByLabel("Australian driver's licence")).tap();
    }
  }

  async nextOnTaxObligations() {
    await (await getElementByLabel('No')).tap();
  }

  async proceedOnTaxObligations() {
    await (await getElementByLabel('Yes')).tap();
  }

  async fillTaxObligationDetails(taxNumber?: string) {
    await (await getElementByText('Country')).tap();
    // Strictly choose a country from the first visible ones
    // since search box inside Select cannot be accessed by id or text
    // TODO: Allow searching for country
    await (await getElementByText('Albania')).tap();

    if (taxNumber) {
      await (await getElementByText('Tax Identification Number (optional)')).tap();
      await typeTextById('trn-input', taxNumber);
    }

    await (await getElementByText('Add country')).tap();
    await (await getElementByText('Next')).tap();
  }

  async fillInPassport(passport: string) {
    await typeTextById('passport-input', passport);

    await (await getElementById('next-on-passport')).tap();
  }

  async fillNameInfo(name: { firstName: string; lastName: string; middleName: string }) {
    // Have to tap once because Detox doesn't work with HD inputs that has maxLength
    await (await getElementByText('First name')).tap();
    await (await getElementById('firstName-input')).typeText(name.firstName);
    await (await getElementByText('Middle name or initial')).tap();
    await (await getElementById('middleName-input')).typeText(name.middleName);
    await (await getElementByText('Last name')).tap();
    await (await getElementById('lastName-input')).typeText(name.lastName);
    await (await getElementById('profile-name-next')).tap();
  }

  async fillMobileNumber(mobileNumber: string) {
    // Have to tap once because Detox doesn't work with HD inputs that has maxLength
    await (await getElementByText('Mobile number')).tap();
    await typeTextById('phoneNumber-input', mobileNumber);
    await (await getElementById('phone-next-btn')).tap();
  }

  async fillInAddress(address: { addressLine1: string; postcode: string; suburb: string; state: string }) {
    await (await getElementById('addressLine1-input')).typeText(address.addressLine1);
    await (await getElementById('postcode-input')).typeText(address.postcode);
    await (await getElementById('townOrCity-input')).typeText(address.suburb);
    await (await getElementById('region-input')).tap();
    await (await getElementById(`${address.state}`)).tap();
    await (await getElementById('address-btn-next')).tap();
  }

  async fillInAddressBySearching(text: string) {
    await (await getElementById('search-address-input')).tap();
    await sleep(1000);
    await typeTextById('auto-complete-input', text);
    await (await getElementById(text)).tap();
    await sleep(1000);
    await (await getElementById('address-btn-next')).tap();
  }

  async selectBirthday() {
    await (await getElementById('dob-input')).tap();

    if (device.getPlatform() === 'ios') {
      await (await getElementByType('RNDateTimePicker')).swipe('down', 'fast', 1, 0.9, 0.5);
      await (await getElementByType('RNDateTimePicker')).swipe('down', 'fast', 1, 0.9, 0.5);
      await (await getElementByLabel('Confirm')).tap();
    } else {
      const datePicker = element(by.type('android.widget.DatePicker'));
      await datePicker.setDatePickerDate('2000/02/06', 'yyyy/MM/dd');
      await (await getElementByText('OK')).tap();
    }

    await (await getElementById('birthday-next-btn')).tap();
  }

  async selectUnder16Birthday() {
    await (await getElementById('dob-input')).tap();

    if (device.getPlatform() === 'ios') {
      await (await getElementByType('RNDateTimePicker')).swipe('down', 'slow', 0.5, 0.9, 0.5);
      await (await getElementByLabel('Confirm')).tap();
    } else {
      const currentDate = new Date();
      const invalidYear = currentDate.getFullYear() - 15;
      const datePicker = element(by.type('android.widget.DatePicker'));
      await datePicker.setDatePickerDate(`${invalidYear}/02/06`, 'yyyy/MM/dd');
      await (await getElementByText('OK')).tap();
    }
    await (await getElementById('birthday-next-btn')).tap();
  }

  async confirmProfileDetails() {
    await sleep(1000);
    await (await getElementById('profile-details-next-btn')).tap();

    await sleep(1000);
    await (await getElementByText('Confirm')).tap();
  }

  async editNameAndConfirmProfileDetail() {
    await (await getElementById('fullName')).tap();
    await typeTextById('firstName-input', randomAlphaString(10));

    await typeTextById('middleName-input', 'passall');

    await (await getElementById('save-name-btn')).tap();

    await this.confirmProfileDetails();
  }

  async editMiddleName() {
    await (await getElementByText('Middle name (optional)')).tap();
    await (await getElementById('middleName-input')).typeText('passall');
  }

  async confirmTermAndConditions() {
    await (await getElementByLabel('Terms and Conditions')).tap();
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10; i++) {
      // eslint-disable-next-line no-await-in-loop
      await (await getElementById('bottom-sheet-scroll-view')).swipe('up', 'fast');
    }
    await sleep(3 * 1000);
    await (await getElementByText('Accept')).tap();
    await sleep(3 * 1000);
  }

  async confirmPrivacyPolicy() {
    await (await getElementByLabel('Privacy Policy')).tap();
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 12; i++) {
      // eslint-disable-next-line no-await-in-loop
      await (await getElementById('bottom-sheet-scroll-view')).swipe('up', 'fast');
    }
    await (await getElementByText('Accept')).tap();
  }

  async nextOnLegalAgreement() {
    await (await getElementById('legal-agreement-next-btn')).tap();
  }

  async confirmIdVerificationAndGoNext() {
    await (await getElementById('identity-verification-ck-box')).tap();
    await (await getElementById('identity-verification-submit-btn')).tap();
  }

  async skipPayslit() {
    await (await getElementById('success-screen-next')).tap();
    // payslit carousel
    await (await getElementByText('Control how you split your pay')).swipe('left', 'slow');
    await (await getElementByText('Set and forget')).swipe('left', 'slow');
    await (await getElementById('back-button')).tap();
  }

  async doThisLater() {
    await (await getElementById(`do-this-later-btn`)).tap();
  }

  async continueWithPaySplit() {
    await (await getElementByLabel(`Let's split`)).tap();
  }

  async sendCard() {
    await tapByText('Send my card');
    await (await getElementById(`card-success-next-btn`)).tap();
  }

  async goToWallet() {
    await (await getElementById(`hooray-wallet-btn`)).tap();
  }

  async doThisLaterInDigitalProvisioning() {
    await (await getElementById(`do-this-later-btn`)).tap();
  }
}
