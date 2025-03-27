import { useEffect } from 'react';
import { useServiceFeeFeature } from './useServiceFeeFeature';
import { useGetSuperAppToken } from '../../../../../common/auth/store/useSuperAppTokenStore';
import { useHeroPointsVisibility } from '../../../../../common/hooks/useHeroPointsVisibility';
import { isEnabledForEh } from '../../../../../common/types/react-query';
import type { Maybe } from '../../../../../new-graphql/generated';
import { useGetHeroPointsBalanceQuery } from '../../../../../new-graphql/generated';
import {
  calculateAmountDueInPoints,
  calculatePointsDollarValueByProductPrice,
} from '../../../../hero-points/utils/heroPointsConversion';
import { roundCreditCardFee, roundNum } from '../../../common/utils/calculations';
import { MINIMUM_STRIPE_AMOUNT } from '../../constants';
import { getProductDetailFromStore, useDiscountShopStore } from '../store/useDiscountShopStore';

type CalculationParams = {
  price: number;
  quantity: number;
  priceInPoints: Maybe<number>;
  payByHeroPoints: number;
  payByCard: number;
  fee: number;
  heroBalance: number;
};

type CalculationResult = {
  totalPayByHeroPointsInDollar: number;
  totalPayByAllMethods: number;
  amountDue: number;
  amountDueInPoints: Maybe<number>;
  cardFeeAmount: number;
};

type AdjustCalculationResult = {
  totalPayByHeroPointsOrDollar: number;
  newAmountToPayByPoints: number;
};

const loadDefaultHeroPointsPayment = (
  heroPoints: number,
  payByCard: number,
  maxHeroBalanceToRespectStripeMinimum?: number
) => {
  if (heroPoints > 0) {
    useDiscountShopStore.setState(state => ({
      payment: {
        ...state.payment,
        balance: {
          ...state.payment?.balance,
          creditCard: payByCard,
          heroPoints,
        },
      },
      maxHeroBalanceToRespectStripeMinimum,
    }));
  }
};

const getTotalPayByHeroPointsInDollar = ({
  amountDue,
  amountDueInPoints,
  payByHeroPoints,
}: {
  payByHeroPoints: number;
  amountDue: number;
  amountDueInPoints: Maybe<number>;
}) => {
  const totalPayByHeroPointsInDollar =
    (amountDueInPoints &&
      calculatePointsDollarValueByProductPrice({
        heroPointsAmount: payByHeroPoints,
        totalPriceInDollar: amountDue,
        totalPriceInPoints: amountDueInPoints,
      })) ??
    0;
  return totalPayByHeroPointsInDollar;
};

const adjustHeroPaymentToRespectStripeMiniumAmount = ({
  amountDue,
  amountDueInPoints,
  heroBalance,
  payByHeroPoints = 0,
}: {
  payByHeroPoints?: number;
  amountDue: number;
  amountDueInPoints: Maybe<number>;
  heroBalance: number;
}): AdjustCalculationResult => {
  const totalPayByHeroPointsOrDollar = getTotalPayByHeroPointsInDollar({
    amountDue,
    amountDueInPoints,
    payByHeroPoints,
  });
  const payByCard = roundNum(amountDue - totalPayByHeroPointsOrDollar);
  if (
    amountDueInPoints &&
    heroBalance < amountDueInPoints &&
    payByCard < MINIMUM_STRIPE_AMOUNT &&
    payByHeroPoints > 0
  ) {
    const amountNeedToReachMinimum = roundNum(MINIMUM_STRIPE_AMOUNT - payByCard);
    const heroPointsNeedToMinus = calculateAmountDueInPoints({
      dollarAmount: amountNeedToReachMinimum,
      totalPriceInDollar: amountDue,
      totalPriceInPoints: amountDueInPoints,
    });

    const newAmountToPayByPoints = payByHeroPoints - heroPointsNeedToMinus;
    if (newAmountToPayByPoints > 0) {
      const totalPayByHeroPointInDollar = calculatePointsDollarValueByProductPrice({
        heroPointsAmount: newAmountToPayByPoints,
        totalPriceInDollar: amountDue,
        totalPriceInPoints: amountDueInPoints,
      });
      return { totalPayByHeroPointsOrDollar: totalPayByHeroPointInDollar, newAmountToPayByPoints };
    }
  }
  return { totalPayByHeroPointsOrDollar, newAmountToPayByPoints: payByHeroPoints };
};

const getPriceCalculation = (params: CalculationParams): CalculationResult => {
  const { fee, heroBalance, payByCard, payByHeroPoints, price, priceInPoints, quantity } = params;
  const amountDue = roundNum(price * quantity);
  const amountDueInPoints = priceInPoints && priceInPoints * quantity;
  const cardFeeAmount = roundCreditCardFee((payByCard * fee) / 100);

  const totalPayByHeroPointsInDollar = getTotalPayByHeroPointsInDollar({
    amountDue,
    amountDueInPoints,
    payByHeroPoints,
  });
  const totalPayByAllMethods = roundNum(payByCard + totalPayByHeroPointsInDollar);
  // Stripe requires minimum amount, so we need to adjust hero payment to ensure the credit card amount is not less than minimum amount
  const { totalPayByHeroPointsOrDollar: newTotalPayByHeroPointsInDollar } =
    adjustHeroPaymentToRespectStripeMiniumAmount({
      payByHeroPoints,
      amountDue,
      amountDueInPoints,
      heroBalance,
    });

  return {
    totalPayByHeroPointsInDollar: newTotalPayByHeroPointsInDollar,
    totalPayByAllMethods,
    amountDue,
    amountDueInPoints,
    cardFeeAmount,
  };
};

export const useGetPaymentInfo = () => {
  const { getPriceWithFee } = useServiceFeeFeature();
  // load store data
  const productDetail = getProductDetailFromStore();
  const quantity = useDiscountShopStore(state => state.quantity ?? 1);
  const payment = useDiscountShopStore(state => state.payment);
  const selectedCard = useDiscountShopStore(state => state.payment?.selectedCard);
  const { balance: { creditCard: payByCard = 0, heroPoints: payByHeroPoints = 0 } = {} } = payment ?? {};
  const { discountPrice = 0, discountPriceInPoints = 0, serviceFee = 0, transactionFee = 0 } = productDetail ?? {};

  const heroPointsPermission = useHeroPointsVisibility();

  const { loginProvider, token } = useGetSuperAppToken('useGetPaymentInfo');
  const {
    data: heroPointsBalanceData,
    isError: isErrorHeroPoints,
    isLoading,
  } = useGetHeroPointsBalanceQuery(
    {},
    {
      enabled: isEnabledForEh(token, loginProvider) && heroPointsPermission,
      cacheTime: 0,
    }
  );
  const heroPointsBalance = heroPointsBalanceData?.me?.heroPoints?.balance || 0;

  // calculate prices
  const { amountDue, amountDueInPoints, cardFeeAmount, totalPayByAllMethods, totalPayByHeroPointsInDollar } =
    getPriceCalculation({
      price: getPriceWithFee(discountPrice, serviceFee),
      priceInPoints: discountPriceInPoints,
      quantity,
      payByHeroPoints,
      payByCard,
      fee: transactionFee,
      heroBalance: heroPointsBalance,
    });

  const isFulfill = !isLoading && totalPayByAllMethods === amountDue;

  useEffect(() => {
    if (heroPointsPermission && amountDueInPoints && quantity > 0 && !isLoading && !isErrorHeroPoints) {
      // incase this is called again at different screen
      // safely do amountDue - payByCard
      const amountDueAfterCard = amountDue - payByCard;
      const amountToPayByPoints = calculateAmountDueInPoints({
        dollarAmount: amountDueAfterCard,
        totalPriceInDollar: amountDue,
        totalPriceInPoints: amountDueInPoints,
      });

      // also need to update payByCard because value may be different due to rounding in points
      const newPayByCard = roundNum(
        amountDue -
          calculatePointsDollarValueByProductPrice({
            heroPointsAmount: amountToPayByPoints,
            totalPriceInDollar: amountDue,
            totalPriceInPoints: amountDueInPoints,
          })
      );

      const heroPoints = roundNum(Math.min(amountToPayByPoints, heroPointsBalance));
      // Stripe requires minimum amount, so we need to adjust hero payment to ensure the credit card amount is not less than minimum amount
      const { newAmountToPayByPoints } = adjustHeroPaymentToRespectStripeMiniumAmount({
        payByHeroPoints: heroPoints,
        amountDue,
        amountDueInPoints,
        heroBalance: heroPointsBalance,
      });
      const maxHeroBalanceToRespectStripeMinimum =
        newAmountToPayByPoints !== heroPoints ? newAmountToPayByPoints : undefined;
      loadDefaultHeroPointsPayment(newAmountToPayByPoints, newPayByCard, maxHeroBalanceToRespectStripeMinimum);
    }
  }, [
    quantity,
    isLoading,
    amountDue,
    isErrorHeroPoints,
    payByCard,
    heroPointsPermission,
    discountPriceInPoints,
    heroPointsBalance,
    amountDueInPoints,
  ]);

  return {
    isFulfill,
    cardFeeAmount,
    amountDue,
    amountDueInPoints,
    isLoading,
    payByHeroPoints,
    totalPayByHeroPointsInDollar,
    payByCard,
    quantity,
    selectedCard,
  };
};
