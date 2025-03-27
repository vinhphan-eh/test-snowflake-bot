import React from 'react';
import dayjs from 'dayjs';
import { fireEvent, render } from '../../../../common/utils/testing';
import { CurrencyType, TransactionType } from '../../../../new-graphql/generated';
import { TransactionsDrawer } from '../TransactionsDrawer';

const transactionSections = [
  {
    title: 'Today',
    data: [
      {
        id: '2',
        type: TransactionType.TransferOut,
        dateTimeUTC: dayjs().format(),
        currencyAmount: { currency: CurrencyType.CurrencyTypeAud, units: 10, subUnits: 0 },
        description: 'Jack Sparrow',
        transactionId: '2',
      },
      {
        id: '1',
        accountId: '1',
        dateTimeUTC: dayjs(-1, 'hour').format(),
        currencyAmount: { currency: CurrencyType.CurrencyTypeAud, units: 10, subUnits: 0 },
        description: 'Jack Sparrow',
        transactionId: '1',
        type: TransactionType.TransferOut,
      },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {
        id: '3',
        accountId: '1',
        dateTimeUTC: dayjs(-1, 'day').format(),
        currencyAmount: { currency: CurrencyType.CurrencyTypeAud, units: 10, subUnits: 0 },
        description: 'Jack Sparrow',
        transactionId: '3',
        type: TransactionType.TransferOut,
      },
    ],
  },
];

describe('Transactions Drawer', () => {
  it('should render without transactions', async () => {
    const { findByText } = render(
      <TransactionsDrawer sections={[]} isFetching={false} isFetchingNextPage={false} onEndReached={() => null} />
    );
    const emptyLabel = await findByText('No transactions to display');
    expect(emptyLabel).toBeTruthy();
  });

  it('should render loading', async () => {
    const { findByLabelText } = render(
      <TransactionsDrawer sections={[]} isFetching isFetchingNextPage={false} onEndReached={() => null} />
    );
    const spinner = await findByLabelText('spinner');
    expect(spinner).toBeTruthy();
  });

  it('should render transactions list', async () => {
    const { findAllByRole } = render(
      <TransactionsDrawer
        sections={transactionSections}
        isFetching={false}
        isFetchingNextPage={false}
        onEndReached={() => null}
      />
    );
    const items = await findAllByRole('menuitem');
    expect(items.length).toEqual(3);
  });

  // Not on scope this ticket
  it.skip('should handle item onPress ', () => {});

  it('should handle load more', async () => {
    const onEndReachedMock = jest.fn();
    const { findByLabelText } = render(
      <TransactionsDrawer
        sections={transactionSections}
        isFetching={false}
        isFetchingNextPage={false}
        onEndReached={onEndReachedMock}
      />
    );
    const list = await findByLabelText('Account transactions');
    fireEvent(list, 'onEndReached');
    expect(onEndReachedMock).toHaveBeenCalled();
  });

  it('should display loading next page', async () => {
    const { findByLabelText } = render(
      <TransactionsDrawer sections={transactionSections} isFetching isFetchingNextPage onEndReached={() => null} />
    );
    const spinner = await findByLabelText('spinner');
    expect(spinner).toBeTruthy();
  });
});
