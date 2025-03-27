import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Dimensions } from 'react-native';
import { Skeleton, useTheme } from '@hero-design/rn';
import { scale } from '../../../../../common/utils/layout';

type PromoteWidgetSkeletonProps = {
  style?: StyleProp<ViewStyle>;
};

const { width: screenWidth } = Dimensions.get('screen');
const imgSize = scale(106, 'width');

export const PromoteWidgetSkeleton = ({ style }: PromoteWidgetSkeletonProps) => {
  const { radii, space } = useTheme();
  const nextCardExposedPercentage = 34 / 328;
  const width = (screenWidth - space.medium - space.smallMedium) * (1 - nextCardExposedPercentage);
  const height = imgSize + space.small * 2;

  return (
    <Skeleton
      style={[{ width, height, borderRadius: radii.xlarge, overflow: 'hidden' }, style]}
      variant="rectangular"
    />
  );
};
