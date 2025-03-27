import React from 'react';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { render } from '../../../../../common/utils/testing';
import { useCashbackTransactionsV2Query, type CashbackTransactionsV2Query } from '../../../../../new-graphql/generated';
import { mockUseCheckCompletelyOnboardCashback } from '../../hooks/__mocks__/useCheckCompletelyOnboardCashback';
import { LifeTimeCashbackTile } from '../LifeTimeCashbackTile';

const mockUseCashbackTransactionsV2Query = useCashbackTransactionsV2Query as unknown as jest.Mock<
  MockQueryResult<CashbackTransactionsV2Query>
>;
(mockUseCashbackTransactionsV2Query as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useCashbackTransactionsV2Query: jest.fn(),
}));

describe('LifeTimeCashbackTile', () => {
  beforeEach(() => {
    mockUseCheckCompletelyOnboardCashback.mockReturnValue({
      isCompleted: true,
      isLoading: false,
      isFetched: true,
      isError: false,
    });

    mockUseCashbackTransactionsV2Query.mockReturnValue({
      data: {
        me: {
          cashback: {
            transactionsV2: {
              total: 100.23,
            } as never,
          },
        },
      },
    });
  });

  it('should render correctly', () => {
    const { getByText } = render(<LifeTimeCashbackTile goToManageCashback={() => {}} />);

    expect(getByText('lifetime cashback')).toBeTruthy();
    expect(getByText('$100')).toBeTruthy();
    expect(getByText('.23')).toBeTruthy();
  });

  it('should render nothing when have not completed onboarding', () => {
    mockUseCheckCompletelyOnboardCashback.mockReturnValue({
      isCompleted: false,
      isLoading: false,
      isFetched: true,
      isError: false,
    });
    const { queryByTestId } = render(<LifeTimeCashbackTile goToManageCashback={() => {}} />);

    expect(queryByTestId('lifetime-cashback')).toBeNull();
  });

  it('should render skeleton while loading total amount', () => {
    mockUseCashbackTransactionsV2Query.mockReturnValue({
      data: {
        me: {
          cashback: {
            transactionsV2: {
              total: 100.23,
            } as never,
          },
        },
      },
      isLoading: true,
    });
    const { getByTestId, getByText } = render(<LifeTimeCashbackTile goToManageCashback={() => {}} />);

    expect(getByText('lifetime cashback')).toBeTruthy();
    expect(getByTestId('skeleton-lifetime-cashback')).toBeTruthy();
  });
});
