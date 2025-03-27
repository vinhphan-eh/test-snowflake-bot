import { create } from 'zustand';

interface CreateStashData {
  name: string;
  setName: (name: string) => void;
  targetAmount: number;
  setTargetAmount: (targetAmount: number) => void;
  image: string;
  setImage: (image: string) => void;
  resetData: () => void;
}

const useCreateStashStore = create<CreateStashData>()(set => ({
  name: '',
  setName: (name: string) => set({ name }),
  targetAmount: 0,
  setTargetAmount: (targetAmount: number) => set({ targetAmount }),
  image: '',
  setImage: (image: string) => set({ image }),
  resetData: () =>
    set({
      name: '',
      targetAmount: 0,
      image: '',
    }),
}));

export { useCreateStashStore };
