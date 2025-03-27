import { getElementById, getElementByLabel } from '../../utils/common-actions';
import { BaseScreen } from '../BaseScreen';

export class PINPasscodeScreen extends BaseScreen {
  async fillPassCode(passcode: string, prompt = 'Show PIN') {
    await (await getElementByLabel(prompt)).tap();
    await (await getElementById(`pin-hidden-input`)).typeText(passcode);
  }

  async confirmPassCode(passcode: string) {
    await element(by.id('pin-hidden-input').withAncestor(by.id('repeated-pin-input-wrapper'))).typeText(passcode);
  }
}
