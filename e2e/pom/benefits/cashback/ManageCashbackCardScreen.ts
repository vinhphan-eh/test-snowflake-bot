import dayjs from 'dayjs';
import {
  getElementById,
  getElementByIdWithIndex,
  getElementByLabel,
  getElementByText,
  sleep,
} from '../../../utils/common-actions';
import { BaseScreen } from '../../BaseScreen';

const selectBtn = device.getPlatform() === 'android' ? 'Done' : 'Confirm';

export class ManageCashbackCardScreen extends BaseScreen {
  async goToBenefitsSettings() {
    await (await getElementById('benefits-online', 10000)).swipe('left');
    await sleep(1000);
    await (await getElementByText('Settings')).tap();
  }

  async goToMangeCardsFromSetting() {
    await (await getElementByText('Manage enrolled cards')).tap();
  }

  async enrolCard() {
    await (await getElementByText('Add card')).tap();
    await sleep(1000);

    if (device.getPlatform() === 'android') {
      await (await getElementByText('Card number')).tap();
      // we need to type text to the `text-input` element, not the `card-number-input` element
      await (await getElementByIdWithIndex({ value: 'text-input', index: 0 })).typeText('4539838525074089');
    } else {
      await (await getElementById('card-number-input')).tap();
      await (await getElementById('card-number-input')).typeText('4539838525074089');
    }
    await (await getElementById('dob-input')).tap();
    if (device.getPlatform() === 'ios') {
      const monthLabel = dayjs().add(2, 'month').format('MMMM');
      await (await getElementByLabel(monthLabel)).tap();
    }
    await (await getElementByText(selectBtn)).tap();
    await (await getElementById('enrol-card-details-screen')).tap();
    await sleep(1000);
    await (await getElementByText('Bank provider')).tap();
    await (await getElementByText('ANZ Bank')).tap();
    await sleep(1000);
    await (await getElementByText('Add')).tap();
  }

  async removeCard() {
    try {
      await (await getElementById('4089-ANZ Bank')).tap();
      await (await getElementByText('Yes, remove card')).tap();
    } catch {
      console.log('Card not found');
    }
  }
}
