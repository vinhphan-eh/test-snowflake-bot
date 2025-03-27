import { useIsAccountUKWithLoadingState } from './useIsAccountUK';
import { usePermissionStore } from '../stores/usePermissionStore';

export const useCheckBenefitsUK = () => {
  const isWhitelistedUK = usePermissionStore(state => state.permissions?.eBenWhitelistedUkBenefits?.view);
  const { isFetched, isLoading, isUKaccount } = useIsAccountUKWithLoadingState();

  return {
    hasPermission: !!(isWhitelistedUK && isUKaccount),
    isLoading,
    isFetched,
  };
};
