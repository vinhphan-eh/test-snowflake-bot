import React from 'react';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { render } from '../../../../../common/utils/testing';
import type { CashbackTransactionsV2Query } from '../../../../../new-graphql/generated';
import { useCashbackTransactionsV2Query } from '../../../../../new-graphql/generated';
import { mockUseCheckCompletelyOnboardCashback } from '../../hooks/__mocks__/useCheckCompletelyOnboardCashback';
import { LifeTimeCashbackPill } from '../LifeTimeCashbackPill';

const mockUseCashbackTransactionsV2Query = useCashbackTransactionsV2Query as unknown as jest.Mock<
  MockQueryResult<CashbackTransactionsV2Query>
>;

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useCashbackTransactionsV2Query: jest.fn(),
}));

describe('LifeTimeCashbackPill', () => {
  beforeEach(() => {
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

    mockUseCheckCompletelyOnboardCashback.mockReturnValue({
      isCompleted: true,
      isError: false,
      isLoading: false,
      isFetched: true,
    });
  });
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<LifeTimeCashbackPill onPress={() => {}} />);

    expect(getByTestId('dollar-credit-card-outlined')).toBeTruthy();
    expect(getByText('$95.50')).toBeTruthy();
  });

  it('should render nothing when have not completed onboarding', () => {
    mockUseCheckCompletelyOnboardCashback.mockReturnValue({
      isCompleted: false,
      isError: false,
      isLoading: false,
      isFetched: true,
    });
    const { queryByTestId } = render(<LifeTimeCashbackPill testID="lifetime-pill" onPress={() => {}} />);

    expect(queryByTestId('lifetime-pill')).toBeNull();
  });

  it('should render nothing when have not completed loading transactions', () => {
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
      isLoading: true,
      isError: false,
    });
    const { queryByTestId } = render(<LifeTimeCashbackPill testID="lifetime-pill" onPress={() => {}} />);

    expect(queryByTestId('lifetime-pill')).toBeNull();
  });

  it('should render nothing when having error', () => {
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
      isError: true,
    });
    const { queryByTestId } = render(<LifeTimeCashbackPill testID="lifetime-pill" onPress={() => {}} />);

    expect(queryByTestId('lifetime-pill')).toBeNull();
  });
});
