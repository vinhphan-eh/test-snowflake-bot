import { expect } from 'detox';
import { moneySourceAccount, payAnyoneAndroidAccount, payAnyoneIOSAccount } from '../../data/personal-info';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { WalletDashboardScreen } from '../../pom/wallet/WalletDashboardScreen';
import { NewPayeeScreen } from '../../pom/wallet/pay/NewPayeeScreen';
import { PayeeAddressBookScreen } from '../../pom/wallet/pay/PayeeAddressBookScreen';
import { PaymentConfirmationScreen } from '../../pom/wallet/pay/PaymentConfirmationScreen';
import { PaymentDetailsScreen } from '../../pom/wallet/pay/PaymentDetailsScreen';
import { PaymentTypeScreen } from '../../pom/wallet/pay/PaymentTypeScreen';
import { getElementById, getElementByText } from '../../utils/common-actions';

describe('Pay Anyone', () => {
  let authScreen: AuthScreen;
  let walletDashboardScreen: WalletDashboardScreen;
  let payeeAddressBookScreen: PayeeAddressBookScreen;
  let newPayeeScreen: NewPayeeScreen;
  let paymentDetailsScreen: PaymentDetailsScreen;
  let paymentConfirmationScreen: PaymentConfirmationScreen;
  let paymentTypeScreen: PaymentTypeScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    walletDashboardScreen = new WalletDashboardScreen();
    payeeAddressBookScreen = new PayeeAddressBookScreen();
    newPayeeScreen = new NewPayeeScreen();
    paymentDetailsScreen = new PaymentDetailsScreen();
    paymentConfirmationScreen = new PaymentConfirmationScreen();
    paymentTypeScreen = new PaymentTypeScreen();
  });

  beforeEach(async () => {
    await device.launchApp();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('User can pay anyone with payment type of Now', async () => {
    await authScreen.loginWith(moneySourceAccount.email, moneySourceAccount.password);
    await walletDashboardScreen.accessWalletSection();
    await walletDashboardScreen.acknowledgeATMWithdrawalAlert();

    await walletDashboardScreen.visitPayAnyoneScreen();

    await payeeAddressBookScreen.pressAddPayeeFAB();

    await newPayeeScreen.fillPayeeDetailsForm('The Payee', '111111', '11111111');
    await newPayeeScreen.pressNextButton();

    await paymentDetailsScreen.fillPaymentDetailsForm(1, 'Test payment', 'Test reference');
    await paymentDetailsScreen.pressNextButton();
    await paymentTypeScreen.selectPaymentNowType();

    await expect(await getElementByText('Please confirm your payment')).toBeVisible();
    await expect(await getElementByText("You're sending")).toBeVisible();
    await expect(await getElementByText('$1.00')).toBeVisible();
    await paymentConfirmationScreen.pressConfirmButton();

    await expect(await getElementByText('Payment sent')).toBeVisible();
    await expect(await getElementByText('You sent $1.00 to The Payee for Test payment.')).toBeVisible();
  });

  it('User can pay anyone with payment type of Now and amount is over 100', async () => {
    const sendingAccount = device.getPlatform() === 'ios' ? payAnyoneIOSAccount : payAnyoneAndroidAccount;
    const reciverAccount = device.getPlatform() === 'ios' ? payAnyoneAndroidAccount : payAnyoneIOSAccount;

    await authScreen.loginWith(sendingAccount.email, sendingAccount.password);
    await walletDashboardScreen.accessWalletSection();
    await walletDashboardScreen.acknowledgeATMWithdrawalAlert();

    await walletDashboardScreen.visitPayAnyoneScreen();

    await payeeAddressBookScreen.pressAddPayeeFAB();

    await newPayeeScreen.fillPayeeDetailsForm('The Payee', reciverAccount.bsb, reciverAccount.account_number);
    await newPayeeScreen.pressNextButton();

    await paymentDetailsScreen.fillPaymentDetailsForm(101, 'Test payment $101', 'Test reference 101');
    await paymentDetailsScreen.pressNextButton();
    await paymentTypeScreen.selectPaymentNowType();

    await expect(await getElementByText('Please confirm your payment')).toBeVisible();
    await expect(await getElementByText("You're sending")).toBeVisible();
    await expect(await getElementByText('$101.00')).toBeVisible();
    await paymentConfirmationScreen.pressConfirmButton();
    await (await getElementById('pin-hidden-input')).typeText('222222');

    await expect(await getElementByText('Payment sent')).toBeVisible();
    await expect(await getElementByText('You sent $101.00 to The Payee for Test payment $101.')).toBeVisible();
  });
});
