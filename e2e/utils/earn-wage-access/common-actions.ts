import { AuthScreen } from '../../pom/auth/AuthScreen';
import { IncomeDashboardScreen } from '../../pom/earn-wage-access/IncomeDashboardScreen';

export const loginAndGoToIncomeTab = async (
  email: string,
  password: string,
  isKeypay = false,
  country: string = 'AU'
) => {
  const authScreen = new AuthScreen();
  const incomeDashboardScreen = new IncomeDashboardScreen();

  if (isKeypay) {
    await authScreen.loginWithKp(email, password, country);
  } else {
    await authScreen.loginWith(email, password);
  }

  /**
   * If the Income tab is selected as the default, the BTS could have been shown at this step and overlapped the navigation bar.
   * We will then check for its existence before switching the tab to Income, and if it was not closed previously, we will check
   * and trigger its closure again after the tab switch.
   */
  const closedEstimatedIncomeBts = await incomeDashboardScreen.closeEstimatedIncomeGettingStartedBts();

  await incomeDashboardScreen.accessIncomeSection();

  if (!closedEstimatedIncomeBts) {
    await incomeDashboardScreen.closeEstimatedIncomeGettingStartedBts();
  }
};
