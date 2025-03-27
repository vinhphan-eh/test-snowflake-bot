import { useEffect } from 'react';
import type { DeeplinkParams, DeeplinkType } from '../../../../common/stores/useDeeplinkStore';
import { clearDeepLink, useDeeplinkStore } from '../../../../common/stores/useDeeplinkStore';

interface UseCallbackOnDeeplink {
  deeplinkType: DeeplinkType;
  callback: (params: DeeplinkParams) => void;
  isLoading: boolean;
}

export const useCallbackOnDeeplink = (params: UseCallbackOnDeeplink) => {
  const { callback, deeplinkType, isLoading } = params;

  const storeDeeplinkParams = useDeeplinkStore(state => state.deeplinkParams);
  const storeDeeplinkType = useDeeplinkStore(state => state.deeplinkType);

  useEffect(() => {
    if (!storeDeeplinkType || isLoading || deeplinkType !== storeDeeplinkType) {
      return;
    }

    clearDeepLink();

    callback(storeDeeplinkParams ?? {});
  }, [deeplinkType, isLoading, callback, storeDeeplinkType, storeDeeplinkParams]);
};
