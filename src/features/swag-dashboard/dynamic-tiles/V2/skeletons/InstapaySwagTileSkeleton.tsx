import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Skeleton, useTheme } from '@hero-design/rn';
import { scale } from '../../../../../common/utils/layout';

type InstapaySwagTileSkeletonProps = {
  testID?: string;
  style?: StyleProp<ViewStyle>;
};

const imgWidth = scale(171, 'width');
const imgHeight = (imgWidth * 144) / 171;

export const InstapaySwagTileSkeleton = ({ style, testID }: InstapaySwagTileSkeletonProps) => {
  const { lineHeights, space } = useTheme();
  return (
    <Box style={style} testID={testID}>
      <Skeleton style={{ width: imgWidth, height: imgHeight, overflow: 'hidden' }} variant="rounded" />
      <Skeleton
        style={{ width: imgWidth * 0.9, height: lineHeights.medium, marginTop: space.small }}
        variant="rectangular"
      />
      <Skeleton
        style={{ width: imgWidth * 0.3, height: lineHeights.small, marginTop: space.small }}
        variant="rectangular"
      />
    </Box>
  );
};
