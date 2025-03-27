import React from 'react';
import dayjs from 'dayjs';
import { fireEvent, render } from '../../../../common/utils/testing';
import { TransactionsDrawer } from '../TransactionsDrawer';

const transactionSections = [
  {
    title: 'Today',
    data: [
      {
        id: '1',
        currencyAmount: { amount: 50 },
        dateTimeUTC: dayjs().format(),
        transferPeerDetails: {
          name: 'Swag Spend',
        },
      },
      {
        id: '2',
        currencyAmount: { amount: -30 },
        dateTimeUTC: dayjs(-1, 'hour').format(),
        transferPeerDetails: {
          name: 'Swag Spend',
        },
      },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {
        id: '3',
        currencyAmount: { amount: 45 },
        dateTimeUTC: dayjs(-1, 'day').format(),
        transferPeerDetails: {
          name: 'Swag Spend',
        },
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
    const list = await findByLabelText('Stash transactions');
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
