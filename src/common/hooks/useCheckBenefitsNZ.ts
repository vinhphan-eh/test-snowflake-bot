import { useIsAccountNZ } from './useIsAccountNZ';
import { usePermissionStore } from '../stores/usePermissionStore';

export const useCheckBenefitsNZ = () => {
  const isWhitelistedNZ = usePermissionStore(state => state.permissions?.eBenWhitelistedNzBenefits?.view);
  const { isFetched, isLoading, isNZaccount } = useIsAccountNZ();

  return {
    hasPermission: !!(isWhitelistedNZ && isNZaccount),
    isLoading,
    isFetched,
  };
};
