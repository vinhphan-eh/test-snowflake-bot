import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AppDataStorageKey, ZustandAppDataStorage } from '../../../../common/libs/storage/appDataStorage';

interface UseEstimatedIncomeBtsStoreData {
  isSeen: boolean;
  setSeen: (isSeen: boolean) => void;
  hasHydrate: boolean;
}

const useEstimatedIncomeBtsStore = create<UseEstimatedIncomeBtsStoreData>()(
  persist(
    set => ({
      isSeen: false,
      setSeen: (isSeen: boolean) => set({ isSeen }),
      hasHydrate: false,
    }),
    {
      name: AppDataStorageKey.EstimatedIncomeBtsSeen,
      storage: createJSONStorage(() => ZustandAppDataStorage()),
      onRehydrateStorage: () => () => {
        useEstimatedIncomeBtsStore.setState({ hasHydrate: true });
      },
    }
  )
);

export { useEstimatedIncomeBtsStore };
