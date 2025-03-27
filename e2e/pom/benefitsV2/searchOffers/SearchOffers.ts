import { getElementById } from '../../../utils/common-actions';
import { nativeTextViewType } from '../../../utils/utils';
import { BaseScreen } from '../../BaseScreen';

export class SearchOffersScreen extends BaseScreen {
  async searchText(text: string) {
    await (await getElementById('search-bar-container')).tap();
    await (await getElementById('search-bar')).typeText(text);
  }

  async clearText() {
    await (await getElementById('search-bar-container')).tap();
    await (await getElementById('search-bar')).clearText();
  }

  async selectCategory(categoryCode: string) {
    await (await getElementById(categoryCode)).tap();
  }

  async searchLocation(location: string) {
    await (await getElementById('select-location-con')).tap();
    await (await getElementById('auto-complete-address-input-search-input')).tap();
    await (await getElementById('auto-complete-address-input-search-input')).replaceText(location);
    await (await getElementById(location)).tap();
  }

  async openInstoreCashback() {
    await (await getElementById('instore-cashback-carousel-header-icon')).tap();
  }

  async checkSelectedLocation(text: string) {
    return waitFor(
      element(
        by
          .type(nativeTextViewType())
          .and(by.text(text))
          .withAncestor(by.id('select-location-con'))
          .withAncestor(by.id('products-list'))
      )
    )
      .toBeVisible()
      .withTimeout(10000);
  }

  async getInstoreCashbackItem(index: number) {
    await (await getElementById('products-list')).scrollTo('bottom');
    return getElementById(`advertiser-${index}`);
  }
}
