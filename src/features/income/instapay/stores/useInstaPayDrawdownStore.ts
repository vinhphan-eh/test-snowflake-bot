import { create } from 'zustand';
import { Region } from '../../../../providers/LocalisationProvider/constants';
import type { InstaPayOrg } from '../hooks/useInstaPayAvailableBalances';
import type { FormattedInstapayBankAccount } from '../hooks/useInstapayBankOptions';

export interface InstaPayDrawdownStore {
  amount: number | null;
  bankAccount: FormattedInstapayBankAccount | null;
  membership: InstaPayOrg | null;
  workCountry: Region;
}

interface InstaPayDrawdownStoreActions {
  setAmount: (amount: number) => void;
  setBankAccount: (bankAccount: FormattedInstapayBankAccount) => void;
  setMembership: (membership: InstaPayOrg) => void;
  setWorkCountry: (workCountry: Region) => void;
  resetStore: () => void;
  resetStoreButWorkCountry: () => void;
  resetAmount: () => void;
}

const initialData: InstaPayDrawdownStore = {
  amount: null,
  bankAccount: null,
  membership: null,
  workCountry: Region.au,
};

export const useInstaPayDrawdownStore = create<InstaPayDrawdownStore & InstaPayDrawdownStoreActions>()((set, get) => ({
  ...initialData,
  setAmount: amount => {
    set({ amount });
  },
  setBankAccount: bankAccount => {
    set({ bankAccount });
  },
  setWorkCountry: workCountry => set({ workCountry }),
  resetStore: () => set({ ...initialData }),
  resetStoreButWorkCountry: () => {
    const currentWorkCountry = get().workCountry;
    set({
      ...initialData,
      workCountry: currentWorkCountry,
    });
  },
  // To support with resetting selected value / input after confirming
  resetAmount: () => set({ amount: null }),
  setMembership: membership => set({ membership }),
}));
