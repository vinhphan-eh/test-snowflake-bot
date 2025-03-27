import { expect } from 'detox';
import { personalInfo } from '../../data/personal-info';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { PINPasscodeScreen } from '../../pom/pin/PINPasscodeScreen';
import { SetupWalletScreen } from '../../pom/wallet/SetupWalletScreen';
import { createRandomUser } from '../../utils/api';
import { getElementByText, sleep } from '../../utils/common-actions';

describe('Setup Wallet', () => {
  let authScreen: AuthScreen;
  let walletScreen: SetupWalletScreen;
  let pinPasscodeScreen: PINPasscodeScreen;

  beforeAll(async () => {
    await device.enableSynchronization();
    authScreen = new AuthScreen();
    walletScreen = new SetupWalletScreen();
    pinPasscodeScreen = new PINPasscodeScreen();
  });

  beforeEach(async () => {
    await device.launchApp();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('Setup eWallet successfully without Onfido, PaySplit and Digital Provisioning', async () => {
    const { email, password } = await createRandomUser();
    await authScreen.loginWith(email, password);
    await walletScreen.updateRegionToAustralia();
    await walletScreen.processWalletSetupAndCarousel();
    await walletScreen.confirmPrivacyPolicy();
    await sleep(3 * 1000);
    await walletScreen.confirmTermAndConditions();
    await walletScreen.nextOnLegalAgreement();
    await walletScreen.nextOnTaxObligations();

    // await walletScreen.fillNameInfo(personalInfo.userInfo);
    await walletScreen.fillMobileNumber(personalInfo.phone());
    await walletScreen.fillInAddressBySearching(personalInfo.address.full);
    await walletScreen.selectBirthday();
    await walletScreen.editNameAndConfirmProfileDetail();
    await walletScreen.selectIdVerification();
    await walletScreen.fillInPassport(personalInfo.passport);
    await walletScreen.confirmIdVerificationAndGoNext();

    await expect(await getElementByText('Great, your account is set up.')).toBeVisible();
    await walletScreen.skipPayslit();
    await pinPasscodeScreen.fillPassCode(personalInfo.pinPasscode);
    await pinPasscodeScreen.confirmPassCode(personalInfo.pinPasscode);
    await walletScreen.sendCard();
    await walletScreen.doThisLaterInDigitalProvisioning();
    await walletScreen.goToWallet();
  });

  it('should not be eligible to set up eWallet if user is under 16 years old', async () => {
    const { email, password } = await createRandomUser();
    await authScreen.loginWith(email, password);
    await walletScreen.updateRegionToAustralia();
    await walletScreen.processWalletSetupAndCarousel();

    await walletScreen.confirmPrivacyPolicy();
    await sleep(3 * 1000);
    await walletScreen.confirmTermAndConditions();
    await walletScreen.nextOnLegalAgreement();

    await walletScreen.proceedOnTaxObligations();
    await walletScreen.fillTaxObligationDetails('AB123456D');
    await walletScreen.fillMobileNumber(personalInfo.phone());
    await walletScreen.fillInAddressBySearching(personalInfo.address.full);
    await walletScreen.selectUnder16Birthday();

    await walletScreen.confirmProfileDetails();
    await expect(await getElementByText("We're sorry, you don't qualify for a Swag Spend account.")).toBeVisible();
    await expect(
      await getElementByText(
        "Your application can't be processed as you need to be over the age of 16 to set up a Swag Spend account."
      )
    ).toBeVisible();
  });
});
