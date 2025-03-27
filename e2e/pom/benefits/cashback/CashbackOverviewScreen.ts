import { getElementByText, getElementById } from '../../../utils/common-actions';
import { BaseScreen } from '../../BaseScreen';

export class CashBackOverviewScreen extends BaseScreen {
  async goToBenefitsCashback() {
    await (await getElementByText('Cashback')).tap();
  }

  async goToEarnings() {
    await (await getElementById('lifetime-cashback-balance')).tap();
  }

  async goToSearchOffers() {
    await (await getElementById('search-box')).tap();
  }

  async selectSearchCategory() {
    await (await getElementById('filter-outlined-btn')).tap();
    await (await getElementById('fashion')).longPress();
  }

  async selectSearchOffer() {
    await (await getElementById('online-offer-0')).tap();
  }

  async verifySearchOfferSelected() {
    await getElementById('shop_now_btn');
  }
}
