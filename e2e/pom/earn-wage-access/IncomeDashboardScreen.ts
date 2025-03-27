import {
  getElementById,
  getElementByLabel,
  getElementByLabelWithIndex,
  getElementByText,
  getTextInputById,
  inputNumberOnAndroid,
  sleep,
  typeTextById,
  typeTextByIdAndReturn,
} from '../../utils/common-actions';
import { BaseScreen } from '../BaseScreen';

export class IncomeDashboardScreen extends BaseScreen {
  async viewIntro() {
    await (await getElementById('instapay-intro')).swipe('left', 'slow');
    await (await getElementById('instapay-intro')).swipe('left', 'slow');
  }

  async selectEmployer(organisationName: string) {
    const selectEmployeeTitle = await getElementByText('Choose an employer to get paid from');
    await expect(selectEmployeeTitle).toBeVisible();

    await (await getElementById('choosing-employer-select')).tap();
    await (await getElementById(`select-option-org-${organisationName}`)).tap();
  }

  async enterInstaPayAmount(amount: number, currencySymbol: '$' | '£' = '$') {
    await (await getElementByLabel('Other')).tap();
    if (device.getPlatform() === 'ios') {
      await typeTextByIdAndReturn('custom-chip-input', amount.toString());
      await (await getElementById('income-dashboard-v2')).scrollTo('bottom');
      await (await getElementByLabel(`Withdraw ${currencySymbol}${amount} now`)).tap();
    } else {
      await inputNumberOnAndroid('custom-chip-input', amount.toString());
      await sleep(1000);
      await (await getElementByLabel(`Withdraw ${currencySymbol}${amount} now`)).tap();
    }
  }

  async nextOnSelectBankAccount() {
    await (await getElementByText('Next')).tap();
  }

  async confirmInstaPayDetails() {
    await (await getElementById('instapay-details-confirm')).tap();
  }

  async finishInstaPayFlow() {
    // The close can be either 'Done' or 'Maybe later' depending on the SSA setup status
    const closeBtnMatcher = /Done|Maybe later/;
    if (device.getPlatform() === 'ios') {
      await (await getElementByText(closeBtnMatcher)).tap();
    } else {
      await (await getElementByLabelWithIndex({ value: closeBtnMatcher, index: 1 })).tap();
    }
  }

  async selectOrg(orgId: string) {
    const orgItem = await getElementById(orgId);
    await orgItem.tap();
  }

  async expectGenericErrMsg() {
    await expect(await getElementByText('Withdraw now is currently unavailable.')).toBeVisible();
    await expect(await getElementByText("You haven't worked 3 consecutive pay periods.")).toBeVisible();
    await expect(
      await getElementByText('You have not accrued any income during your current pay cycle.')
    ).toBeVisible();
    await expect(
      await getElementByText('You do not meet the minimum age requirement of 16 years and older.')
    ).toBeVisible();
  }

  async selectHeaderMiniTab(tabName: 'Recurring' | 'Now' | 'Daily') {
    const tab = await getElementById(`header-tab-${tabName}`);
    await tab.tap();
  }

  async enterCustomAmount(amount: number) {
    const otherOption = await getElementByText('Other');

    // Swipe at this step since in case a user is multi-org, the chip input may not be visible
    // pushed out of the screen by the Employer selection section
    await otherOption.swipe('up', 'slow', 0.3);
    await otherOption.tap();

    await typeTextById('custom-chip-input', amount.toString());
    await getTextInputById('custom-chip-input').swipe('up', 'slow', 0.3);
  }

  async goToHistoryScreen() {
    await this.accessIncomeSection();
    await (await getElementById('header-tab-Now')).tap();
    await (await getElementById('ewa-manage')).tap();
  }

  async closeEstimatedIncomeGettingStartedBts() {
    try {
      const estimatedIncomeBts = await getElementByText('Getting started', 1000);

      if (estimatedIncomeBts) {
        await (await getElementById('bottom-sheet-close-icon')).tap();
        return true;
      }
    } catch (error) {
      console.log('Not showing Estimated Income Getting started Bottom sheet');
    }

    return false;
  }
}
