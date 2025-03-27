import React from 'react';
import { List, useTheme } from '@hero-design/rn';
import { PillarIds, WalletTabKeys } from '../../../../common/constants/navigation';
import { switchPillar } from '../../../../common/stores/useMiniAppSwitcherStore';
import { useBillManagementMoneyAccess } from '../../../bill-management/hooks/useBillManagementMoneyAccess';
import { useBenefitsBillMgmtTracking } from '../hooks/useBenefitsBillMgmtTracking';

export const GoToBillMoney = () => {
  const { space } = useTheme();
  const { trackClickGoToBillMgmt } = useBenefitsBillMgmtTracking();

  const goToBillManagementTab = () => {
    trackClickGoToBillMgmt();
    switchPillar({
      to: {
        pillarId: PillarIds.WalletApp,
        tab: WalletTabKeys.BILL_MANAGEMENT,
      },
    });
  };

  const { permission: billManagementMoneyAccessPermission } = useBillManagementMoneyAccess();

  if (billManagementMoneyAccessPermission) {
    return (
      <List.Item
        style={{ marginTop: space.large }}
        suffix="arrow-right"
        title="Go to bill management"
        variant="card"
        testID="go-to-bill-management"
        onPress={goToBillManagementTab}
      />
    );
  }
  return null;
};
