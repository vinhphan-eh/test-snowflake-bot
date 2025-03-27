import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import type { GlobalSystemPalette } from '@hero-design/rn/types/theme/global/colors/types';
import Collapse from '../../../../../../common/components/collapse';
import { useMixpanel } from '../../../../../../common/hooks/useMixpanel';
import { EventTrackingCategory } from '../../../../../../common/stores/useSessionStore';
import { formatRelativeDate } from '../../../../../../common/utils/date';
import { createCurrencyFormatter, formatToBSBValue } from '../../../../../../common/utils/numbers';
import type { CashbackTransaction, TransactionMeta } from '../../../../../../new-graphql/generated';
import { TransactionRecordType, TransactionState } from '../../../../../../new-graphql/generated';
import { useIntl } from '../../../../../../providers/LocalisationProvider';
import type { LocaleMessageID } from '../../../../../../providers/LocalisationProvider/constants';
import { CASHBACK_MODULE, CLICK_DROPDOWN_ICON } from '../../../../cash-back/card-link-offers/constants/mixpanel';

export interface TransactionListItemProps {
  transaction: CashbackTransaction;
}

const transactionStateToStatus: Record<TransactionState, LocaleMessageID> = {
  [TransactionState.Clear]: 'common.confirmed',
  [TransactionState.Settled]: 'common.confirmed',
  [TransactionState.Pending]: 'common.pending',
  [TransactionState.Reversed]: 'common.rejected',
  [TransactionState.Unknown]: 'common.rejected',
};

const transactionStateToBgColor: Record<TransactionState, keyof GlobalSystemPalette> = {
  [TransactionState.Clear]: 'mutedSuccess',
  [TransactionState.Settled]: 'mutedSuccess',
  [TransactionState.Pending]: 'mutedWarning',
  [TransactionState.Reversed]: 'mutedError',
  [TransactionState.Unknown]: 'mutedError',
};

const transactionStateToMoreInfo: Record<TransactionState, LocaleMessageID> = {
  [TransactionState.Clear]: 'benefits.cashback.goodNews',
  [TransactionState.Settled]: 'benefits.cashback.goodNews',
  [TransactionState.Pending]: 'benefits.cashback.eligibleMessage',
  [TransactionState.Reversed]: 'benefits.cashback.rejectedMessage',
  [TransactionState.Unknown]: 'benefits.cashback.rejectedMessage',
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
  const { formatMessage } = useIntl();
  const isWithdraw = recordType === TransactionRecordType.Out;

  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        borderRadius="xlarge"
        bgColor={isWithdraw ? 'info' : transactionStateToBgColor[state]}
        paddingVertical="xsmall"
        paddingHorizontal="smallMedium"
        flexDirection="row"
        alignItems="center"
        marginTop="small"
      >
        <Typography.Caption>
          {isWithdraw ? formatMessage({ id: 'common.paid' }) : formatMessage({ id: transactionStateToStatus[state] })}
        </Typography.Caption>
        <Icon icon={isOpen ? 'arrow-up' : 'arrow-down'} size="small" style={{ marginLeft: space.xsmall }} />
      </Box>
    </TouchableOpacity>
  );
};

const TransactionListItem = ({ transaction }: TransactionListItemProps) => {
  const { advertiserName, amount, meta, purchaseAmount, recordType, state } = transaction;
  const { formatMessage } = useIntl();
  const { space } = useTheme();
  const [isOpen, setOpen] = useState(false);
  const isWithdraw = recordType === TransactionRecordType.Out;
  const { eventTracking } = useMixpanel();
  const formatCurrency = createCurrencyFormatter();

  return (
    <Box backgroundColor="defaultGlobalSurface">
      <Box
        flexDirection="row"
        paddingVertical="smallMedium"
        paddingHorizontal="medium"
        accessibilityRole="menuitem"
        testID={`cashback-transaction-${transaction.id}`}
      >
        <Box flex={1}>
          <Typography.Body variant="regular-bold">
            {isWithdraw ? formatMessage({ id: 'benefits.cashback.sendToSwagSpendAccount' }) : advertiserName}
          </Typography.Body>
          <Typography.Caption style={{ marginTop: space.small }} intent="subdued">
            {isWithdraw ? getWithdrawalInfo(meta) : getCashbackInfo(amount, purchaseAmount)}
          </Typography.Caption>
          <Typography.Caption style={{ marginTop: space.small }} intent="subdued">
            {formatRelativeDate(new Date(transaction.created))}
          </Typography.Caption>
        </Box>
        <Box alignItems="flex-end">
          <Typography.Body variant="regular-bold">{formatCurrency(amount)}</Typography.Body>
          {purchaseAmount ? (
            <Typography.Caption intent="subdued" style={{ marginTop: space.small }}>
              {formatMessage({ id: 'benefits.cashback.qualifyingAmount' })} {formatCurrency(purchaseAmount)}
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
            ? formatMessage({ id: 'benefits.cashback.withdrawMessage' })
            : formatMessage({ id: transactionStateToMoreInfo[state] })}
        </Typography.Caption>
      </Collapse>
    </Box>
  );
};

export { TransactionListItem };
