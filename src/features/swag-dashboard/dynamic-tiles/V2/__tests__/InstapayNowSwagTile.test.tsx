import React from 'react';
import type { NavigationProp } from '@react-navigation/native';
import { NavigationContext } from '@react-navigation/native';
import dayjs from 'dayjs';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { WithIntlProvider, fireEvent, render } from '../../../../../common/utils/testing';
import {
  useGetInstapayTransactionsQuery,
  type GetInstapayTransactionsQuery,
} from '../../../../../new-graphql/generated';
import {
  USER_SEE_DYNAMIC_INSTAPAY_NOW_TILE,
  CLICK_ON_DYNAMIC_INSTAPAY_NOW_TILE,
} from '../../../../income/instapay/constants/trackingEvents';
import { mockUseEstInstaPayNowBalances } from '../../../../income/instapay/hooks/__mocks__/useEstInstaPayNowBalances';
import { mockUseInstaPayAvailableBalances } from '../../../../income/instapay/hooks/__mocks__/useInstaPayAvailableBalances';
import { InstaPayNowSwagTile } from '../InstapayNowSwagTile';

const mockUseGetInstapayTransactionsQuery = useGetInstapayTransactionsQuery as unknown as jest.Mock<
  MockQueryResult<GetInstapayTransactionsQuery>
>;

(mockUseGetInstapayTransactionsQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetInstapayTransactionsQuery: jest.fn(),
}));

const navigationContext: NavigationProp<never> = {
  isFocused: () => true,
  addListener: () => () => {},
} as unknown as NavigationProp<never>;

describe('InstaPayNowSwagTile', () => {
  beforeEach(() => {
    mockUseEstInstaPayNowBalances.mockReturnValue({
      isError: false,
      isLoading: false,
      estBalance: 0,
      hasEstBalance: false,
    });
  });

  it('should render correctly when user have not make any instapay transactions and has no balance', () => {
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
      allOrgsViolatePolicy: true,
      sumReachedMinimumBalances: 0,
      isError: false,
      isLoading: false,
    } as never);
    const { getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <InstaPayNowSwagTile underMaintenance={false} />
      </NavigationContext.Provider>
    );
    expect(getByText('Learn about how to get paid on-demand')).toBeTruthy();
    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: USER_SEE_DYNAMIC_INSTAPAY_NOW_TILE,
      metaData: {
        module: 'InstaPay',
        type: 'noHistory_cannotWithdraw',
      },
    });

    fireEvent.press(getByText('Learn about how to get paid on-demand'));

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: CLICK_ON_DYNAMIC_INSTAPAY_NOW_TILE,
      metaData: {
        module: 'InstaPay',
        type: 'noHistory_cannotWithdraw',
      },
    });
    expect(mockUseGetInstapayTransactionsQuery).toHaveBeenCalledWith(
      {
        filters: { payType: 'INSTAPAY' },
      },
      { staleTime: 180000 }
    );
  });

  it('should render balance when user have not make any instapay transactions and balance is ready to withdraw', async () => {
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
      sumAvailableBalance: 150,
      isError: false,
      isLoading: false,
    } as never);
    const { getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <InstaPayNowSwagTile underMaintenance={false} />
      </NavigationContext.Provider>
    );
    expect(getByText('Updated 1 minute ago')).toBeVisible();

    fireEvent.press(getByText('Updated 1 minute ago'));
    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: CLICK_ON_DYNAMIC_INSTAPAY_NOW_TILE,
      metaData: {
        module: 'InstaPay',
        type: 'noHistory_readyWithdraw',
      },
    });
  });

  it('should render estimated balance correctly when user has transactions and estimated balance', () => {
    mockUseInstaPayAvailableBalances.mockReturnValue({
      allOrgsViolatePolicy: false,
      sumReachedMinimumBalances: 0,
      isError: false,
      isLoading: true,
    } as never);

    mockUseGetInstapayTransactionsQuery.mockReturnValue({
      data: {
        me: {
          orgs: [
            {
              instapay: {
                transactions: {
                  transactions: [
                    {
                      id: '',
                      createdAt: '',
                      amount: {},
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

    mockUseEstInstaPayNowBalances.mockReturnValue({
      isError: false,
      isLoading: false,
      estBalance: 150,
      hasEstBalance: true,
      updatedAt: dayjs().subtract(30, 'minutes').toDate(),
    });

    const { getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <InstaPayNowSwagTile underMaintenance={false} />
      </NavigationContext.Provider>
    );
    expect(getByText('Updated 30 minutes ago')).toBeVisible();

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: USER_SEE_DYNAMIC_INSTAPAY_NOW_TILE,
      metaData: {
        module: 'InstaPay',
        type: 'readyWithdraw',
      },
    });
    fireEvent.press(getByText('Updated 30 minutes ago'));
    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: CLICK_ON_DYNAMIC_INSTAPAY_NOW_TILE,
      metaData: {
        module: 'InstaPay',
        type: 'readyWithdraw',
      },
    });
  });

  it('should send mixpanel event correctly when user has transaction but no balance', () => {
    mockUseEstInstaPayNowBalances.mockReturnValue({
      isError: false,
      isLoading: false,
      estBalance: 0,
      hasEstBalance: false,
    });

    mockUseGetInstapayTransactionsQuery.mockReturnValue({
      data: {
        me: {
          orgs: [
            {
              instapay: {
                transactions: {
                  transactions: [
                    {
                      id: '',
                      createdAt: '',
                      amount: {},
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
    mockUseInstaPayAvailableBalances.mockReturnValue({
      allOrgsViolatePolicy: true,
      sumReachedMinimumBalances: 0,
      isError: false,
      isLoading: false,
    } as never);

    const { getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <InstaPayNowSwagTile underMaintenance={false} />
      </NavigationContext.Provider>
    );
    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: USER_SEE_DYNAMIC_INSTAPAY_NOW_TILE,
      metaData: {
        module: 'InstaPay',
        type: 'cannotWithdraw',
      },
    });
    fireEvent.press(getByText('Learn about how to get paid on-demand'));
    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: CLICK_ON_DYNAMIC_INSTAPAY_NOW_TILE,
      metaData: {
        module: 'InstaPay',
        type: 'cannotWithdraw',
      },
    });
  });

  it('should render skeleton when loading estimated balance', () => {
    mockUseEstInstaPayNowBalances.mockReturnValue({
      isError: false,
      isLoading: true,
      estBalance: 150,
      hasEstBalance: true,
    });

    mockUseGetInstapayTransactionsQuery.mockReturnValue({
      data: {
        me: {
          orgs: [],
        },
      },
      isLoading: true,
      isError: false,
    });

    mockUseInstaPayAvailableBalances.mockReturnValue({
      allOrgsViolatePolicy: false,
      sumReachedMinimumBalances: 0,
      isError: false,
      isLoading: true,
    } as never);

    const { getByTestId } = render(
      <NavigationContext.Provider value={navigationContext}>
        <InstaPayNowSwagTile underMaintenance={false} />
      </NavigationContext.Provider>
    );
    expect(getByTestId('instapay-now-skeleton')).toBeVisible();
    expect(mockedEventTracking).not.toHaveBeenCalled();
  });

  it('should send only 2 event to mixpanel', () => {
    mockUseEstInstaPayNowBalances.mockReturnValue({
      isError: false,
      isLoading: true,
      estBalance: 0,
      hasEstBalance: false,
    });
    mockUseGetInstapayTransactionsQuery.mockReturnValue({
      data: {},
      isLoading: true,
      isError: false,
    });
    mockUseInstaPayAvailableBalances.mockReturnValue({
      allOrgsViolatePolicy: true,
      sumReachedMinimumBalances: 0,
      isError: false,
      isLoading: true,
    } as never);

    const { rerender } = render(
      <NavigationContext.Provider value={navigationContext}>
        <InstaPayNowSwagTile underMaintenance={false} />
      </NavigationContext.Provider>
    );

    expect(mockedEventTracking).not.toHaveBeenCalled();

    // not send event when loading transactions
    mockUseEstInstaPayNowBalances.mockReturnValue({
      isError: false,
      isLoading: false,
      estBalance: 100,
      hasEstBalance: true,
    });

    rerender(
      <WithIntlProvider>
        <NavigationContext.Provider value={navigationContext}>
          <InstaPayNowSwagTile underMaintenance={false} />
        </NavigationContext.Provider>
      </WithIntlProvider>
    );
    expect(mockedEventTracking).not.toHaveBeenCalled();

    // send event when both transactions and estBalance are loaded
    mockUseGetInstapayTransactionsQuery.mockReturnValue({
      data: {},
      isLoading: false,
      isError: false,
    });

    rerender(
      <WithIntlProvider>
        <NavigationContext.Provider value={navigationContext}>
          <InstaPayNowSwagTile underMaintenance={false} />
        </NavigationContext.Provider>
      </WithIntlProvider>
    );
    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: USER_SEE_DYNAMIC_INSTAPAY_NOW_TILE,
      metaData: {
        module: 'InstaPay',
        type: 'noHistory_readyWithdraw',
      },
    });
    expect(mockedEventTracking).toHaveBeenCalledTimes(1);

    // not send new event after finish loading live balance
    mockUseInstaPayAvailableBalances.mockReturnValue({
      allOrgsViolatePolicy: true,
      sumReachedMinimumBalances: 0,
      isError: false,
      isLoading: false,
    } as never);
    rerender(
      <WithIntlProvider>
        <NavigationContext.Provider value={navigationContext}>
          <InstaPayNowSwagTile underMaintenance={false} />
        </NavigationContext.Provider>
      </WithIntlProvider>
    );
    expect(mockedEventTracking).toHaveBeenCalledTimes(1);
  });
});
