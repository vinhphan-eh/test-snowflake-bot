import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AppDataStorageKey, ZustandAppDataStorage } from '../../../../common/libs/storage/appDataStorage';

interface UseRecurringHowItWorksBtsStoreData {
  isSeen: boolean;
  setSeen: (isSeen: boolean) => void;
  hasHydrate: boolean;
}

const useRecurringHowItWorksBtsStore = create<UseRecurringHowItWorksBtsStoreData>()(
  persist(
    set => ({
      isSeen: false,
      setSeen: (isSeen: boolean) => set({ isSeen }),
      hasHydrate: false,
    }),
    {
      name: AppDataStorageKey.RecurringHowItWorksBtsSeen,
      storage: createJSONStorage(() => ZustandAppDataStorage()),
      onRehydrateStorage: () => () => {
        useRecurringHowItWorksBtsStore.setState({ hasHydrate: true });
      },
    }
  )
);

export { useRecurringHowItWorksBtsStore };
