import { useIsAccountUK, useIsAccountUKWithLoadingState } from './useIsAccountUK';
import { usePermissionStore } from '../stores/usePermissionStore';

export const useCheckUKPermission = (): boolean => {
  const isWhitelistedUK = usePermissionStore(state => state.permissions?.eBenWhitelistedUkMoney?.view);
  const isUKaccount = useIsAccountUK();
  const hasPermission = isWhitelistedUK && isUKaccount;
  return !!hasPermission;
};

export const useCheckUKPermissionWithLoadingState = () => {
  const isWhitelistedUK = usePermissionStore(state => state.permissions?.eBenWhitelistedUkMoney?.view);
  const { isLoading, isUKaccount } = useIsAccountUKWithLoadingState();

  return {
    hasPermission: !!(isWhitelistedUK && isUKaccount),
    isLoading,
  };
};
