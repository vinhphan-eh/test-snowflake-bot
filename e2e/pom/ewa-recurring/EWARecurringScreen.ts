import { expect } from 'detox';
import { getElementById, getElementByText, tapByText, typeTextById } from '../../utils/common-actions';
import { BaseScreen } from '../BaseScreen';

export class EWARecurringScreen extends BaseScreen {
  async selectEmployer(organisationName: string) {
    const selectEmployeeTitle = await getElementByText('Choose an employer to get paid from');
    await expect(selectEmployeeTitle).toBeVisible();

    await (await getElementById('choosing-employer-select')).tap();
    await (await getElementById(`select-option-org-${organisationName}`)).tap();
  }

  async checkSubTitle() {
    const amountTitle = await getElementByText('Set a withdrawal amount');
    await expect(amountTitle).toBeVisible();
  }

  private async checkExistingSubscription() {
    await expect(await getElementByText('Your recurring payments are set to:')).toBeVisible();
  }

  async goToBankSelection(amount: number, currencySymbol: '$' | '£' = '$') {
    await expect(await getElementByText(`Withdraw every ${currencySymbol}${amount} earned`)).toBeVisible();

    const withdrawButton = await getElementById('custom-chip-cta');
    await withdrawButton.multiTap(2);
  }

  async confirmAtConfirmationScreen(action: 'creation' | 'modification') {
    await (await getElementById('instapay-scheduling-confirm')).tap();
    await (await getElementByText(action === 'creation' ? 'Maybe later' : 'Done')).tap();
  }

  async confirmAtBankSelection(action: 'creation' | 'modification') {
    await expect(await getElementByText('Your Earned Pay')).toBeVisible();
    await tapByText('Next');
    await this.confirmAtConfirmationScreen(action);
    await this.checkExistingSubscription();
  }

  async updateSubscriptionAmount(newAmount: number, isUK?: boolean) {
    const editSubscription = await getElementById('recurring-section-subscription-edit');
    await editSubscription.tap();

    await typeTextById('input-scheduling-amount', newAmount.toString());
    if (device.getPlatform() === 'android') {
      await device.pressBack();
    }

    await (await getElementByText('Choose a receiving account')).tap(); // To hide the keyboard
    await (await getElementByText('* Each withdrawal incurs a transaction fee.')).swipe('up', 'slow', 0.7);

    await (await getElementById('instapay-scheduling-update')).multiTap(2);

    if (isUK) {
      await this.confirmAtConfirmationScreen('modification');
    } else {
      await (await getElementByText('Done')).tap();
    }

    await this.checkExistingSubscription();
  }

  async cancelSubscription(organisationName?: string) {
    await (await getElementById('ewa-manage')).tap();
    try {
      await expect(await getElementByText('Cancel recurring withdrawal')).toBeVisible();
    } catch (_) {
      await (await getElementById('topbar-back-icon')).tap();
      return;
    }
    await (await getElementByText('Cancel recurring withdrawal')).tap();
    await (await getElementByText('Yes, cancel')).tap();
    await (await getElementByText('Done')).tap();
    await (await getElementByText('Not now')).tap();
    await (await getElementById(`header-tab-Recurring`)).tap();

    if (organisationName) {
      await this.selectEmployer(organisationName);
    }
  }

  async closeRecurringGettingStartedBts() {
    try {
      const recurringGettingStartedBts = await getElementByText('Getting started', 1000);

      if (recurringGettingStartedBts) {
        await (await getElementById('bottom-sheet-close-icon')).tap();
      }
    } catch (error) {
      console.log('Not showing Recurring Getting started Bottom sheet');
    }
  }
}
