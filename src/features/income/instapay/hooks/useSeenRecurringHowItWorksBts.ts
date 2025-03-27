import { useRecurringHowItWorksBtsStore } from '../stores/useRecurringHowItWorksBtsStore';

export const useSeenRecurringHowItWorksBts = () => {
  const isSeen = useRecurringHowItWorksBtsStore(state => state.isSeen ?? false);
  const setSeen = useRecurringHowItWorksBtsStore(state => state.setSeen);
  const hasHydrate = useRecurringHowItWorksBtsStore(state => state.hasHydrate);

  return { isSeen, setSeen, hasHydrate };
};
