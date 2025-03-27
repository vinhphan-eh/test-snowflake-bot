import React from 'react';
import { NavigationContext, type NavigationProp } from '@react-navigation/native';
import { mockReturnIncomeVisibility } from '../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockUseIsAccountAU } from '../../../../../common/hooks/__mocks__/useIsAccountAU';
import { useMoneyPillarPermission } from '../../../../../common/hooks/useEbfPillarPermission';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { render } from '../../../../../common/utils/testing';
import {
  useGetInstapayTransactionsQuery,
  type GetInstapayTransactionsQuery,
} from '../../../../../new-graphql/generated';
import { mockUseEstInstaPayNowBalances } from '../../../../income/instapay/hooks/__mocks__/useEstInstaPayNowBalances';
import { mockUseInstaPayAvailableBalances } from '../../../../income/instapay/hooks/__mocks__/useInstaPayAvailableBalances';
import { InstapaySwagCarousel } from '../InstapaySwagCarousel';

const mockUseGetInstapayTransactionsQuery = useGetInstapayTransactionsQuery as unknown as jest.Mock<
  MockQueryResult<GetInstapayTransactionsQuery>
>;

(mockUseGetInstapayTransactionsQuery as unknown as { getKey: () => string }).getKey = jest.fn();

const mockUseMoneyPillarPermission = useMoneyPillarPermission as unknown as jest.Mock;
(mockUseMoneyPillarPermission as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetInstapayTransactionsQuery: jest.fn(),
}));

jest.mock('../../../../../common/hooks/useEbfPillarPermission', () => ({
  ...jest.requireActual('../../../../../common/hooks/useEbfPillarPermission'),
  useMoneyPillarPermission: jest.fn(),
}));

const navigationContext: NavigationProp<never> = {
  isFocused: () => true,
  addListener: () => () => {},
} as unknown as NavigationProp<never>;

describe('InstapaySwagCarousel', () => {
  beforeEach(() => {
    mockReturnIncomeVisibility({});
    mockUseMoneyPillarPermission.mockReturnValue({ permission: true });
    mockUseIsAccountAU.mockReturnValue(true);
    mockUseEstInstaPayNowBalances.mockReturnValue({
      isError: false,
      isLoading: false,
      estBalance: 0,
      hasEstBalance: false,
    });
  });

  it('should not render when user is not eligible', () => {
    mockReturnIncomeVisibility({ showInstapay: false });
    const { queryByText } = render(<InstapaySwagCarousel />);
    expect(queryByText('Why wait until payday?')).toBeNull();
  });

  it('should not render when user is not AU account', () => {
    mockUseIsAccountAU.mockReturnValue(false);
    mockUseMoneyPillarPermission.mockReturnValue({ permission: false });
    const { queryByText } = render(<InstapaySwagCarousel />);
    expect(queryByText('Why wait until payday?')).toBeNull();
  });

  it('should not render when user is not have money pillar permission', () => {
    mockReturnIncomeVisibility({ showInstapay: true });
    mockUseMoneyPillarPermission.mockReturnValue({ permission: false });
    const { queryByText } = render(<InstapaySwagCarousel />);
    expect(queryByText('Why wait until payday?')).toBeNull();
  });

  it('should renders the carousel title', () => {
    mockReturnIncomeVisibility({ showInstapay: false });
    const { queryByTestId } = render(<InstapaySwagCarousel />);
    expect(queryByTestId('instapay-now-swag-tile')).toBeNull();
  });

  it('should renders the carousel title and instapay now when user is eligible', () => {
    mockReturnIncomeVisibility({ showInstapay: true });
    mockUseGetInstapayTransactionsQuery.mockReturnValue({
      data: {
        me: {
          orgs: [],
        },
      },
      isLoading: false,
      isError: false,
    });
    mockUseInstaPayAvailableBalances.mockReturnValue({
      allOrgsViolatePolicy: false,
      sumReachedMinimumBalances: 0,
      isError: false,
      isLoading: false,
    } as never);
    const { getByTestId, getByText, queryByTestId } = render(
      <NavigationContext.Provider value={navigationContext}>
        <InstapaySwagCarousel />
      </NavigationContext.Provider>
    );
    expect(getByText('Why wait until payday?')).toBeTruthy();
    expect(getByTestId('instapay-now-swag-tile')).toBeTruthy();
    expect(queryByTestId('instapay-daily-swag-tile')).toBeNull();
  });

  it('should renders both tiles when user is eligible', () => {
    mockReturnIncomeVisibility({ showInstapay: true });
    mockUseGetInstapayTransactionsQuery.mockReturnValue({
      data: {
        me: {
          orgs: [],
        },
      },
      isLoading: false,
      isError: false,
    });
    mockUseInstaPayAvailableBalances.mockReturnValue({
      allOrgsViolatePolicy: false,
      sumReachedMinimumBalances: 0,
      isError: false,
      isLoading: false,
    } as never);

    const { getByTestId, getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <InstapaySwagCarousel />
      </NavigationContext.Provider>
    );
    expect(getByText('Why wait until payday?')).toBeTruthy();
    expect(getByTestId('instapay-now-swag-tile')).toBeTruthy();
  });
});
