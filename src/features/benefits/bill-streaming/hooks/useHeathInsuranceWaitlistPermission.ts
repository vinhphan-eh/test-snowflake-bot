import { useIsAccountAU } from '../../../../common/hooks/useIsAccountAU';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';

export const useHealthInsuranceWaitlistPermission = () => {
  const isAU = useIsAccountAU();

  const isTerminated = useSessionStore(state => state.currentUser?.attributes?.terminated);
  const billInsuranceWaitlistPermission = usePermissionStore(
    state => state.permissions?.benefitsBillHealthInsuranceWaitlist?.view
  );

  const featureAccess = isAU && billInsuranceWaitlistPermission;

  return {
    permission: isTerminated ? false : featureAccess,
  };
};
