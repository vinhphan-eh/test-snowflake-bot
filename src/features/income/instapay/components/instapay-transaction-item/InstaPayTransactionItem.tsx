import React from 'react';
import { Box, Typography } from '@hero-design/rn';
import dayjs from 'dayjs';
import { D_MMM_YYYY_HH_MMA } from '../../../../../common/constants/date';
import {
  getDefaultCurrency,
  getFloatAmountFromMoney,
  getFloatAmountFromMoneyV2,
} from '../../../../../common/utils/currency';
import { createCurrencyFormatter } from '../../../../../common/utils/numbers';
import { useInstaPayDrawdownStore } from '../../stores/useInstaPayDrawdownStore';
import type { TransactionItem } from '../../types/transaction';

interface RowProp {
  isFirst?: boolean;
  label?: string;
  value?: string | number;
}

const Row = ({ isFirst, label, value }: RowProp) => {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      style={{
        gap: 20,
      }}
      marginTop={isFirst ? undefined : 'smallMedium'}
    >
      <Typography.Body variant="small">{label}</Typography.Body>
      <Typography.Body variant="regular" numberOfLines={1} ellipsizeMode="tail" style={{ flex: 1, textAlign: 'right' }}>
        {value}
      </Typography.Body>
    </Box>
  );
};

interface InstaPayTransactionItemProps {
  data: TransactionItem;
}

export const InstaPayTransactionItem = ({ data }: InstaPayTransactionItemProps) => {
  const memberWorkCountry = useInstaPayDrawdownStore(state => state.workCountry);

  const createdTime = dayjs(data.createdAt).format(D_MMM_YYYY_HH_MMA);
  const formatCurrency = createCurrencyFormatter();
  const currency = getDefaultCurrency(memberWorkCountry);
  const amount = getFloatAmountFromMoney(data.amount);
  const adminFee = getFloatAmountFromMoneyV2(data.adminFee);
  return (
    <Box flex={1}>
      <Box flexDirection="row" paddingHorizontal="medium" paddingVertical="small" backgroundColor="infoSurface">
        <Typography.Body variant="small">{createdTime}</Typography.Body>
      </Box>
      <Box paddingHorizontal="medium" marginTop="medium">
        <Row isFirst label="Amount" value={formatCurrency(amount, { currency })} />
        <Row label="Admin fee" value={formatCurrency(adminFee, { currency })} />
        <Row label="Ref ID" value={data.abaLodgementReference} />
        <Row label="Employer" value={data.orgName} />
      </Box>
    </Box>
  );
};
