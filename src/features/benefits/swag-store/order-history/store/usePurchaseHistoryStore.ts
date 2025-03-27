import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { LocalStorageKey, ZustandLocalStorage } from '../../../../../common/libs/storage/localStorage';

type PurchaseHistoryStore = {
  showMultiProductsAlert: boolean | undefined;
  setAlertVisibility: (state: boolean) => void;
};

const usePurchaseHistoryStore = create<PurchaseHistoryStore>()(
  persist(
    set => ({
      showMultiProductsAlert: undefined,
      setAlertVisibility: (state: boolean) => set({ showMultiProductsAlert: state }),
    }),
    {
      name: LocalStorageKey.PurchaseHistoryStore,
      storage: createJSONStorage(() => ZustandLocalStorage()),
    }
  )
);

export { usePurchaseHistoryStore };
