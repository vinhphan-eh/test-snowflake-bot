import {
  getElementById,
  getElementByLabel,
  getElementByLabelWithIndex,
  sleep,
  typeTextById,
} from '../../../utils/common-actions';
import { BaseScreen } from '../../BaseScreen';

export class NewPayeeScreen extends BaseScreen {
  async fillPayeeDetailsForm(accountName: string, bsb: string, accountNumber: string) {
    await this.typeTextByInputId('accountName-input', accountName);
    await this.typeTextByInputId('bsb-input', bsb);
    await this.typeTextByInputId('accountNumber-input', accountNumber);

    // finish typing and close the keyboard
    // to ensure the hidden controls by the keyboard can be visible
    await (
      await getElementById('payeeDetailsPage')
    ).tap({
      x: 0,
      y: 0,
    });
  }

  async pressNextButton() {
    if (device.getPlatform() === 'ios') {
      await (await getElementByLabel('Next')).tap();
    } else {
      await (await getElementByLabelWithIndex({ value: 'Next', index: 1 })).tap();
    }
  }

  async tapByInputId(id: string) {
    await getElementById(id);
    await element(by.id(id)).tap({ x: 50, y: 25 });
  }

  async typeTextByInputId(id: string, text: string) {
    if (device.getPlatform() === 'ios') {
      await this.tapByInputId(id);
      await sleep(100);
      await element(by.id(id)).clearText();
      await sleep(100);
      await element(by.id(id)).typeText(text);
    } else {
      await typeTextById(id, text);
    }
  }
}
