import { getElementById } from '../../../utils/common-actions';
import { BaseScreen } from '../../BaseScreen';

export class BillStreamWaitlistPopup extends BaseScreen {
  async closePopup() {
    const buttonId = 'close_btn';
    let isVisible;
    try {
      await getElementById(buttonId, 15000);
      isVisible = true;
    } catch (err) {
      isVisible = false;
    }

    if (isVisible) {
      await (await getElementById(buttonId)).tap();
    } else {
      console.log(`Element ${buttonId} is not visible. Continuing execution...`);
    }
  }
}
