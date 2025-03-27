import React from 'react';
import { Box, Skeleton, useTheme } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';

export const OfferSkeleton = (props: BoxProps) => {
  const { lineHeights, space } = useTheme();
  return (
    <Box flexDirection="row" padding="medium" borderRadius="large" backgroundColor="defaultGlobalSurface" {...props}>
      <Skeleton style={{ width: 88, height: 88, marginRight: space.medium }} variant="rectangular" />
      <Box flex={1}>
        <Skeleton style={{ width: '30%', height: lineHeights.small }} />
        <Skeleton style={{ width: '70%', height: lineHeights.xlarge, marginTop: space.small }} />
        <Skeleton style={{ width: '20%', height: lineHeights.small, marginTop: space.small }} />
      </Box>
    </Box>
  );
};
