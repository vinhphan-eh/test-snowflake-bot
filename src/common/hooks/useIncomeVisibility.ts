import type { UseQueryOptions } from 'react-query';
import { isInstapayError } from '../../features/income/instapay/utils/graphql-processor';
import {
  useGetInstapaySchedulingVisibilityQuery,
  useGetInstapayVisibilityQuery,
  type GetInstapayVisibilityQuery,
  type Permission,
} from '../../new-graphql/generated';
import { usePermissionStore } from '../stores/usePermissionStore';

/**
 * A bag of booleans to determine visibility of the "Income" tab and sub-tabs
 */
export interface IncomeVisibility {
  showIncomeTab: boolean;
  showInstapay: boolean;
  showInstapayNowUsageIncentiveV2: boolean;

  instapayNowUnderMaintenance: boolean;

  showInstapayEstimatedIncome: boolean;
  instaPayScheduling?: {
    isLoading: boolean;
    isEligible: boolean;
  };

  isLoading: boolean;
  isError: boolean;
}

/**
 *
 * @param options: generic options for all inside queries
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useIncomeVisibility = (options?: UseQueryOptions<any>): IncomeVisibility => {
  const usageIncentiveV2Permission = usePermissionStore(
    state => state.permissions?.ebenInstapayNowUsageIncentiveV2Experiment?.view
  );

  const {
    data: featureVisibility,
    isError: isInstapayVisibilityError,
    isLoading: isInstapayVisibilityLoading,
  } = useGetInstapayVisibilityQuery<GetInstapayVisibilityQuery>(
    {},
    {
      ...(options || {}),
    }
  );

  const { data: schedulingVisibilityResponse, isLoading: isLoadingSchedulingVisibility } =
    useGetInstapaySchedulingVisibilityQuery();

  const isError = isInstapayVisibilityError;
  // When one of these APIs are failed to fetch
  // => the whole Spend feature will be hidden
  // This to prevent looping issues can happen with Income's APIs. Example
  // - Screen A make query 1 => render loading => query 1 fail (loop point) => render component B
  // => component B make query 1 => render loading of screen A => loop point
  if (isError) {
    return {
      showIncomeTab: false,
      showInstapay: false,
      showInstapayNowUsageIncentiveV2: false,
      instapayNowUnderMaintenance: false,
      isError,
      isLoading: false,
      showInstapayEstimatedIncome: false,
      instaPayScheduling: {
        isEligible: false,
        isLoading: false,
      },
    };
  }

  const showInstapay = Boolean(featureVisibility?.me?.featureVisibility?.instapayNow?.showInstapay);
  const showInstapayNowUsageIncentiveV2 = showInstapay && Boolean(usageIncentiveV2Permission);
  const showInstapayEstimatedIncome =
    Boolean(featureVisibility?.me?.featureVisibility?.instapayNow?.showInstapay) &&
    Boolean(featureVisibility?.me?.featureVisibility?.instapayNow?.showEstIncome);

  const instapayNowUnderMaintenance = Boolean(featureVisibility?.me?.featureVisibility?.instapayNow?.underMaintenance);

  const isLoading = isInstapayVisibilityLoading || isLoadingSchedulingVisibility;

  const schedulingVisibility = schedulingVisibilityResponse?.me?.featureVisibility?.instapayScheduling;
  const eligibleForInstapayScheduling =
    schedulingVisibility && !isInstapayError(schedulingVisibility) && (schedulingVisibility as Permission)?.view;

  return {
    showIncomeTab: showInstapay,
    showInstapay,
    instapayNowUnderMaintenance,
    isError,
    isLoading,
    showInstapayNowUsageIncentiveV2,
    showInstapayEstimatedIncome,
    instaPayScheduling: {
      isLoading: isLoadingSchedulingVisibility,
      isEligible: !!eligibleForInstapayScheduling,
    },
  };
};
