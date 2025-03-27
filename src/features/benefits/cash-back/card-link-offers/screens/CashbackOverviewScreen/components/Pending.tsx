import React from 'react';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { CurrencyText } from '../../../../../../../common/components/currency-text/CurrencyText';

interface PendingProps {
  amount: number;
}
export const Pending = ({ amount }: PendingProps) => {
  const { space } = useTheme();
  return (
    <Box flex={1}>
      <Box bgColor="warningSurface" padding="medium" borderRadius="xlarge">
        <Typography.Body variant="small" intent="warning">
          Pending
        </Typography.Body>
        <CurrencyText amount={amount} styleProps={{ marginTop: space.small }} />
        <Typography.Caption style={{ marginTop: space.small }} intent="subdued">
          Confirming eligibility
        </Typography.Caption>
      </Box>
    </Box>
  );
};
