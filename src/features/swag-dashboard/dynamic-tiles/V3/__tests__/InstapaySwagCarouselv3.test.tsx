import React from 'react';
import { NavigationContext, type NavigationProp } from '@react-navigation/native';
import { mockReturnIncomeVisibility } from '../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockUseLoadBrazeContentCards } from '../../../../../common/hooks/__mocks__/useLoadBrazeContentCards';
import { useMoneyPillarPermission } from '../../../../../common/hooks/useEbfPillarPermission';
import type { IncomeVisibility } from '../../../../../common/hooks/useIncomeVisibility';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { render } from '../../../../../common/utils/testing';
import {
  useGetInstapayTransactionsQuery,
  type GetInstapayTransactionsQuery,
} from '../../../../../new-graphql/generated';
import {
  IP_NOW_SWAG_TILE_FOR_NOT_VALID_ID,
  IP_NOW_SWAG_TILE_ID,
  RECURRING_SWAG_TILE_FOR_NOT_REGISTERED_ID,
  RECURRING_SWAG_TILE_FOR_REGISTERED_ID,
} from '../../../../income/instapay/constants/braze';
import { mockUseEstInstaPayNowBalances } from '../../../../income/instapay/hooks/__mocks__/useEstInstaPayNowBalances';
import { mockUseInstapayABTestDashboard } from '../../../../income/instapay/hooks/__mocks__/useInstapayABTestDashboard';
import { mockUseInstaPayAvailableBalances } from '../../../../income/instapay/hooks/__mocks__/useInstaPayAvailableBalances';
import { InstapaySwagCarouselV3 } from '../InstapaySwagCarouselV3';

const mockUseIncomeVisibility = (extras: Partial<IncomeVisibility>) =>
  mockReturnIncomeVisibility({
    instaPayScheduling: {
      isEligible: true,
      isLoading: false,
    },
    ...extras,
  });

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

describe('InstapaySwagCarouselV3', () => {
  beforeEach(() => {
    mockUseLoadBrazeContentCards.mockReturnValue({
      cards: [
        {
          id: 'campaign-id',
          image: 'https://image.com/image.png',
          extras: {
            id: 'instapay_testimonial_card',
          },
        },
        {
          id: 'campaign-id-2',
          extras: {
            id: RECURRING_SWAG_TILE_FOR_REGISTERED_ID,
            prefixText: 'You have',
            amountType: 'scheduled',
            postfixText: 'available',
          },
          amount: 100,
        },
        {
          id: 'campaign-id-2',
          image: 'image.url',
          extras: {
            id: RECURRING_SWAG_TILE_FOR_NOT_REGISTERED_ID,
          },
        },
        {
          id: 'campaign-id-3',
          extras: {
            id: IP_NOW_SWAG_TILE_ID,
            prefixText: 'Your latest balance is',
            amountType: 'now_balance',
          },
        },
        {
          id: 'campaign-id-4',
          image: 'image.url',
          extras: {
            id: IP_NOW_SWAG_TILE_FOR_NOT_VALID_ID,
          },
        },
      ] as never,
      requestContentCardsRefresh: jest.fn(),
      logCustomEvent: jest.fn(),
    });

    mockUseInstapayABTestDashboard.mockReturnValue({
      showBannerPopup: false,
      showTestimonialCard: false,
    });
    mockUseIncomeVisibility({});
    mockUseMoneyPillarPermission.mockReturnValue({ permission: true });
    mockUseEstInstaPayNowBalances.mockReturnValue({
      isError: false,
      isLoading: false,
      estBalance: 0,
      hasEstBalance: false,
    });
  });

  it('should render skeleton when loading', () => {
    mockUseIncomeVisibility({ isLoading: true, showInstapay: true });
    const { queryByTestId } = render(<InstapaySwagCarouselV3 />);
    expect(queryByTestId('instapay-swag-carousel-skeleton')).toBeTruthy();
  });

  it('should not render when showInstapay is false', () => {
    mockUseIncomeVisibility({ showInstapay: false });
    const { queryByTestId } = render(<InstapaySwagCarouselV3 />);
    expect(queryByTestId('instapay-swag-container')).toBeNull();
  });

  it('should not render when moneyPillarAccess is false', () => {
    mockUseMoneyPillarPermission.mockReturnValue({ permission: false });
    const { queryByTestId } = render(<InstapaySwagCarouselV3 />);
    expect(queryByTestId('instapay-swag-container')).toBeNull();
  });

  it('should not render when user is not eligible', () => {
    mockUseIncomeVisibility({ showInstapay: false });
    const { queryByText } = render(<InstapaySwagCarouselV3 />);
    expect(queryByText('Your latest balance is')).toBeNull();
    expect(queryByText('InstaPay Now')).toBeNull();
  });

  it('should not render when user is not have money pillar permission', () => {
    mockUseIncomeVisibility({ showInstapay: true });
    mockUseMoneyPillarPermission.mockReturnValue({ permission: false });
    const { queryByText } = render(<InstapaySwagCarouselV3 />);
    expect(queryByText('Your latest balance is')).toBeNull();
    expect(queryByText('InstaPay Now')).toBeNull();
  });

  it('should render InstapayNow tile when user is eligible for InstapayNow', () => {
    mockUseIncomeVisibility({
      showInstapay: true,
      instapayNowUnderMaintenance: false,
      instaPayScheduling: {
        isEligible: false,
        isLoading: false,
      },
    });
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

    const { getByTestId, queryByTestId } = render(
      <NavigationContext.Provider value={navigationContext}>
        <InstapaySwagCarouselV3 />
      </NavigationContext.Provider>
    );
    expect(getByTestId('instapay-now-swag-tile')).toBeTruthy();
    expect(queryByTestId('instapay-recurring-swag-tile')).toBeFalsy();
  });

  test.each([
    {
      isSchedulingEligible: true,
    },
    {
      isSchedulingEligible: false,
    },
  ])('should render recurring swag tile when user is eligible for recurring swag tile', ({ isSchedulingEligible }) => {
    mockUseIncomeVisibility({
      showInstapay: true,
      instapayNowUnderMaintenance: false,
      instaPayScheduling: {
        isEligible: isSchedulingEligible,
        isLoading: false,
      },
    });
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

    const { getByTestId, queryByTestId } = render(
      <NavigationContext.Provider value={navigationContext}>
        <InstapaySwagCarouselV3 />
      </NavigationContext.Provider>
    );
    expect(getByTestId('instapay-now-swag-tile')).toBeTruthy();

    if (isSchedulingEligible) {
      expect(getByTestId('instapay-recurring-swag-tile')).toBeTruthy();
    } else {
      expect(queryByTestId('instapay-recurring-swag-tile')).toBeNull();
    }
  });

  it('should not render instapay now tile when having testimonial card', () => {
    mockUseInstapayABTestDashboard.mockReturnValue({
      showBannerPopup: false,
      showTestimonialCard: true,
    });
    mockUseIncomeVisibility({ showInstapay: true, instapayNowUnderMaintenance: false });
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

    const { queryByTestId } = render(
      <NavigationContext.Provider value={navigationContext}>
        <InstapaySwagCarouselV3 />
      </NavigationContext.Provider>
    );
    expect(queryByTestId('instapay-testimonial-card')).toBeTruthy();
    expect(queryByTestId('instapay-now-swag-tile')).toBeNull();
  });
});
