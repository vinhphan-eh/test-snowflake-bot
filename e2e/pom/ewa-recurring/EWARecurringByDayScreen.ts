import { expect } from 'detox';
import { getElementById, getElementByText } from '../../utils/common-actions';
import { EWARecurringScreen } from './EWARecurringScreen';

export class EWARecurringByDayScreen extends EWARecurringScreen {
  async selectRecurringByDayOptIn() {
    await (await getElementById('schedule-by-day')).tap();
  }

  private async selectDayAndAmount(selectedDay: string, selectedMaxAmount: number) {
    await (await getElementById('day-selection')).tap();
    await (await getElementByText(selectedDay)).tap();
    await (await getElementById('amount-selection')).tap();
    await (await getElementByText(new RegExp(`.*\\-\\$${selectedMaxAmount}$`))).tap();
    await (await getElementByText('Confirm')).tap();
  }

  private async confirmSubscription(selectedDay: string, selectedMaxAmount: number) {
    await (await getElementByText('Next')).tap();
    await expect(
      await getElementByText(`Weekly on ${selectedDay} at 9pm `)
    ).toBeVisible();
    await (await getElementByText('Confirm')).tap();
    await expect(
      await getElementByText(`Cha-ching! You've scheduled to receive up to $${selectedMaxAmount} on ${selectedDay} 💸🎉`)
    ).toBeVisible();
  }

  private async checkExistingByDaySubscription(day: string, amount: number) {
    await expect(
      await getElementByText(`Withdraw $${amount} on ${day}.`)
    ).toBeVisible();
  }

  async setupRecurringByDaySubscription(selectedDay: string, selectedMaxAmount: number, isOptIn: boolean = true) {
    await this.selectDayAndAmount(selectedDay, selectedMaxAmount);
    await this.confirmSubscription(selectedDay, selectedMaxAmount);

    // when opt in, we offer to opt in for push notification, so we need to tap on "Maybe later" to close the screen
    if (isOptIn) {
      await (await getElementByText('Maybe later')).tap();
    } else {
      await (await getElementByText('Done')).tap();
    }

    await this.checkExistingByDaySubscription(selectedDay, selectedMaxAmount);
  }

  async updateSubscription(newDay: string, newMaxAmount: number) {
    await (await getElementById('recurring-section-subscription-edit')).tap();
    await this.setupRecurringByDaySubscription(newDay, newMaxAmount, false);
  }
}
