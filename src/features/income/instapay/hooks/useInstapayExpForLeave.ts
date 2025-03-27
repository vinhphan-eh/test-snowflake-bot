import { useBrazeStore } from '../../../../common/braze/stores/useBrazeStore';
import { useFetchEmploymentHistory } from '../../../../common/hooks/useFetchEmploymentHistory';
import { usePrefetchIncomeVisibility } from '../../../../common/hooks/usePrefetchIncomeVisibility';
import { usePureMoneyPillarPermission } from '../../../../common/hooks/usePureMoneyPillarPermission';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { usePrefetchInstapayBalance } from '../components/instapay-exp-popup/hooks/usePrefetchInstapayBalance';
import { BRAZE_SUBMIT_LEAVE_ZERO_BALANCE_ID, BRAZE_SUBMIT_LEAVE_ID } from '../constants/braze';

const FULL_TIME_EMPLOYMENT_TYPE = 'Full-time';
export const useInstapayExpForLeave = ({ isAnnualLeave }: { isAnnualLeave: boolean }) => {
  const { permission: moneyPillarAccess } = usePureMoneyPillarPermission();
  const { instapayNowUnderMaintenance, showInstapay } = usePrefetchIncomeVisibility();
  const { hasBalance, hasZeroBalance } = usePrefetchInstapayBalance('useInstapayExpForLeave');
  const { data = [] } = useFetchEmploymentHistory();
  const cards = useBrazeStore(state => state.cards);
  const submitLeaveCard = cards?.find(
    item => item.extras.id === BRAZE_SUBMIT_LEAVE_ID || item.extras.id === BRAZE_SUBMIT_LEAVE_ZERO_BALANCE_ID
  );

  const instapayBrazeLeaveApproved = usePermissionStore(
    state => state.permissions?.instapayBrazeLeaveApproved?.view ?? false
  );
  const instapayBrazeSubmitLeave = usePermissionStore(
    state => state.permissions?.instapayBrazeSubmitLeave?.view ?? false
  );

  const isFullTimeEmployee = data.length > 0 && data?.[0].employment_type === FULL_TIME_EMPLOYMENT_TYPE;

  const showTile =
    isAnnualLeave &&
    moneyPillarAccess &&
    showInstapay &&
    (hasBalance || hasZeroBalance) &&
    isFullTimeEmployee &&
    !instapayNowUnderMaintenance;

  const showTileAtSubmitLeave = showTile && instapayBrazeSubmitLeave && !!submitLeaveCard;
  const showTileAtApprovedLeave = showTile && instapayBrazeLeaveApproved;

  return {
    showTileAtSubmitLeave,
    showTileAtApprovedLeave,
  };
};
