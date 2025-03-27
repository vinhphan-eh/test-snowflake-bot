import { getElementById } from '../../../utils/common-actions';
import { BaseScreen } from '../../BaseScreen';

export class PaymentTypeScreen extends BaseScreen {
  async selectPaymentNowType() {
    await (await getElementById('option-payment-now')).tap();
  }
}
