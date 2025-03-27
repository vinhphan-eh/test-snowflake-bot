import { useBrazeStore } from '../../../../common/braze/stores/useBrazeStore';
import { usePrefetchIncomeVisibility } from '../../../../common/hooks/usePrefetchIncomeVisibility';
import { usePureMoneyPillarPermission } from '../../../../common/hooks/usePureMoneyPillarPermission';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { usePrefetchInstapayBalance } from '../components/instapay-exp-popup/hooks/usePrefetchInstapayBalance';
import { BRAZE_SUBMIT_TIMESHEET_ID, BRAZE_SUBMIT_TIMESHEET_ZERO_BALANCE_ID } from '../constants/braze';

export const useInstapayExpForTimesheet = () => {
  const { permission: moneyPillarAccess } = usePureMoneyPillarPermission();
  const { instapayNowUnderMaintenance, showInstapay } = usePrefetchIncomeVisibility();
  const { hasBalance, hasZeroBalance } = usePrefetchInstapayBalance('useInstapayExpForTimesheet');
  const cards = useBrazeStore(state => state.cards);
  const brazeCardCustomId = hasZeroBalance ? BRAZE_SUBMIT_TIMESHEET_ZERO_BALANCE_ID : BRAZE_SUBMIT_TIMESHEET_ID;
  const submitTimesheetCard = cards?.find(item => item.extras.id === brazeCardCustomId);

  const instapayBrazeSubmitTimesheets = usePermissionStore(
    state => state.permissions?.instapayBrazeSubmitTimesheets?.view ?? false
  );

  const showTile = moneyPillarAccess && showInstapay && (hasBalance || hasZeroBalance) && !instapayNowUnderMaintenance;

  const showTileAtSubmitTimesheet = showTile && instapayBrazeSubmitTimesheets && !!submitTimesheetCard;

  return {
    showTileAtSubmitTimesheet,
    brazeCardCustomId,
  };
};
