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
import { SubscriptionAlert } from '../SubscriptionAlert';

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
              id: '12345',
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
              status: SubscriptionStatus.Pending,
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

describe('ComingSoonFeatureAlert', () => {
  beforeEach(() => {
    mockUseGetSubscriptionsQuery.mockReturnValue({ data: mockSubscriptionsQuery, isLoading: false, isError: false });
  });

  it('should render correctly when all conditions met', () => {
    const { getByText } = render(<SubscriptionAlert />);

    expect(
      getByText('Your Simply Energy account might be associated with a different email. Please ', { exact: false })
    ).toBeTruthy();
    expect(getByText('contact Simply Energy')).toBeTruthy();
    expect(getByText(' for further assistance', { exact: false })).toBeTruthy();
  });
});
