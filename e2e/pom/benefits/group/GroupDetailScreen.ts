import { getElementById, getElementByText, sleep } from '../../../utils/common-actions';
import { BaseScreen } from '../../BaseScreen';

export class GroupDetailScreen extends BaseScreen {
  async goToMegadealCarousel() {
    await sleep(1000);
    await (await getElementByText('Help shape the deals of the future')).tap();
    await (await getElementByText('Support the Swag community')).swipe('left');
    await (await getElementByText('Power in numbers')).swipe('left');

    await (await getElementByText('Childcare')).tap();
    await (await getElementByText('Education')).tap();
    await (await getElementByText('Home internet')).tap();

    await (await getElementByText('Next')).tap();
    await (await getElementByText("Let's go")).tap();
  }

  async goToGroupDetail() {
    await sleep(1000);
    await (await getElementById('benefits-online')).tap();
    await (await getElementById('online-tab-v2')).scrollTo('bottom');
    await (await getElementById('megadeal-group-item-0')).tap();
  }

  async joinGroup() {
    await sleep(1000);
    await (await getElementById('join-group-button')).tap();
    await (await getElementById('confirm-yes-join-group-btn')).tap();
  }
}
