import React from 'react';
import { Box, Typography } from '@hero-design/rn';
import { formatPoints } from '../../../common/utils/numbers';

export interface TransactionListSectionHeaderProps {
  title: string;
  total: number;
}

const TransactionListSectionHeader = ({ title, total }: TransactionListSectionHeaderProps) => {
  const amountFormatted = formatPoints(Math.abs(total), { includeSymbol: true });
  const showNegative = total < 0;

  return (
    <Box
      paddingVertical="small"
      paddingHorizontal="medium"
      backgroundColor="decorativePrimarySurface"
      flex={1}
      flexDirection="row"
      justifyContent="space-between"
    >
      <Typography.Caption>{title}</Typography.Caption>
      <Typography.Caption>{`${showNegative ? '-' : ''}${amountFormatted}`}</Typography.Caption>
    </Box>
  );
};

export { TransactionListSectionHeader };
