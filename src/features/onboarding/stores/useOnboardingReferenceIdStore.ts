import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { LocalStorageKey, ZustandLocalStorage } from '../../../common/libs/storage/localStorage';

type OnboardingReferenceIdStore = {
  referenceId: string;
  setReferenceId: (id: string) => void;
};

const useOnboardingReferenceIdStore = create<OnboardingReferenceIdStore>()(
  persist(
    set => ({
      referenceId: '',
      setReferenceId: referenceId => set({ referenceId }),
    }),
    {
      name: LocalStorageKey.EbenOnboardingReferenceId,
      storage: createJSONStorage(() => ZustandLocalStorage()),
    }
  )
);

export { useOnboardingReferenceIdStore };
