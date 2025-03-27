import { getElementById } from '../../../utils/common-actions';
import { BaseScreen } from '../../BaseScreen';

export class PurchasesTab extends BaseScreen {
  async goToBenefitsPurchasesTab() {
    await (await getElementById('benefits-purchases')).tap();
  }

  async goToBillsSubtab() {
    await (await getElementById('bills-tab')).tap();
  }

  async goToCashbackSubtab() {
    await (await getElementById('cashback-tab')).tap();
  }

  async goToGiftCardsSubtab() {
    await (await getElementById('gift-cards-tab')).tap();
  }
}
