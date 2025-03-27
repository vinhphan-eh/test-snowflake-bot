import { useSessionStore } from '../../../../common/stores/useSessionStore';
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
import { mockUseBillStreamPermission } from '../../../benefits/bill-streaming/hooks/__mocks__/useBillStreamPermission';
import { useBillManagementMoneyAccess } from '../useBillManagementMoneyAccess';

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

describe('useBillManagementMoneyAccess', () => {
  beforeEach(() => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      attributes: {
        terminated: false,
      },
    } as never;
  });

  it.each`
    billStreamingPermission | status                          | expected
    ${true}                 | ${SubscriptionStatus.Active}    | ${true}
    ${true}                 | ${SubscriptionStatus.Cancelled} | ${true}
    ${true}                 | ${SubscriptionStatus.Pending}   | ${true}
    ${true}                 | ${SubscriptionStatus.Reject}    | ${true}
    ${true}                 | ${SubscriptionStatus.Submitted} | ${true}
    ${false}                | ${SubscriptionStatus.Active}    | ${true}
    ${false}                | ${SubscriptionStatus.Cancelled} | ${true}
    ${false}                | ${SubscriptionStatus.Pending}   | ${false}
    ${false}                | ${SubscriptionStatus.Reject}    | ${false}
    ${false}                | ${SubscriptionStatus.Submitted} | ${false}
  `(
    'should work correctly for billStreamingPermission=$billStreamingPermission status=$status expected=$expected',
    ({ billStreamingPermission, expected, status }) => {
      mockUseBillStreamPermission.mockReturnValue({ permission: billStreamingPermission, isFetched: true });
      mockUseGetSubscriptionsQuery.mockReturnValue({
        data: mockUseGetSubscriptionsQueryDataWithStatus(status),
        isLoading: false,
        isError: false,
      });
      const hook = renderHook(() => useBillManagementMoneyAccess());

      expect(hook.result.current.permission).toBe(expected);
    }
  );

  it('should work correctly for terminated having subscription', () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      attributes: {
        terminated: true,
      },
    } as never;
    mockUseBillStreamPermission.mockReturnValue({ permission: false, isFetched: true });
    mockUseGetSubscriptionsQuery.mockReturnValue({
      data: mockUseGetSubscriptionsQueryDataWithStatus(SubscriptionStatus.Active),
      isLoading: false,
      isError: false,
    });
    const hook = renderHook(() => useBillManagementMoneyAccess());

    expect(hook.result.current.permission).toBe(true);
  });

  it('should work correctly for terminated not having subscription', () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      attributes: {
        terminated: true,
      },
    } as never;
    mockUseBillStreamPermission.mockReturnValue({ permission: false, isFetched: true });
    mockUseGetSubscriptionsQuery.mockReturnValue({
      data: mockUseGetSubscriptionsQueryDataWithStatus(SubscriptionStatus.Submitted),
      isLoading: false,
      isError: false,
    });
    const hook = renderHook(() => useBillManagementMoneyAccess());

    expect(hook.result.current.permission).toBe(false);
  });
});
