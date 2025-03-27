import { useGetSSADetails } from './useGetSSADetails';
import { getFloatAmountFromMoneyV2 } from '../../../common/utils/currency';
import type { SupportedCurrency } from '../../../common/utils/numbers';
import { useGetStashesQuery, type StashItem } from '../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';

interface SpendAmount {
  // availableBalance is the amount of money in the Spend account, which is the total amount of money
  availableBalance: number | undefined;
  stashedAmount: number;
  availableAmount: number;
  walletLoading: boolean;
  currency?: SupportedCurrency;
}

export const useGetSpendAmount = ({ shouldLoadStashes }: { shouldLoadStashes: boolean }): SpendAmount => {
  const { data: walletData, isLoading: walletLoading } = useGetSSADetails();
  const { defaultCurrency } = useRegionLocalisation();
  const { data, isLoading: stashLoading } = useGetStashesQuery(undefined, {
    enabled: shouldLoadStashes,
  });

  const availableBalance = walletData?.availableBalance;

  if (stashLoading || walletLoading) {
    return {
      availableBalance: undefined,
      stashedAmount: 0,
      availableAmount: 0,
      walletLoading: true,
      currency: walletData?.currency ?? defaultCurrency, // To display currency symbol based on selected country by default
    };
  }

  if (availableBalance === undefined) {
    return {
      availableBalance: undefined,
      stashedAmount: 0,
      availableAmount: 0,
      walletLoading: false,
      currency: defaultCurrency,
    };
  }

  let stashedAmount = 0;
  if (shouldLoadStashes) {
    const stashes = (data?.me?.wallet?.stash?.items ?? []) as StashItem[];
    stashedAmount = stashes.reduce(
      (acc, stash) => acc + (stash.balance ? getFloatAmountFromMoneyV2(stash.balance) : 0),
      0
    );
  }

  return {
    availableBalance,
    stashedAmount,
    availableAmount: availableBalance - stashedAmount,
    walletLoading: false,
    currency: walletData?.currency ?? defaultCurrency,
  };
};
