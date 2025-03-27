import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Skeleton, useTheme } from '@hero-design/rn';

export type ProductItemSkeletonProps = {
  style?: StyleProp<ViewStyle>;
  testID?: string;
  imgWidth: number;
  imgHeight: number;
};

export const ProductItemSkeleton = ({ imgHeight, imgWidth, style, testID }: ProductItemSkeletonProps) => {
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
