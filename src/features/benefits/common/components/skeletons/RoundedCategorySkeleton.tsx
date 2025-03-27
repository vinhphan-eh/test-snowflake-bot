import React from 'react';
import { Box, Skeleton, useTheme } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';

export const RoundedCategorySkeleton = (props: BoxProps) => {
  const { lineHeights, space } = useTheme();
  return (
    <Box {...props}>
      <Skeleton intent="dark" variant="circular" style={{ width: 56, height: 56, overflow: 'hidden' }} />
      <Skeleton intent="dark" style={{ height: lineHeights.small, marginTop: space.smallMedium }} />
    </Box>
  );
};
