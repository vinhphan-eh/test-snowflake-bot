import { create } from 'zustand';

interface StripePayment {
  clientToken: string;
  setClientToken: (token: string) => void;
}

const useStripePaymentStore = create<StripePayment>()(set => ({
  clientToken: '',
  setClientToken: (clientToken: string) => set({ clientToken }),
}));

export { useStripePaymentStore };
