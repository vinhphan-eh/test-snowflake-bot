import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Image } from 'react-native';
import Braze from '@braze/react-native-sdk';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { TouchableOpacity } from 'react-native-gesture-handler';
import images from '../../../../common/assets/images';
import { useIncomeVisibility } from '../../../../common/hooks/useIncomeVisibility';
import { usePureMoneyPillarPermission } from '../../../../common/hooks/usePureMoneyPillarPermission';
import { useOneTimeEffect } from '../../../../common/shared-hooks/useOneTimeEffect';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { scale } from '../../../../common/utils/layout';
import ThemeSwitcher from '../../../../common/utils/ThemeSwitcher';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useInstapayExpBrazeCard } from '../hooks/useInstapayExpBrazeCard';
import { useInstapayTracking } from '../hooks/useInstapayTracking';
import { useOpenInstaPayFlowFromDashboard } from '../hooks/useOpenInstaPayFlowFromDashboard';

type InstapayRostersExperimentTileProps = {
  style?: StyleProp<ViewStyle>;
};

// based on figma
const imgSize = scale(118, 'width');
const location = 'rosters';
const rostersCardId = 'instapay_exp_tile_rosters';

const TileComponent = ({ style }: InstapayRostersExperimentTileProps) => {
  const { colors, radii, space } = useTheme();
  const Intl = useIntl();
  const { trackClickInstapayEducationTile, trackUserSeeInstapayEducationTile } = useInstapayTracking();

  const rostersInstapayExperiment = usePermissionStore(
    state => state.permissions?.rostersInstapayExperiment?.view ?? false
  );
  const { permission: moneyPillarAccess } = usePureMoneyPillarPermission();
  const { instapayNowUnderMaintenance, isError, showInstapay } = useIncomeVisibility();
  const { contentCard } = useInstapayExpBrazeCard(rostersCardId);
  const { extras: { actionTextBeforeSeen = '', description = '', title = '' } = {} } = contentCard ?? {};

  const { openInstaPayFlow } = useOpenInstaPayFlowFromDashboard({
    underMaintenance: instapayNowUnderMaintenance,
  });

  const showTile = rostersInstapayExperiment && moneyPillarAccess && showInstapay;

  const actionBeforeSeen = actionTextBeforeSeen || Intl.formatMessage({ id: 'common.learnMore' });

  const actionText = actionBeforeSeen;

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
    return <Box testID="instapay-roaster-experiment-tile" />;
  }

  return (
    <TouchableOpacity
      testID="instapay-experiment-tile"
      onPress={onOpenInstapay}
      style={[
        {
          backgroundColor: colors.decorativePrimarySurface,
          flexDirection: 'row',
          padding: space.medium,
          borderRadius: radii.xlarge,
        },
        style,
      ]}
    >
      <Image
        testID="instapay-roster-tile-img"
        style={{
          width: imgSize,
          height: imgSize,
          borderRadius: radii.xlarge,
        }}
        source={images.instapayExperimentImg}
      />
      <Box marginLeft="medium" flex={1} justifyContent="space-between">
        <Typography.Body variant="regular-bold">
          {title || Intl.formatMessage({ id: 'instapay.experimentRosterTile.title' })}
        </Typography.Body>
        <Typography.Body variant="small">
          {description || Intl.formatMessage({ id: 'instapay.experimentRosterTile.description' })}
        </Typography.Body>
        <Typography.Body intent="primary" variant="regular-bold">
          {actionText}
        </Typography.Body>
      </Box>
    </TouchableOpacity>
  );
};

export const InstapayRostersExperimentTile = (props: InstapayRostersExperimentTileProps) => (
  <ThemeSwitcher name="wallet">
    <TileComponent {...props} />
  </ThemeSwitcher>
);
