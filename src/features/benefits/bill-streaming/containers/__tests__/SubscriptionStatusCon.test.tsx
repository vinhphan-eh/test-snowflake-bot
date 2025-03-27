import React from 'react';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { render } from '../../../../../common/utils/testing';
import type { GetSubscriptionsQuery } from '../../../../../new-graphql/generated';
import {
  Currency,
  Pid,
  SubscriptionStatus,
  SubscriptionType,
  useGetSubscriptionsQuery,
} from '../../../../../new-graphql/generated';
import { SubscriptionStatusCon } from '../SubscriptionStatusCon';

const mockSubscriptionsQuery: GetSubscriptionsQuery = {
  me: {
    billManagement: {
      subscriptions: {
        edges: [
          {
            node: {
              id: '123',
              createdAt: '2023-05-24T00:00:00.000Z',
              updatedAt: '2023-05-24T00:00:00.000Z',
              status: SubscriptionStatus.Submitted,
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
              id: '1234',
              createdAt: '2023-05-24T00:00:00.000Z',
              updatedAt: '2023-05-24T00:00:00.000Z',
              status: SubscriptionStatus.Pending,
              subscriptionType: SubscriptionType.Gas,
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
              id: '1234553123',
              createdAt: '2023-05-24T00:00:00.000Z',
              updatedAt: '2023-05-24T00:00:00.000Z',
              status: SubscriptionStatus.Submitted,
              subscriptionType: SubscriptionType.Unknown,
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

describe('SubscriptionStatusCon', () => {
  beforeEach(() => {
    mockUseGetSubscriptionsQuery.mockReturnValue({ data: mockSubscriptionsQuery, isLoading: false, isError: false });
  });
  it('should render correctly', () => {
    const { getAllByText, getByText } = render(<SubscriptionStatusCon />);
    expect(getAllByText('PENDING APPROVAL').length).toBe(3);
    expect(getByText('Electricity')).toBeTruthy();
    expect(getByText('Gas')).toBeTruthy();
    expect(getByText('Unknown')).toBeTruthy();
  });
});
