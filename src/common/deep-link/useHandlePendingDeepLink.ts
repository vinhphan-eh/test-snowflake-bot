import { useEffect, useState } from 'react';
import { clearPendingDeepLink, usePendingDeepLinkStore } from './usePendingDeepLinkStore';
import { handleDeeplink } from '../../EventHandler';

/**
 * Check if any pending deep link. Handle it
 */
export const useHandlePendingDeepLink = (readyState = true) => {
  const [ready, setReady] = useState(readyState);
  const pendingDeepLink = usePendingDeepLinkStore(state => state.pendingDeepLink);

  useEffect(() => {
    if (pendingDeepLink && ready) {
      handleDeeplink(pendingDeepLink);
      clearPendingDeepLink();
    }
  }, [pendingDeepLink, ready]);

  return { setReady };
};
