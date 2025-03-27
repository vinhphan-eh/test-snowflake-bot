import React from 'react';
import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { Box, useTheme } from '@hero-design/rn';
import { InstapaySwagTileSkeletonV3 } from './skeletons/InstapaySwagTileSkeletonV3';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export type InstapaySwagTileBaseV3Props = {
  imgContent?: React.ReactNode;
  imgSrc?: ImageSourcePropType;
  isLoading: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  imgWidth?: number;
};

export const InstapaySwagTileBaseV3 = ({
  imgContent,
  imgSrc,
  imgWidth: propImgWidth,
  isLoading,
  onPress,
  style,
  testID,
}: InstapaySwagTileBaseV3Props) => {
  const { borderWidths, radii, space } = useTheme();

  // Calculate total horizontal space taken by wrapper
  const totalHorizontalSpace =
    2 * space.smallMedium + // TilesWrapper marginHorizontal
    2 * space.small + // TilesWrapper padding
    2 * borderWidths.medium; // TilesWrapper border

  // Calculate width for two tiles plus the space between them
  const availableWidth = SCREEN_WIDTH - totalHorizontalSpace;

  // Calculate width for a single tile
  const calculatedImgWidth = (availableWidth - space.small) / 2;

  const imgWidth = propImgWidth || calculatedImgWidth;
  const imgHeight = Math.floor((imgWidth * 144) / 171);

  if (isLoading) {
    return <InstapaySwagTileSkeletonV3 testID={`${testID}-skeleton`} />;
  }

  return (
    <TouchableOpacity testID={testID} onPress={onPress} activeOpacity={0.5} style={[{ width: imgWidth }, style]}>
      <Box style={{ width: imgWidth, height: imgHeight, borderRadius: radii.xlarge, overflow: 'hidden' }}>
        {imgSrc ? (
          <ImageBackground
            accessibilityLabel="Product Image"
            resizeMode="cover"
            style={{
              width: imgWidth,
              height: imgHeight,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            source={imgSrc}
          >
            {imgContent}
          </ImageBackground>
        ) : null}
      </Box>
    </TouchableOpacity>
  );
};
