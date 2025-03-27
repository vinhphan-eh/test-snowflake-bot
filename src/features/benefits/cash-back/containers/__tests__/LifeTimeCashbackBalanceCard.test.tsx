import React from 'react';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { fireEvent, render } from '../../../../../common/utils/testing';
import type { CashbackTransactionsV2Query } from '../../../../../new-graphql/generated';
import { useCashbackTransactionsV2Query } from '../../../../../new-graphql/generated';
import { mockUseCheckCompletelyOnboardCashback } from '../../hooks/__mocks__/useCheckCompletelyOnboardCashback';
import { LifeTimeCashbackBalanceCard } from '../LifeTimeCashbackBalanceCard';

const mockUseCashbackTransactionsV2Query = useCashbackTransactionsV2Query as unknown as jest.Mock<
  MockQueryResult<CashbackTransactionsV2Query>
>;

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useCashbackTransactionsV2Query: jest.fn(),
}));

describe('LifeTimeCashbackBalanceCard', () => {
  beforeEach(() => {
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
  });
  it('should render correctly', () => {
    const { getByText } = render(<LifeTimeCashbackBalanceCard onPress={() => {}} />);
    expect(getByText('Cashback: $95.50')).toBeTruthy();
  });

  it('onPress should work correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<LifeTimeCashbackBalanceCard onPress={mockOnPress} />);

    fireEvent.press(getByText('Cashback: $95.50'));

    expect(mockedEventTracking).toBeCalledWith({
      categoryName: 'user action',
      event: 'Click on lifetime cashback tile',
      metaData: {
        module: 'Benefits pillar',
      },
    });
    expect(mockOnPress).toBeCalledTimes(1);
  });

  it('should render nothing when dont have permission', () => {
    mockUseCheckCompletelyOnboardCashback.mockReturnValue({
      isCompleted: false,
      isError: false,
      isFetched: true,
      isLoading: false,
    });
    const { queryByText } = render(<LifeTimeCashbackBalanceCard onPress={() => {}} />);
    expect(queryByText('Cashback: $95.50')).toBeNull();
  });

  it('should render skeleton when is loading', () => {
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
    const { getByTestId, queryByText } = render(
      <LifeTimeCashbackBalanceCard onPress={() => {}} testID="lifetime cashback" />
    );
    expect(queryByText('Cashback: $95.50')).toBeNull();
    expect(getByTestId('lifetime cashback skeleton')).toBeTruthy();
  });

  it('should render nothing when is error', () => {
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
    const { queryByText } = render(<LifeTimeCashbackBalanceCard onPress={() => {}} />);
    expect(queryByText('Cashback: $95.50')).toBeNull();
  });
});
