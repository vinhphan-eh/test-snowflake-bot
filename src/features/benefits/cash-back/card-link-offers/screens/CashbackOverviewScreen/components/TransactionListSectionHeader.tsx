import React from 'react';
import { Box, Typography } from '@hero-design/rn';

export interface TransactionListSectionHeaderProps {
  title: string;
}

const TransactionListSectionHeader = ({ title }: TransactionListSectionHeaderProps) => {
  return (
    <Box paddingVertical="small" paddingHorizontal="medium" backgroundColor="decorativePrimarySurface">
      <Typography.Caption>{title}</Typography.Caption>
    </Box>
  );
};

export { TransactionListSectionHeader };
