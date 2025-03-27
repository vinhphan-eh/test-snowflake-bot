import { create } from 'zustand';

interface StashListData {
  stashNamesList: string[];
  setStashNamesList: (list: string[]) => void;
  stashLimitReached: boolean;
  setStashLimitReached: (limitReached: boolean) => void;
}

const useStashListStore = create<StashListData>()(set => ({
  stashNamesList: [],
  setStashNamesList: (stashNamesList: string[]) => set({ stashNamesList }),
  stashLimitReached: false,
  setStashLimitReached: (stashLimitReached: boolean) => set({ stashLimitReached }),
}));

export { useStashListStore };
