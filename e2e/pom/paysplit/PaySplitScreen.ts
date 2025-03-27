import type { OptionAmount } from '../../../src/features/income/pay-split/screens/PaySplitPercentageAllocationScreen/types';
import { getElementById, getElementByLabel, getElementByText } from '../../utils/common-actions';
import { BaseScreen } from '../BaseScreen';

export class PaySplitScreen extends BaseScreen {
  async viewIntro() {
    await (await getElementById('paysplit-intro')).swipe('left', 'fast');
    await (await getElementById('paysplit-intro')).swipe('left', 'fast');
  }

  async onboardingGoToPaySplit() {
    await (await getElementByLabel('Pay Split')).tap();
    await this.viewIntro();
    await (await getElementByText("Let's go")).tap();
  }

  async selectEmployerToSplit(orgId: string) {
    await (await getElementById(`dataCardOrgId=${orgId}`)).tap();
  }

  async selectSplitByPercentage() {
    await (await getElementByLabel('Allocate a percentage')).tap();
  }

  async selectPercentageOption(percentage: OptionAmount) {
    await (await getElementById(`paysplit-${percentage}%`)).tap();
    await (await getElementById('gotIt')).tap();
  }

  async confirmPaySplitDetail() {
    await (await getElementByLabel('Confirm')).tap();
  }

  async finishPaySplitFlow() {
    await (await getElementById('pay-split-success-next-btn')).tap();
  }
}
