import React from 'react';
import { BillManagementDashboardScreen } from '..';
import { WalletTabKeys } from '../../../../../common/constants/navigation';
import { useTopTabStore } from '../../../../../common/stores/useTopTabStore';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { render, waitFor } from '../../../../../common/utils/testing';
import type { GetSubscriptionsQuery } from '../../../../../new-graphql/generated';
import {
  Currency,
  Pid,
  SubscriptionStatus,
  SubscriptionType,
  useGetSubscriptionsQuery,
} from '../../../../../new-graphql/generated';

const mockUseGetSubscriptionsQuery = useGetSubscriptionsQuery as unknown as jest.Mock<
  MockQueryResult<GetSubscriptionsQuery> & {
    refetch: () => void;
  }
>;
(mockUseGetSubscriptionsQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetSubscriptionsQuery: jest.fn(),
}));

const mockTracking = jest.fn();
const mockTrackingPageVisit = jest.fn();
jest.mock('../../../hooks/useMoneyBillMgmtTracking', () => ({
  useMoneyBillMgmtTracking: () => ({
    trackClickBillSubscription: mockTracking,
    trackVisitMoneyBillPage: mockTrackingPageVisit,
  }),
}));

const mockUseTopTabStore = useTopTabStore as unknown as jest.Mock<string>;
jest.mock('../../../../../common/stores/useTopTabStore', () => ({
  useTopTabStore: jest.fn(),
}));

const mockUseGetSubscriptionsQueryDataOnlyActive = {
  me: {
    billManagement: {
      subscriptions: {
        edges: [
          {
            node: {
              id: '123455',
              createdAt: '2023-05-24T00:00:00.000Z',
              updatedAt: '2023-05-24T00:00:00.000Z',
              status: SubscriptionStatus.Active,
              subscriptionType: SubscriptionType.Electricity,
              provider: {
                id: Pid.SimplyEnergy,
                name: 'Simply Energy',
              },
              totalSaved: {
                amount: 96,
                currency: Currency.Aud,
              },
            },
          },
        ],
        pageInfo: {
          hasNextPage: false,
          endCursor: undefined,
        },
      },
    },
  },
};

const mockUseGetSubscriptionsQueryDataOnlyCancelled = {
  me: {
    billManagement: {
      subscriptions: {
        edges: [
          {
            node: {
              id: '123455',
              createdAt: '2023-05-24T00:00:00.000Z',
              updatedAt: '2023-05-24T00:00:00.000Z',
              status: SubscriptionStatus.Cancelled,
              subscriptionType: SubscriptionType.Electricity,
              provider: {
                id: Pid.SimplyEnergy,
                name: 'Simply Energy',
              },
              totalSaved: {
                amount: 96,
                currency: Currency.Aud,
              },
            },
          },
        ],
        pageInfo: {
          hasNextPage: false,
          endCursor: undefined,
        },
      },
    },
  },
};

const mockUseGetSubscriptionsQueryDataOnlyPending = {
  me: {
    billManagement: {
      subscriptions: {
        edges: [
          {
            node: {
              id: '123455',
              createdAt: '2023-05-24T00:00:00.000Z',
              updatedAt: '2023-05-24T00:00:00.000Z',
              status: SubscriptionStatus.Pending,
              subscriptionType: SubscriptionType.Electricity,
              provider: {
                id: Pid.SimplyEnergy,
                name: 'Simply Energy',
              },
              totalSaved: {
                amount: 96,
                currency: Currency.Aud,
              },
            },
          },
        ],
        pageInfo: {
          hasNextPage: false,
          endCursor: undefined,
        },
      },
    },
  },
};

describe('BillManagementDashboardScreen', () => {
  beforeEach(() => {
    mockUseGetSubscriptionsQuery.mockReturnValue({
      data: mockUseGetSubscriptionsQueryDataOnlyActive,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
    mockUseTopTabStore.mockClear();
  });

  it('should track page visit when current tab is selected', async () => {
    mockUseTopTabStore.mockReturnValue(WalletTabKeys.BILL_MANAGEMENT);
    render(<BillManagementDashboardScreen />);
    expect(mockTrackingPageVisit).toBeCalled();
  });

  it('should not track page visit when current tab is selected', () => {
    render(<BillManagementDashboardScreen />);
    expect(mockTrackingPageVisit).not.toBeCalled();
  });

  it('should show bill subscription list if there is at least one active subscription', async () => {
    const { getByTestId } = render(<BillManagementDashboardScreen />);

    await waitFor(() => {
      expect(getByTestId('123455')).toBeTruthy();
    });
  });

  it('should show bill subscription list if there is at least one cancelled subscription', async () => {
    mockUseGetSubscriptionsQuery.mockReturnValue({
      data: mockUseGetSubscriptionsQueryDataOnlyCancelled,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const { getByTestId } = render(<BillManagementDashboardScreen />);

    await waitFor(() => {
      expect(getByTestId('123455')).toBeTruthy();
    });
  });

  it('should show empty state if there is no active or cancelled subscription', async () => {
    mockUseGetSubscriptionsQuery.mockReturnValue({
      data: mockUseGetSubscriptionsQueryDataOnlyPending,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const { getByText } = render(<BillManagementDashboardScreen />);

    await waitFor(() => {
      expect(getByText('Bills')).toBeTruthy();
    });
  });
});
