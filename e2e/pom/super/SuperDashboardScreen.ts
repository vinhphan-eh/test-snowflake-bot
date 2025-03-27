import { getElementByText } from '../../utils/common-actions';
import { BaseScreen } from '../BaseScreen';

export class SuperDashboardScreen extends BaseScreen {
  async pressLearnMoreButton() {
    const timeout = 20 * 1000;
    await (await getElementByText('Learn more', timeout)).tap();
  }

  async pressBoostNowButton() {
    await (await getElementByText('Boost now')).tap();
  }

  async playWithSalarySacrificeIntroCarousel() {
    await (await getElementByText(`What is salary sacrifice?`)).swipe('left', 'slow');
    await (await getElementByText('Why should I contribute?')).swipe('left', 'slow');
  }

  // Super consolidation
  async pressFindOutNowButton() {
    const timeout = 20 * 1000;
    await (await getElementByText('Find lost super now', timeout)).tap();
  }

  async playWithSuperConsolidationIntroCarousel() {
    await (await getElementByText('How might I have lost super?')).swipe('left');
    await (await getElementByText('How does it work?')).swipe('left');
  }
}
