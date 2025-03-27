import { create } from 'zustand';
import {
  PS_ENABLED_ALL_MY_PAY,
  PS_ENABLED_DOLLAR,
  PS_ENABLED_PERCENTAGE,
  SelectAllocationOptions,
} from './SelectAllocationOptions';
import type { EWallet, PaySplitNetworkData } from './usePaySplitNetworkData';
import { UnreachableCaseError } from '../../../../common/utils/exhaustive';
import { formatCurrency } from '../../../../common/utils/numbers';
import type {
  BankAccountDetails,
  EhMembership,
  PayAccountInput,
  PayAllocation,
  SavePayAccountMutationVariables,
} from '../../../../new-graphql/generated';
import { PaySplitType } from '../../../../new-graphql/generated';

// Arguably not a magic number since it's a mathematical constant. Here for consistency...
const ONE_HUNDRED_PERCENT = 100;

export const formatPercent = (amt: number): string =>
  amt === ONE_HUNDRED_PERCENT ? 'All of my pay (100%)' : `${amt}% of my pay`;

// Represents some pay allocation to the eWallet. One per organisation.
export interface Allocation {
  amount: number;
  type: PaySplitType;
  membership: EhMembership;
  isAssigned: boolean; // true if some pay is assigned to eWallet
  isChanged: boolean; // true if the allocation has been modified
  isEditable: boolean; // true if the user can edit this Allocation

  formatAmount(): string;
}

// module private constructor: Takes a PayAllocation (network) and creates an Allocation (app)
const newAllocation = (payAllocation: PayAllocation, eWallet: EWallet): Allocation => {
  const rv: Allocation = {
    // defaults: 100% allocated to eWallet
    // https://employmenthero.atlassian.net/browse/EBF-2652
    amount: ONE_HUNDRED_PERCENT,
    type: PaySplitType.Percentage,
    membership: payAllocation.membership,
    formatAmount(): string {
      return this.type === PaySplitType.Percentage ? formatPercent(this.amount) : formatCurrency(this.amount);
    },
    isChanged: false,
    isAssigned: false,
    isEditable: true,
  };

  const active = payAllocation.allocation.details.find(ba => eWallet.bsb === ba.bsb);
  if (active) {
    rv.amount = +active.amount;
    rv.type = payAllocation.allocation.splitType;
    rv.isEditable = !(rv.amount === ONE_HUNDRED_PERCENT && rv.type === PaySplitType.Percentage);
    rv.isAssigned = true;
  }

  return rv;
};

export class InconsistentStateException extends Error {}

/**
 * PaySplitFlowStore is a simple state machine operating 1 variable - the allocation under active edit.
 */
export interface PaySplitFlowStore {
  data: PaySplitNetworkData;
  allocations: Allocation[];
  active: Allocation | null;

  /**
   * Initialises network data, resets all state
   * @param data
   */
  initialise(data: PaySplitNetworkData): void;

  /**
   * Get the mask of enabled options (All My Pay, Dollar, Percentage)
   */
  getOptions(): SelectAllocationOptions;

  /**
   * Returns the list of Allocations
   */
  getAllocations(): Allocation[];

  /**
   * Starts editing an allocation
   * @param a the Allocation to start editing
   */
  startEditing(a: Allocation): void;

  /**
   * Edit the current allocation
   */
  edit<T extends Partial<Allocation>>(a: T): void;

  /**
   * Applies the active allocation to the main list of allocations. No allocation will be active after this call.
   */
  finishEditing(): void;

  /**
   * Convert {allocations} into a list of {SavePayAccountMutationVariables} to be sent downstream.
   * If there are no changes to {allocations}, this method will return an empty list.
   * @param token the eh token to use when constructing request objects
   */
  getPayAccountRequests(token: string): SavePayAccountMutationVariables[];

  /**
   * Returns true is any item of {allocations} was modified (and therefore requires an update)
   */
  isChangePending(): boolean;
}

//
// PaySplitFlowStore private methods
//

// return an appropriate list of secondary accounts
const secondaryAccounts = (allocation: Allocation, oldAccounts: BankAccountDetails[]): PayAccountInput[] => {
  switch (allocation.type) {
    case PaySplitType.FixedAmount:
      // Strategy: eWallet first in line, then remaining accounts
      // Current version only supports 1 oldAccount, and it will have all remaining funds (represented by the '0' value)
      return oldAccounts.map(o => ({ ...o, amount: '0' }));
    case PaySplitType.Percentage: {
      // Strategy: take the first non-eWallet account and allocate the remaining %
      if (allocation.amount === ONE_HUNDRED_PERCENT) {
        // allocation is 100% to eWallet, so make sure other bank account is removed
        return [];
      }
      const [defaultBankAccount] = oldAccounts;
      return [
        {
          accountNumber: defaultBankAccount.accountNumber,
          bsb: defaultBankAccount.bsb,
          amount: `${ONE_HUNDRED_PERCENT - allocation.amount}`,
          accountName: defaultBankAccount.accountName,
        },
      ];
    }
    default:
      // never reached
      throw new UnreachableCaseError(allocation.type);
  }
};

// remove eWallet from the list of old accounts
const nonEWalletAccounts = (eWallet: EWallet, oldAccounts: BankAccountDetails[]): BankAccountDetails[] =>
  oldAccounts.filter(a => a.bsb !== eWallet.bsb);

// returns the final list of accounts
const createPayAccounts = (
  eWallet: EWallet,
  allocation: Allocation,
  oldAccounts: BankAccountDetails[]
): PayAccountInput[] => [
  // This program only assigns to eWallet, so eWallet must always come first
  {
    accountNumber: eWallet.accountNumber,
    bsb: eWallet.bsb,
    amount: `${allocation.amount}`,
    accountName: eWallet.name,
  },
  ...secondaryAccounts(allocation, nonEWalletAccounts(eWallet, oldAccounts)),
];

const getOldAccounts = (orgId: string, old?: PayAllocation[]): BankAccountDetails[] =>
  !old ? [] : old.find(payAcct => payAcct.membership.orgId === orgId)?.allocation?.details || [];

//
// Implement PaySplitFlowStore
// A very simple state machine to handle editing Allocation objects
//
export const usePaySplitFlowStore = create<PaySplitFlowStore>()((set, get) => ({
  data: {} as PaySplitNetworkData, // You're required to call initialise() first
  allocations: [],
  active: null,

  initialise: (data: PaySplitNetworkData) => {
    set({ data, allocations: data.allocations.map(a => newAllocation(a, data.eWallet)) });
  },

  getOptions: (): SelectAllocationOptions => {
    const { active, data } = get();
    if (!active) {
      throw new Error('tried to call getOptionsEnabled() but no active allocation');
    }

    let mask = PS_ENABLED_ALL_MY_PAY; // always enabled
    const old = nonEWalletAccounts(data.eWallet, getOldAccounts(active.membership.orgId, data.allocations));
    if (old.length === 1) {
      // eslint-disable-next-line no-bitwise
      mask |= PS_ENABLED_DOLLAR | PS_ENABLED_PERCENTAGE;
    }

    if (active.membership.xeroConnected) {
      mask = PS_ENABLED_DOLLAR;
    }

    return new SelectAllocationOptions(mask);
  },

  getAllocations: (): Allocation[] => {
    return get().allocations;
  },

  startEditing: (a: Allocation): void => {
    set({ active: { ...a } });
  },

  edit: <T extends Partial<Allocation>>(a: T): void => {
    const { active } = get();
    if (!active) {
      throw new InconsistentStateException('tried to call edit() but no active allocation');
    }
    set({ active: { ...active, ...a, isChanged: true, isUndefined: false } });
  },

  finishEditing: (): void => {
    const { active, allocations } = get();
    if (!active) {
      throw new InconsistentStateException('tried to call finishEditing() but no active allocation');
    }
    const idx = allocations.findIndex(a => a.membership.orgId === active.membership.orgId);
    if (idx === -1) {
      // should never happen
      throw new InconsistentStateException('active membership not found in stored allocations');
    }

    allocations[idx] = active;
    set({ active: null, allocations });
  },

  getPayAccountRequests: (): SavePayAccountMutationVariables[] => {
    return get()
      .allocations.filter(a => a.isChanged)
      .map(a => ({
        input: {
          orgId: a.membership.orgId,
          memberId: a.membership.memberId,
          bankAccounts: createPayAccounts(
            get().data.eWallet,
            a,
            getOldAccounts(a.membership.orgId, get().data.allocations)
          ),
          bankSplitType: a.type,
        },
      }));
  },

  isChangePending: (): boolean => {
    return !!get().allocations.find(a => a.isChanged);
  },
}));
