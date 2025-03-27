import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Typography, useTheme, Box, Button } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';
import ThemeSwitcher from '../../../../common/utils/ThemeSwitcher';
import { useInstapayExpCard } from '../hooks/useInstapayExpCard';
import type { TargetedFeature } from '../hooks/useInstapayTracking';

type InstapayExpCardProps = {
  onCancel: () => void;
  onActionEffect: () => void;
  feature: TargetedFeature;
  brazeCardCustomId: string;
} & BoxProps;

const Content = ({ brazeCardCustomId, feature, onActionEffect, onCancel }: InstapayExpCardProps) => {
  const { actionText, cancelText, cardDescription, onClickLearnMore, onClickMaybeLater, title } = useInstapayExpCard({
    brazeCardCustomId,
    feature,
    onActionEffect,
    onCancel,
  });

  const { colors, radii, space } = useTheme();

  return (
    <Box
      testID="instapay-experiment-tile-v2"
      style={[
        {
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
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
          {title}
        </Typography.Title>
        <Typography.Body style={{ marginBottom: space.medium }} variant="small">
          {cardDescription}
        </Typography.Body>
        <Button text={actionText} onPress={onClickLearnMore} />
      </Box>
      <TouchableOpacity style={{ marginVertical: space.medium }} onPress={onClickMaybeLater}>
        <Typography.Body variant="regular-bold">{cancelText}</Typography.Body>
      </TouchableOpacity>
    </Box>
  );
};

export const InstapayExpCardV2 = (props: InstapayExpCardProps) => {
  return (
    <ThemeSwitcher name="wallet">
      <Content {...props} />
    </ThemeSwitcher>
  );
};
