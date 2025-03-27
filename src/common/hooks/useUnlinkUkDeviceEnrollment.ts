import { useCallback, useEffect } from 'react';
import { useCheckUKPermissionWithLoadingState } from './useCheckUKPermission';
import { useGetWalletStatusQuery, useUnlinkUkDeviceMutation, WalletSetupStatus } from '../../new-graphql/generated';
import { useEbenTokenValidForQuery } from '../auth/store/ebenTokenStore';
import { useGetSuperAppToken } from '../auth/store/useSuperAppTokenStore';
import { LocalStorage, LocalStorageKey } from '../libs/storage/localStorage';

export const useUnlinkUkDeviceEnrollment = () => {
  const isEbenTokenValid = useEbenTokenValidForQuery();
  const { token: superAppToken } = useGetSuperAppToken('useUnlinkUkDeviceEnrollment');
  const { data: userData, isLoading } = useGetWalletStatusQuery(
    {},
    {
      enabled: isEbenTokenValid && !!superAppToken,
    }
  );

  const { hasPermission: isUkCustomer, isLoading: isLoadingUKPermission } = useCheckUKPermissionWithLoadingState();
  const { mutateAsync } = useUnlinkUkDeviceMutation();

  const hasWalletStatus = !!(
    userData?.me?.wallet?.details.setupStatus?.status &&
    userData?.me?.wallet?.details.setupStatus?.status !== WalletSetupStatus.None
  );
  const hasPermission = isUkCustomer && !isLoadingUKPermission && hasWalletStatus;

  const onUnenrollDevice = useCallback(async (): Promise<boolean> => {
    if (!hasPermission) {
      return false;
    }

    try {
      await mutateAsync({});
      return true;
    } catch (error) {
      return false;
    }
  }, [hasPermission]);

  const resetClearedUkDeviceLocalStorage = () => {
    LocalStorage.deleteItem(LocalStorageKey.EBenClearedUkDeviceOnAppLogin);
  };

  useEffect(() => {
    const executeOnLogin = async () => {
      const hasExecutedOnLogin = await LocalStorage.getItem(LocalStorageKey.EBenClearedUkDeviceOnAppLogin);
      if (!isLoading && userData && !hasExecutedOnLogin && !isLoadingUKPermission) {
        await onUnenrollDevice();
        LocalStorage.setItem(LocalStorageKey.EBenClearedUkDeviceOnAppLogin, 'true');
      }
    };
    executeOnLogin();
  }, [isLoading, userData, onUnenrollDevice, hasPermission]);

  return {
    resetClearedUkDeviceLocalStorage,
  };
};
