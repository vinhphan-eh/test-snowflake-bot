import React from 'react';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { CurrencyText } from '../../../../../../../common/components/currency-text/CurrencyText';

interface ConfirmProps {
  amount: number;
}
export const Confirm = ({ amount }: ConfirmProps) => {
  const { space } = useTheme();
  return (
    <Box bgColor="successSurface" padding="medium" borderRadius="xlarge" flex={1} marginLeft="medium">
      <Typography.Body variant="small" intent="success">
        Confirmed
      </Typography.Body>
      <CurrencyText amount={amount} styleProps={{ marginTop: space.small }} />
      <Typography.Caption style={{ marginTop: space.small }} intent="subdued">
        Coming your way!
      </Typography.Caption>
    </Box>
  );
};

export const ConfirmDisabled = () => {
  const { space } = useTheme();
  return (
    <Box bgColor="defaultGlobalSurface" padding="medium" borderRadius="xlarge" flex={1} marginLeft="medium">
      <Typography.Body variant="small" intent="archived">
        Confirmed
      </Typography.Body>
      <CurrencyText amount={0} disabled />
      <Typography.Caption style={{ marginTop: space.small }} intent="archived">
        sent to your Account
      </Typography.Caption>
    </Box>
  );
};
