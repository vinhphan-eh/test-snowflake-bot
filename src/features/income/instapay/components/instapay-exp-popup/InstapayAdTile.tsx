import React, { useEffect } from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import type { CaptionedContentCard } from '@braze/react-native-sdk';
import Braze from '@braze/react-native-sdk';
import { Box, useTheme, Typography } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';
import { useIncomeVisibility } from '../../../../../common/hooks/useIncomeVisibility';
import { useLoadBrazeContentCards } from '../../../../../common/hooks/useLoadBrazeContentCards';
import ThemeSwitcher from '../../../../../common/utils/ThemeSwitcher';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { useInstapayExpForLeave } from '../../hooks/useInstapayExpForLeave';
import { type TargetedFeature, useInstapayTracking } from '../../hooks/useInstapayTracking';
import { useOpenInstaPayFlowFromDashboard } from '../../hooks/useOpenInstaPayFlowFromDashboard';

const { width } = Dimensions.get('window');
// from figma
const DEFAULT_ASPECT_RATIO = 1;
const INSTAPAY_POPUP_BRAZE_CARD_ID = 'instapay_exp_leave_approved';

type TileContentProps = BoxProps & {
  isAnnualLeave: boolean;
  targetedFeature: TargetedFeature;
};

export const InstapayAdTile = ({ isAnnualLeave, targetedFeature, ...boxProps }: TileContentProps) => {
  const { radii } = useTheme();
  const Intl = useIntl();
  const { cards } = useLoadBrazeContentCards();
  const { instapayNowUnderMaintenance } = useIncomeVisibility();
  const { showTileAtApprovedLeave } = useInstapayExpForLeave({ isAnnualLeave });
  const { trackUserClickInstapayExperimentTile, trackUserSeeInstapayExperimentTile } = useInstapayTracking();
  const { openInstaPayFlow } = useOpenInstaPayFlowFromDashboard({
    underMaintenance: instapayNowUnderMaintenance,
  });

  const brazeCard = cards?.find(item => item.extras.id === INSTAPAY_POPUP_BRAZE_CARD_ID) as CaptionedContentCard;
  const cardId = brazeCard?.id;
  const {
    cardDescription = '',
    extras: { actionText = '' } = { actionText: Intl.formatMessage({ id: 'common.learnMore' }) },
    image = '',
    imageAspectRatio = 0,
    title = '',
  } = brazeCard ?? {};
  const imageWith = width * 0.27;
  const imageHeight = imageWith / (imageAspectRatio || DEFAULT_ASPECT_RATIO);

  const shouldShowCard = !!brazeCard && showTileAtApprovedLeave && !instapayNowUnderMaintenance;

  useEffect(() => {
    if (cardId && shouldShowCard) {
      trackUserSeeInstapayExperimentTile(targetedFeature);
      Braze.logContentCardImpression(cardId);
    }
  }, [cardId, shouldShowCard, targetedFeature, trackUserSeeInstapayExperimentTile]);

  if (!shouldShowCard) {
    return null;
  }

  const onPress = () => {
    if (cardId) {
      Braze.logContentCardClicked(cardId);
      trackUserClickInstapayExperimentTile(targetedFeature);
      openInstaPayFlow();
    }
  };
  return (
    <ThemeSwitcher name="wallet">
      <TouchableOpacity onPress={onPress}>
        <Box
          testID="titleContent"
          marginHorizontal="medium"
          padding="medium"
          alignSelf="center"
          alignItems="flex-start"
          borderRadius="medium"
          backgroundColor="decorativePrimarySurface"
          flexDirection="row"
          style={{ width: width * 0.91 }}
          {...boxProps}
        >
          {image ? (
            <Image
              testID="braze-image"
              style={{ width: imageWith, height: imageHeight, borderRadius: radii.large, overflow: 'hidden' }}
              source={{ uri: image }}
            />
          ) : null}
          <Box flexShrink={1} marginStart="smallMedium" justifyContent="space-between" marginVertical="small">
            <Typography.Body variant="regular-bold" accessibilityLabel={title}>
              {title}
            </Typography.Body>
            <Typography.Body variant="small" accessibilityLabel={title} intent="subdued">
              {cardDescription}
            </Typography.Body>
            <Typography.Body variant="regular-bold" intent="info" accessibilityLabel={actionText}>
              {actionText}
            </Typography.Body>
          </Box>
        </Box>
      </TouchableOpacity>
    </ThemeSwitcher>
  );
};
