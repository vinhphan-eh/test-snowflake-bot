import React from 'react';
import type { StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';
import { Dimensions, Pressable, Image } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import { scale } from '../../../../common/utils/layout';

export type PromoteWidgetProps = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  testID?: string;
  accessibilityLabel?: string;
  title: string;
  subTitle: string;
  imgSrc: ImageSourcePropType;
};
const { width: screenWidth } = Dimensions.get('screen');
const imgSize = scale(106, 'width');

export const PromoteWidget = ({
  accessibilityLabel,
  imgSrc,
  onPress,
  style,
  subTitle,
  testID,
  title,
}: PromoteWidgetProps) => {
  const { colors, radii, space } = useTheme();
  // based on figma
  const nextCardExposedPercentage = 34 / 328;
  const cardWidth = (screenWidth - space.medium - space.smallMedium) * (1 - nextCardExposedPercentage);

  return (
    <Pressable
      onPress={onPress}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        {
          width: cardWidth,
          alignSelf: 'baseline',
          flexDirection: 'row',
          borderRadius: radii.xlarge,
          backgroundColor: pressed ? colors.decorativePrimary : colors.decorativePrimarySurface,
          padding: space.small,
        },
        style,
      ]}
    >
      <Image style={{ width: imgSize, height: imgSize }} source={imgSrc} resizeMode="contain" />
      <Box marginLeft="smallMedium" marginRight="small" flexGrow={1} flexShrink={1} justifyContent="center">
        <Typography.Body
          accessibilityLabel={title}
          style={{ flexShrink: 1 }}
          numberOfLines={2}
          variant="regular-bold"
          typeface="playful"
        >
          {title}
        </Typography.Body>
        <Typography.Caption
          accessibilityLabel={subTitle}
          numberOfLines={1}
          style={{ marginTop: space.small, flexShrink: 1 }}
          intent="subdued"
        >
          {subTitle}
        </Typography.Caption>
      </Box>
      <Icon testID="arrow-right" style={{ alignSelf: 'center' }} icon="arrow-right" intent="primary" />
    </Pressable>
  );
};
