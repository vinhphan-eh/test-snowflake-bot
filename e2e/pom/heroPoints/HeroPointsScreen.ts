import { getElementById, getElementByIdWithIndex, getElementByText, sleep } from '../../utils/common-actions';
import { BaseScreen } from '../BaseScreen';

export class HeroPointsScreen extends BaseScreen {
  async viewHeroPointsCarousel() {
    const carouselId = 'redeem-hero-points-with-swag-card-intro';
    let isVisible;
    try {
      await (await getElementById(carouselId)).swipe('left', 'fast');
      await (await getElementById(carouselId)).swipe('left', 'fast');
      isVisible = true;
    } catch (err) {
      isVisible = false;
    }

    if (isVisible) {
      await (await getElementById('pay-with-hd-close')).tap();
    } else {
      console.log(`Element ${carouselId} is not visible. Continuing execution...`);
    }
  }

  async gotoHeroPoints() {
    await (await getElementByText('Spend')).swipe('left');
    await sleep(1000);
    await (await getElementByText('Points')).tap();
  }

  async goToTransactionDetail() {
    await (await getElementByText('Points transactions')).swipe('up', 'fast');
    await (await getElementByIdWithIndex({ value: 'hero-points-transaction-item' })).tap();
  }

  async goBackToHeroPointsDashboard() {
    await (await getElementByText('Done')).tap();
  }

  async minimizeTransactionDrawer() {
    await (await getElementByText('Points transactions')).swipe('down', 'fast');
  }
}
