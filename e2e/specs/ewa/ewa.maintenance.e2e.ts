import { expect } from 'detox';
import { getElementByText } from '../../utils/common-actions';
import { loginAndGoToIncomeTab } from '../../utils/earn-wage-access/common-actions';
import { type EHAccountDetails, type KPAccountDetails } from '../../utils/instapay/prepare-instapay-account';
import { PayFrequency, UserSource } from '../../utils/instapay/utils';

const KpPermanentEmployee: KPAccountDetails = {
  userSource: UserSource.KP,
  email: 'nhan.nguyencao+au_kp_maintenance@employmenthero.com',
  password: 'EmploymentHero123',
  country: 'AU',
  kpBusinessId: '437521',
  kpEmployeeId: '9798446',
  payFrequency: PayFrequency.Weekly,
};

const EhPermanentEmployee: EHAccountDetails = {
  userSource: UserSource.EH,
  email: 'duc.nguyenanh+e2e-eh-ipn-maintenance@employmenthero.com',
  password: 'Khoa@10AM!',
  country: 'AU',
  targetOrgUuid: '3f50d7a2-17b1-41e1-8669-36fa8d3e1676',
  kpBusinessId: '324133',
  kpEmployeeId: '8641534',
  payFrequency: PayFrequency.Weekly,
};

// TO-DO: Waiting for development
describe('InstaPay Now maintenance mode', () => {
  describe('For Payroll-only users', () => {
    describe('Click IPN tile', () => {
      beforeEach(async () => {
        await device.launchApp();

        await loginAndGoToIncomeTab(KpPermanentEmployee.email, KpPermanentEmployee.password, true);
      });

      afterEach(async () => {
        await device.terminateApp();
      });

      it('should open Maintenance screen', async () => {
        await expect(
          await getElementByText(
            'Apologies, accessing your earned pay is currently under maintenance, please try again later.'
          )
        ).toBeVisible();
      });
    });
  });

  describe('For EH users', () => {
    describe('Click IPN tile', () => {
      beforeEach(async () => {
        await device.launchApp();

        await loginAndGoToIncomeTab(EhPermanentEmployee.email, EhPermanentEmployee.password);
      });

      afterEach(async () => {
        await device.terminateApp();
      });

      it('should open Maintenance screen', async () => {
        await expect(
          await getElementByText(
            'Apologies, accessing your earned pay is currently under maintenance, please try again later.'
          )
        ).toBeVisible();
      });
    });
  });
});
