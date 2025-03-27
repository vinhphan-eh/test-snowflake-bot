import { expect } from 'detox';
import { formatToBSBValue } from '../../../src/common/utils/numbers';
import { moneySourceAccount } from '../../data/personal-info';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { NewPayeeScreen } from '../../pom/wallet/pay/NewPayeeScreen';
import { PayeeAddressBookScreen } from '../../pom/wallet/pay/PayeeAddressBookScreen';
import { PaymentConfirmationScreen } from '../../pom/wallet/pay/PaymentConfirmationScreen';
import { PaymentDetailsScreen } from '../../pom/wallet/pay/PaymentDetailsScreen';
import { PaymentTypeScreen } from '../../pom/wallet/pay/PaymentTypeScreen';
import { SuccessScreen } from '../../pom/wallet/pay/SuccessScreen';
import { WalletDashboardScreen } from '../../pom/wallet/WalletDashboardScreen';
import { backToMoneyPillar, getElementByText, sleep } from '../../utils/common-actions';
import { randomAlphaString } from '../../utils/utils';

describe('Pay and transactions', () => {
  let authScreen: AuthScreen;
  let walletDashboardScreen: WalletDashboardScreen;
  let payeeAddressBookScreen: PayeeAddressBookScreen;
  let newPayeeScreen: NewPayeeScreen;
  let paymentDetailsScreen: PaymentDetailsScreen;
  let paymentConfirmationScreen: PaymentConfirmationScreen;
  let successScreen: SuccessScreen;
  let paymentTypeScreen: PaymentTypeScreen;

  beforeAll(async () => {
    await device.enableSynchronization();
    await device.launchApp();
    authScreen = new AuthScreen();
    await authScreen.loginWith(moneySourceAccount.email, moneySourceAccount.password);
    walletDashboardScreen = new WalletDashboardScreen();
    payeeAddressBookScreen = new PayeeAddressBookScreen();
    newPayeeScreen = new NewPayeeScreen();
    paymentDetailsScreen = new PaymentDetailsScreen();
    paymentConfirmationScreen = new PaymentConfirmationScreen();
    successScreen = new SuccessScreen();
    paymentTypeScreen = new PaymentTypeScreen();
  });

  afterAll(async () => {
    await device.terminateApp();
  });

  beforeEach(async () => {
    await backToMoneyPillar('spend-tab');
  });

  const makeTransaction = async (payeeName: string, amount: number, bsb: string, accountNumber: string) => {
    await walletDashboardScreen.visitPayAnyoneScreen();
    await payeeAddressBookScreen.pressAddPayeeFAB();
    await newPayeeScreen.fillPayeeDetailsForm(payeeName, bsb, accountNumber);
    await newPayeeScreen.pressNextButton();
    await paymentDetailsScreen.fillPaymentDetailsForm(amount, 'Test payment', 'Test reference');
    await paymentDetailsScreen.pressNextButton();
    await paymentTypeScreen.selectPaymentNowType();
    await paymentConfirmationScreen.pressConfirmButton();
    waitFor(await getElementByText('Payment sent')).toBeVisible();
    await successScreen.pressDoneButton();
  };

  async function refreshUntilTransactionFound(payeeName: string, timeout = 10_000) {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      try {
        const element = await getElementByText(payeeName, 2000);
        if (element) return element;
      } catch (e) {
        await walletDashboardScreen.refreshPage();
        await sleep(5000);
      }
    }

    throw new Error(`Transaction with payee name "${payeeName}" not found after ${timeout}ms`);
  }

  it('pay and view transactions detail', async () => {
    await walletDashboardScreen.acknowledgeATMWithdrawalAlert();

    const randomPayeeName = `Payee ${randomAlphaString(5)}`;
    const amount = 1;
    const bsb = '123456';
    const accountNumber = '654321';
    await makeTransaction(randomPayeeName, amount, bsb, accountNumber);
    await sleep(1000);
    await walletDashboardScreen.refreshPage();
    const accountTransactionsElement = await getElementByText('Account transactions');
    await accountTransactionsElement.swipe('up', 'slow', 0.1);
    await refreshUntilTransactionFound(randomPayeeName, 100_000);
    await (await getElementByText(randomPayeeName)).tap();

    await expect(await getElementByText('You sent')).toBeVisible();
    await expect(await getElementByText('To this account')).toBeVisible();
    await expect(await getElementByText(`${formatToBSBValue(bsb)} ${accountNumber}`)).toBeVisible();
  });
});
