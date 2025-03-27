import React from 'react';
import { fireEvent, render } from '../../../../common/utils/testing';
import { CurrencyType, ScheduledPaymentFrequency, ScheduledPaymentType } from '../../../../new-graphql/generated';
import { aScheduledPayment } from '../../../../new-graphql/mocks/generated-mocks';
import { ScheduledPaymentCard } from '../ScheduledPaymentCard';

describe('ScheduledPaymentCard', () => {
  it('should display the correct payment details for one time payment', () => {
    const mockPayment = aScheduledPayment({
      amount: {
        type: CurrencyType.CurrencyTypeAud,
        units: 100,
        subUnits: 1,
      },
      recipient: {
        bsb: '123456',
        accountName: 'John Doe',
        accountNumber: '123456789',
      },
      startDate: '2021-01-01',
      description: 'test',
      type: ScheduledPaymentType.OneTime,
    });

    const { getByText } = render(<ScheduledPaymentCard scheduledPayment={mockPayment} onCancel={() => jest.fn} />);
    expect(getByText(mockPayment.recipient.accountName)).toBeDefined();
    expect(getByText('123-456 123456789')).toBeDefined();
    expect(getByText('Amount: $100.01')).toBeDefined();
    expect(getByText('When: 01 Jan 2021')).toBeDefined();
    expect(getByText('Description: test')).toBeDefined();
  });

  it('should display the correct payment details for recurring payment', () => {
    const mockPayment = aScheduledPayment({
      amount: {
        type: CurrencyType.CurrencyTypeAud,
        units: 100,
        subUnits: 1,
      },
      recipient: {
        bsb: '123456',
        accountName: 'John Doe',
        accountNumber: '123456789',
      },
      startDate: '2021-01-01',
      endDate: '2021-12-31',
      frequency: ScheduledPaymentFrequency.Monthly,
      description: 'test',
      type: ScheduledPaymentType.Recurring,
    });

    const { getByText } = render(<ScheduledPaymentCard scheduledPayment={mockPayment} onCancel={() => jest.fn} />);
    expect(getByText(mockPayment.recipient.accountName)).toBeDefined();
    expect(getByText('123-456 123456789')).toBeDefined();
    expect(getByText('Amount: $100.01')).toBeDefined();
    expect(getByText('Start date: 01 Jan 2021')).toBeDefined();
    expect(getByText('End date: 31 Dec 2021')).toBeDefined();
    expect(getByText('Frequency: Monthly')).toBeDefined();
    expect(getByText('Description: test')).toBeDefined();
  });

  it('should call the cancellation function when the cancel button is pressed', () => {
    const mockCancelPayment = jest.fn();
    const { getByTestId } = render(
      <ScheduledPaymentCard scheduledPayment={aScheduledPayment()} onCancel={mockCancelPayment} />
    );

    const cancelButton = getByTestId('cancel-scheduled-payment');
    fireEvent.press(cancelButton);

    expect(mockCancelPayment).toBeCalled();
  });
});
