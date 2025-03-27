import { getElementById } from '../../../utils/common-actions';
import { BaseScreen } from '../../BaseScreen';

export class PayeeAddressBookScreen extends BaseScreen {
  async pressAddPayeeFAB() {
    await (await getElementById('add-payee-fab')).tap();
  }
}
