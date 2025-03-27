import React from 'react';
import { render } from '../../../../../../../../common/utils/testing';
import { aCashbackTransaction } from '../../../../../../../../new-graphql/mocks/generated-mocks';
import { TransactionListItem } from '../TransactionListItem';

describe('Transaction List Item', () => {
  it('should render correctly', () => {
    const transaction = aCashbackTransaction();
    const { getByText } = render(<TransactionListItem transaction={transaction} />);

    expect(getByText('eveniet')).toBeTruthy();
    expect(getByText('Cashback 135%')).toBeTruthy();
    expect(getByText('$2.41')).toBeTruthy();
    expect(getByText('Qualifying Amount $1.79')).toBeTruthy();
    expect(getByText('Confirmed')).toBeTruthy();
    expect(
      getByText(
        'Good news! Your cashback for this eligible purchase has been processed and will be added to your Confirmed balance.'
      )
    ).toBeTruthy();
  });
});
