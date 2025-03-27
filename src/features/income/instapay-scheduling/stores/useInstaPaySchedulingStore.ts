import { create } from 'zustand';
import type { InstapayErrorCode, RecurringByDayPayCycle, Weekday } from '../../../../new-graphql/generated';
import type { InstaPayOrg } from '../../instapay/hooks/useInstaPayAvailableBalances';
import type { FormattedInstapayBankAccount } from '../../instapay/hooks/useInstapayBankOptions';
import type {
  ByDaySubscriptionWithOrgDetails,
  SchedulingSubscriptionWithOrgDetails,
} from '../hooks/useCheckInstapaySchedulingPermission';

export type RecurringByAmountEligibilyDetails = {
  orgId: string;
  isEligible: boolean;
  errorCode?: InstapayErrorCode;
};

export interface InstaPaySchedulingStore {
  amount?: number;
  bankAccount?: FormattedInstapayBankAccount;
  membership?: InstaPayOrg;
  currentSubscription?: SchedulingSubscriptionWithOrgDetails;
  currentByDaySubscription?: ByDaySubscriptionWithOrgDetails;
  navigatedFromCTA: boolean;
  shouldShowCTA: boolean;
  hasVerifiedBankAccount: boolean;
  subscriptionId?: string;
  payDay?: Weekday;
  payCycle?: RecurringByDayPayCycle;
  minAmount?: number;
  maxAmount?: number;
  eligibilityDetails?: RecurringByAmountEligibilyDetails[];
  firstPaymentDate?: Date;
}

interface InstaPayDrawdownSchedulingActions {
  setAmount: (amount?: number) => void;
  setBankAccount: (bankAccount: FormattedInstapayBankAccount) => void;
  setMembership: (membership: InstaPayOrg) => void;
  setNavigatedFromCTA: (navigatedFromCTA: boolean) => void;
  setShouldShowCTA: (shouldShowCTA: boolean) => void;
  setCurrentSubscription: (subscription?: SchedulingSubscriptionWithOrgDetails) => void;
  setCurrentByDaySubscription: (subscription?: ByDaySubscriptionWithOrgDetails) => void;
  setHasVerifiedBankAccount: (hasVerifiedBankAccount: boolean) => void;
  resetStore: () => void;
  resetAmount: () => void;
  setSubscriptionId: (subscriptionId?: string) => void;
  setPayDay: (payDay: Weekday) => void;
  setMaxAmount: (maxAmount: number) => void;
  setMinAmount: (minAmount: number) => void;
  setPayCycle: (payCycle: RecurringByDayPayCycle) => void;
  resetScheduleByDay: () => void;
  setEligibilityDetails: (eligibilityDetails: RecurringByAmountEligibilyDetails[]) => void;
  setFirstPaymentDate: (firstPaymentDate?: Date) => void;
}

const initialData: InstaPaySchedulingStore = {
  amount: undefined,
  bankAccount: undefined,
  membership: undefined,
  payDay: undefined,
  currentSubscription: undefined,
  currentByDaySubscription: undefined,
  navigatedFromCTA: false,
  shouldShowCTA: false,
  hasVerifiedBankAccount: false,
  subscriptionId: undefined,
  eligibilityDetails: undefined,
  firstPaymentDate: undefined,
};

export const useInstaPaySchedulingStore = create<InstaPaySchedulingStore & InstaPayDrawdownSchedulingActions>()(
  set => ({
    ...initialData,
    setAmount: amount => {
      set({ amount });
    },
    setMaxAmount: maxAmount => {
      set({ maxAmount });
    },
    setMinAmount: minAmount => {
      set({ minAmount });
    },
    setBankAccount: bankAccount => {
      set({ bankAccount });
    },
    setPayDay: payDay => {
      set({ payDay });
    },
    setMembership: membership => set({ membership }),
    setCurrentSubscription: currentSubscription => set({ currentSubscription }),
    setCurrentByDaySubscription: currentByDaySubscription => set({ currentByDaySubscription }),
    setNavigatedFromCTA: navigatedFromCTA => set({ navigatedFromCTA }),
    setShouldShowCTA: shouldShowCTA => set({ shouldShowCTA }),
    setHasVerifiedBankAccount: hasVerifiedBankAccount => set({ hasVerifiedBankAccount }),
    setSubscriptionId: subscriptionId => set({ subscriptionId }),
    setEligibilityDetails: eligibilityDetails => set({ eligibilityDetails }),
    setPayCycle: payCycle => set({ payCycle }),
    setFirstPaymentDate: firstPaymentDate => set({ firstPaymentDate }),
    // To support with resetting selected value / input after confirming
    resetAmount: () =>
      set({
        amount: undefined,
      }),
    resetScheduleByDay: () => {
      set({
        payDay: undefined,
        payCycle: undefined,
        maxAmount: undefined,
        minAmount: undefined,
        firstPaymentDate: undefined,
      });
    },
    resetStore: () => set({ ...initialData }),
  })
);
