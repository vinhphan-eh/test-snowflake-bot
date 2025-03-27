import React from 'react';
import { Pressable } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import dayjs from 'dayjs';
import { createCurrencyFormatter } from '../../../common/utils/numbers';
import type { DrawerTransaction } from '../types';

export const TRANSACTION_TIME_FORMAT = 'hh:mma';

export interface TransactionListItemProps {
  transaction: DrawerTransaction;
}

const TransactionListItem = ({ transaction }: TransactionListItemProps) => {
  const { space } = useTheme();
  const { currencyAmount, dateTimeUTC, transferPeerDetails } = transaction;

  const dateFormatted = dayjs(dateTimeUTC).format(TRANSACTION_TIME_FORMAT);
  const formatCurrency = createCurrencyFormatter();
  const amountFormatted = formatCurrency(Math.abs(currencyAmount.amount));
  const showNegative = currencyAmount.amount < 0;

  return (
    <Pressable
      style={{ flexDirection: 'row', paddingVertical: space.smallMedium, paddingHorizontal: space.medium }}
      accessibilityRole="menuitem"
    >
      <Box flex={1} marginRight="medium">
        <Typography.Body variant="regular" numberOfLines={1} ellipsizeMode="tail">
          {transferPeerDetails.name}
        </Typography.Body>
        <Typography.Caption style={{ marginTop: space.xsmall }} intent="subdued">
          {dateFormatted}
        </Typography.Caption>
      </Box>
      <Box justifyContent="center">
        <Typography.Body variant="regular" intent="body">
          <Typography.Body variant="regular" intent={showNegative ? 'danger' : 'success'}>
            {`${showNegative ? '-' : '+'}`}
          </Typography.Body>
          {amountFormatted}
        </Typography.Body>
      </Box>
    </Pressable>
  );
};

export { TransactionListItem };
