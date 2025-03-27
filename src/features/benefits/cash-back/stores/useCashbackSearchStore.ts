import { create } from 'zustand';

type CashbackSearchStore = {
  minDrawerSnap: number;
  setMinDrawerSnap: (position: number) => void;
};

const useCashbackSearchStore = create<CashbackSearchStore>()(set => ({
  minDrawerSnap: 0,
  setMinDrawerSnap: (position: number) => set({ minDrawerSnap: position }),
}));

export { useCashbackSearchStore };
