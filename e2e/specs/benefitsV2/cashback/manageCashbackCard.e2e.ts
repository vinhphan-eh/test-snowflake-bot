import { expect } from 'detox';
import { benefitsTestAccount } from '../../../data/personal-info';
import { AuthScreen } from '../../../pom/auth/AuthScreen';
import { ManageCashbackCardScreen } from '../../../pom/benefits/cashback/ManageCashbackCardScreen';
import { getElementById, getElementByText, sleep } from '../../../utils/common-actions';

describe('Manage Cashback card', () => {
  let authScreen: AuthScreen;
  let manageCardScreen: ManageCashbackCardScreen;

  beforeEach(async () => {
    await device.launchApp();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('add and remove card', async () => {
    authScreen = new AuthScreen();
    await authScreen.loginWith(
      benefitsTestAccount.benefitsIaV2WithCard.email,
      benefitsTestAccount.benefitsIaV2WithCard.password,
      {
        pillar: 'benefits',
      }
    );
    manageCardScreen = new ManageCashbackCardScreen();
    await manageCardScreen.goToBenefitsSettings();
    await manageCardScreen.goToMangeCardsFromSetting();
    await manageCardScreen.enrolCard();

    await expect(await getElementById('4089-ANZ Bank', 15000)).toBeVisible();

    // clean up
    await manageCardScreen.removeCard();
    await sleep(2000);
    await expect(element(by.id('4089-ANZ Bank'))).not.toBeVisible();
  });

  it('show open a spend account when no swag card', async () => {
    authScreen = new AuthScreen();
    await authScreen.loginWith(
      benefitsTestAccount.benefitsIaV2NoSSACard.email,
      benefitsTestAccount.benefitsIaV2NoSSACard.password,
      {
        pillar: 'benefits',
      }
    );
    await manageCardScreen.goToBenefitsSettings();
    await manageCardScreen.goToMangeCardsFromSetting();

    await expect(await getElementByText('Claim your cash!')).toBeVisible();
    await expect(await getElementByText('Open a Spend account')).toBeVisible();
  });
});
