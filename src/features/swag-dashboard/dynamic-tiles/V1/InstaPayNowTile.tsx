import React from 'react';
import { Icon } from '@hero-design/rn';
import Tile from './Tile';
import { useIncomeVisibility } from '../../../../common/hooks/useIncomeVisibility';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useInstaPayAvailableBalances } from '../../../income/instapay/hooks/useInstaPayAvailableBalances';
import { useOpenInstaPayFlowFromDashboard } from '../../../income/instapay/hooks/useOpenInstaPayFlowFromDashboard';
import { INSTAPAY_WIDGET } from '../../constants';
import useTrackingDashboard from '../../utils/useTrackingDashboard';

export const InstaPayNowTile = () => {
  const Intl = useIntl();
  const { instapayNowUnderMaintenance, isLoading: showIncomeLoading, showIncomeTab } = useIncomeVisibility();
  const {
    allOrgsViolatePolicy,
    isLoading: isFetchingInstaPayAvailableBalances,
    sumAvailableBalance,
  } = useInstaPayAvailableBalances({ enabled: true, location: 'V1/InstaPayNowTile' });
  const { openInstaPayFlow } = useOpenInstaPayFlowFromDashboard({ underMaintenance: instapayNowUnderMaintenance });
  const { trackingClickOnDashboardWidget } = useTrackingDashboard();

  const incomeVisibility = showIncomeTab;

  return (
    <Tile
      testID="instapay-now-tile"
      permission={incomeVisibility && !allOrgsViolatePolicy}
      loading={showIncomeLoading || isFetchingInstaPayAvailableBalances}
      title={Intl.formatMessage({ id: 'dynamicTiles.instaPayNow.title' })}
      value={sumAvailableBalance ?? 0}
      subtitle={Intl.formatMessage({ id: 'dynamicTiles.instaPayNow.subtitle' })}
      onPress={() => {
        trackingClickOnDashboardWidget(INSTAPAY_WIDGET);
        openInstaPayFlow();
      }}
      renderIcon={() => <Icon icon="instapay-now" intent="primary" />}
    />
  );
};
