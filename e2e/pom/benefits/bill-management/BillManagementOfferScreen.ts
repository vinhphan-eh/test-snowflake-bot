import {
  getElementById,
  getElementByIdIfExisted,
  getElementByLabelWithIndex,
  getElementByText,
  sleep,
} from '../../../utils/common-actions';
import { BaseScreen } from '../../BaseScreen';

export class BillManagementOfferScreen extends BaseScreen {
  async goToOnlineBills() {
    await (await getElementById('benefits-online')).tap();
  }

  async goToPurchase() {
    await (await getElementById('benefits-purchases')).tap();
  }

  async goToBillManagement() {
    await (await getElementById('go-to-bill-management')).tap();
  }

  async goToBillManagementSubscriptionDetail() {
    await (await getElementByLabelWithIndex({ value: 'bill-management-card', index: 1 })).tap();
  }

  async closeDisclaimer() {
    await getElementByIdIfExisted('bottom-sheet-scroll-view', async element => {
      await element.scrollTo('bottom');
      await element.scrollTo('bottom');
      await (await getElementById('accept-btn')).tap();
    });
  }

  async goToBillSEOffer() {
    await sleep(3000);

    await waitFor(element(by.id('bill-offer-1')))
      .toBeVisible()
      .whileElement(by.id('bill-carousel-list'))
      .scroll(100, 'right');

    await (await getElementById('bill-offer-1')).tap();
    await this.closeDisclaimer();
  }

  async goToSignUp() {
    await (await getElementById('bill-offer-view-offer')).tap();
  }

  async acceptReminder() {
    await (await getElementById('reminder-got-it-btn')).tap();
  }

  async selectState() {
    await getElementByIdIfExisted('bottom-sheet-state-based-select', async () => {
      await (await getElementByText('NSW')).tap();
    });
  }

  async expectBillDetailScreen() {
    waitFor(element(by.id('Description')))
      .toBeVisible()
      .whileElement(by.id('bill_offer_detail_scrollview'));
  }

  async goToBillsTab() {
    await (await getElementByText('Bills')).tap();
  }
}
