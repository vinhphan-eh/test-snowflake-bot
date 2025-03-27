import React from 'react';
import { Box, Typography, useTheme } from '@hero-design/rn';

type CategoryBadgeProps = { text: string };

const CategoryBadge = ({ text }: CategoryBadgeProps) => {
  const { colors, radii, space } = useTheme();
  return (
    <Box
      style={{
        padding: space.xsmall,
        borderRadius: radii.base,
        backgroundColor: colors.decorativePrimarySurface,
      }}
    >
      <Typography.Body intent="primary" variant="small-bold" style={{ marginHorizontal: space.small }}>
        {text.toUpperCase()}
      </Typography.Body>
    </Box>
  );
};

export default CategoryBadge;
