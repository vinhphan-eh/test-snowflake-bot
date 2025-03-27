import { getElementByText, getElementById } from '../../../utils/common-actions';
import { BaseScreen } from '../../BaseScreen';

export class CashbackSearchScreen extends BaseScreen {
  async goToBenefitsCashback() {
    await (await getElementByText('Cashback')).tap();
  }

  async goToSearchScreen(selectedType: 'online' | 'instore') {
    await (await getElementById(`${selectedType}-pill`)).tap();
  }

  async searchText(text: string) {
    await (await getElementById('search-bar-container')).tap();
    await (await getElementById('search-bar')).typeText(text);
  }

  async selectCategory(categoryCode: string) {
    await (await getElementById('filter-outlined-btn')).tap();
    await (await getElementById(categoryCode)).longPress();
  }

  async clearFilter() {
    await (await getElementById('filter-btn')).tap();
    await (await getElementByText('Clear filter')).tap();
  }

  async exitOfferDetail() {
    await (await getElementById('topbar-back-icon')).tap();
  }

  async goToTravelCategory() {
    await (await getElementByText('Travel')).tap();
  }

  async searchLocation(location: string) {
    await (await getElementById('drawer-header')).tap();
    await (await getElementById('select-location-con')).tap();
    await (await getElementById('auto-complete-address-input-search-input')).tap();
    await (await getElementById('auto-complete-address-input-search-input')).typeText(location);
    await (await getElementById(location)).tap();
  }
}
