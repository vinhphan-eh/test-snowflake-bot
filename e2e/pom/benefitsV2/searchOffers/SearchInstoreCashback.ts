import { getElementById } from '../../../utils/common-actions';
import { nativeTextViewType } from '../../../utils/utils';
import { BaseScreen } from '../../BaseScreen';

export class SearchInstoreCashback extends BaseScreen {
  async getScreen() {
    return getElementById('instore-cashback-search-screen');
  }

  async checkSelectedLocation(text: string) {
    return waitFor(
      element(
        by
          .type(nativeTextViewType())
          .and(by.text(text))
          .withAncestor(by.id('select-location-con'))
          .withAncestor(by.id('instore-cashback-search-screen'))
      )
    )
      .toBeVisible()
      .withTimeout(10000);
  }

  async getItem(index: number) {
    await (await getElementById('instore-cashback-search-screen-listview')).scrollTo('bottom', 0.5, 0.5);
    return getElementById(`instore-advertiser-${index}`);
  }

  async searchLocation(location: string) {
    await (await getElementById('select-location-con')).tap();
    await (await getElementById('auto-complete-address-input-search-input')).tap();
    await (await getElementById('auto-complete-address-input-search-input')).replaceText(location);
    await (await getElementById(location)).tap();
  }

  async switchTab(tab: string) {
    await (await getElementById(tab)).tap();
  }

  async getShowMapViewButton() {
    return getElementById('show-map-view-btn');
  }

  async searchText(text: string) {
    await (await getElementById('search-bar-container')).tap();
    await (await getElementById('search-bar')).typeText(text);
  }

  async expectMerchantWithVariousOffers(index: number) {
    await (await getElementById('instore-cashback-search-screen-listview')).scrollTo('bottom', 0.5, 0.5);
    return waitFor(element(by.text('Various offers available').withAncestor(by.id(`instore-advertiser-${index}`))))
      .toBeVisible()
      .withTimeout(10000);
  }
}
