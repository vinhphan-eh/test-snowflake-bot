import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Braze from '@braze/react-native-sdk';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
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
  closeSuccessSurveyModal: () => void;
  style?: StyleProp<ViewStyle>;
  flagPermission: boolean;
};

const location = 'customSurvey';
const customSurveyCardId = 'instapay_exp_tile_customSurvey';

const TileComponent = ({ closeSuccessSurveyModal, flagPermission, style }: InstapayExperimentTileProps) => {
  const { colors, radii, space } = useTheme();
  const { trackClickInstapayEducationTile, trackUserSeeInstapayEducationTile } = useInstapayTracking();
  const Intl = useIntl();

  const { permission: moneyPillarAccess } = usePureMoneyPillarPermission();
  const { instapayNowUnderMaintenance, isError, showInstapay } = useIncomeVisibility();
  const { openInstaPayFlow } = useOpenInstaPayFlowFromDashboard({
    underMaintenance: instapayNowUnderMaintenance,
  });

  const showTile = flagPermission && moneyPillarAccess && showInstapay;

  const { contentCard } = useInstapayExpBrazeCard(customSurveyCardId);
  const { extras: { actionTextBeforeSeen = '', description = '', dismissText = '', title = '' } = {} } =
    contentCard ?? {};

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

  if (!showTile || isError) {
    return (
      <ThemeSwitcher name="work">
        <Button
          testID="instapay-experiment-tile"
          intent="primary"
          variant="filled"
          text={Intl.formatMessage({ id: 'common.gotIt' })}
          onPress={closeSuccessSurveyModal}
          style={{ margin: space.medium, marginBottom: space.large }}
        />
      </ThemeSwitcher>
    );
  }

  return (
    <Box
      testID="instapay-experiment-tile"
      style={[
        {
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        style,
      ]}
    >
      <Box
        style={{
          backgroundColor: colors.defaultGlobalSurface,
          borderRadius: radii.xlarge,
          padding: space.medium,
        }}
      >
        <Typography.Title typeface="playful" style={{ marginBottom: space.medium }} level="h3">
          {title || Intl.formatMessage({ id: 'instapay.customSurveyExperimentTile.title' })}
        </Typography.Title>
        <Typography.Body style={{ marginBottom: space.medium }} variant="small">
          {description || Intl.formatMessage({ id: 'instapay.customSurveyExperimentTile.description' })}
        </Typography.Body>
        <Button
          text={actionText}
          onPress={() => {
            if (contentCard) {
              Braze.logContentCardClicked(contentCard.id);
            }
            trackClickInstapayEducationTile(location);
            closeSuccessSurveyModal();
            openInstaPayFlow();
          }}
        />
      </Box>
      <TouchableOpacity style={{ marginVertical: space.medium }} onPress={() => closeSuccessSurveyModal()}>
        <Typography.Body variant="regular-bold">
          {dismissText || Intl.formatMessage({ id: 'common.maybeLater' })}
        </Typography.Body>
      </TouchableOpacity>
    </Box>
  );
};

export const InstapayFooterComponentWithTheme = (props: InstapayExperimentTileProps) => (
  <ThemeSwitcher name="wallet">
    <TileComponent {...props} />
  </ThemeSwitcher>
);

export type FooterTileProps = Omit<InstapayExperimentTileProps, 'flagPermission'>;

export const InstapayCustomSurveyFooterTile = (props: FooterTileProps) => {
  const isExperimentEnabled = usePermissionStore(
    state => state.permissions?.customSurveyInstapayExperiment?.view ?? false
  );

  return <InstapayFooterComponentWithTheme {...props} flagPermission={isExperimentEnabled} />;
};
