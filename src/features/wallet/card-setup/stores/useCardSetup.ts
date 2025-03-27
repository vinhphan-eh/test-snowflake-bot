import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { LocalStorageKey, ZustandLocalStorage } from '../../../../common/libs/storage/localStorage';

interface DigitalCardSetup {
  skipProvisioning: string;
  setSkipDigitalProvisioning: () => void;
}

const useDigitalCardSetup = create<DigitalCardSetup>()(
  persist(
    set => ({
      skipProvisioning: '',
      setSkipDigitalProvisioning: () => set({ skipProvisioning: 'true' }),
    }),
    {
      name: LocalStorageKey.DigitalProvisioningStore,
      storage: createJSONStorage(() => ZustandLocalStorage()),
    }
  )
);

export { useDigitalCardSetup };
