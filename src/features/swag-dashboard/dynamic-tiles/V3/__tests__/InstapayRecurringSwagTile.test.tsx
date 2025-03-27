import React from 'react';
import Braze from '@braze/react-native-sdk';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { mockUseGetCountryCode } from '../../../../../common/hooks/__mocks__/useGetCountryCode';
import { mockReturnIncomeVisibility } from '../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockUseIsAccountUK } from '../../../../../common/hooks/__mocks__/useIsAccountUK';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { fireEvent, render } from '../../../../../common/utils/testing';
import {
  SchedulingSubscriptionPlan,
  useGetSchedulingSubscriptionsQuery,
  type GetSchedulingSubscriptionsQuery,
} from '../../../../../new-graphql/generated';
import {
  RECURRING_SWAG_TILE_FOR_NOT_REGISTERED_ID,
  RECURRING_SWAG_TILE_FOR_REGISTERED_ID,
} from '../../../../income/instapay/constants/braze';
import {
  CLICK_ON_INSTAPAY_RECURRING_TILE,
  INSTAPAY_MODULE_NAME,
  USER_SEE_INSTAPAY_RECURRING_TILE,
} from '../../../../income/instapay/constants/trackingEvents';
import { mockUseLoadBrazeContentForTiles } from '../../hooks/__mocks__/useLoadBrazeContentForTiles';
import { InstapayRecurringSwagTile } from '../InstapayRecurringSwagTile';

const mockUseGetSchedulingSubscriptionsQuery = useGetSchedulingSubscriptionsQuery as unknown as jest.Mock<
  MockQueryResult<GetSchedulingSubscriptionsQuery>
>;
(mockUseGetSchedulingSubscriptionsQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetSchedulingSubscriptionsQuery: jest.fn(),
}));

describe('InstapayRecurringSwagTile', () => {
  beforeEach(() => {
    mockReturnIncomeVisibility({ showInstapay: true, showIncomeTab: true });

    mockUseLoadBrazeContentForTiles.mockReturnValue({
      cardId: RECURRING_SWAG_TILE_FOR_REGISTERED_ID,
      image: 'https://image.com/test-image.png',
      extras: {
        prefixText: 'You have',
        amountType: 'scheduled',
        postfixText: 'available',
      },
    });

    mockUseGetSchedulingSubscriptionsQuery.mockReturnValue({
      data: {
        me: {
          orgs: [
            {
              id: 1,
              uuid: 'test-uuid',
              kpBusinessId: 123,
              instapay: {
                schedulingSubscriptions: {
                  subscriptions: [
                    {
                      id: 'subscription-id',
                      amount: {
                        subUnits: 10,
                        units: 100,
                      },
                      plan: SchedulingSubscriptionPlan.Frequently,
                      bankAccountExternalId: '',
                    },
                  ],
                },
              },
            },
          ],
        },
      },
      isLoading: false,
      isError: false,
    });

    mockUseGetCountryCode.mockReturnValue('AU');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when brazeContent is unavailable', () => {
    mockUseLoadBrazeContentForTiles.mockReturnValue(null);

    const { queryByTestId } = render(<InstapayRecurringSwagTile />);

    expect(mockedEventTracking).not.toHaveBeenCalled();
    expect(queryByTestId('instapay-recurring-swag-tile')).toBeNull();
  });

  it.each([
    {
      country: 'AU',
      symbol: '$',
    },
    {
      country: 'UK',
      symbol: '£',
    },
  ])('should render correctly when brazeContent is available in $country', ({ country, symbol }) => {
    mockUseIsAccountUK.mockReturnValue(country === 'UK');
    const { getByText, queryByTestId } = render(<InstapayRecurringSwagTile />);

    expect(queryByTestId('instapay-recurring-swag-tile')).toBeTruthy();
    expect(getByText('You have')).toBeTruthy();
    expect(getByText(`${symbol}100`)).toBeTruthy();
    expect(getByText('available')).toBeTruthy();
  });

  it('should render correctly when user has no active scheduling withdrawal', () => {
    mockUseGetSchedulingSubscriptionsQuery.mockReturnValue({
      data: {
        me: {
          orgs: [],
        },
      },
    });

    mockUseLoadBrazeContentForTiles.mockReturnValue({
      cardId: RECURRING_SWAG_TILE_FOR_NOT_REGISTERED_ID,
      image: 'https://image.com/test-image.png',
      extras: {},
    });

    const { queryByTestId } = render(<InstapayRecurringSwagTile />);

    expect(queryByTestId('instapay-recurring-swag-tile')).toBeTruthy();
  });

  it('should track tile visibility on load', () => {
    render(<InstapayRecurringSwagTile />);

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: USER_SEE_INSTAPAY_RECURRING_TILE,
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        isRecurringSetUp: true,
        ehCountry: 'AU',
      },
    });
  });

  it('should track click on the tile', () => {
    const { getByTestId } = render(<InstapayRecurringSwagTile />);

    fireEvent.press(getByTestId('instapay-recurring-swag-tile'));

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: CLICK_ON_INSTAPAY_RECURRING_TILE,
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        isRecurringSetUp: true,
        ehCountry: 'AU',
      },
    });
    expect(Braze.logContentCardClicked).toHaveBeenCalledWith(RECURRING_SWAG_TILE_FOR_REGISTERED_ID);
  });

  it('should render skeleton when isLoading is true and amountType is scheduled', () => {
    mockUseGetSchedulingSubscriptionsQuery.mockReturnValue({
      isLoading: true,
      isError: false,
      data: {
        me: {
          orgs: [],
        },
      },
    });

    mockUseLoadBrazeContentForTiles.mockReturnValue({
      cardId: RECURRING_SWAG_TILE_FOR_REGISTERED_ID,
      image: 'https://image.com/test-image.png',
      extras: {
        amountType: 'scheduled',
      },
    });

    const { getByTestId } = render(<InstapayRecurringSwagTile />);

    expect(getByTestId('instapay-recurring-skeleton')).toBeTruthy();
  });

  it('should not render skeleton when isLoading is true but amountType is not scheduled', () => {
    mockUseGetSchedulingSubscriptionsQuery.mockReturnValue({
      isLoading: true,
      isError: false,
      data: {
        me: {
          orgs: [],
        },
      },
    });

    mockUseLoadBrazeContentForTiles.mockReturnValue({
      cardId: RECURRING_SWAG_TILE_FOR_REGISTERED_ID,
      image: 'https://image.com/test-image.png',
      extras: {
        amountType: 'now_balance',
      },
    });

    const { queryByTestId } = render(<InstapayRecurringSwagTile />);

    expect(queryByTestId('instapay-recurring-skeleton')).toBeNull();
    expect(queryByTestId('instapay-recurring-swag-tile')).toBeTruthy();
  });

  it('should render fall-over tile when isError is true', () => {
    mockUseGetSchedulingSubscriptionsQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      data: {
        me: {
          orgs: [],
        },
      },
    });

    const { getByTestId } = render(<InstapayRecurringSwagTile />);

    expect(getByTestId('instapay-recurring-swag-fall-over-tile')).toBeTruthy();
  });
});
