import { useGetInstapayExpPopupContext } from './useGetInstapayExpPopupContext';
import { usePrefetchInstapayBalance } from './usePrefetchInstapayBalance';
import { useIncomeVisibility } from '../../../../../../common/hooks/useIncomeVisibility';
import { usePureMoneyPillarPermission } from '../../../../../../common/hooks/usePureMoneyPillarPermission';
import { usePermissionStore } from '../../../../../../common/stores/usePermissionStore';

export const useInstapayExpPopup = () => {
  const popupContext = useGetInstapayExpPopupContext();

  const rostersInstapayExperiment = usePermissionStore(
    state => state.permissions?.instapayExpPopupRosters?.view ?? false
  );
  const payslipsInstapayExperiment = usePermissionStore(
    state => state.permissions?.instapayExpPopupPayslips?.view ?? false
  );
  const leaveInstapayExperiment = usePermissionStore(state => state.permissions?.instapayExpPopupLeave?.view ?? false);

  const { permission: moneyPillarAccess } = usePureMoneyPillarPermission();
  const { isError, showInstapay } = useIncomeVisibility();
  const { hasBalance, hasZeroBalance } = usePrefetchInstapayBalance('useInstapayExpPopup');

  const shouldShowPopup = !isError && moneyPillarAccess && showInstapay && (hasBalance || hasZeroBalance);

  const rostersPermission = rostersInstapayExperiment && shouldShowPopup;
  const payslipsPermission = payslipsInstapayExperiment && shouldShowPopup;
  const leavePermission = leaveInstapayExperiment && shouldShowPopup;

  const showPopupForRosters = () => {
    if (rostersPermission) {
      popupContext?.open?.('rosters');
    }
  };

  const showPopupForPayslips = () => {
    if (payslipsPermission) {
      popupContext?.open?.('payslips');
    }
  };

  const showPopupForLeave = () => {
    if (leavePermission) {
      popupContext?.open?.('leave');
    }
  };

  return {
    showPopupForRosters,
    showPopupForPayslips,
    showPopupForLeave,
    leavePermission,
    payslipsPermission,
    rostersPermission,
  };
};
