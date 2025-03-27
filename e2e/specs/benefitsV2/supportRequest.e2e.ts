import { expect } from 'detox';
import { benefitsTestAccount } from '../../data/personal-info';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { SettingsTabScreen } from '../../pom/benefits/settings/SettingsTabScreen';
import { getElementByText } from '../../utils/common-actions';

describe('Benefits Settings Request', () => {
  let authScreen: AuthScreen;
  let settingsTabScreen: SettingsTabScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    settingsTabScreen = new SettingsTabScreen();
  });

  beforeEach(async () => {
    await device.launchApp();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('can open Help Centre correctly', async () => {
    await authScreen.loginWith(benefitsTestAccount.benefitsIaV2.email, benefitsTestAccount.benefitsIaV2.password, {
      pillar: 'benefits',
    });
    await settingsTabScreen.goToBenefitsSettings();

    await expect(await getElementByText('Need a hand?')).toBeVisible();
    await expect(await getElementByText('We are here to answer your Benefits-related questions.')).toBeVisible();
    await expect(await getElementByText('Visit our Help Centre')).toBeVisible();

    await settingsTabScreen.goToHelpCentre();
  });
});
