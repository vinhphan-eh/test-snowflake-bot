import { renderHook } from '@testing-library/react-hooks';
import {
  useGetAllInstapayRecurringByDaySubscriptionQuery,
  useGetSchedulingSubscriptionsQuery,
} from '../../../../../new-graphql/generated';
import { useInstaPayAvailableBalances } from '../../../instapay/hooks/useInstaPayAvailableBalances';
import { useGetCreatableOrgs } from '../useGetCreatableOrgs';

jest.mock('../../../../../new-graphql/generated', () => ({
  useGetAllInstapayRecurringByDaySubscriptionQuery: jest.fn(),
  useGetSchedulingSubscriptionsQuery: jest.fn(),
}));

jest.mock('../../../instapay/hooks/useInstaPayAvailableBalances', () => ({
  useInstaPayAvailableBalances: jest.fn(),
}));

describe('useGetCreatableOrgs', () => {
  it('should return loading state when queries are loading', () => {
    (useGetAllInstapayRecurringByDaySubscriptionQuery as unknown as jest.Mock).mockReturnValue({
      isLoading: true,
    });
    (useGetSchedulingSubscriptionsQuery as unknown as jest.Mock).mockReturnValue({ isLoading: true });
    (useInstaPayAvailableBalances as jest.Mock).mockReturnValue({ isLoading: true });

    const { result } = renderHook(() => useGetCreatableOrgs());

    expect(result.current).toEqual({ isLoading: true });
  });

  it('should return ableToCreateOrgIds when data is available', () => {
    const mockOrgs = [
      { getId: () => 'kpOrg1' },
      { getId: () => 'kpOrg2' },
      { getId: () => 'ehOrg3' },
      { getId: () => 'ehOrg4' },
      { getId: () => 'ableToCreateOrg' },
    ];
    const mockByDaySubscriptionData = {
      me: {
        orgs: [
          {
            recurringByDay: { currentSubscription: { id: 'sub1' } },
            kpBusinessId: 'kpOrg1',
          },
          {
            recurringByDay: { currentSubscription: { id: 'sub3' } },
            uuid: 'ehOrg3',
          },
        ],
      },
    };
    const mockSchedulingSubsData = {
      me: {
        orgs: [
          {
            instapay: { schedulingSubscriptions: { subscriptions: [{ id: 'sub2' }] } },
            kpBusinessId: 'kpOrg2',
          },
          {
            instapay: { schedulingSubscriptions: { subscriptions: [{ id: 'sub4' }] } },
            uuid: 'ehOrg4',
          },
        ],
      },
    };

    (useGetAllInstapayRecurringByDaySubscriptionQuery as unknown as jest.Mock).mockReturnValue({
      data: mockByDaySubscriptionData,
      isLoading: false,
    });
    (useGetSchedulingSubscriptionsQuery as unknown as jest.Mock).mockReturnValue({
      data: mockSchedulingSubsData,
      isLoading: false,
    });
    (useInstaPayAvailableBalances as jest.Mock).mockReturnValue({ isLoading: false, orgs: mockOrgs });

    const { result } = renderHook(() => useGetCreatableOrgs());

    expect(result.current).toEqual({
      isLoading: false,
      creatableOrgIds: ['ableToCreateOrg'],
    });
  });
});
