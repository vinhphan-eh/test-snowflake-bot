import React from 'react';
import { mockedSwitchPillar } from '../../../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { fireEvent, render } from '../../../../../common/utils/testing';
import type { GetSubscriptionsQuery } from '../../../../../new-graphql/generated';
import {
  Currency,
  Pid,
  SubscriptionStatus,
  SubscriptionType,
  useGetSubscriptionsQuery,
} from '../../../../../new-graphql/generated';
import { useBillManagementMoneyAccess } from '../../../../bill-management/hooks/useBillManagementMoneyAccess';
import { GoToBillMoney } from '../GoToBillMoney';

const mockTracking = jest.fn();
jest.mock('../../hooks/useBenefitsBillMgmtTracking', () => ({
  useBenefitsBillMgmtTracking: () => ({
    trackClickGoToBillMgmt: mockTracking,
  }),
}));

jest.mock('../../../../bill-management/hooks/useBillManagementMoneyAccess');

const mockUseBillManagementMoneyAccess = useBillManagementMoneyAccess as jest.MockedFn<
  typeof useBillManagementMoneyAccess
>;

const mockActiveSubscriptionsQuery: GetSubscriptionsQuery = {
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
                amount: 95,
                currency: Currency.Aud,
              },
            },
          },
          {
            node: {
              id: '12345512312',
              createdAt: '2023-05-24T00:00:00.000Z',
              updatedAt: '2023-05-24T00:00:00.000Z',
              status: SubscriptionStatus.Pending,
              subscriptionType: SubscriptionType.Electricity,
              provider: {
                id: Pid.SimplyEnergy,
                name: 'Simply Energy',
              },
              totalSaved: {
                amount: 95,
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

const mockPendingSubscriptionsQuery: GetSubscriptionsQuery = {
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
                amount: 95,
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

const mockUseGetSubscriptionsQuery = useGetSubscriptionsQuery as unknown as jest.Mock<
  MockQueryResult<GetSubscriptionsQuery>
>;
(mockUseGetSubscriptionsQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetSubscriptionsQuery: jest.fn(),
}));

describe('GoToBillMoney', () => {
  beforeEach(() => {
    mockUseGetSubscriptionsQuery.mockReturnValue({
      data: mockActiveSubscriptionsQuery,
      isLoading: false,
      isError: false,
    });
  });
  it('should work correctly', () => {
    mockUseBillManagementMoneyAccess.mockReturnValue({ permission: true });
    const { getByText } = render(<GoToBillMoney />);
    fireEvent.press(getByText('Go to bill management'));

    expect(mockTracking).toBeCalled();
    expect(mockedSwitchPillar).toBeCalledWith({
      to: {
        pillarId: 'WalletApp',
        tab: 'bill-management',
      },
    });
  });

  it('should render nothing when there is no active subscription', () => {
    mockUseBillManagementMoneyAccess.mockReturnValue({ permission: false });
    mockUseGetSubscriptionsQuery.mockReturnValue({
      data: mockPendingSubscriptionsQuery,
      isLoading: false,
      isError: false,
    });
    const { queryByText } = render(<GoToBillMoney />);
    expect(queryByText('Go to bill management')).toBeNull();
  });
});
