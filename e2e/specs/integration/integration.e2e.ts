import {
  createAuBiz,
  createAuEmp,
  createAuEmpModel,
  createAuEwaBiz,
  createOrg,
  createPayslips,
  createSbxMobileClient,
  createUkEmp,
  createUkEmpModel,
  createUkEwaBiz,
  resetEnvironment,
  type AuBiz,
  type AuEmp,
  type UkBiz,
  type UkEmp,
} from '@ehrocks/ebf-lib-integrate';
import type { AxiosError } from 'axios';
import { expect } from 'detox';
import { IncomeDashboardScreen } from '../../pom/earn-wage-access/IncomeDashboardScreen';
import { getElementByText } from '../../utils/common-actions';
import { loginAndGoToIncomeTab } from '../../utils/earn-wage-access/common-actions';
import { getBusiness } from '../../utils/instapay/keypay-api';
import {
  calculateEstInstapayBalanceForPermanentEmployee,
  type KPAccountWithPayRate,
} from '../../utils/instapay/prepare-instapay-account';
import { PayFrequency, UserSource } from '../../utils/instapay/utils';

describe.skip('Integration with ebf-lib-integrate test cases', () => {
  let incomeDashboardScreen: IncomeDashboardScreen;

  describe('KP business', () => {
    describe('AU', () => {
      let kpBiz: AuBiz;
      let kpEmp: AuEmp;
      let createdKpAccount: KPAccountWithPayRate;
      const email = process.env.E2E_KP_AU_ACCOUNT_EMAIL as string;
      const password = process.env.E2E_KP_AU_ACCOUNT_PASSWORD as string;

      beforeAll(async () => {
        kpBiz = await createAuEwaBiz();

        // Create an employee mapped to the admin account (through token)
        // to enable business deletion after finishing the test
        await createAuEmp(kpBiz, {
          model: {
            ...createAuEmpModel(kpBiz),
          },
        });

        // Create another employee mapped with the pre-created account to
        // perform the test steps
        kpEmp = await createAuEmp(kpBiz, {
          model: {
            ...createAuEmpModel(kpBiz),
            hoursPerDay: 7.6,
            hoursPerWeek: 38,
            rateUnit: 'Hourly',
            rate: 42,
            emailAddress: email,
          },
        });

        await createPayslips(kpEmp, {
          payslips: 3,
        });

        createdKpAccount = {
          userSource: UserSource.KP,
          email,
          password,
          kpBusinessId: kpEmp.bizId.toString(),
          kpEmployeeId: kpEmp.empId.toString(),
          payFrequency: PayFrequency.Weekly,
          country: 'AU',
          payRatePerHour: 42,
          orgHrsPerWeek: 38,
        };
      });

      afterAll(async () => {
        await resetEnvironment('AU');

        try {
          await getBusiness({ businessId: kpBiz.bizId.toString(), country: 'AU' });
        } catch (error) {
          if ((error as AxiosError).status !== 404) {
            throw new Error(`Failed to confirm business has been deleted - Biz ID: ${kpBiz.bizId}`);
          }
        }
      });

      beforeEach(async () => {
        await device.launchApp();
        incomeDashboardScreen = new IncomeDashboardScreen();
        await loginAndGoToIncomeTab(email, password, true, 'AU');
      });

      afterEach(async () => {
        await device.terminateApp();
      });

      it('should be able to login with the created employee entity and has balance calculated', async () => {
        // Switch to the newly created employer
        await incomeDashboardScreen.selectEmployer(kpBiz.bizModel.name ?? '');

        // Expect the balance is correctly calculated for the employee
        const estimatedBalance = await calculateEstInstapayBalanceForPermanentEmployee({
          accountDetails: createdKpAccount,
        });

        const formattedBalance = new Intl.NumberFormat('en-AU', {
          style: 'currency',
          currency: 'AUD',
        });

        await expect(
          await getElementByText(`available balance ${formattedBalance.format(estimatedBalance)}`)
        ).toBeVisible();
      });
    });

    describe('UK', () => {
      let kpBiz: UkBiz;
      let kpEmp: UkEmp;
      let createdKpAccount: KPAccountWithPayRate;
      const email = process.env.E2E_KP_UK_ACCOUNT_EMAIL as string;
      const password = process.env.E2E_KP_UK_ACCOUNT_PASSWORD as string;

      beforeAll(async () => {
        kpBiz = await createUkEwaBiz();

        // Create an employee mapped to the admin account (through token)
        // to enable business deletion after finishing the test
        await createUkEmp(kpBiz, {
          model: {
            ...createUkEmpModel(kpBiz),
          },
        });

        // Create another employee mapped with the pre-created account to
        // perform the test steps
        kpEmp = await createUkEmp(kpBiz, {
          model: {
            ...createUkEmpModel(kpBiz),
            hoursPerWeek: 38,
            rateUnit: 'Hourly',
            rate: 42,
            emailAddress: email,
          },
        });

        await createPayslips(kpEmp, {
          payslips: 3,
        });

        createdKpAccount = {
          userSource: UserSource.KP,
          email,
          password,
          kpBusinessId: kpEmp.bizId.toString(),
          kpEmployeeId: kpEmp.empId.toString(),
          payFrequency: PayFrequency.Weekly,
          country: 'GB',
          payRatePerHour: 42,
          orgHrsPerWeek: 38,
        };
      });

      afterAll(async () => {
        await resetEnvironment('UK');

        try {
          await getBusiness({ businessId: kpBiz.bizId.toString(), country: 'GB' });
        } catch (error) {
          if ((error as AxiosError).status !== 404) {
            throw new Error(`Failed to confirm business has been deleted - Biz ID: ${kpBiz.bizId}`);
          }
        }
      });

      beforeEach(async () => {
        await device.launchApp();
        incomeDashboardScreen = new IncomeDashboardScreen();
        await loginAndGoToIncomeTab(email, password, true, 'GB');
      });

      afterEach(async () => {
        await device.terminateApp();
      });

      it('should be able to login with the created employee entity and has balance calculated', async () => {
        // Switch to the newly created employer
        await incomeDashboardScreen.selectEmployer(kpBiz.bizModel.name ?? '');

        // Expect the balance is correctly calculated for the employee
        const estimatedBalance = await calculateEstInstapayBalanceForPermanentEmployee({
          accountDetails: createdKpAccount,
        });

        const formattedBalance = new Intl.NumberFormat('en-GB', {
          style: 'currency',
          currency: 'GBP',
        });

        await expect(
          await getElementByText(`available balance ${formattedBalance.format(estimatedBalance)}`)
        ).toBeVisible();
      });
    });
  });

  describe('HR + KP biz', () => {
    test('should create org', async () => {
      const biz = await createAuBiz();
      const irb = await createSbxMobileClient({ ebfRubyDevMode: false });

      const org = await createOrg(irb, biz);
      console.log('>>>>>>>>>>>>>>>>>>>', 'org info', org);
    });
  });
});
