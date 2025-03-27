import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';

export const useBillStreamingWaitlistPermission = () => {
  const permission = usePermissionStore(state => state.permissions?.billStreamingWaitlist?.view);
  const isEhPayroll = useSessionStore(state => state.currentUser?.isEhPayroll);

  return {
    havingPermission: permission && isEhPayroll,
  };
};
