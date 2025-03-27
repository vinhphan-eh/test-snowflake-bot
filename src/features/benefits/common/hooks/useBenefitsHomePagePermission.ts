import { useCashbackPermission } from './useCashbackPermission';
import { useIsAccountAU } from '../../../../common/hooks/useIsAccountAU';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useSwagStorePermission } from '../../swag-store/hooks/useSwagStorePermission';

export const useBenefitsHomePagePermission = (): {
  permission: boolean;
  isLoading: boolean;
  isFetched: boolean;
} => {
  // homePermission can cover candidate & workzone & terminated
  const homePermission = usePermissionStore(state => state.permissions?.benefitsPillarHomepage?.view) ?? false;
  const {
    isFetched: isFetchedSwagStore,
    isLoading: loadingStorePermission,
    permission: swagStorePermission,
  } = useSwagStorePermission();
  const {
    isFetched: isFetchedCashback,
    isLoading: loadingCashbackPermission,
    permission: cashbackPermission,
  } = useCashbackPermission();
  const isAU = useIsAccountAU();

  return {
    permission: homePermission && swagStorePermission && cashbackPermission && isAU,
    isLoading: loadingStorePermission || loadingCashbackPermission,
    isFetched: isFetchedSwagStore && isFetchedCashback,
  };
};
