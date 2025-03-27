import { create } from 'zustand';

interface ShowCardInformationalAlertState {
  showCardInformationalAlert: Record<string, boolean>;
  setShowCardInformationalAlert: (userId: string, value: boolean) => void;
}

const useShowCardInformationalAlertStore = create<ShowCardInformationalAlertState>()((set, get) => ({
  showCardInformationalAlert: {},
  setShowCardInformationalAlert: (userId: string, value: boolean) =>
    set({ showCardInformationalAlert: { ...get().showCardInformationalAlert, [userId]: value } }),
}));

export { useShowCardInformationalAlertStore };
