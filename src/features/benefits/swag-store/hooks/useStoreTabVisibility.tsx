import { useSwagStorePermission } from './useSwagStorePermission';
import { useHasPurchaseHistory } from '../../../../common/hooks/useHasPurchaseHistory';

// swag store permission + special condition
export const useStoreTabVisibility = () => {
  const { hasPurchaseHistory, isFetched: isFetchedHistory, isLoading: isCheckingHistory } = useHasPurchaseHistory();
  const { isFetched: isFetchPermission, permission: storePermission } = useSwagStorePermission();

  return {
    permission: hasPurchaseHistory || storePermission,
    isLoading: isCheckingHistory,
    isFetched: isFetchedHistory && isFetchPermission,
  };
};
