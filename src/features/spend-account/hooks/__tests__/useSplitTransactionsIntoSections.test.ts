import { renderHook } from '@testing-library/react-hooks';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { CurrencyType, TransactionType } from '../../../../new-graphql/generated';
import { useSplitTransactionsIntoSections } from '../useSplitTransactionsIntoSections';

dayjs.extend(utc);

describe('useSplitTransactionsIntoSections', () => {
  test('should split transactions into section by days', () => {
    const { result } = renderHook(() =>
      useSplitTransactionsIntoSections({
        transactions: [
          {
            dateTimeUTC: dayjs.utc().format(),
            currencyAmount: { type: CurrencyType.CurrencyTypeAud, units: 10, subUnits: 0 },
            id: '2',
            type: TransactionType.TransferOut,
          },
          {
            dateTimeUTC: dayjs.utc().add(-1, 'day').format(),
            currencyAmount: { type: CurrencyType.CurrencyTypeAud, units: 10, subUnits: 0 },
            id: '2',
            type: TransactionType.TransferOut,
          },
          {
            dateTimeUTC: '2022-08-24T06:18:54Z',
            currencyAmount: { type: CurrencyType.CurrencyTypeAud, units: 10, subUnits: 0 },
            id: '3',
            type: TransactionType.TransferOut,
          },
        ],
      })
    );
    expect(result.current.sections[0].title).toEqual('Today');
    expect(result.current.sections[1].title).toEqual('Yesterday');
    expect(result.current.sections[2].title).toEqual('24 Aug 2022');
  });

  test('should remove falsy item', () => {
    const { result } = renderHook(() =>
      useSplitTransactionsIntoSections({
        transactions: [
          {
            dateTimeUTC: dayjs.utc().format(),
            currencyAmount: { type: CurrencyType.CurrencyTypeAud, units: 10, subUnits: 0 },
            id: '2',
            type: TransactionType.TransferOut,
          },
          {
            dateTimeUTC: dayjs.utc().add(-1, 'day').format(),
            currencyAmount: { type: CurrencyType.CurrencyTypeAud, units: 10, subUnits: 0 },
            id: '2',
            type: TransactionType.TransferOut,
          },
          null,
        ],
      })
    );
    expect(result.current.sections[0].title).toEqual('Today');
    expect(result.current.sections[1].title).toEqual('Yesterday');
    expect(result.current.sections.length).toEqual(2);
  });
});
