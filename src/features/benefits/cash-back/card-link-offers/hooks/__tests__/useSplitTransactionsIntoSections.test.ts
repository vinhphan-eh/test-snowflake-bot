import { renderHook } from '@testing-library/react-hooks';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { TransactionRecordType, TransactionState } from '../../../../../../new-graphql/generated';
import { useSplitTransactionsIntoSections } from '../useSplitTransactionsIntoSections';

dayjs.extend(utc);

describe('useSplitTransactionsIntoSections', () => {
  test('should split transactions into section by days', () => {
    const transactions = {
      transactions: [
        {
          created: dayjs.utc().format(),
          amount: 10,
          id: 1,
          advertiserName: 'Myer',
          imageUrl: 'https://milkm.pokitcampus.com.au/uploadfiles/pokitmoney/cashback.jpg',
          state: TransactionState.Pending,
          description: 'Cash back redemption',
          offerId: 0,
          recordType: TransactionRecordType.Out,
          fee: 0,
          transactionId: '1',
          title: '',
        },
        {
          created: dayjs.utc().add(-1, 'day').format(),
          amount: 10,
          id: 2,
          advertiserName: 'Myer',
          imageUrl: 'https://milkm.pokitcampus.com.au/uploadfiles/pokitmoney/cashback.jpg',
          state: TransactionState.Pending,
          description: 'Cash back redemption',
          offerId: 0,
          recordType: TransactionRecordType.Out,
          fee: 0,
          transactionId: '1',
          title: '',
        },
        {
          id: 3,
          created: '2022-08-24T06:18:54Z',
          advertiserName: 'Myer',
          imageUrl: 'https://milkm.pokitcampus.com.au/uploadfiles/pokitmoney/cashback.jpg',
          amount: 30,
          state: TransactionState.Pending,
          description: 'Cash back redemption',
          offerId: 0,
          recordType: TransactionRecordType.Out,
          fee: 0,
          transactionId: '1',
          title: '',
        },
      ],
    };
    const { result } = renderHook(() => useSplitTransactionsIntoSections(transactions));
    expect(result.current.sections[0].title).toEqual('Today');
    expect(result.current.sections[1].title).toEqual('Yesterday');
    expect(result.current.sections[2].title).toEqual('24 Aug 2022');
  });
});
