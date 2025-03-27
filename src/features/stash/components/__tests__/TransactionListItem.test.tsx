import React from 'react';
import dayjs from 'dayjs';
import { render } from '../../../../common/utils/testing';
import { Sign } from '../../../../new-graphql/generated';
import { aMoneyV2, aStashTransaction } from '../../../../new-graphql/mocks/generated-mocks';
import { convertStashTransactionToDrawerListItemFormat } from '../../utils/splitTransactionsIntoSections';
import { TRANSACTION_TIME_FORMAT, TransactionListItem } from '../TransactionListItem';

describe('Transaction List Item', () => {
  it('should render correctly', () => {
    const transaction = convertStashTransactionToDrawerListItemFormat(
      aStashTransaction({
        id: '1',
        transactionTimeUtc: '2023-04-19T00:00:00Z',
        amount: aMoneyV2({ units: 30, sign: Sign.Negative }),
      })
    );
    const { getByText } = render(<TransactionListItem transaction={transaction} />);

    expect(getByText(dayjs(transaction.dateTimeUTC).format(TRANSACTION_TIME_FORMAT))).toBeTruthy();
    expect(getByText('Swag Spend')).toBeTruthy();
  });

  it('should use default amount of 0 if not passed', () => {
    const transaction = convertStashTransactionToDrawerListItemFormat(
      aStashTransaction({
        id: '1',
        transactionTimeUtc: '2023-04-19T00:00:00Z',
        amount: undefined,
      })
    );

    const { getByText } = render(<TransactionListItem transaction={transaction} />);

    expect(getByText(dayjs(transaction.dateTimeUTC).format(TRANSACTION_TIME_FORMAT))).toBeTruthy();
    expect(getByText('$0.00', { exact: false })).toBeTruthy();
  });
});
