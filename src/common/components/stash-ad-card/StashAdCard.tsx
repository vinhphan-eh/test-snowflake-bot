import React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image, Box, Typography, Icon } from '@hero-design/rn';
import type { Radii } from '@hero-design/rn/types/theme/global/borders';
import type { HeroDesignColors } from '../../types/hero-design';
import { scale as layoutScale } from '../../utils/layout';

interface StashAdCardProps {
  cta: string;
  image: ImageSourcePropType;
  onPress: () => void;
  title: string;
  backgroundColor?: HeroDesignColors;
  height?: number;
  width?: number;
  imageWith?: number;
  borderRadius?: keyof Radii;
  borderInsideRadius?: keyof Radii;
  disabled?: boolean;
}

export const StashAdCard = ({
  backgroundColor = 'decorativePrimarySurface',
  borderInsideRadius = 'xxlarge',
  borderRadius = 'xlarge',
  cta,
  disabled = false,
  height = 144,
  image,
  imageWith = 150,
  onPress,
  title,
  width = 267,
}: StashAdCardProps) => (
  <Box
    borderRadius={borderRadius}
    backgroundColor="defaultGlobalSurface"
    flexDirection="row"
    alignItems="stretch"
    style={{
      overflow: 'hidden',
    }}
  >
    <Image
      source={image}
      resizeMode="cover"
      style={{ position: 'absolute', top: 0, right: 0, height, width: layoutScale(imageWith, 'width') }}
    />
    <Box
      style={{
        width: layoutScale(width, 'width'),
        height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      padding="medium"
      borderTopRightRadius={borderInsideRadius}
      borderBottomRightRadius={borderInsideRadius}
      backgroundColor={backgroundColor}
    >
      <Typography.Title level="h4" typeface="playful">
        {title}
      </Typography.Title>
      <TouchableOpacity disabled={disabled} accessibilityLabel={cta} onPress={onPress}>
        <Box flexDirection="row" alignItems="center" marginTop="small">
          <Typography.Body variant="regular-bold" intent={disabled ? 'disabled' : 'info'}>
            {cta}
          </Typography.Body>
          <Icon icon="arrow-right" size="large" intent={disabled ? 'disabled-text' : 'primary'} />
        </Box>
      </TouchableOpacity>
    </Box>
  </Box>
);
