import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AppDataStorageKey, ZustandAppDataStorage } from '../../../../common/libs/storage/appDataStorage';

type BillManagementOfferStore = {
  currentState: string | null;
  setCurrentState: (state: string | null) => void;
  hasHydrate: boolean;
};

const useBillManagementOfferStore = create<BillManagementOfferStore>()(
  persist(
    set => ({
      currentState: null,
      setCurrentState: state => set({ currentState: state }),
      hasHydrate: false,
    }),
    {
      name: AppDataStorageKey.EbenBillManagementOffer,
      storage: createJSONStorage(() => ZustandAppDataStorage()),
      onRehydrateStorage: () => () => {
        useBillManagementOfferStore.setState({ hasHydrate: true });
      },
    }
  )
);

export { useBillManagementOfferStore };
