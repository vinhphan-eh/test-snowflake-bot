import { useIncomeVisibility } from '../../../common/hooks/useIncomeVisibility';
import { usePermissionStore } from '../../../common/stores/usePermissionStore';

export const useIsShowInstapayTile = () => {
  const { instapayNowUnderMaintenance, isError, isLoading, showIncomeTab, showInstapay } = useIncomeVisibility();
  const instapayTilePermission = usePermissionStore(state => state.permissions?.payslipsExperimentInstapay?.view);
  // when isLoading, still show instapay tile loading Skeleton
  const isShowInstapayTile = !!instapayTilePermission && (isLoading || (!isError && showInstapay && showIncomeTab));

  return {
    isShowInstapayTile,
    instapayNowUnderMaintenance,
  };
};
