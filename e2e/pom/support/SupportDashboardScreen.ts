import { getElementById, getElementByLabel, sleep, typeTextById } from '../../utils/common-actions';
import { BaseScreen } from '../BaseScreen';

export class SupportDashboardScreen extends BaseScreen {
  async goToSpendAccountComplaint() {
    await (await getElementByLabel('Spend account complaints')).tap();
  }

  async fillOutSupportRequestForm() {
    await sleep(3000);
    await typeTextById('support-request-textarea', 'Support Request');
    await (await getElementById('textfield-dissmiss-wrapper')).tap();
    await sleep(3000);
  }

  async submitSupportRequestForm() {
    if (device.getPlatform() === 'android') {
      await element(by.type('android.widget.EditText').withAncestor(by.id('support-request-textarea'))).swipe('up');
    }
    const submitButton = await getElementById('button-submit-complaint-form');
    await submitButton.multiTap(2);
  }

  async finishSupportRequest() {
    await (await getElementById('support-outcome-done-btn')).tap();
  }
}
