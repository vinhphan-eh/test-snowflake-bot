import { useCashbackPermission } from './useCashbackPermission';
import { useHasPurchaseHistory } from '../../../../common/hooks/useHasPurchaseHistory';
import { useIsAccountAU } from '../../../../common/hooks/useIsAccountAU';
import { useHasActiveBillSubscription } from '../../../bill-management/hooks/useHasActiveBillSubscription';
import { useBillStreamPermission } from '../../bill-streaming/hooks/useBillStreamPermission';
import { useCheckCompletelyOnboardCashback } from '../../cash-back/hooks/useCheckCompletelyOnboardCashback';
import { useSwagStorePermission } from '../../swag-store/hooks/useSwagStorePermission';

export const usePurchaseTabVisibility = () => {
  const { isFetched: isFetchedCashback, permission: cashbackPermission } = useCashbackPermission();
  const { isFetched: isFetchedBill, permission: billPermission } = useBillStreamPermission();
  const { isFetched: isFetchedStore, permission: swagStorePermission } = useSwagStorePermission();
  const { hasPurchaseHistory } = useHasPurchaseHistory();
  const { hasBillSubscription } = useHasActiveBillSubscription();
  const { isCompleted, isFetched: isFetchedOnboard } = useCheckCompletelyOnboardCashback();
  const isAU = useIsAccountAU();

  const isFetchedAll = isFetchedCashback && isFetchedBill && isFetchedStore && isFetchedOnboard;

  const cashbackTabVisibility = isAU && isCompleted && cashbackPermission;
  const storeTabVisibility = swagStorePermission || hasPurchaseHistory;
  const billTabVisibility = isAU && (billPermission || hasBillSubscription);

  const tabVisibility = cashbackTabVisibility || storeTabVisibility || billTabVisibility;

  return {
    permission: tabVisibility,
    billTabVisibility,
    cashbackTabVisibility,
    storeTabVisibility,
    isFetched: isFetchedAll,
  };
};
