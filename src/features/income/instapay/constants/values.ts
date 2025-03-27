import type { InstapayErrorCode } from '../../../../new-graphql/generated';
import type { LocaleMessageID } from '../../../../providers/LocalisationProvider/constants';

export const instapayMessageKeyByErrorCode: Partial<Record<InstapayErrorCode, LocaleMessageID>> = {
  NOT_AVAILABLE_ON_LEAVE: 'instapay.errors.not_available_on_leave',
  INSTAPAY_DAILY_ONLY_AVAILABLE_NEXT_PAY_PERIOD: 'instapay.errors.instapay_daily_only_available_next_pay_period',
  TERMINATED_EMPLOYEE: 'instapay.errors.terminated_employee',
  AFTER_PAYMENT_DATE_RESTRICTED: 'instapay.errors.after_payment_date_restricted',
  PAYMENT_DATE_RESTRICTED: 'instapay.errors.payment_date_restricted',
  HISTORICAL_OPEN_PAYRUN_RESTRICTED: 'instapay.errors.historical_open_payrun_restricted',
  UNSPECIFIED: 'instapay.errors.unspecified',
};

export const FREE_FIFTH_TRANSACTION_INCENTIVE_ID = 'INSTAPAY_NOW_USAGE_INCENTIVE';
export const FREE_FIFTH_TRANSACTION_INCENTIVE_V2_ID = 'INSTAPAY_NOW_USAGE_INCENTIVE_V2';
