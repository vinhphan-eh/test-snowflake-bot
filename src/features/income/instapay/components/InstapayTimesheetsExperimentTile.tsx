import React from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
import Braze from '@braze/react-native-sdk';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIncomeVisibility } from '../../../../common/hooks/useIncomeVisibility';
import { usePureMoneyPillarPermission } from '../../../../common/hooks/usePureMoneyPillarPermission';
import { useOneTimeEffect } from '../../../../common/shared-hooks/useOneTimeEffect';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import ThemeSwitcher from '../../../../common/utils/ThemeSwitcher';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useInstapayExpBrazeCard } from '../hooks/useInstapayExpBrazeCard';
import { useInstapayTracking } from '../hooks/useInstapayTracking';
import { useOpenInstaPayFlowFromDashboard } from '../hooks/useOpenInstaPayFlowFromDashboard';

type InstapayExperimentTileProps = {
  style?: StyleProp<ViewStyle>;
};

const location = 'timesheets';
const timeSheetCardId = 'instapay_exp_tile_timesheets';

const TileComponent = ({ style }: InstapayExperimentTileProps) => {
  const { colors, radii, space } = useTheme();
  const Intl = useIntl();
  const { trackClickInstapayEducationTile, trackUserSeeInstapayEducationTile } = useInstapayTracking();

  const timesheetsInstapayExperiment = usePermissionStore(
    state => state.permissions?.timesheetsInstapayExperiment?.view ?? false
  );
  const { permission: moneyPillarAccess } = usePureMoneyPillarPermission();
  const { instapayNowUnderMaintenance, isError, showInstapay } = useIncomeVisibility();
  const { contentCard } = useInstapayExpBrazeCard(timeSheetCardId);
  const { extras: { description = '', title = '' } = {} } = contentCard ?? {};

  const { openInstaPayFlow } = useOpenInstaPayFlowFromDashboard({
    underMaintenance: instapayNowUnderMaintenance,
  });

  const showTile = timesheetsInstapayExperiment && moneyPillarAccess && showInstapay;

  useOneTimeEffect(() => {
    if (showTile && !isError) {
      trackUserSeeInstapayEducationTile(location);
      return true;
    }
    return false;
  }, [showTile, isError]);

  useOneTimeEffect(() => {
    if (contentCard && showTile && !isError) {
      Braze.logContentCardImpression(contentCard.id);
      return true;
    }
    return false;
  }, [contentCard, showTile, isError]);

  const onOpenInstapay = () => {
    if (contentCard) {
      Braze.logContentCardClicked(contentCard.id);
    }
    trackClickInstapayEducationTile(location);
    openInstaPayFlow();
  };

  if (!showTile || isError) {
    return <Box testID="instapay-timesheet-experiment-tile" />;
  }

  return (
    <TouchableOpacity
      testID="instapay-timesheet-experiment-tile"
      onPress={onOpenInstapay}
      style={[
        {
          backgroundColor: colors.decorativePrimarySurface,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: space.medium,
          borderRadius: radii.xlarge,
        },
        style,
      ]}
    >
      <Box paddingRight="medium" flex={1} justifyContent="space-between">
        <Typography.Title level="h5" typeface="playful">
          {title || Intl.formatMessage({ id: 'instapay.experimentTimesheetTile.title' })}
        </Typography.Title>
        <Typography.Body variant="small">
          {description || Intl.formatMessage({ id: 'instapay.experimentTimesheetTile.description' })}
        </Typography.Body>
      </Box>
      <Icon icon="arrow-right" intent="primary" />
    </TouchableOpacity>
  );
};

export const InstapayTimesheetsExperimentTile = (props: InstapayExperimentTileProps) => (
  <ThemeSwitcher name="wallet">
    <TileComponent {...props} />
  </ThemeSwitcher>
);
