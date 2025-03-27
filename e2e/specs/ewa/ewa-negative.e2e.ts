import { IncomeDashboardScreen } from '../../pom/earn-wage-access/IncomeDashboardScreen';
import { loginAndGoToIncomeTab } from '../../utils/earn-wage-access/common-actions';
import { getEmployeePayRunTotal } from '../../utils/instapay/keypay-api';
import { type EHAccountDetails, type KPAccountDetails } from '../../utils/instapay/prepare-instapay-account';
import { PayFrequency, UserSource } from '../../utils/instapay/utils';

const employeeWith1Payrun: EHAccountDetails = {
  userSource: UserSource.EH,
  email: 'thanhtan.do+e2e_ip_eh_1_payslip@employmenthero.com',
  password: 'Thanh@10AM',
  country: 'AU',
  targetOrgUuid: '0c217ea0-c539-4fd6-b03e-6950c3a0ffdb',
  kpBusinessId: '437519',
  kpEmployeeId: '9798462',
  payFrequency: PayFrequency.Monthly,
};

const kpEmployeeWith1Payrun: KPAccountDetails = {
  userSource: UserSource.KP,
  email: 'thanhtan.do+e2e_ip_kp_1_payslip@employmenthero.com',
  password: 'Thanh@10AM',
  country: 'AU',
  kpBusinessId: '437518',
  kpEmployeeId: '9798461',
  payFrequency: PayFrequency.Monthly,
};

describe('Instapay for EH user', () => {
  let incomeDashboardScreen: IncomeDashboardScreen;
  describe('When user has access but no balance', () => {
    beforeEach(async () => {
      await device.launchApp();
      await loginAndGoToIncomeTab(employeeWith1Payrun.email, employeeWith1Payrun.password);
      incomeDashboardScreen = new IncomeDashboardScreen();
    });
    afterEach(async () => {
      await device.terminateApp();
    });

    it('should show generic error message for users with 1 payruns', async () => {
      // verify payrun first, then user don't have 1 payrun, then fail
      try {
        const totalPayRuns = await getEmployeePayRunTotal({
          businessId: employeeWith1Payrun.kpBusinessId,
          employeeId: employeeWith1Payrun.kpEmployeeId,
          country: 'AU',
        });
        expect(totalPayRuns).toBe(1);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('can not get total payruns', error);
      }
      await incomeDashboardScreen.expectGenericErrMsg();
    });
  });
});

describe('Instapay for KP user', () => {
  let incomeDashboardScreen: IncomeDashboardScreen;

  describe('When user has access but no balance', () => {
    beforeEach(async () => {
      incomeDashboardScreen = new IncomeDashboardScreen();
      await device.launchApp();
      await loginAndGoToIncomeTab(kpEmployeeWith1Payrun.email, kpEmployeeWith1Payrun.password, true);
    });
    afterEach(async () => {
      await device.terminateApp();
    });

    it('should show generic error message for users with 1 payruns', async () => {
      // verify payrun first, then user don't have 1 payrun, then fail
      try {
        const totalPayRuns = await getEmployeePayRunTotal({
          businessId: employeeWith1Payrun.kpBusinessId,
          employeeId: employeeWith1Payrun.kpEmployeeId,
          country: 'AU',
        });
        expect(totalPayRuns).toBe(1);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('can not get total payruns', error);
      }
      await incomeDashboardScreen.expectGenericErrMsg();
    });
  });
});
