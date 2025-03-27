import React, { useEffect } from 'react';
import MeaPushProvisioning from '@meawallet/react-native-mpp';
import { initializePSA, initializeUXComponents } from '@weavr-io/secure-components-react-native';
import { TopTabsNavigator } from './TopTabsNavigator';
import { useGetSuperAppToken } from '../common/auth/store/useSuperAppTokenStore';
import { useCheckUKPermission } from '../common/hooks/useCheckUKPermission';
import { queryClient } from '../common/libs/queryClient';
import { useHandleBiometricNotification } from '../common/notification/useHandleBiometricNotification';
import { getEnvConfig } from '../common/utils/env';
import { logError } from '../common/utils/sentry';

const initializeWeavrComponents = async () => {
  const env = getEnvConfig().ENV === 'production' ? 'Production' : 'Sandbox';

  const [weavrComponents, biometric] = await Promise.allSettled([
    initializeUXComponents(env, getEnvConfig().SWAG_PERSONAL_WEAVR_UI_KEY),
    initializePSA(env),
  ]);

  if (weavrComponents.status === 'rejected') {
    logError(`EBenWeavrInitializeError: ${weavrComponents.reason}`);
  }

  if (biometric.status === 'rejected') {
    logError(`EBenWeavrBiometricInitializeError: ${biometric.reason}`);
  }
};

export const WalletAppRootScreen = () => {
  useHandleBiometricNotification();
  const isUKcustomer = useCheckUKPermission();
  const { token } = useGetSuperAppToken('WalletAppRootScreen');

  const profileState = queryClient.getQueryState(['Profile', { ehToken: token ?? '' }]);
  const isFetchedSuccess = profileState?.status === 'success';

  useEffect(() => {
    if (!isFetchedSuccess) {
      return;
    }

    if (isUKcustomer) {
      initializeWeavrComponents();
    } else {
      MeaPushProvisioning.initialize();
    }
  }, [isUKcustomer, isFetchedSuccess]);

  return <TopTabsNavigator />;
};
