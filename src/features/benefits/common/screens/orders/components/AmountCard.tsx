import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import type { BodyProps } from '@hero-design/rn/types/components/Typography/Body';
import { CurrencyText } from '../../../../../../common/components/currency-text/CurrencyText';

interface AmountCardProps {
  amount: number;
  title: string;
  titleIntent: BodyProps['intent'];
  subtitle: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}
export const AmountCard = ({ amount, disabled, style, subtitle, title, titleIntent }: AmountCardProps) => {
  const { space } = useTheme();

  return (
    <Box
      bgColor="defaultGlobalSurface"
      paddingLeft="medium"
      paddingVertical="medium"
      borderRadius="xlarge"
      style={[{ opacity: disabled ? 0.8 : 1 }, style]}
    >
      <Typography.Body variant="small-bold" intent={titleIntent} style={{ marginBottom: space.small }}>
        {title}
      </Typography.Body>
      <CurrencyText amount={amount} disabled={disabled} />
      <Typography.Caption style={{ marginTop: space.small }} intent="subdued">
        {subtitle}
      </Typography.Caption>
    </Box>
  );
};
