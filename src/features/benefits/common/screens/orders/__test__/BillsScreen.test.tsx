import React from 'react';
import type { MockQueryResult } from '../../../../../../common/types/react-query';
import { render } from '../../../../../../common/utils/testing';
import type { GetSubscriptionsQuery } from '../../../../../../new-graphql/generated';
import {
  Currency,
  Pid,
  SubscriptionStatus,
  SubscriptionType,
  useGetSubscriptionsQuery,
} from '../../../../../../new-graphql/generated';
import { mockBillOfferList } from '../../../../../../new-graphql/handlers/custom-mock/billManangement';
import { useBillManagementMoneyAccess } from '../../../../../bill-management/hooks/useBillManagementMoneyAccess';
import { mockUseGetAllBillOffers } from '../../../../bill-streaming/hooks/__mocks__/useGetAllBillOffers';
import { BillsTab } from '../BillsTab';
// import { useGetAllBillOffers } from '../../../../bill-streaming/hooks/useGetAllBillOffers';

const mockUseBillManagementMoneyAccess = useBillManagementMoneyAccess as jest.MockedFn<
  typeof useBillManagementMoneyAccess
>;

jest.mock('../../../../../bill-management/hooks/useBillManagementMoneyAccess');
jest.mock('../../../../bill-streaming/hooks/useGetAllBillOffers', () => ({
  useGetAllBillOffers: jest.fn(),
}));

const mockSubscriptionsQuery: GetSubscriptionsQuery = {
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

jest.mock('../../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../../new-graphql/generated'),
  useGetSubscriptionsQuery: jest.fn(),
}));

describe('BillsScreen', () => {
  beforeEach(() => {
    mockUseBillManagementMoneyAccess.mockReturnValue({ permission: true });
    mockUseGetAllBillOffers.mockReturnValue({ billOffers: mockBillOfferList, isLoading: false, isError: false });
    mockUseGetSubscriptionsQuery.mockReturnValue({ data: mockSubscriptionsQuery, isLoading: false, isError: false });
  });

  it('Should render properly', () => {
    const { getByText } = render(<BillsTab />);

    expect(getByText('Total saved')).toBeTruthy();
    expect(getByText('On all bills')).toBeTruthy();
    expect(getByText('Go to bill management')).toBeTruthy();
  });

  it('Should render properly when user not sign up bill yet', () => {
    mockUseGetSubscriptionsQuery.mockReturnValue({
      data: {
        me: {
          billManagement: {
            subscriptions: {
              edges: [],
              pageInfo: {
                hasNextPage: false,
                endCursor: undefined,
              },
            },
          },
        },
      },
      isLoading: false,
      isError: false,
    });
    const { getByText } = render(<BillsTab />);

    expect(getByText('Total saved')).toBeTruthy();
    expect(getByText('Exclusive energy discount')).toBeTruthy();
    expect(getByText('Sign up today')).toBeTruthy();
    expect(getByText('On all bills')).toBeTruthy();
    expect(getByText('Go to bill management')).toBeTruthy();
  });
});
