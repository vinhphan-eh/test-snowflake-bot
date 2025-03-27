import { useEstInstaPayNowBalances } from '../../../hooks/useEstInstaPayNowBalances';
import { useInstaPayAvailableBalances } from '../../../hooks/useInstaPayAvailableBalances';

export const usePrefetchInstapayBalance = (location: string) => {
  const { hasEstBalance } = useEstInstaPayNowBalances();
  const { sumAvailableBalance = 0 } = useInstaPayAvailableBalances({ enabled: true, location });

  const hasBalance = sumAvailableBalance > 0 || hasEstBalance;
  const hasZeroBalance = sumAvailableBalance === 0;

  return {
    hasBalance,
    hasZeroBalance,
  };
};

export const PrefetchInstapayBalance = () => {
  // conditional hook wrapper
  usePrefetchInstapayBalance('RootProviderPrefetch');

  return null;
};
