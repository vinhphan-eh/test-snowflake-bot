import { getElementById, typeTextById } from '../../../utils/common-actions';
import { BaseScreen } from '../../BaseScreen';

export class PaymentDetailsScreen extends BaseScreen {
  async fillPaymentDetailsForm(amount: number, description: string, reference = '') {
    await typeTextById('amount-input', String(amount));
    await typeTextById('description-input', description);
    await typeTextById('reference-input', reference);
    // finish typing and close the keyboard
    // to ensure the hidden controls by the keyboard can be visible
    await (
      await getElementById('paymentDetailsPage')
    ).tap({
      x: 0,
      y: 0,
    });
  }

  async pressNextButton() {
    await (await getElementById('payment-details-next')).tap();
  }
}
