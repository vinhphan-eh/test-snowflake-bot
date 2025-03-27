import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, useTheme } from '@hero-design/rn';
import { InstapaySwagTileSkeleton } from './InstapaySwagTileSkeleton';

type InstapaySwagCarouselSkeletonProps = {
  testID?: string;
  style?: StyleProp<ViewStyle>;
};

export const InstapaySwagCarouselSkeleton = ({ style, testID }: InstapaySwagCarouselSkeletonProps) => {
  const { space } = useTheme();

  return (
    <Box testID={testID} style={style}>
      <Box style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: space.medium }}>
        <InstapaySwagTileSkeleton style={{ marginRight: space.medium }} />
        <InstapaySwagTileSkeleton />
      </Box>
    </Box>
  );
};
