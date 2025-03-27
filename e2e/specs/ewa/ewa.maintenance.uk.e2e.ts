import { expect } from 'detox';
import { getElementByText } from '../../utils/common-actions';
import { loginAndGoToIncomeTab } from '../../utils/earn-wage-access/common-actions';
import { type EHAccountDetails } from '../../utils/instapay/prepare-instapay-account';
import { PayFrequency, UserSource, type KPAccountDetails } from '../../utils/instapay/utils';

const EhPermanentEmployee: EHAccountDetails = {
  userSource: UserSource.EH,
  email: 'yan.yu+e2e-eh-ipn-maintenance@employmenthero.com',
  password: 'EmploymentHero123',
  targetOrgUuid: 'db62b5fe-bfd5-4a82-8d82-22a8551f772b',
  country: 'GB',
  kpBusinessId: '431499',
  kpEmployeeId: '9263281',
  payFrequency: PayFrequency.Monthly,
};

const KpPermanentEmployee: KPAccountDetails = {
  userSource: UserSource.KP,
  email: 'nhan.nguyencao+e2e_uk_kp_06@employmenthero.com',
  password: 'EmploymentHero123',
  country: 'GB',
  kpBusinessId: '431499',
  kpEmployeeId: '9263379',
  payFrequency: PayFrequency.Monthly,
};

describe('EWA Now (UK) maintenance mode', () => {
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

  describe('For KP-only users', () => {
    describe('Click IPN tile', () => {
      beforeEach(async () => {
        await device.launchApp();

        await loginAndGoToIncomeTab(
          KpPermanentEmployee.email,
          KpPermanentEmployee.password,
          true,
          KpPermanentEmployee.country
        );
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
