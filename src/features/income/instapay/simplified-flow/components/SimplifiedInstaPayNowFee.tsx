import React from 'react';
import { Box, Typography } from '@hero-design/rn';
import { getDefaultCurrency } from '../../../../../common/utils/currency';
import { createCurrencyFormatter } from '../../../../../common/utils/numbers';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { useGetFreeTransactionProgress } from '../../hooks/useGetFreeTransactionProgress';
import type { FormattedInstapayBankAccount } from '../../hooks/useInstapayBankOptions';
import { useInstaPayDrawdownStore } from '../../stores/useInstaPayDrawdownStore';
import {
  calculateFeeByPercentage,
  calculateFeeByPercentageWithFreeAmount,
} from '../../utils/calculate-fee-by-percentage';

type SimplifiedInstaPayNowFeeProps = {
  bankAccount: FormattedInstapayBankAccount;
  amount: number;
  skipFreeFee?: boolean;
  showAbsoluteFee?: boolean;
};

export const SimplifiedInstaPayNowFee = ({
  amount,
  bankAccount,
  showAbsoluteFee = true,
  skipFreeFee = false,
}: SimplifiedInstaPayNowFeeProps) => {
  const memberWorkCountry = useInstaPayDrawdownStore(state => state.workCountry);
  const currency = getDefaultCurrency(memberWorkCountry);
  const formatCurrency = createCurrencyFormatter();
  const { formatMessage } = useIntl();
  const fee = bankAccount.feeV2 ? calculateFeeByPercentage(amount, bankAccount) : undefined;
  const percentageFee = bankAccount.feeV2.percentage ?? 0;
  const { applyFreeFee, maxTransactionThreshold } = useGetFreeTransactionProgress();

  if (!fee && fee !== 0) {
    return null;
  }

  let feeWithFreeAmount;

  if (!skipFreeFee && applyFreeFee && maxTransactionThreshold) {
    feeWithFreeAmount = calculateFeeByPercentageWithFreeAmount({
      amount,
      bankAccount,
      maxTransactionThreshold,
    });
  }

  const finalFee = feeWithFreeAmount?.finalFee ?? fee;

  const renderFeeExplanation = () => {
    if (finalFee !== 0) {
      return (
        <Typography.Caption intent="subdued">
          {formatMessage(
            { id: 'instapay.now.bankAccount.feeExplanation' },
            { percentage: percentageFee.toLocaleString() }
          )}
        </Typography.Caption>
      );
    }

    return (
      <Typography.Caption intent="subdued">
        {formatMessage({ id: 'instapay.now.free-transaction.feeExplanation' })}
      </Typography.Caption>
    );
  };

  return (
    <Box display="flex" alignItems="flex-end" justifyContent="space-between" flex={1}>
      {showAbsoluteFee && (
        <Box marginTop="xsmall" flexDirection="row">
          {!!feeWithFreeAmount?.originalFee && feeWithFreeAmount?.finalFee !== 0 && (
            <Typography.Caption intent="subdued" style={{ textDecorationLine: 'line-through' }}>
              {formatCurrency(feeWithFreeAmount.originalFee, { currency })}{' '}
            </Typography.Caption>
          )}
          <Typography.Caption fontWeight="semi-bold">
            {formatMessage({ id: 'instapay.now.bankAccount.fee' }, { amount: formatCurrency(finalFee, { currency }) })}
          </Typography.Caption>
        </Box>
      )}
      <Box>{renderFeeExplanation()}</Box>
    </Box>
  );
};
