import { expect } from 'detox';
import { getElementById, getElementByText, getTextInputById, sleep, typeTextById } from '../../utils/common-actions';
import { BaseScreen } from '../BaseScreen';

export class ProfileScreen extends BaseScreen {
  async fillResidentialAddress(address: {
    streetNumber: string;
    streetName: string;
    streetType: string;
    townOrCity: string;
    state: string;
    postcode: string;
  }) {
    await getElementByText('Mimic Profile Screen');
    await (await getElementByText('Residential address')).tap();
    await this.tapByInputId('search-address-input');
    await (await getElementByText("Can't find your address?")).tap();
    await this.typeTextByInputId('streetNumber', address.streetNumber);
    await this.typeTextByInputId('streetName', address.streetName);
    await this.typeTextByInputId('streetType', address.streetType);
    await getTextInputById('streetType').swipe('up');
    await this.typeTextByInputId('townOrCity', address.townOrCity);
    await getTextInputById('townOrCity').swipe('up'); // This to ensure the elements below are visible on small devices
    await sleep(1000);
    await this.selectById('region-input', address.state);
    await getTextInputById('townOrCity').swipe('up'); // This to ensure the elements below are visible on small devices
    if (device.getPlatform() === 'android') {
      await getTextInputById('townOrCity').tapReturnKey();
    }
    await sleep(1000);
    await this.typeTextByInputId('postcode', address.postcode);
    await getTextInputById('townOrCity').swipe('up'); // This to ensure the elements below are visible on small devices
    await sleep(1000);
    await element(by.id('manual-address-btn-save')).tap();
    await sleep(1000);
    await element(by.id('address-btn-save')).tap();
  }

  async tapByInputId(id: string) {
    await getElementById(id);
    await element(by.id(id)).tap();
  }

  async selectById(id: string, value: string) {
    await this.tapByInputId(id);
    await sleep(5000);
    if (device.getPlatform() === 'ios') {
      await element(by.label(value)).tap();
    } else {
      await element(by.text(value)).tap();
    }
  }

  async typeTextByInputId(id: string, text: string) {
    await this.tapByInputId(id);
    await sleep(500);
    await typeTextById(id, text);
  }

  removePrefixZeroFromMobileNumber = (mobileNumber: string) => {
    return mobileNumber?.[0] === '0' ? mobileNumber.substring(1) : mobileNumber;
  };

  async updatePhoneNumberTo(value: string) {
    await (await getElementByText('Mobile number')).tap();
    const newMobileNumber = value;
    await sleep(5000);
    await this.selectById('country-code', 'Australia (+61)');
    await this.typeTextByInputId('phoneNumber-input', newMobileNumber);
    await sleep(7500);
    await (await getElementByText('Save')).tap();
    await getElementByText('Mimic Profile Screen');
    await expect(await getElementByText(`+61${this.removePrefixZeroFromMobileNumber(newMobileNumber)}`)).toBeVisible();
  }
}
