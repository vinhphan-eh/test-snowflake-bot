import React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { Typography, useTheme, Box, Button } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePrefetchInstapayBalance } from './instapay-exp-popup/hooks/usePrefetchInstapayBalance';
import images from '../../../../common/assets/images';
import ThemeSwitcher from '../../../../common/utils/ThemeSwitcher';
import { BRAZE_SUBMIT_LEAVE_ID, BRAZE_SUBMIT_LEAVE_ZERO_BALANCE_ID } from '../constants/braze';
import { useInstapayExpCard } from '../hooks/useInstapayExpCard';
import type { TargetedFeature } from '../hooks/useInstapayTracking';

const { width } = Dimensions.get('window');
// from figma
const DEFAULT_ASPECT_RATIO = 1.62;

type InstapayExpCardProps = {
  onCancel: () => void;
  onActionEffect: () => void;
  feature: TargetedFeature;
} & BoxProps;

const Content = ({ feature, onActionEffect, onCancel, ...boxProps }: InstapayExpCardProps) => {
  const { hasZeroBalance } = usePrefetchInstapayBalance('useInstapayExpForLeave');
  const { actionText, cancelText, image, imageAspectRatio, onClickLearnMore, onClickMaybeLater, title } =
    useInstapayExpCard({
      brazeCardCustomId: hasZeroBalance ? BRAZE_SUBMIT_LEAVE_ZERO_BALANCE_ID : BRAZE_SUBMIT_LEAVE_ID,
      feature,
      onActionEffect,
      onCancel,
    });

  const { space } = useTheme();
  const { bottom } = useSafeAreaInsets();

  const imageWith = width - space.medium * 2;
  const imageHeight = imageWith / (imageAspectRatio || DEFAULT_ASPECT_RATIO);

  return (
    <Box
      testID="instapay-experiment-tile"
      alignItems="center"
      style={{ marginBottom: bottom + space.small }}
      marginHorizontal="medium"
      {...boxProps}
    >
      <Box backgroundColor="defaultGlobalSurface" borderRadius="xlarge">
        <Image
          testID="braze-image"
          style={{ width: imageWith, height: imageHeight }}
          source={image ? { uri: image } : images.instapayExpSubmitLeave}
        />
        <Typography.Title
          accessibilityLabel={title}
          style={{ marginHorizontal: space.medium, marginTop: space.medium }}
          level="h4"
          typeface="playful"
        >
          {title}
        </Typography.Title>
        <Button
          accessibilityLabel={actionText}
          style={{
            marginTop: space.medium,
            marginBottom: space.large,
            marginHorizontal: space.medium,
          }}
          onPress={onClickLearnMore}
          text={actionText}
        />
      </Box>
      <TouchableOpacity accessibilityLabel={cancelText} onPress={onClickMaybeLater}>
        <Typography.Body style={{ marginTop: space.medium }} variant="regular-bold">
          {cancelText}
        </Typography.Body>
      </TouchableOpacity>
    </Box>
  );
};

export const InstapayExpCard = (props: InstapayExpCardProps) => {
  return (
    <ThemeSwitcher name="wallet">
      <Content {...props} />
    </ThemeSwitcher>
  );
};
