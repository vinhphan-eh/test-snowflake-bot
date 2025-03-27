import React from 'react';
import { render, fireEvent } from '../../../../common/utils/testing';
import { BillStatus } from '../../../../new-graphql/generated';
import { BillTransactionItem } from '../BillTransactionItem';

describe('BillTransactionItem', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <BillTransactionItem
        title="Simply Energy"
        description="Bill Payment"
        amount={124.54}
        currency="AUD"
        status={BillStatus.Paid}
      />
    );

    expect(getByText('Simply Energy')).toBeTruthy();
    expect(getByText('Bill Payment')).toBeTruthy();
    expect(getByText('$124.54')).toBeTruthy();
    expect(getByText('Paid')).toBeTruthy();
  });

  it('onPress works correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <BillTransactionItem
        onPress={mockOnPress}
        title="Simply Energy"
        description="Bill Payment"
        amount={124.54}
        currency="AUD"
        status={BillStatus.Paid}
      />
    );

    fireEvent.press(getByText('Simply Energy'));
    expect(mockOnPress).toBeCalled();
  });
});
