import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';

export type SliderCardProps = {
  title: string;
  description: string;
  onPress?: () => void;
  width?: number;
  style?: StyleProp<ViewStyle>;
  hideIcon?: boolean;
};

const { width: screenWidth } = Dimensions.get('screen');

export const SliderCard = ({ description, hideIcon = false, onPress, style, title, width }: SliderCardProps) => {
  const { colors, radii, space } = useTheme();
  // based on figma
  const cardWidth = (screenWidth - space.medium - space.small) / 2 + space.small;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={!onPress}
      onPress={onPress}
      style={[
        {
          width: width ?? cardWidth,
          padding: space.smallMedium,
          backgroundColor: colors.defaultGlobalSurface,
          borderRadius: radii.xlarge,
          justifyContent: 'space-between',
        },

        style,
      ]}
    >
      <Box alignItems="center" flexDirection="row" justifyContent="space-between">
        <Typography.Body variant="small-bold">{title}</Typography.Body>
        {hideIcon ? null : <Icon intent="primary" icon="circle-question" size="xsmall" />}
      </Box>
      <Typography.Caption>{description}</Typography.Caption>
    </TouchableOpacity>
  );
};
