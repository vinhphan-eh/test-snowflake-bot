import { create } from 'zustand';

type WeaverTokenStore = {
  token: string;
  setToken: (id: string) => void;
};

const useWeavrTokenStore = create<WeaverTokenStore>()(set => ({
  token: '',
  setToken: token => set({ token }),
}));

export { useWeavrTokenStore };
