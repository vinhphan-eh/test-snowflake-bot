import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Skeleton } from '@hero-design/rn';
import { scale } from '../../../../../common/utils/layout';

type InstapaySwagTileSkeletonV3Props = {
  testID?: string;
  style?: StyleProp<ViewStyle>;
};

const imgWidth = scale(171, 'width');
const imgHeight = (imgWidth * 144) / 171;

export const InstapaySwagTileSkeletonV3 = ({ style, testID }: InstapaySwagTileSkeletonV3Props) => {
  return (
    <Box style={style} testID={testID}>
      <Skeleton style={{ width: imgWidth, height: imgHeight, overflow: 'hidden' }} variant="rounded" />
    </Box>
  );
};
