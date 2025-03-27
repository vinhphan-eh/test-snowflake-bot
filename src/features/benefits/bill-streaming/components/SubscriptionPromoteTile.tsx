import React from 'react';
import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import { Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';

type SubscriptionPromoteTileProps = {
  style?: StyleProp<ViewStyle>;
  coverImg: ImageSourcePropType;
  logoImg: ImageSourcePropType;
  title: string;
  supplier: string;
  testID?: string;
  onPress: () => void;
};

const LOGO_SIZE = 72;
// 1.8 is figma ratio
const COVER_HEIGHT = LOGO_SIZE * 1.8;

export const SubscriptionPromoteTile = ({
  coverImg,
  logoImg,
  onPress,
  style = {},
  supplier,
  testID,
  title,
}: SubscriptionPromoteTileProps) => {
  const { radii, shadows, space } = useTheme();

  return (
    <TouchableOpacity testID={testID} onPress={onPress} activeOpacity={0.5} style={[shadows.default, style]}>
      <Box borderRadius="xlarge" style={{ overflow: 'hidden' }}>
        <ImageBackground
          accessibilityLabel="Subscription Cover"
          resizeMode="cover"
          style={{ width: '100%', height: COVER_HEIGHT, justifyContent: 'flex-end' }}
          source={coverImg}
        >
          <Image
            accessibilityLabel="Subscription Logo"
            resizeMode="contain"
            style={{
              width: LOGO_SIZE,
              height: LOGO_SIZE,
              borderRadius: radii.medium,
              marginLeft: space.small,
              marginBottom: space.small,
            }}
            source={logoImg}
          />
        </ImageBackground>
        <Box alignItems="center" padding="medium" backgroundColor="defaultGlobalSurface" flexDirection="row">
          <Box justifyContent="space-between" flex={1} marginRight="xsmall">
            <Typography.Title numberOfLines={2} accessibilityLabel="Subscription Title" level="h6">
              {title}
            </Typography.Title>
            <Typography.Body accessibilityLabel="Subscription Supplier" variant="small-bold">
              {supplier}
            </Typography.Body>
          </Box>
          <Icon intent="primary" size="xsmall" icon="arrow-rightwards" />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
