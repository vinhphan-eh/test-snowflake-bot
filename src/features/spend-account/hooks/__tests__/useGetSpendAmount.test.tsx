import { renderHook } from '../../../../common/utils/testing';
import { useGetStashesQuery } from '../../../../new-graphql/generated';
import { aMoneyV2 } from '../../../../new-graphql/mocks/generated-mocks';
import { useGetSpendAmount } from '../useGetSpendAmount';
import { useGetSSADetails } from '../useGetSSADetails';

jest.mock('../../../../new-graphql/generated', () => ({
  useGetStashesQuery: jest.fn(),
}));

jest.mock('../useGetSSADetails', () => ({
  useGetSSADetails: jest.fn(),
}));

describe('useGetSpendAmount', () => {
  test('should work without stashes - AUD currency', () => {
    (useGetStashesQuery as unknown as jest.Mock).mockReturnValue({
      data: { me: { wallet: { stash: { items: [] } } } },
    });
    (useGetSSADetails as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { availableBalance: 1000, currency: 'AUD' },
    });
    const { result } = renderHook(() =>
      useGetSpendAmount({
        shouldLoadStashes: false,
      })
    );
    expect(result.current).toEqual({
      availableAmount: 1000,
      availableBalance: 1000,
      stashedAmount: 0,
      walletLoading: false,
      currency: 'AUD',
    });
  });

  test('should work without stashes - GBP currency', () => {
    (useGetStashesQuery as unknown as jest.Mock).mockReturnValue({
      data: { me: { wallet: { stash: { items: [] } } } },
    });
    (useGetSSADetails as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { availableBalance: 1000, currency: 'GBP' },
    });
    const { result } = renderHook(() =>
      useGetSpendAmount({
        shouldLoadStashes: false,
      })
    );
    expect(result.current).toEqual({
      availableAmount: 1000,
      availableBalance: 1000,
      stashedAmount: 0,
      walletLoading: false,
      currency: 'GBP',
    });
  });

  test('should work stashes', () => {
    (useGetStashesQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          wallet: { stash: { items: [{ balance: aMoneyV2({ units: 100, subUnits: 0, sign: 'POSITIVE' as never }) }] } },
        },
      },
    });
    (useGetSSADetails as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { availableBalance: 1000, currency: 'AUD' },
    });
    const { result } = renderHook(() =>
      useGetSpendAmount({
        shouldLoadStashes: true,
      })
    );
    expect(result.current).toEqual({
      availableAmount: 900,
      availableBalance: 1000,
      stashedAmount: 100,
      walletLoading: false,
      currency: 'AUD',
    });
  });

  test('should work when balance is undefined', () => {
    (useGetStashesQuery as unknown as jest.Mock).mockReturnValue({
      data: { me: { wallet: { stash: { items: [] } } } },
    });
    (useGetSSADetails as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { availableBalance: undefined },
    });
    const { result } = renderHook(() =>
      useGetSpendAmount({
        shouldLoadStashes: true,
      })
    );
    expect(result.current).toEqual({
      availableAmount: 0,
      availableBalance: undefined,
      stashedAmount: 0,
      walletLoading: false,
      currency: 'AUD',
    });
  });
});
