import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Skeleton, useTheme } from '@hero-design/rn';
import { scale } from '../../../../../common/utils/layout';

export type BillOfferCarouselItemSkeletonProps = {
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const BillOfferCarouselItemSkeleton = ({ style, testID }: BillOfferCarouselItemSkeletonProps) => {
  const { lineHeights, space } = useTheme();
  const imgWidth = scale(140, 'width');
  const imgHeight = (imgWidth * 96) / 140;

  return (
    <Box style={style} testID={testID}>
      <Skeleton style={{ width: imgWidth, height: imgHeight, overflow: 'hidden' }} variant="rounded" />
      <Skeleton
        style={{ width: imgWidth * 0.9, height: lineHeights.medium, marginTop: space.small }}
        variant="rectangular"
      />
      <Skeleton
        style={{ width: imgWidth * 0.6, height: lineHeights.medium, marginTop: space.xsmall }}
        variant="rectangular"
      />
      <Skeleton
        style={{ width: imgWidth * 0.8, height: lineHeights.small, marginTop: space.small }}
        variant="rectangular"
      />
    </Box>
  );
};
