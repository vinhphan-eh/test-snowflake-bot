import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Skeleton, useTheme } from '@hero-design/rn';

type GroupItemSkeletonProps = {
  style?: StyleProp<ViewStyle>;
};

export const GroupItemSkeleton = ({ style }: GroupItemSkeletonProps) => {
  const { radii } = useTheme();
  const width = 265;
  const height = 200;

  return (
    <Skeleton
      style={[{ width, height, borderRadius: radii.xlarge, overflow: 'hidden' }, style]}
      variant="rectangular"
    />
  );
};
