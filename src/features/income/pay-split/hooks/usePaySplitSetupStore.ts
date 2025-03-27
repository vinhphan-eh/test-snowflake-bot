import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { LocalStorageKey, ZustandLocalStorage } from '../../../../common/libs/storage/localStorage';

interface PaySplitSetup {
  skipPaySplit: string;
  setSkipPaySplit: () => void;
}

// Store for use by the onboarding flow
const usePaySplitSetupStore = create<PaySplitSetup>()(
  persist(
    set => ({
      skipPaySplit: '',
      setSkipPaySplit: () => set({ skipPaySplit: 'true' }),
    }),
    {
      name: LocalStorageKey.PaySplitStore,
      storage: createJSONStorage(() => ZustandLocalStorage()),
    }
  )
);
export { usePaySplitSetupStore };
