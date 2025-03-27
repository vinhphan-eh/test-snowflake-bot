import { create } from 'zustand';
import type { DeepLinkPayload } from '../../EventHandler';

interface DeepLinkStore {
  // Deep link to handle, in real life, there will be only one deep link to handle at a time
  pendingDeepLink: DeepLinkPayload | null;
}

export const usePendingDeepLinkStore = create<DeepLinkStore>()(() => ({
  pendingDeepLink: null,
}));

export const storePendingDeepLink = (pendingDeepLink: DeepLinkPayload) => {
  usePendingDeepLinkStore.setState({
    pendingDeepLink,
  });
};

export const clearPendingDeepLink = () => {
  usePendingDeepLinkStore.setState({
    pendingDeepLink: null,
  });
};
