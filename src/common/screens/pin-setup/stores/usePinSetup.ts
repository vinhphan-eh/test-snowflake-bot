import { create } from 'zustand';

type PinSetup = {
  pin: string;
  setPin: (pin: string) => void;
};

export const usePinSetup = create<PinSetup>()(set => ({
  pin: '',
  setPin: (pin: string) => set({ pin }),
}));
