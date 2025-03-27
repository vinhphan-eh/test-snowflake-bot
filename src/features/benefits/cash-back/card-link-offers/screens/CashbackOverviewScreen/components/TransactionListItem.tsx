import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import type { GlobalSystemPalette } from '@hero-design/rn/types/theme/global/colors/types';
import Collapse from '../../../../../../../common/components/collapse';
import { useMixpanel } from '../../../../../../../common/hooks/useMixpanel';
import { EventTrackingCategory } from '../../../../../../../common/stores/useSessionStore';
import { formatToBSBValue, createCurrencyFormatter } from '../../../../../../../common/utils/numbers';
import type { CashbackTransaction, TransactionMeta } from '../../../../../../../new-graphql/generated';
import { TransactionRecordType, TransactionState } from '../../../../../../../new-graphql/generated';
import { CASHBACK_MODULE, CLICK_DROPDOWN_ICON } from '../../../constants/mixpanel';

export interface TransactionListItemProps {
  transaction: CashbackTransaction;
}

const transactionStateToStatus: Record<TransactionState, string> = {
  [TransactionState.Clear]: 'Confirmed',
  [TransactionState.Settled]: 'Confirmed',
  [TransactionState.Pending]: 'Pending',
  [TransactionState.Reversed]: 'Rejected',
  [TransactionState.Unknown]: 'Rejected',
};

const transactionStateToBgColor: Record<TransactionState, keyof GlobalSystemPalette> = {
  [TransactionState.Clear]: 'mutedSuccess',
  [TransactionState.Settled]: 'mutedSuccess',
  [TransactionState.Pending]: 'mutedWarning',
  [TransactionState.Reversed]: 'mutedError',
  [TransactionState.Unknown]: 'mutedError',
};

const transactionStateToMoreInfo: Record<TransactionState, string> = {
  [TransactionState.Clear]:
    'Good news! Your cashback for this eligible purchase has been processed and will be added to your Confirmed balance.',
  [TransactionState.Settled]:
    'Good news! Your cashback for this eligible purchase has been processed and will be added to your Confirmed balance.',
  [TransactionState.Pending]:
    'Your cashback for this eligible purchase will be processed once the merchant’s returns period lapses.',
  [TransactionState.Reversed]:
    'Your cashback has been rejected as you have either refunded or cancelled your eligible purchase.',
  [TransactionState.Unknown]:
    'Your cashback has been rejected as you have either refunded or cancelled your eligible purchase.',
};

const getWithdrawalInfo = (meta?: TransactionMeta | null): string => {
  // account number format : bsb-last4digit. E.g: 636220-3717
  if (!meta?.accountNumber) {
    return '';
  }
  const [bsb, last4Digits] = meta.accountNumber.split('-');
  let formatBsb = '';
  let formatLast4Digits = '';
  if (bsb) {
    formatBsb = formatToBSBValue(bsb);
  }
  if (last4Digits) {
    formatLast4Digits = `****${last4Digits}`;
  }
  return `${formatBsb} | ${formatLast4Digits}`;
};

const getCashbackInfo = (amount: number, purchaseAmount?: number | null) => {
  if (!purchaseAmount) {
    return '';
  }
  return `Cashback ${Math.round((amount / purchaseAmount) * 100)}%`;
};

interface StatusProps {
  state: TransactionState;
  recordType: TransactionRecordType;
  onPress?: () => void;
  isOpen?: boolean;
}
const Status = ({ isOpen, onPress, recordType, state }: StatusProps) => {
  const { space } = useTheme();
  const isWithDraw = recordType === TransactionRecordType.Out;

  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        borderRadius="xlarge"
        bgColor={isWithDraw ? 'info' : transactionStateToBgColor[state]}
        paddingVertical="xsmall"
        paddingHorizontal="smallMedium"
        flexDirection="row"
        alignItems="center"
        marginTop="small"
      >
        <Typography.Caption>{isWithDraw ? 'Paid' : transactionStateToStatus[state]}</Typography.Caption>
        <Icon icon={isOpen ? 'arrow-up' : 'arrow-down'} size="small" style={{ marginLeft: space.xsmall }} />
      </Box>
    </TouchableOpacity>
  );
};

const TransactionListItem = ({ transaction }: TransactionListItemProps) => {
  const { advertiserName, amount, meta, purchaseAmount, recordType, state } = transaction;
  const { space } = useTheme();
  const [isOpen, setOpen] = useState(false);
  const isWithdraw = recordType === TransactionRecordType.Out;
  const { eventTracking } = useMixpanel();
  const formatCurrency = createCurrencyFormatter();

  return (
    <Box>
      <Box
        flexDirection="row"
        paddingVertical="smallMedium"
        paddingHorizontal="medium"
        accessibilityRole="menuitem"
        testID={`cashback-transaction-${transaction.id}`}
      >
        <Box flex={1}>
          <Typography.Body variant="regular-bold">
            {isWithdraw ? 'Sent to Swag Spend account' : advertiserName}
          </Typography.Body>
          <Typography.Caption style={{ marginTop: space.small }} intent="subdued">
            {isWithdraw ? getWithdrawalInfo(meta) : getCashbackInfo(amount, purchaseAmount)}
          </Typography.Caption>
        </Box>
        <Box alignItems="flex-end">
          <Typography.Body variant="regular-bold">{formatCurrency(amount)}</Typography.Body>
          {purchaseAmount ? (
            <Typography.Caption intent="subdued" style={{ marginTop: space.small }}>
              Qualifying Amount {formatCurrency(purchaseAmount)}
            </Typography.Caption>
          ) : null}
          <Status
            state={state}
            recordType={recordType}
            isOpen={isOpen}
            onPress={() => {
              eventTracking({
                event: CLICK_DROPDOWN_ICON,
                categoryName: EventTrackingCategory.USER_ACTION,
                metaData: {
                  module: CASHBACK_MODULE,
                },
              });
              setOpen(!isOpen);
            }}
          />
        </Box>
      </Box>
      <Collapse open={isOpen}>
        <Typography.Caption style={{ marginHorizontal: space.medium, marginBottom: space.medium }}>
          {isWithdraw
            ? 'It might take a couple of days for your cashback pending balance to arrive in your Swag Spend account. Enjoy your savings!'
            : transactionStateToMoreInfo[state]}
        </Typography.Caption>
      </Collapse>
    </Box>
  );
};

export { TransactionListItem };
