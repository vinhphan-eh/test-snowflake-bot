import type { SchedulingSubscriptionWithOrgDetails } from './useCheckInstapaySchedulingPermission';
import {
  useGetAllInstapayRecurringByDaySubscriptionQuery,
  useGetSchedulingSubscriptionsQuery,
  type GetSchedulingSubscription,
  type RecurringByDaySubscription,
  type SchedulingSubscription,
} from '../../../../new-graphql/generated';
import { useInstaPayAvailableBalances } from '../../instapay/hooks/useInstaPayAvailableBalances';
import { isInstapayError } from '../../instapay/utils/graphql-processor';

type Response = {
  isLoading: boolean;
  creatableOrgIds: string[];
};

export const useGetCreatableOrgs = (options?: { onError: (err: unknown) => void }): Response => {
  const { data: allByDaySubscriptionData, isLoading: isByDaySubscriptionLoading } =
    useGetAllInstapayRecurringByDaySubscriptionQuery({}, options);

  const { isLoading: balanceLoading, orgs } = useInstaPayAvailableBalances({
    enabled: true,
    location: 'ScheduleByDayScreen',
    options,
  });

  const { data: schedulingSubsData, isLoading: isSchedulingSubsLoading } = useGetSchedulingSubscriptionsQuery(
    undefined,
    options
  );

  const validByDaySubs = allByDaySubscriptionData?.me?.orgs
    .filter(
      org =>
        !isInstapayError(org?.recurringByDay?.currentSubscription) && Boolean(org?.recurringByDay?.currentSubscription)
    )
    .map(organisation => {
      const subscriptionDetails = organisation?.recurringByDay?.currentSubscription as RecurringByDaySubscription;

      const organisationId = organisation.kpBusinessId ? `${organisation.kpBusinessId}` : organisation.uuid;

      return {
        ...subscriptionDetails,
        organisationId,
      };
    });

  const validByAmountSubs = schedulingSubsData?.me?.orgs
    .filter(organisation => !isInstapayError(organisation?.instapay?.schedulingSubscriptions))
    .map(organisation => {
      const subscriptionDetails = (organisation?.instapay?.schedulingSubscriptions as GetSchedulingSubscription)
        ?.subscriptions?.[0];

      const organisationId = organisation.kpBusinessId ? `${organisation.kpBusinessId}` : organisation.uuid;

      return {
        ...subscriptionDetails,
        organisationId,
      } as SchedulingSubscriptionWithOrgDetails;
    })
    .filter(subscription => !!subscription && !!(subscription as SchedulingSubscription)?.id);

  const hasSubsOrgs = [
    ...(validByAmountSubs?.map(v => v.organisationId) || []),
    ...(validByDaySubs?.map(v => v.organisationId) || []),
  ];

  // org do not have by_day and by_amount subscriptions will be able to create new recurring
  const ableToCreateOrgIds = orgs?.filter(org => !hasSubsOrgs?.includes(org.getId())).map(v => v.getId());

  return {
    isLoading: balanceLoading || isByDaySubscriptionLoading || isSchedulingSubsLoading,
    creatableOrgIds: ableToCreateOrgIds,
  };
};
