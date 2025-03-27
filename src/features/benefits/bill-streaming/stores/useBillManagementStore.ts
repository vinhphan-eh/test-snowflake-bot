import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { LocalStorageKey, ZustandLocalStorage } from '../../../../common/libs/storage/localStorage';

type BillManagementStore = {
  showFeatureComingSoonAlert: boolean | undefined;
  setComingSoonAlertVisibility: (state: boolean) => void;
  showDisclaimer: boolean | undefined;
  isShowAhmDisclaimer: boolean;
  isShowMedibankDislaimer: boolean;
  isShowENGIEDisclaimer: boolean;
  isShowFitnessFirstDisclaimer: boolean;
  isShowGoodlifeHealthClubsDisclaimer: boolean;
  setDisclaimerVisibility: (state: boolean) => void;
  setIsShowAhmDisclaimer: (state: boolean) => void;
  setIsShowMedibankDislaimer: (state: boolean) => void;
  setIsShowENGIEDisclaimer: (state: boolean) => void;
  setIsShowFitnessFirstDisclaimer: (state: boolean) => void;
  setIsShowGoodlifeHealthClubsDisclaimer: (state: boolean) => void;

  hasHydrate: boolean;
};

const useBillManagementStore = create<BillManagementStore>()(
  persist(
    set => ({
      showFeatureComingSoonAlert: true,
      setComingSoonAlertVisibility: (state: boolean) => set({ showFeatureComingSoonAlert: state }),
      showDisclaimer: true,
      isShowAhmDisclaimer: true,
      isShowMedibankDislaimer: true,
      isShowENGIEDisclaimer: true,
      isShowFitnessFirstDisclaimer: false,
      isShowGoodlifeHealthClubsDisclaimer: false,
      setIsShowAhmDisclaimer: (state: boolean) => set({ isShowAhmDisclaimer: state }),
      setIsShowMedibankDislaimer: (state: boolean) => set({ isShowMedibankDislaimer: state }),
      setIsShowENGIEDisclaimer: (state: boolean) => set({ isShowENGIEDisclaimer: state }),
      setIsShowFitnessFirstDisclaimer: (state: boolean) => set({ isShowFitnessFirstDisclaimer: state }),
      setIsShowGoodlifeHealthClubsDisclaimer: (state: boolean) => set({ isShowGoodlifeHealthClubsDisclaimer: state }),
      setDisclaimerVisibility: (state: boolean) => set({ showDisclaimer: state }),
      hasHydrate: false,
    }),
    {
      name: LocalStorageKey.EbenBillManagement,
      storage: createJSONStorage(() => ZustandLocalStorage()),
      onRehydrateStorage: () => () => {
        useBillManagementStore.setState({ hasHydrate: true });
      },
    }
  )
);

export { useBillManagementStore };
