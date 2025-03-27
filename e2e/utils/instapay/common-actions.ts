import { AuthScreen } from '../../pom/auth/AuthScreen';
import { InstaPayScreen } from '../../pom/instapay/InstaPayScreen';

export const loginAndGoToIncomeTab = async (email: string, password: string, isKeypay = false, openInstaPay = true) => {
  const authScreen = new AuthScreen();
  const instaPayScreen = new InstaPayScreen();

  if (isKeypay) {
    await authScreen.loginWithKp(email, password);
  } else {
    await authScreen.loginWith(email, password);
  }
  await instaPayScreen.accessIncomeSection();
  if (openInstaPay) {
    await instaPayScreen.openInstaPay();
  }
};
