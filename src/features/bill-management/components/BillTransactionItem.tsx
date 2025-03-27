import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Tag, Typography, useTheme } from '@hero-design/rn';
import type { SupportedCurrency } from '../../../common/utils/numbers';
import { createCurrencyFormatter } from '../../../common/utils/numbers';
import type { BillStatus } from '../../../new-graphql/generated';
import { getTagIntentByStatus } from '../types';

type BillTransactionItemProps = {
  title: string;
  description: string;
  amount: number;
  status?: BillStatus;
  currency: SupportedCurrency;
  onPress?: () => void;
};

export const BillTransactionItem = ({
  amount,
  currency,
  description,
  onPress = () => {},
  status,
  title,
}: BillTransactionItemProps) => {
  const formatCurrency = createCurrencyFormatter();
  const { space } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: space.medium }}>
      <Box flexDirection="row" justifyContent="space-between">
        <Typography.Body numberOfLines={2} style={{ flex: 1, marginRight: space.medium }} variant="regular-bold">
          {title}
        </Typography.Body>
        <Typography.Body variant="regular-bold">{formatCurrency(amount, { currency })}</Typography.Body>
      </Box>
      <Box marginTop="smallMedium" flexDirection="row" justifyContent="space-between">
        <Typography.Caption style={{ flex: 1, marginRight: space.medium }} intent="subdued">
          {description}
        </Typography.Caption>
        <Box>
          {status ? <Tag testID="bill-card-status" intent={getTagIntentByStatus(status)} content={status} /> : null}
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
