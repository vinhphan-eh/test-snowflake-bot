import { create } from 'zustand';

interface StopContributionData {
  selectedContributionId: string;
  setSelectedContributionId: (id: string) => void;
  resetData: () => void;
}

const useStopContributionStore = create<StopContributionData>()(set => ({
  selectedContributionId: '',
  setSelectedContributionId: (id: string) => set({ selectedContributionId: id }),
  resetData: () =>
    set({
      selectedContributionId: '',
    }),
}));

export { useStopContributionStore };
