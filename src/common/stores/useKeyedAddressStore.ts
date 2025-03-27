import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { LocalStorageKey, ZustandLocalStorage } from '../libs/storage/localStorage';

type KeyedAddress = {
  name: string;
  latitude: number;
  longitude: number;
  isCurrentLocation: boolean;
  isPostcodeLocation?: boolean;
};

type KeyedAddressStore = {
  keyedAddress?: KeyedAddress;
  setKeyedAddress: (value: KeyedAddress | undefined) => void;
};

const useKeyedAddressStore = create<KeyedAddressStore>()(
  persist(
    set => ({
      keyedAddress: undefined,
      setKeyedAddress: value => set({ keyedAddress: value }),
    }),
    {
      name: LocalStorageKey.KeyedAddress,
      storage: createJSONStorage(() => ZustandLocalStorage()),
    }
  )
);

export { useKeyedAddressStore };
export type { KeyedAddress };
