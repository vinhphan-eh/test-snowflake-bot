import { create } from 'zustand';
import type { PillarIds } from '../../../super-app-navigation/constants';

interface AppSwitcherStore {
  isShowing: boolean;
  toggle: (show: boolean) => void;

  setPillar: React.Dispatch<React.SetStateAction<PillarIds>>;
}

export const useAppSwitcherStore = create<AppSwitcherStore>()(set => ({
  isShowing: true,
  toggle: show => {
    set({
      isShowing: show,
    });
  },
  setPillar: () => {},
}));
