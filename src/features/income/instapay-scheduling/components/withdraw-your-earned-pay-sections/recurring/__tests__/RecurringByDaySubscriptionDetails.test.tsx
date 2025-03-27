import React from 'react';
import dayjs from 'dayjs';
import { render } from '../../../../../../../common/utils/testing';
import { CurrencyType, RecurringSubscriptionStatus, Sign, Weekday } from '../../../../../../../new-graphql/generated';
import { RecurringByDaySubscriptionDetails } from '../RecurringByDaySubscriptionDetails';

const mockSubscription = {
  maximumPayAmount: {
    units: 100,
    subUnits: 0,
    type: CurrencyType.CurrencyTypeAud,
    sign: Sign.Positive,
  },
  minPayAmount: 0,
  maxPayAmount: 0,
  bankAccountExternalId: '123',
  payDay: Weekday.Friday,
  id: '123',
  minimumPayAmount: {
    units: 100,
    subUnits: 0,
    type: CurrencyType.CurrencyTypeAud,
    sign: Sign.Positive,
  },
  status: RecurringSubscriptionStatus.Active,
};

const mockCurrency = 'USD';

describe('RecurringByDaySubscriptionDetails', () => {
  describe('when the subscription NOT have start date', () => {
    it('should render correctly', () => {
      const { getByText } = render(
        <RecurringByDaySubscriptionDetails subscription={mockSubscription} currency={mockCurrency} />
      );
      expect(getByText('Your recurring payments are set to:')).toBeTruthy();
      expect(getByText('Withdraw $100 on Friday.')).toBeTruthy();
      expect(getByText("Whenever it's ready, at 9pm.")).toBeTruthy();
    });
  });

  describe('when the subscription HAVE start date', () => {
    it('should render correctly', () => {
      const tomorrow = dayjs().add(1, 'day');
      const { getByText } = render(
        <RecurringByDaySubscriptionDetails
          subscription={{
            ...mockSubscription,
            firstPaymentDate: tomorrow.toISOString(),
          }}
          currency={mockCurrency}
        />
      );
      expect(getByText('Your recurring payments are set to:')).toBeTruthy();
      expect(getByText('Withdraw $100 on Friday.')).toBeTruthy();
      expect(getByText(`Whenever it's ready, at 9pm. Starting ${tomorrow.format('DD/MM/YYYY')}`)).toBeTruthy();
    });
  });
});
