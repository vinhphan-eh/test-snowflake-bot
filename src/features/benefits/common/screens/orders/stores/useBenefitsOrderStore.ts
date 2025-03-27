import { create } from 'zustand';
import type { BenefitsOrderTabKeysType } from '../types';

type BenefitsOrderStore = {
  pendingChangeBenefitsOrdersTab: BenefitsOrderTabKeysType | undefined;
  setPendingChangeBenefitsOrdersTab: (tab: BenefitsOrderTabKeysType | undefined) => void;
};

const useBenefitsOrderStore = create<BenefitsOrderStore>()(set => ({
  pendingChangeBenefitsOrdersTab: undefined,
  setPendingChangeBenefitsOrdersTab: (tab: BenefitsOrderTabKeysType | undefined) =>
    set({ pendingChangeBenefitsOrdersTab: tab }),
}));

export { useBenefitsOrderStore };
