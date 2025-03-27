import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AppDataStorageKey, ZustandAppDataStorage } from '../../../../common/libs/storage/appDataStorage';

type PurchaseHistoryStore = {
  haveDoneRegistration: boolean | undefined;
  haveDoneHealthInsuranceRegistration: boolean | undefined;
  haveShownPopup: boolean | undefined;
  finishRegistration: () => void;
  finishHealthInsuranceRegistration: () => void;
  visitWaitlistPopup: () => void;
  hasHydrate: boolean;
};

const useBillStreamingWaitlistStore = create<PurchaseHistoryStore>()(
  persist(
    set => ({
      haveDoneRegistration: undefined,
      haveDoneHealthInsuranceRegistration: undefined,
      haveShownPopup: undefined,
      hasHydrate: false,
      finishRegistration: () => set({ haveDoneRegistration: true }),
      finishHealthInsuranceRegistration: () => set({ haveDoneHealthInsuranceRegistration: true }),
      visitWaitlistPopup: () => set({ haveShownPopup: true }),
    }),
    {
      name: AppDataStorageKey.EbenBillStreamingWaitlist,
      storage: createJSONStorage(() => ZustandAppDataStorage()),
      onRehydrateStorage: () => () => {
        useBillStreamingWaitlistStore.setState({ hasHydrate: true });
      },
    }
  )
);

export { useBillStreamingWaitlistStore };
