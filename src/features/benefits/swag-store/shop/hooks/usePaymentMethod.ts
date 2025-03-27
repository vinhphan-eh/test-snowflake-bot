import { useEffect, useMemo, useState } from 'react';
import {
  calculateAmountDueInPoints,
  calculatePointsDollarValueByProductPrice,
} from '../../../../hero-points/utils/heroPointsConversion';
import { roundCreditCardFee, roundDown, roundNum } from '../../../common/utils/calculations';
import { MINIMUM_STRIPE_AMOUNT } from '../../constants';

// Manage payment method: allow user to flexibly pay by different methods
export const usePaymentMethod = ({
  cardFeeRate,
  orderAmount,
  orderAmountInPoints,
  pointsBalance,
}: {
  orderAmount: number;
  orderAmountInPoints: number;
  pointsBalance: number;
  cardFeeRate: number;
}) => {
  const [pointsToPay, setPointsToPay] = useState(0);

  const maxSpendablePoints = useMemo(() => {
    // If pointsBalance is enough to cover the whole order, return orderAmountInPoints
    if (pointsBalance >= orderAmountInPoints) {
      return orderAmountInPoints;
    }
    // If pointsBalance is not enough to cover the whole order
    // make sure pointsToPay leave enough amountToPayViaCard that amountToPayViaCard should be >= 0.5 (minimum stripe amount)
    const maxAmount2CoverByPoints = roundDown(orderAmount - MINIMUM_STRIPE_AMOUNT);
    const maxPoints2EnsureMinCardAmount = calculateAmountDueInPoints({
      dollarAmount: maxAmount2CoverByPoints,
      totalPriceInDollar: orderAmount,
      totalPriceInPoints: orderAmountInPoints,
    });

    return Math.min(maxPoints2EnsureMinCardAmount, pointsBalance);
  }, [orderAmount, orderAmountInPoints, pointsBalance]);

  // When orderAmountInPoints is changed, increase pointsToPay to maxSpendablePoints
  useEffect(() => {
    setPointsToPay(maxSpendablePoints);
  }, [maxSpendablePoints]);

  // When pointsToPay is changed, calculate amountToPayViaCard
  const amountToPayViaCard = useMemo(() => {
    // Covert pointsToPay to money
    const moneyEquivalentToPoints = calculatePointsDollarValueByProductPrice({
      heroPointsAmount: pointsToPay,
      totalPriceInDollar: orderAmount,
      totalPriceInPoints: orderAmountInPoints,
    });

    // The remaining amount need to pay by credit card
    return Math.max(roundNum(orderAmount - moneyEquivalentToPoints), 0);
  }, [orderAmount, orderAmountInPoints, pointsToPay]);

  const cardFee = roundCreditCardFee((amountToPayViaCard * cardFeeRate) / 100);

  const amountToPayViaCardAfterFee = roundNum(amountToPayViaCard + cardFee);

  const isPurchaseAllByPoints = pointsToPay === orderAmountInPoints;
  const isPurchaseByBothPointsAndCard = pointsToPay > 0 && amountToPayViaCard > 0;

  const validAmountToPayViaCard = amountToPayViaCard === 0 || amountToPayViaCard >= MINIMUM_STRIPE_AMOUNT;

  const ready2Purchase = orderAmount > 0 && validAmountToPayViaCard;

  return {
    pointsToPay,
    setPointsToPay,
    amountToPayViaCard,
    amountToPayViaCardAfterFee,
    maxSpendablePoints,
    cardFee,
    ready2Purchase,
    isPurchaseAllByPoints,
    isPurchaseByBothPointsAndCard,
    validAmountToPayViaCard,
  };
};
