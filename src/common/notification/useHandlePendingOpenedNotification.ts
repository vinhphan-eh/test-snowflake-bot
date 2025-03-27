import { useEffect, useState } from 'react';
import { clearPendingOpenedNotification, useNotificationStore } from './useNotificationStore';
import { handleNotificationLifecycleTracking, handleNotificationNavigation } from '../../EventHandler';
import { useLifecycleTracking } from '../../features/super/lifecycle/hooks/useLifecycleTracking';

/**
 * Check if any pending opened notification. Handle it
 */
export const useHandlePendingOpenedNotification = (readyState = true) => {
  const [ready, setReady] = useState(readyState);
  const pendingOpenedNotification = useNotificationStore(state => state.pendingOpenedNotification);
  const { track } = useLifecycleTracking();

  useEffect(() => {
    if (pendingOpenedNotification && ready) {
      handleNotificationLifecycleTracking(pendingOpenedNotification, track);
      handleNotificationNavigation(pendingOpenedNotification);
      clearPendingOpenedNotification();
    }
  }, [pendingOpenedNotification, ready]);

  return { setReady };
};
