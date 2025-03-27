import { create } from 'zustand';

type InstapayNowSimplifiedFlowStore = {
  shouldShowSSAAdTile: boolean;
  setShouldShowSSAAdTile: (shouldShow: boolean) => void;
};

const useInstapayNowSimplifiedFlowStore = create<InstapayNowSimplifiedFlowStore>()(set => ({
  shouldShowSSAAdTile: false,
  setShouldShowSSAAdTile: (shouldShow: boolean) => set({ shouldShowSSAAdTile: shouldShow }),
  resetStoreForNewFlow: () =>
    set({
      shouldShowSSAAdTile: false,
    }),
}));

export { useInstapayNowSimplifiedFlowStore };
