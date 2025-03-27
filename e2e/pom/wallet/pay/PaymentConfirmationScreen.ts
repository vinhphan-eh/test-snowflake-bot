import {getElementById, getElementByLabel, getElementByLabelWithIndex} from '../../../utils/common-actions';
import { BaseScreen } from '../../BaseScreen';

export class PaymentConfirmationScreen extends BaseScreen {
  async pressConfirmButton() {
    await getElementById('paymentConfirmationPage');
    let ele;
    if (device.getPlatform() === 'ios') {
      ele = await getElementByLabel('Confirm');
    } else {
      ele = await getElementByLabelWithIndex({ value: 'Confirm', index: 1 });
    }
    await waitFor(ele).toBeVisible().whileElement(by.id('paymentConfirmationPage')).scroll(50, 'down');
    await ele.tap();
  }
}
