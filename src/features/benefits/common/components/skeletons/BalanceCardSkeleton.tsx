import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Dimensions } from 'react-native';
import { Box, Skeleton, useTheme } from '@hero-design/rn';

type BalanceCardSkeletonProps = {
  style?: StyleProp<ViewStyle>;
  testID?: string;
};
const { width: screenWidth } = Dimensions.get('window');
export const BalanceCardSkeleton = ({ style, testID }: BalanceCardSkeletonProps) => {
  const { radii, space } = useTheme();
  return (
    <Box
      style={[
        {
          width: (screenWidth - space.medium * 2 - space.small) / 3,
          height: space.large,
          marginTop: space.small,
          marginRight: space.small,
        },
        style,
      ]}
    >
      <Skeleton
        style={[
          {
            borderRadius: radii.medium,
            overflow: 'hidden',
          },
        ]}
        testID={`${testID} skeleton`}
      />
    </Box>
  );
};
