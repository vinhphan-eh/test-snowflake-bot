import React from 'react';
import { Box, Button, List, Typography, useTheme } from '@hero-design/rn';
import { getCurrencyFromCurrencyType, getFloatAmountFromMoney } from '../../../common/utils/currency';
import { formatUTCToLocalDateString } from '../../../common/utils/date';
import { createCurrencyFormatter, formatToBSBValue } from '../../../common/utils/numbers';
import { CurrencyType, type ScheduledPayment, type ScheduledPaymentFrequency } from '../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';

type ScheduledPaymentCardProps = { scheduledPayment: ScheduledPayment; onCancel: () => void };

const getDisplayFrequency = (frequency?: ScheduledPaymentFrequency) => {
  switch (frequency) {
    case 'WEEKLY':
      return 'Weekly';
    case 'FORTNIGHTLY':
      return 'Fortnightly';
    case 'MONTHLY':
      return 'Monthly';
    case 'QUARTERLY':
      return 'Quarterly';
    default:
      return '';
  }
};
export const ScheduledPaymentCard = ({ onCancel, scheduledPayment }: ScheduledPaymentCardProps) => {
  const isOneOff = scheduledPayment.type === 'ONE_TIME';
  const floatAmount = getFloatAmountFromMoney(scheduledPayment?.amount) ?? 0;
  const formatCurrency = createCurrencyFormatter();
  const currency = getCurrencyFromCurrencyType(scheduledPayment.amount.type || CurrencyType.CurrencyTypeUnspecified);
  const { space } = useTheme();
  const { formatMessage } = useRegionLocalisation();

  return (
    <List.Item
      variant="card"
      style={{ marginBottom: space.medium, margin: space.xxsmall }}
      testID="fullName"
      title={<Typography.Title level="h5">{scheduledPayment.recipient.accountName}</Typography.Title>}
      suffix={
        <Button.Icon
          testID="cancel-scheduled-payment"
          intent="danger"
          icon="trash-bin"
          onPress={onCancel}
          size="small"
        />
      }
    >
      <Box flexDirection="column" justifyContent="space-between">
        <Typography.Title level="h5">
          {formatToBSBValue(scheduledPayment.recipient.bsb)} {scheduledPayment.recipient.accountNumber}
        </Typography.Title>
        <Typography.Body variant="small" intent="subdued" style={{ marginTop: space.xsmall }}>
          {`${formatMessage({ id: 'scheduledPayments.amount' })}: ${formatCurrency(Math.abs(floatAmount), {
            currency,
          })}`}
        </Typography.Body>
        {!isOneOff && (
          <>
            <Typography.Body variant="small" intent="subdued" style={{ marginTop: space.xsmall }}>
              {`${formatMessage({ id: 'scheduledPayments.frequency' })}: ${getDisplayFrequency(
                scheduledPayment.frequency || undefined
              )}`}
            </Typography.Body>
            <Typography.Body variant="small" intent="subdued" style={{ marginTop: space.xsmall }}>
              {`${formatMessage({ id: 'scheduledPayments.startDate' })}: ${formatUTCToLocalDateString(
                scheduledPayment.startDate
              )}`}
            </Typography.Body>
            {scheduledPayment.endDate && (
              <Typography.Body variant="small" intent="subdued" style={{ marginTop: space.xsmall }}>
                {`${formatMessage({ id: 'scheduledPayments.endDate' })}: ${formatUTCToLocalDateString(
                  scheduledPayment.endDate
                )}`}
              </Typography.Body>
            )}
            {scheduledPayment.numberOfPayments ? (
              <Typography.Body variant="small" intent="subdued" style={{ marginTop: space.xsmall }}>
                {`${formatMessage({ id: 'scheduledPayments.numberOfPayments' })}: ${scheduledPayment.numberOfPayments}`}
              </Typography.Body>
            ) : null}
          </>
        )}
        {isOneOff && (
          <Typography.Body variant="small" intent="subdued" style={{ marginTop: space.xsmall }}>
            {`${formatMessage({ id: 'scheduledPayments.when' })}: ${formatUTCToLocalDateString(
              scheduledPayment.startDate
            )}`}
          </Typography.Body>
        )}
        <Typography.Body variant="small" intent="subdued" style={{ marginTop: space.xsmall }}>
          {`${formatMessage({ id: 'scheduledPayments.description' })}: ${scheduledPayment.description}`}
        </Typography.Body>
      </Box>
    </List.Item>
  );
};
