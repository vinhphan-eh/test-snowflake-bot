import { create } from 'zustand';
import type { NotificationPayload } from '../../EventHandler';

interface NotificationStore {
  // Opened notification to handle, in real life, there will be only one instance to handle at a time
  pendingOpenedNotification: NotificationPayload | null;
}

export const useNotificationStore = create<NotificationStore>()(() => ({
  pendingOpenedNotification: null,
}));

export const storePendingOpenedNotification = (pendingOpenedNotification: NotificationPayload) => {
  useNotificationStore.setState({
    pendingOpenedNotification,
  });
};

export const clearPendingOpenedNotification = () => {
  useNotificationStore.setState({
    pendingOpenedNotification: null,
  });
};
