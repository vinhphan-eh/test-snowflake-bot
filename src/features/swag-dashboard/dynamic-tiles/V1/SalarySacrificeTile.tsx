import React from 'react';
import { Icon } from '@hero-design/rn';
import Tile from './Tile';
import { WalletTabKeys } from '../../../../common/constants/navigation';
import { useIsAccountAU } from '../../../../common/hooks/useIsAccountAU';
import { switchPillar } from '../../../../common/stores/useMiniAppSwitcherStore';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { SALARY_SACRIFICING_WIDGET } from '../../constants';
import useTrackingDashboard from '../../utils/useTrackingDashboard';

export const SalarySacrificeTile = () => {
  const Intl = useIntl();
  const { isFetchedPermission, permissions } = usePermissionStore();
  const isAustralian = useIsAccountAU();
  const { trackingClickOnDashboardWidget } = useTrackingDashboard();

  const onPress = () => {
    trackingClickOnDashboardWidget(SALARY_SACRIFICING_WIDGET);
    switchPillar({
      to: {
        pillarId: 'WalletApp',
        tab: WalletTabKeys.SUPER,
      },
    });
  };

  return (
    <Tile
      testID="salary-sacrifice-tile"
      permission={permissions?.superChoiceSwag?.view && isAustralian}
      loading={!isFetchedPermission}
      title={Intl.formatMessage({ id: 'dynamicTiles.salarySacrifice.title' })}
      subtitle={Intl.formatMessage({ id: 'dynamicTiles.salarySacrifice.subtitle' })}
      onPress={onPress}
      renderIcon={() => <Icon icon="salary-sacrifice" intent="primary" />}
    />
  );
};
