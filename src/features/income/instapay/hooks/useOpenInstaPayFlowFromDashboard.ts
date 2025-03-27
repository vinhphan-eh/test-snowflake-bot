import { switchPillar } from '../../../../common/stores/useMiniAppSwitcherStore';
import { navigateFromRoot } from '../../../../navigation/rootNavigation';
import {
  WithdrawYourEarnedPaySectionKey,
  useWithdrawYourEarnedPaySectionStore,
} from '../../instapay-scheduling/stores/useWithdrawYourEarnedPaySectionStore';

type Params = {
  underMaintenance: boolean;
};

/**
 * Open InstaPay Now flow based
 * - on intro seen status
 * - InstaPay Now maintenance status
 * @note: this hook have to use in root screen like SWAG dashboard, TopTab
 */
export const useOpenInstaPayFlowFromDashboard = (params: Params) => {
  const openInstaPayFlow = async () => {
    if (params.underMaintenance) {
      navigateFromRoot('IncomeStack', { screen: 'InstaPayNowMaintenance' });
      return;
    }

    switchPillar({ to: { pillarId: 'WalletApp', tab: 'income-tab' } });
    useWithdrawYourEarnedPaySectionStore.setState({
      selectedTabKey: WithdrawYourEarnedPaySectionKey.NOW,
    });
  };

  return { openInstaPayFlow };
};
