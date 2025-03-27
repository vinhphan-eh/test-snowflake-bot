import {
  useInstaPaySchedulingStore,
  type RecurringByAmountEligibilyDetails,
} from '../stores/useInstaPaySchedulingStore';

type UseCheckRecurringByAmountEligibilityResponse = {
  isLoaded: boolean;
  getOrgRecurringByAmountEligibility: (orgId?: string) => RecurringByAmountEligibilyDetails | undefined;
};

export const useCheckRecurringByAmountEligibility = (): UseCheckRecurringByAmountEligibilityResponse => {
  const { eligibilityDetails } = useInstaPaySchedulingStore();

  const getOrgRecurringByAmountEligibility = (orgId?: string) => eligibilityDetails?.find(org => org.orgId === orgId);

  return {
    isLoaded: !!eligibilityDetails,
    getOrgRecurringByAmountEligibility,
  };
};
