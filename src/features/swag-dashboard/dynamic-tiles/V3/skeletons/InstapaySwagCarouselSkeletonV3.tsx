import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, useTheme } from '@hero-design/rn';
import { InstapaySwagTileSkeletonV3 } from './InstapaySwagTileSkeletonV3';

type InstapaySwagCarouselSkeletonV3Props = {
  testID?: string;
  style?: StyleProp<ViewStyle>;
};

export const InstapaySwagCarouselSkeletonV3 = ({ style, testID }: InstapaySwagCarouselSkeletonV3Props) => {
  const { space } = useTheme();

  return (
    <Box testID={testID} style={style}>
      <Box style={{ display: 'flex', flexDirection: 'row' }}>
        <InstapaySwagTileSkeletonV3 style={{ marginRight: space.small }} />
        <InstapaySwagTileSkeletonV3 />
      </Box>
    </Box>
  );
};
