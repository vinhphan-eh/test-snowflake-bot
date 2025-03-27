import { getElementById } from '../../utils/common-actions';
import { BaseScreen } from '../BaseScreen';

export class InstoreTab extends BaseScreen {
  async getScreen() {
    return getElementById('instore-tab');
  }

  async openNearByDrawer() {
    await (await getElementById('drawer-header')).tap();
  }

  async getActivatedFilterButton() {
    return getElementById('filter-btn');
  }

  async getSelectedCategory(category: string) {
    return getElementById(`${category}_selected`);
  }

  async getSearchBar() {
    return getElementById('search-bar');
  }
}
