import { create } from 'zustand';

interface CheckIsOnboardingState {
  isInOboardingFlow: boolean;
  setIsInOboardingFlow: (value: boolean) => void;
}

const useCheckIsOnboardingStore = create<CheckIsOnboardingState>()(set => ({
  isInOboardingFlow: false,
  setIsInOboardingFlow: value => set({ isInOboardingFlow: value }),
}));

export { useCheckIsOnboardingStore };
