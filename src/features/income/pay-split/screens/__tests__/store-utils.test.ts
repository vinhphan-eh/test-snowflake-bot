import { renderHook } from '../../../../../common/utils/testing';
import type {
  BankAccountDetails,
  EhMembership,
  PayAllocation,
  PaySplitType,
} from '../../../../../new-graphql/generated';
import type { PaySplitFlowStore } from '../../hooks/usePaySplitFlowStore';
import { usePaySplitFlowStore } from '../../hooks/usePaySplitFlowStore';
import type { EWallet, PaySplitNetworkData } from '../../hooks/usePaySplitNetworkData';

describe('this file is shared code for setting up the store', () => {
  test('can pass ci', () => {});
});

export const testEWallet: EWallet = {
  name: 'e',
  accountNumber: '999',
  bsb: '999',
  externalId: '999',
  status: 'Active',
};

export const testOrg1: EhMembership = {
  orgId: 'x',
  orgUUID: 'xxx',
  orgName: 'xorg',
  memberId: 'y',
  xeroConnected: false,
  isIndependentContractor: true,
};

export const testOrg2: EhMembership = {
  orgId: 'z',
  orgUUID: 'zzz',
  orgName: 'zorg',
  memberId: 'x',
  xeroConnected: false,
  isIndependentContractor: true,
};

export const testOrg3: EhMembership = {
  orgId: '3',
  orgUUID: '333',
  orgName: '3org',
  memberId: '3',
  xeroConnected: false,
  isIndependentContractor: true,
};

export const testOrg4: EhMembership = {
  orgId: '4',
  orgUUID: '444',
  orgName: '4org',
  memberId: '4',
  xeroConnected: true,
  isIndependentContractor: true,
};

let testAcctId = 1;

export const createAllocation = (
  isFirstEWallet: boolean,
  membership: EhMembership,
  bankSplitType: PaySplitType,
  ...amt: number[]
): PayAllocation => {
  const bankAccounts: BankAccountDetails[] = [];
  const createObj = (bsb: number, id: number, a: number): BankAccountDetails => ({
    accountName: `acct${id}`,
    bsb: bsb.toString(),
    amount: a.toString(),
    accountNumber: id.toString(),
  });

  let first = isFirstEWallet;
  amt.forEach(a => {
    if (first) {
      bankAccounts.push(createObj(+testEWallet.bsb, testAcctId, a));
      first = false;
    } else {
      bankAccounts.push(createObj(testAcctId, testAcctId, a));
    }
    testAcctId += 1;
  });

  return {
    membership,
    allocation: {
      details: bankAccounts,
      splitType: bankSplitType,
    },
  };
};

export const initFlowStore = async (data: PaySplitNetworkData, customise?: (store: PaySplitFlowStore) => void) => {
  // initialise the store with provided data
  renderHook(() => {
    const store = usePaySplitFlowStore();
    store.initialise(data);
    if (customise) {
      customise(store);
    }
  });
};
