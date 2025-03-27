import { useHasPurchaseHistory } from '../../../../common/hooks/useHasPurchaseHistory';
import { useHasActiveBillSubscription } from '../../../bill-management/hooks/useHasActiveBillSubscription';
import { useCheckCompletelyOnboardCashback } from '../../cash-back/hooks/useCheckCompletelyOnboardCashback';

export const useIsBenefitsNewUser = () => {
  const { hasPurchaseHistory, isFetched: isFetchedOrderHistory } = useHasPurchaseHistory();
  const { isCompleted, isFetched: isFetchedCashbackOnboard } = useCheckCompletelyOnboardCashback();
  const { hasBillSubscription, isFetched: isFetchedBill } = useHasActiveBillSubscription();

  const doneFetched = isFetchedOrderHistory && isFetchedCashbackOnboard && isFetchedBill;

  return {
    isNewUser: doneFetched && !hasPurchaseHistory && !isCompleted && !hasBillSubscription,
  };
};
