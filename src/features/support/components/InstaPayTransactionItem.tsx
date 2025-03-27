import React, { useMemo } from 'react';
import { Box, Typography } from '@hero-design/rn';
import dayjs from 'dayjs';
import { getCurrencyFromCurrencyType, getFloatAmountFromMoney } from '../../../common/utils/currency';
import { createCurrencyFormatter } from '../../../common/utils/numbers';
import { CurrencyType, type InstapayTransaction } from '../../../new-graphql/generated';
import { useIntl } from '../../../providers/LocalisationProvider';
import { Region } from '../../../providers/LocalisationProvider/constants';
import { useInstaPayDrawdownStore } from '../../income/instapay/stores/useInstaPayDrawdownStore';

type InstaPayTransactionItemProps = {
  transaction: InstapayTransaction;
  index: number;
};

export const InstaPayTransactionItem = ({ index, transaction }: InstaPayTransactionItemProps) => {
  const { formatMessage } = useIntl();

  const createdTime = dayjs(transaction.createdAt).format('D MMM YYYY, hh:mmA');
  const formatCurrency = createCurrencyFormatter();
  const currency = getCurrencyFromCurrencyType(transaction?.amount?.type ?? CurrencyType.CurrencyTypeAud);
  const amount = getFloatAmountFromMoney(transaction.amount);
  const payType = transaction.abaLodgementReference.startsWith('IP')
    ? formatMessage({ id: 'support.instapayHistory.instapayNow' })
    : formatMessage({ id: 'support.instapayHistory.instapayDaily' });

  // Temporary approach to define whether to render label as Sort code or BSB
  const memberWorkCountry = useInstaPayDrawdownStore(state => state.workCountry);
  const codeLabel = useMemo(() => {
    switch (memberWorkCountry) {
      case Region.gb:
        return formatMessage({ id: 'support.instapayHistory.transaction.sortCode' });
      default:
        return formatMessage({ id: 'support.instapayHistory.transaction.bsb' });
    }
  }, [memberWorkCountry]);

  return (
    <Box flex={1} testID={`instapay-transaction-${index}`}>
      <Box
        flexDirection="row"
        paddingHorizontal="medium"
        paddingVertical="small"
        backgroundColor="neutralGlobalSurface"
        justifyContent="space-between"
      >
        <Typography.Body>{payType}</Typography.Body>
        <Typography.Body>{createdTime}</Typography.Body>
      </Box>
      <Box paddingHorizontal="medium" marginTop="medium" flexDirection="row" justifyContent="space-between">
        <Typography.Body intent="subdued">
          {formatMessage({ id: 'support.instapayHistory.transaction.amount' })}
        </Typography.Body>
        <Typography.Body>{formatCurrency(amount, { currency })}</Typography.Body>
      </Box>
      <Box paddingHorizontal="medium" marginTop="medium" flexDirection="row" justifyContent="space-between">
        <Typography.Body intent="subdued">
          {formatMessage({ id: 'support.instapayHistory.transaction.account' })}
        </Typography.Body>
        <Typography.Body>{transaction.bankAccount?.accountName}</Typography.Body>
      </Box>
      <Box paddingHorizontal="medium" marginTop="medium" flexDirection="row" justifyContent="space-between">
        <Typography.Body intent="subdued">{codeLabel}</Typography.Body>
        <Typography.Body>{transaction.bankAccount?.bsb}</Typography.Body>
      </Box>
      <Box paddingHorizontal="medium" marginTop="medium" flexDirection="row" justifyContent="space-between">
        <Typography.Body intent="subdued">
          {formatMessage({ id: 'support.instapayHistory.transaction.reference' })}
        </Typography.Body>
        <Typography.Body>{transaction?.abaLodgementReference}</Typography.Body>
      </Box>
    </Box>
  );
};
