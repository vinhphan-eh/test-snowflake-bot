import { expect } from 'detox';
import { benefitsTestAccount } from '../../../data/personal-info';
import { AuthScreen } from '../../../pom/auth/AuthScreen';
import { CashBackOverviewScreen } from '../../../pom/benefits/cashback/CashbackOverviewScreen';
import { getElementByText } from '../../../utils/common-actions';

describe('Cashback Earnings', () => {
  let authScreen: AuthScreen;
  let cashbackOverviewScreen: CashBackOverviewScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    cashbackOverviewScreen = new CashBackOverviewScreen();
  });

  beforeEach(async () => {
    await device.launchApp();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('View cashback earnings', async () => {
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      pillar: 'benefits',
    });
    await cashbackOverviewScreen.goToEarnings();
    await expect(await getElementByText('Lifetime cashback')).toBeVisible();
    await expect(await getElementByText('Cashback history')).toBeVisible();
  });
});
