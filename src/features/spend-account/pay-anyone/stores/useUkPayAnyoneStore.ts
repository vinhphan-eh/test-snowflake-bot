import { create } from 'zustand';

export interface UkPayeeDetails {
  accountName: string;
  accountNumber: string;
  sortCode: string;
}

export interface UkPaymentDetails {
  amount: string;
  description: string;
}

interface UkPayAnyoneData {
  payeeDetails: UkPayeeDetails;
  setPayeeDetails: (details: UkPayeeDetails) => void;
  paymentDetails: UkPaymentDetails;
  setPaymentDetails: (details: UkPaymentDetails) => void;
  resetData: () => void;
}

const useUkPayAnyoneStore = create<UkPayAnyoneData>()((set, get) => ({
  payeeDetails: { accountName: '', accountNumber: '', sortCode: '' },
  setPayeeDetails: (payeeDetails: UkPayeeDetails) => set({ payeeDetails: { ...get().payeeDetails, ...payeeDetails } }),
  paymentDetails: { amount: '', description: '' },
  setPaymentDetails: (paymentDetails: UkPaymentDetails) =>
    set({ paymentDetails: { ...get().paymentDetails, ...paymentDetails } }),
  resetData: () =>
    set({
      payeeDetails: { accountName: '', accountNumber: '', sortCode: '' },
      paymentDetails: { amount: '', description: '' },
    }),
}));

export { useUkPayAnyoneStore };
