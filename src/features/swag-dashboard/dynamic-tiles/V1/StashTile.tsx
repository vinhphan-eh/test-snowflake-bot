import React from 'react';
import { useTheme } from '@hero-design/rn';
import Tile from './Tile';
import { WalletTabKeys } from '../../../../common/constants/navigation';
import { useSpendVisibility } from '../../../../common/hooks/useSpendVisibility';
import { switchPillar } from '../../../../common/stores/useMiniAppSwitcherStore';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { STASH_WIDGET } from '../../constants';
import useTrackingDashboard from '../../utils/useTrackingDashboard';

export const StashTile = () => {
  const theme = useTheme();
  const Intl = useIntl();
  const { isLoading: showSpendLoading, showSpendTab, showStashTab } = useSpendVisibility();
  const { trackingClickOnDashboardWidget } = useTrackingDashboard();

  const onPress = () => {
    trackingClickOnDashboardWidget(STASH_WIDGET);
    switchPillar({
      to: {
        pillarId: 'WalletApp',
        tab: showStashTab ? WalletTabKeys.STASH : WalletTabKeys.SPEND,
      },
    });
  };

  return (
    <Tile
      testID="stash-tile"
      permission={showStashTab || showSpendTab}
      loading={showSpendLoading}
      title={Intl.formatMessage({ id: 'dynamicTiles.stash.title' })}
      subtitle={Intl.formatMessage({ id: 'dynamicTiles.stash.subtitle' })}
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.infoSurface,
      }}
    />
  );
};
