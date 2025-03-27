import React from 'react';
import { render } from '../../../../../../../../common/utils/testing';
import {
  TransactionRecordType,
  TransactionState,
  type CashbackTransaction,
} from '../../../../../../../../new-graphql/generated';
import { TransactionsDrawer } from '../TransactionsDrawer';

const transactionSections: {
  title: string;
  data: CashbackTransaction[];
}[] = [
  {
    title: 'Today',
    data: [
      {
        id: 2,
        advertiserName: 'Myer',
        imageUrl: 'https://milkm.pokitcampus.com.au/uploadfiles/pokitmoney/cashback.jpg',
        amount: 30,
        fee: 0,
        title: '',
        transactionId: '2',
        created: '2022-11-23T08:38:33.641522',
        state: TransactionState.Pending,
        description: 'Cash back redemption',
        offerId: 0,
        recordType: TransactionRecordType.Out,
      },
      {
        id: 114146,
        advertiserName: 'Belkin',
        imageUrl:
          'https://milkm.pokitcampus.com.au/uploadfiles/Logos/advertiser-5b34d5cc-a2d6-42de-b0c3-9f4734b584ab.jpg',
        amount: 1.8,
        created: '2022-11-23T14:24:55.2594203',
        state: TransactionState.Settled,
        description: 'PokitPal CB Demo',
        offerId: 914146,
        recordType: TransactionRecordType.In,
        fee: 0,
        title: '',
        transactionId: '114146',
      },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {
        id: 1,
        advertiserName: 'Myer',
        imageUrl: 'https://milkm.pokitcampus.com.au/uploadfiles/pokitmoney/cashback.jpg',
        amount: 30,
        created: '2021-09-10T08:38:33.641522',
        state: TransactionState.Pending,
        description: 'Cash back redemption',
        offerId: 0,
        recordType: TransactionRecordType.Out,
        fee: 0,
        title: '',
        transactionId: '1',
      },
      {
        id: 914146,
        advertiserName: 'Belkin',
        imageUrl:
          'https://milkm.pokitcampus.com.au/uploadfiles/Logos/advertiser-5b34d5cc-a2d6-42de-b0c3-9f4734b584ab.jpg',
        amount: 1.8,
        created: '2021-08-18T14:24:55.2594203',
        state: TransactionState.Settled,
        description: 'PokitPal CB Demo',
        offerId: 914146,
        recordType: TransactionRecordType.In,
        fee: 0,
        title: '',
        transactionId: '914146',
      },
    ],
  },
];

describe('Transactions Drawer', () => {
  it('should render without transactions', async () => {
    const { findByText } = render(<TransactionsDrawer sections={[]} isFetching={false} />);
    const emptyLabel = await findByText('No transactions to display');
    expect(emptyLabel).toBeTruthy();
  });
  it('should render error', async () => {
    const { findByLabelText } = render(<TransactionsDrawer sections={[]} isFetching isError />);
    const spinner = await findByLabelText('get transactions error');
    expect(spinner).toBeTruthy();
  });

  it('should render transactions list', async () => {
    const { findAllByTestId } = render(<TransactionsDrawer sections={transactionSections} isFetching={false} />);
    const items = await findAllByTestId('cashback-transaction', { exact: false });
    expect(items.length).toEqual(4);
  });
});
