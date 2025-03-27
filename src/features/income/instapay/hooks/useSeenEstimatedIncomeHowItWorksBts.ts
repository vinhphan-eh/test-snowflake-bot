import { useEstimatedIncomeBtsStore } from '../stores/useEstimatedIncomeBtsStore';

export const useSeenEstimatedIncomeHowItWorksBts = () => {
  const isSeen = useEstimatedIncomeBtsStore(state => state.isSeen ?? false);
  const setSeen = useEstimatedIncomeBtsStore(state => state.setSeen);
  const hasHydrate = useEstimatedIncomeBtsStore(state => state.hasHydrate);

  return { isSeen, setSeen, hasHydrate };
};
