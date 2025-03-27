import { getElementById } from '../../../utils/common-actions';
import { nativeTextViewType } from '../../../utils/utils';
import { BaseScreen } from '../../BaseScreen';

export class InStoreOfferDetailsV2Screen extends BaseScreen {
  async getScreen() {
    return getElementById('instore-offer-detail-v2-screen');
  }

  async checkSelectedLocation(text: string) {
    return waitFor(
      element(
        by
          .type(nativeTextViewType())
          .and(by.text(text))
          .withAncestor(by.id('select-location-con'))
          .withAncestor(by.id('instore-offer-detail-v2-screen'))
      )
    )
      .toBeVisible()
      .withTimeout(10000);
  }

  async getViewAllStoresButton() {
    return getElementById('view-all-nearby-stores');
  }
}
