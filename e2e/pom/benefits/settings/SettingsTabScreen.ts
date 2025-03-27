import { getElementByText, getElementById, sleep } from '../../../utils/common-actions';
import { BaseScreen } from '../../BaseScreen';

export class SettingsTabScreen extends BaseScreen {
  async goToBenefitsSettings() {
    await (await getElementById('benefits-online')).swipe('left');
    await sleep(1000);
    await (await getElementByText('Settings')).tap();
  }

  async goToHelpCentre() {
    // on android, the test will fail if we tap the element
    if (device.getPlatform() === 'android') {
      await expect(await getElementByText('Visit our Help Centre')).toBeVisible();
    } else {
      await (await getElementByText('Visit our Help Centre')).tap();
    }
  }

  async fillOutBugReportForm() {
    await (await getElementById('support-request-textarea')).typeText('Big bug on my screen!');
    await (await getElementById('textfield-dissmiss-wrapper')).tap();
  }

  async submitBugReportForm() {
    await (await getElementById('support_form')).tap();
  }
}
