import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { LocalStorageKey, ZustandLocalStorage } from '../../../../common/libs/storage/localStorage';

type RequestNewCardCardStore = {
  showActivationCardAlert: boolean | undefined;
  showResetPinAlert: boolean | undefined;
  setShowCardActivationAlert: (value: boolean) => void;
  setShowResetPinAlert: (value: boolean) => void;
};

const useRequestNewCardStore = create<RequestNewCardCardStore>()(
  persist(
    set => ({
      showActivationCardAlert: undefined,
      showResetPinAlert: undefined,
      setShowCardActivationAlert: value => set({ showActivationCardAlert: value }),
      setShowResetPinAlert: value => set({ showResetPinAlert: value }),
    }),
    {
      name: LocalStorageKey.RecoverCardStore,
      storage: createJSONStorage(() => ZustandLocalStorage()),
    }
  )
);

export { useRequestNewCardStore };
