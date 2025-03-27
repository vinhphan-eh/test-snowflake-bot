import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { AccountDetails } from './prepare-instapay-account';
import { getTimezoneByAccount, PayFrequency } from './utils';

export interface PayPeriod {
  begin: Dayjs;
  end: Dayjs;
  payment: Dayjs;
}

/**
 * Calculate starting date of current fortnightly/weekly pay period, based on first pay period recorded
 * @param firstPayPeriodStarting
 */
export const getCurrentPayPeriodStarting = (
  firstPayPeriodStarting: Dayjs,
  paySchedule: PayFrequency,
  account: AccountDetails = { country: 'AU' } as AccountDetails
) => {
  let payPeriodStarting = firstPayPeriodStarting;

  const timezone = getTimezoneByAccount(account);
  const today = dayjs.tz(undefined, timezone);
  const payPeriodDurationInWeek = paySchedule === PayFrequency.Fortnightly ? 2 : 1;
  while (payPeriodStarting.diff(today) < 0) {
    payPeriodStarting = payPeriodStarting.add(payPeriodDurationInWeek, 'week');
  }
  const currentPayPeriodStarting = payPeriodStarting.subtract(payPeriodDurationInWeek, 'week');

  return currentPayPeriodStarting.startOf('day');
};

export const coverWholeMonth = (payPeriod: PayPeriod): boolean => {
  return payPeriod.begin.date() === 1 && payPeriod.end.date() === payPeriod.begin.endOf('month').date();
};

export const getPreviousPayPeriod = (payFrequency: PayFrequency, payPeriod: PayPeriod): PayPeriod => {
  let begin, end, payment;

  switch (payFrequency) {
  case PayFrequency.Weekly:
    begin = payPeriod.begin.subtract(1, 'week');
    end = payPeriod.end.subtract(1, 'week');
    payment = payPeriod.payment.subtract(1, 'week');
    break;
  case PayFrequency.Fortnightly:
    begin = payPeriod.begin.subtract(2, 'week');
    end = payPeriod.end.subtract(2, 'week');
    payment = payPeriod.payment.subtract(2, 'week');
    break;
  case PayFrequency.Monthly:
    if (coverWholeMonth(payPeriod)) {
      begin = payPeriod.begin.subtract(1, 'month');
      end = begin.endOf('month');
      // if payment date is end of month, set it to end of previous month, else -1 month
      payment =
        payPeriod.payment === payPeriod.begin.endOf('month') ? end : payPeriod.payment.subtract(1, 'month');
    } else {
      begin = payPeriod.begin.subtract(1, 'month');
      end = payPeriod.end.subtract(1, 'month');
      payment = payPeriod.payment.subtract(1, 'month');
    }
    break;
  default:
    throw new Error('Invalid pay frequency');
  }

  // use startOf('day') to correct timezone of calculated date, in case of timezone changes
  // E.g. with Sydney timezone, which changes during October
  //   date (September)      -> 2024-09-25T14:00:00.000Z
  //   date.add(1, 'month')  -> 2024-10-25T14:00:00.000Z # wrong, should be 2024-10-25T13:00:00.000Z
  return {
    begin: begin.startOf('day'),
    end: end.startOf('day'),
    payment: payment.startOf('day')
  }
};

export const getNextPayPeriod = (payFrequency: PayFrequency, payPeriod: PayPeriod): PayPeriod => {
  let begin, end, payment;

  switch (payFrequency) {
  case PayFrequency.Weekly:
    begin = payPeriod.begin.add(1, 'week');
    end = payPeriod.end.add(1, 'week');
    payment = payPeriod.payment.add(1, 'week');
    break;
  case PayFrequency.Fortnightly:
    begin = payPeriod.begin.add(2, 'week');
    end = payPeriod.end.add(2, 'week');
    payment = payPeriod.payment.add(2, 'week');
    break;
  case PayFrequency.Monthly:
    if (coverWholeMonth(payPeriod)) {
      begin = payPeriod.begin.add(1, 'month');
      end = begin.endOf('month');
      // if payment date is end of month, set it to end of next month, else +1 month
      payment =
        payPeriod.payment === payPeriod.begin.endOf('month') ? end : payPeriod.payment.add(1, 'month');
    } else {
      begin = payPeriod.begin.add(1, 'month');
      end = payPeriod.end.add(1, 'month');
      payment = payPeriod.payment.add(1, 'month');
    }
    break;
  default:
    throw new Error('Invalid pay frequency');
  }

  // use startOf('day') to correct timezone of calculated date, in case of timezone changes
  // E.g. with Sydney timezone, which changes during October
  //   date (September)      -> 2024-09-25T14:00:00.000Z
  //   date.add(1, 'month')  -> 2024-10-25T14:00:00.000Z # wrong, should be 2024-10-25T13:00:00.000Z
  return {
    begin: begin.startOf('day'),
    end: end.startOf('day'),
    payment: payment.startOf('day')
  }
};
