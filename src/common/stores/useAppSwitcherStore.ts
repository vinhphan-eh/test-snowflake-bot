import { create } from 'zustand';

interface StoreData {
  toggleVisibility?: (visible: boolean) => void;
  isVisible?: boolean;
}

export const useAppSwitcherStore = create<StoreData>()(() => ({}));
