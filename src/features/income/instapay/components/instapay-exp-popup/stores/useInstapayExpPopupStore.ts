import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  SharedAppDataStorageKey,
  ZustandSharedAppDataStorage,
} from '../../../../../../common/libs/storage/sharedAppDataStorage';

export interface InstapayPopupStoreData {
  lastOpenedDate: Date | undefined;
  hasHydrate: boolean;
  saveLastOpenedDate: (date: Date) => void;
}

export const useInstapayExpPopupStore = create<InstapayPopupStoreData>()(
  persist(
    set => ({
      lastOpenedDate: undefined,
      hasHydrate: false,
      saveLastOpenedDate: date => {
        set({ lastOpenedDate: date });
      },
    }),
    {
      name: SharedAppDataStorageKey.InstapayExpPopup,
      storage: createJSONStorage(() => ZustandSharedAppDataStorage()),
      onRehydrateStorage: () => () => {
        useInstapayExpPopupStore.setState({ hasHydrate: true });
      },
    }
  )
);
