import { useBillStreamPermission } from './useBillStreamPermission';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';

export const useSEOfferTilePermission = () => {
  const isTerminated = useSessionStore(state => state.currentUser?.attributes?.terminated);
  const seOfferTilePermission = usePermissionStore(state => state.permissions?.seOfferTiles?.view);
  const { permission: billManagementPermission } = useBillStreamPermission();
  const ehPermission = billManagementPermission && seOfferTilePermission;

  return {
    permission: isTerminated ? false : ehPermission,
  };
};
