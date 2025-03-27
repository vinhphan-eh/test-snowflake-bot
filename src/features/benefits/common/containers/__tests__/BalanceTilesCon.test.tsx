import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { useHeroPointsVisibility } from '../../../../../common/hooks/useHeroPointsVisibility';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { render, fireEvent, renderHook } from '../../../../../common/utils/testing';
import { mockNavigateToBenefitsTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import type { CashbackTransactionsV2Query, GetHeroPointsBalanceQuery } from '../../../../../new-graphql/generated';
import { useCashbackTransactionsV2Query, useGetHeroPointsBalanceQuery } from '../../../../../new-graphql/generated';
import { mockUseCheckCompletelyOnboardCashback } from '../../../cash-back/hooks/__mocks__/useCheckCompletelyOnboardCashback';
import { useBenefitsOrderStore } from '../../screens/orders/stores/useBenefitsOrderStore';
import { BalanceTilesCon } from '../BalanceTilesCon';

const mockUseHeroPointsVisibility = useHeroPointsVisibility as jest.MockedFunction<typeof useHeroPointsVisibility>;

const mockUseCashbackTransactionsV2Query = useCashbackTransactionsV2Query as unknown as jest.Mock<
  MockQueryResult<CashbackTransactionsV2Query>
>;

const mockUseGetHeroPointsBalanceQuery = useGetHeroPointsBalanceQuery as unknown as jest.Mock<
  MockQueryResult<GetHeroPointsBalanceQuery>
>;

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetHeroPointsBalanceQuery: jest.fn(),
  useCashbackTransactionsV2Query: jest.fn(),
}));

jest.mock('../../../../../common/hooks/useHeroPointsVisibility');

describe('BalanceTilesCon', () => {
  const mockSetPendingChangeBenefitsOrdersTab = jest.fn();
  beforeEach(() => {
    const store = renderHook(() => useBenefitsOrderStore());
    store.result.current.setPendingChangeBenefitsOrdersTab = mockSetPendingChangeBenefitsOrdersTab;

    mockUseCheckCompletelyOnboardCashback.mockReturnValue({
      isCompleted: true,
      isError: false,
      isFetched: true,
      isLoading: false,
    });

    mockUseCashbackTransactionsV2Query.mockReturnValue({
      data: {
        me: {
          cashback: {
            transactionsV2: {
              total: 95.5,
            } as never,
          },
        },
      },
      isLoading: false,
      isError: false,
    });

    mockUseGetHeroPointsBalanceQuery.mockReturnValue({
      data: {
        me: {
          heroPoints: {
            balance: 1000,
          },
        },
      },
      isLoading: false,
      isError: false,
    });

    mockUseHeroPointsVisibility.mockReturnValue(true);
  });
  it('should render correctly', () => {
    const { getByLabelText } = render(<BalanceTilesCon />);

    expect(getByLabelText('Lifetime cashback balance')).toBeTruthy();
    expect(getByLabelText('Hero points balance')).toBeTruthy();
  });

  it('should work correctly when pressing lifetime cashback', () => {
    const { getByLabelText } = render(<BalanceTilesCon />);

    fireEvent.press(getByLabelText('Lifetime cashback balance'));

    expect(mockNavigateToBenefitsTopTabs).toBeCalledWith('benefits-purchases');
    expect(mockSetPendingChangeBenefitsOrdersTab).toBeCalledWith('cashback');
  });

  it('should work correctly when pressing hero points', () => {
    const { getByLabelText } = render(<BalanceTilesCon />);

    fireEvent.press(getByLabelText('Hero points balance'));

    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'GeneralSearchScreen',
      params: {
        defaultCategory: {
          code: 'giftcard',
          name: 'Gift cards',
        },
      },
    });
  });
});
