import React from 'react';
import { Box, Typography } from '@hero-design/rn';
import { CardAmount2Pay } from './CardAmount2Pay';
import { HeroPointsSlider } from './HeroPointsSlider';
import { useHeroPointsVisibility } from '../../../../../common/hooks/useHeroPointsVisibility';
import type { SupportedCurrency } from '../../../../../common/utils/numbers';
import { useIntl } from '../../../../../providers/LocalisationProvider';

type Props = {
  pointsToPay: number;
  amountToPayViaCard: number;
  cardFee: number;
  cardFeeRate: number;
  setPointsToPay: (points: number) => void;
  maxSpendablePoints: number;
  currency: SupportedCurrency;
};

export const PaymentForOrder = ({
  amountToPayViaCard,
  cardFee,
  cardFeeRate,
  currency,
  maxSpendablePoints,
  pointsToPay,
  setPointsToPay,
}: Props) => {
  const heroPointsPermission = useHeroPointsVisibility();
  const { formatMessage } = useIntl();

  return (
    <Box paddingHorizontal="medium" marginTop="large">
      <Typography.Body variant="small">
        {formatMessage({ id: 'benefits.swagStore.payment.paymentDetailsTitle' })}
      </Typography.Body>
      {heroPointsPermission && maxSpendablePoints > 0 && (
        <HeroPointsSlider
          maxPoints={maxSpendablePoints}
          selectedPoints={pointsToPay}
          onSelectedPointChange={setPointsToPay}
        />
      )}
      <CardAmount2Pay amount={amountToPayViaCard} currency={currency} fee={cardFee} feeRate={cardFeeRate} />
    </Box>
  );
};
