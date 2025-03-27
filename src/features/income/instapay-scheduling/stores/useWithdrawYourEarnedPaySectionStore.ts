import { create } from 'zustand';

export enum WithdrawYourEarnedPaySectionKey {
  NOW = 'Now',
  RECURRING = 'Recurring',
  DAILY = 'Daily',
}

export interface WithdrawYourEarnedPaySectionStore {
  selectedTabKey: WithdrawYourEarnedPaySectionKey | undefined;
}

interface WithdrawYourEarnedPaySectionActions {
  setSelectedTabKey: (selectedTabKey?: WithdrawYourEarnedPaySectionKey) => void;
  resetStore: () => void;
}

const initialData: WithdrawYourEarnedPaySectionStore = {
  selectedTabKey: undefined,
};

export const useWithdrawYourEarnedPaySectionStore = create<
  WithdrawYourEarnedPaySectionStore & WithdrawYourEarnedPaySectionActions
>()(set => ({
  ...initialData,
  setSelectedTabKey: selectedTabKey => {
    set({ selectedTabKey });
  },
  resetStore: () => set({ ...initialData }),
}));
