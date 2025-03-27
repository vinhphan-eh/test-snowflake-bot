import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ZustandAppDataStorage } from '../../../common/libs/storage/appDataStorage';
import { LocalStorageKey } from '../../../common/libs/storage/localStorage';

interface CreateSeenSuperConsolidationIntroData {
  isSeen: boolean;
  setSeen: (isSeen: boolean) => void;
  markSeen: () => void;
  cleanSeen: () => void;
  hasHydrate: boolean;
}

const useSeenSuperConsolidationIntro = create<CreateSeenSuperConsolidationIntroData>()(
  persist(
    set => ({
      isSeen: false,
      setSeen: (isSeen: boolean) => set({ isSeen }),
      markSeen: () => set({ isSeen: true }),
      cleanSeen: () => set({ isSeen: false }),
      hasHydrate: false,
    }),
    {
      name: LocalStorageKey.EbenConsolidateIntroSeen,
      storage: createJSONStorage(() => ZustandAppDataStorage()),
      onRehydrateStorage: () => () => {
        useSeenSuperConsolidationIntro.setState({ hasHydrate: true });
      },
    }
  )
);

export { useSeenSuperConsolidationIntro };
