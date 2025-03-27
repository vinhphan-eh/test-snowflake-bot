import type { MockQueryResult } from '../../../../common/types/react-query';
import { renderHook } from '../../../../common/utils/testing';
import type { GetSubscriptionsQuery } from '../../../../new-graphql/generated';
import {
  Currency,
  Pid,
  SubscriptionStatus,
  SubscriptionType,
  useGetSubscriptionsQuery,
} from '../../../../new-graphql/generated';
import { useHasActiveBillSubscription } from '../useHasActiveBillSubscription';

const mockUseGetSubscriptionsQuery = useGetSubscriptionsQuery as unknown as jest.Mock<
  MockQueryResult<GetSubscriptionsQuery>
>;
(mockUseGetSubscriptionsQuery as unknown as { getKey: () => string }).getKey = jest.fn();

const mockUseGetSubscriptionsQueryDataWithStatus = (status: SubscriptionStatus) => {
  return {
    me: {
      billManagement: {
        subscriptions: {
          edges: [
            {
              node: {
                id: '123455',
                createdAt: '',
                updatedAt: '',
                status,
                subscriptionType: SubscriptionType.Electricity,
                provider: {
                  id: Pid.SimplyEnergy,
                  name: 'Simply Energy',
                },
                totalSaved: {
                  amount: 96,
                  currency: Currency.Aud,
                },
                transactions: {
                  edges: [],
                  pageInfo: {
                    hasNextPage: false,
                    endCursor: undefined,
                  },
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
};

jest.mock('../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../new-graphql/generated'),
  useGetSubscriptionsQuery: jest.fn(),
}));

describe('useHasActiveBillSubscription', () => {
  it.each`
    status                          | expected
    ${SubscriptionStatus.Active}    | ${true}
    ${SubscriptionStatus.Cancelled} | ${true}
    ${SubscriptionStatus.Pending}   | ${false}
    ${SubscriptionStatus.Reject}    | ${false}
    ${SubscriptionStatus.Submitted} | ${false}
  `('should work correctly', ({ expected, status }) => {
    mockUseGetSubscriptionsQuery.mockReturnValue({
      data: mockUseGetSubscriptionsQueryDataWithStatus(status),
      isLoading: false,
      isError: false,
    });
    const hook = renderHook(() => useHasActiveBillSubscription());

    expect(hook.result.current.hasBillSubscription).toBe(expected);
  });
});
