import React from 'react';
import dayjs from 'dayjs';
import { fireEvent, render } from '../../../../common/utils/testing';
import type { HeroPointsClientType, HeroPointsTransactionType } from '../../../../new-graphql/generated';
import { TransactionsDrawer } from '../TransactionsDrawer';

const transactionSections = [
  {
    title: 'Today',
    data: [
      {
        id: '1',
        refId: 'ref',
        clientType: 'nomination' as HeroPointsClientType,
        transactionType: 'topup' as HeroPointsTransactionType,
        transactionTimeUtc: dayjs().format(),
        points: 10,
        reason: 'a reason',
      },
      {
        id: '2',
        refId: 'ref2',
        clientType: 'marketplace' as HeroPointsClientType,
        transactionType: 'withdrawal' as HeroPointsTransactionType,
        transactionTimeUtc: dayjs().format(),
        points: 10,
        reason: 'a reason',
      },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {
        id: '3',
        refId: 'ref3',
        clientType: 'organisation_issuance' as HeroPointsClientType,
        transactionType: 'topup' as HeroPointsTransactionType,
        transactionTimeUtc: dayjs().format(),
        points: 10,
        reason: 'a reason',
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
    const list = await findByLabelText('Points transactions');
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
