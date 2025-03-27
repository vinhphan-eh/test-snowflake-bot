import { create } from 'zustand';

export enum EndType {
  NUMBER_OF_PAYMENTS = 'numberOfPayments',
  END_BY = 'endBy',
  NO_END = 'noEnd',
}

export enum FrequencyType {
  WEEKLY = 'Weekly',
  FORTNIGHTLY = 'Fortnightly',
  MONTHLY = 'Monthly',
  QUARTERLY = 'Quarterly',
}

export enum PaymentType {
  NOW = 'NOW',
  LATER = 'LATER',
  RECURRING = 'RECURRING',
}

export interface PayeeDetails {
  accountName: string;
  accountNumber: string;
  bsb: string;
  friendlyName?: string;
}

export interface PaymentDetails {
  amount: string;
  description: string;
  reference?: string;
}

export interface PaymentRecurringDetails {
  frequency: `${FrequencyType}`;
  startDate: string;
  endType: `${EndType}`;
  numberOfPayments?: number;
  endDate?: string;
}

export interface PaymentLaterDetails {
  startDate: string;
}

interface PayAnyoneData {
  payeeDetails: PayeeDetails;
  setPayeeDetails: (details: PayeeDetails) => void;
  paymentDetails: PaymentDetails;
  setPaymentDetails: (details: PaymentDetails) => void;
  paymentRecurring?: PaymentRecurringDetails;
  setPaymentRecurring: (details: PaymentRecurringDetails) => void;
  paymentLater?: PaymentLaterDetails;
  setPaymentLater: (details: PaymentLaterDetails) => void;
  paymentType: `${PaymentType}`;
  setPaymentType: (paymentType: `${PaymentType}`) => void;
  savingPayeeDetails: boolean;
  setSavingPayeeDetails: (savingPayeeDetails: boolean) => void;
  setPayeeFriendlyName: (friendlyName: string) => void;
  resetData: () => void;
}

const usePayAnyoneStore = create<PayAnyoneData>()((set, get) => ({
  payeeDetails: { accountName: '', accountNumber: '', bsb: '' },
  setPayeeDetails: (payeeDetails: PayeeDetails) => set({ payeeDetails: { ...get().payeeDetails, ...payeeDetails } }),
  paymentDetails: { amount: '', description: '' },
  setPaymentDetails: (paymentDetails: PaymentDetails) =>
    set({ paymentDetails: { ...get().paymentDetails, ...paymentDetails } }),
  paymentRecurring: undefined,
  setPaymentRecurring: (paymentRecurring: PaymentRecurringDetails) => set({ paymentRecurring }),
  paymentLater: undefined,
  setPaymentLater: (paymentLater: PaymentLaterDetails) => set({ paymentLater }),
  paymentType: `${PaymentType.NOW}`,
  setPaymentType: (paymentType: `${PaymentType}`) => set({ paymentType }),
  savingPayeeDetails: false,
  setSavingPayeeDetails: (savingPayeeDetails: boolean) => set({ savingPayeeDetails }),
  setPayeeFriendlyName: (friendlyName: string) => set({ payeeDetails: { ...get().payeeDetails, friendlyName } }),
  resetData: () =>
    set({
      payeeDetails: { accountName: '', accountNumber: '', bsb: '' },
      paymentDetails: { amount: '', description: '', reference: undefined },
      paymentRecurring: undefined,
      paymentLater: undefined,
      savingPayeeDetails: false,
    }),
}));

export { usePayAnyoneStore };
