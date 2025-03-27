import { useMemo } from 'react';
import { useEbenTokenValidForQuery } from '../../../../common/auth/store/ebenTokenStore';
import { isTruthy } from '../../../../common/utils/truthy';
import type { InstapayBankAccount } from '../../../../new-graphql/generated';
import { useGetBankAccountsForOrgQuery } from '../../../../new-graphql/generated';
import { useInstaPayDrawdownStore } from '../stores/useInstaPayDrawdownStore';

export interface FormattedInstapayBankAccount extends Omit<InstapayBankAccount, 'fee' | 'schedulingPromotionFee'> {
  isSSA: boolean;
}

export interface InstapayBankOptions {
  isLoading: boolean;
  accounts: FormattedInstapayBankAccount[];
}

// helper hook to wrap request and response handling
// returns processed data from downstream
export const useInstapayBankOptions = (definedOrgUUID?: string): InstapayBankOptions => {
  const tokenValid = useEbenTokenValidForQuery();
  const membership = useInstaPayDrawdownStore(state => state.membership);

  const orgUUID = definedOrgUUID || (membership?.getId() ?? -1);
  const { data: bankAccountsForOrgData, isLoading } = useGetBankAccountsForOrgQuery(
    { id: `${orgUUID}` },
    { enabled: !!orgUUID && tokenValid }
  );

  const accounts = useMemo(() => {
    return (
      bankAccountsForOrgData?.me?.org?.instapay?.bankAccounts
        // filter out null values
        ?.filter(isTruthy)
        // Sort SSA accounts to the top
        .sort((a, b) => Number(b.isSSA) - Number(a.isSSA))
        .map(v => ({
          ...v,
          isSSA: Boolean(v.isSSA),
        })) || []
    );
  }, [bankAccountsForOrgData?.me?.org?.instapay?.bankAccounts]);

  return {
    isLoading,
    accounts,
  };
};
