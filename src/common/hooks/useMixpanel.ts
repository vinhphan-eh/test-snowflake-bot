import { useSessionStore } from '../stores/useSessionStore';

export const useMixpanel = () => {
  const { eventTracking, screenTracking } = useSessionStore(state => state.mixpanelTracking);

  return {
    eventTracking,
    screenTracking,
  };
};
