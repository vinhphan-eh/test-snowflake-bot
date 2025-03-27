import {
  useGetAllInstapayRecurringByDaySubscriptionQuery,
  useGetRecurringByDayVisibilityQuery,
  useGetSchedulingSubscriptionsQuery,
  type GetSchedulingSubscription,
  type RecurringByDaySubscription,
  type SchedulingSubscription,
} from '../../../../new-graphql/generated';
import { isInstapayError } from '../../instapay/utils/graphql-processor';

type UseCheckInstapaySchedulingPermissionProps = {
  isLoadingOrgs: boolean;
  isErrorOrgs: boolean;
  visibilityCheckDetails?: {
    isLoading: boolean;
    isEligible: boolean;
  };
};

export type SchedulingSubscriptionWithOrgDetails = SchedulingSubscription & {
  organisationId: string;
};

export type ByDaySubscriptionWithOrgDetails = RecurringByDaySubscription & {
  organisationId: string;
};

type UseCheckInstapaySchedulingPermissionResponse = {
  isLoading: boolean;
  isRecurringByAmountVisible: boolean;
  activeSchedulingSubscriptions?: SchedulingSubscriptionWithOrgDetails[];
  byDaySubscriptions?: ByDaySubscriptionWithOrgDetails[];
  shouldShowRecurringTab: boolean;
  showRecurringByDayOnboarding: boolean;
};

export const useCheckInstapaySchedulingPermission = ({
  isErrorOrgs,
  isLoadingOrgs,
  visibilityCheckDetails,
}: UseCheckInstapaySchedulingPermissionProps): UseCheckInstapaySchedulingPermissionResponse => {
  /**
   * Recurring by Amount
   */
  const { data: recurringByDayVisibilityResponse, isLoading: isLoadingRecurringByDayVisibility } =
    useGetRecurringByDayVisibilityQuery();

  const {
    data: schedulingSubsData,
    isError: isSchedulingSubsError,
    isLoading: isSchedulingSubsLoading,
  } = useGetSchedulingSubscriptionsQuery();

  const recurringByAmountSubscriptions = schedulingSubsData?.me?.orgs
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
  const hasRecurringByAmountSubs = Number(recurringByAmountSubscriptions?.length) > 0;

  const isEligibleThroughFeatureFlag = !!visibilityCheckDetails?.isEligible;
  const isRecurringByAmountVisible = isEligibleThroughFeatureFlag || hasRecurringByAmountSubs;

  /**
   * Recurring by Day
   */
  const {
    data: allByDaySubscriptionData,
    isError: isByDaySubscriptionError,
    isLoading: isByDaySubscriptionLoading,
  } = useGetAllInstapayRecurringByDaySubscriptionQuery(undefined, {});

  const isLoading =
    visibilityCheckDetails?.isLoading ||
    isLoadingOrgs ||
    isSchedulingSubsLoading ||
    isByDaySubscriptionLoading ||
    isLoadingRecurringByDayVisibility;

  const validByDaySubscriptions = allByDaySubscriptionData?.me?.orgs
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

  const isAllOrgHaveByDaySubscription =
    Number(validByDaySubscriptions?.length) === Number(allByDaySubscriptionData?.me?.orgs.length);

  const eligibleForRecurringByDay =
    isEligibleThroughFeatureFlag &&
    Boolean(recurringByDayVisibilityResponse?.me?.featureVisibility?.recurringByDay?.showRecurringByDay);

  const showRecurringByDayOnboarding =
    !isLoading && eligibleForRecurringByDay && !isAllOrgHaveByDaySubscription && !hasRecurringByAmountSubs;

  /**
   * If either the fetch for list of memberships or for visibility through feature flag encountered error,
   * return the permission as false to prevent unexpected behaviour
   */
  if (isErrorOrgs || isSchedulingSubsError || isByDaySubscriptionError) {
    return {
      isLoading: false,
      isRecurringByAmountVisible: false,
      shouldShowRecurringTab: false,
      showRecurringByDayOnboarding: false,
    };
  }

  const shouldShowRecurringTab = isRecurringByAmountVisible || !!validByDaySubscriptions?.length;

  return {
    activeSchedulingSubscriptions: recurringByAmountSubscriptions,
    byDaySubscriptions: validByDaySubscriptions,
    isLoading,
    isRecurringByAmountVisible,
    shouldShowRecurringTab,
    showRecurringByDayOnboarding,
  };
};
