import React from 'react';
import { Box, Typography } from '@hero-design/rn';
import { CurrencyText } from '../../../../../common/components/currency-text/CurrencyText';
import type { SupportedCurrency } from '../../../../../common/utils/numbers';
import { useIntl } from '../../../../../providers/LocalisationProvider';

export type CardProps = {
  amount: number;
  fee: number;
  feeRate: number;
  currency: SupportedCurrency;
};

const CurrencyTextInCard = ({ amount, currency }: { amount: number; currency: SupportedCurrency }) => {
  return (
    <CurrencyText
      currency={currency}
      amount={amount}
      renderCurrency={value => <Typography.Body variant="regular-bold">{value}</Typography.Body>}
      renderDecimal={value => <Typography.Body variant="regular-bold">{value}</Typography.Body>}
    />
  );
};

export const CardAmount2Pay = ({ amount, currency, fee, feeRate }: CardProps) => {
  const { formatMessage } = useIntl();

  return (
    <Box padding="medium" bgColor="defaultGlobalSurface" borderRadius="large" marginTop="medium" testID="card-info">
      <Box flexDirection="row">
        <Typography.Body variant="regular-bold" typeface="playful" style={{ flex: 1 }}>
          {formatMessage({ id: 'benefits.swagStore.payment.cardTitle' })}
        </Typography.Body>
      </Box>
      <Box flexDirection="row" justifyContent="flex-start" marginTop="small">
        <Box flex={1} justifyContent="center">
          <Typography.Body variant="small">
            {formatMessage({ id: 'benefits.swagStore.payment.payViaCard' })}
          </Typography.Body>
        </Box>
        <CurrencyTextInCard amount={amount} currency={currency} />
      </Box>
      {!!feeRate && (
        <Box flexDirection="row" justifyContent="flex-start" marginTop="small">
          <Box flex={1} justifyContent="center">
            <Typography.Body variant="small">
              {formatMessage(
                { id: 'benefits.swagStore.payment.cardFee' },
                {
                  fee: feeRate,
                }
              )}
            </Typography.Body>
          </Box>
          <CurrencyTextInCard amount={fee} currency={currency} />
        </Box>
      )}
    </Box>
  );
};
