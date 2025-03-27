import React from 'react';
import { Box, Typography } from '@hero-design/rn';
import type { SupportedCurrency } from '../../../common/utils/numbers';
import { createCurrencyFormatter } from '../../../common/utils/numbers';

export interface TransactionListSectionHeaderProps {
  title: string;
  total: number;
  currency: SupportedCurrency;
}

const TransactionListSectionHeader = ({ currency, title, total }: TransactionListSectionHeaderProps) => {
  const formatCurrency = createCurrencyFormatter();
  const amountFormatted = formatCurrency(Math.abs(total), { currency });
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
