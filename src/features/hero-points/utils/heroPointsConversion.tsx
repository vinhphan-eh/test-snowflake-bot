import { roundDown, roundUp } from '../../benefits/common/utils/calculations';

type ConversionRateParams = {
  totalPriceInDollar: number;
  totalPriceInPoints: number;
};

type ConversionFromDollarParams = {
  dollarAmount: number;
} & ConversionRateParams;

type ConversionFromPointsParams = {
  heroPointsAmount: number;
} & ConversionRateParams;

/**
 * Calculate percentage paid by hero points. Used to calculate the percentage to be deducted from a tranasction partially paid by hero points
 */
export const calculatePercentagePaidByHeroPoints = ({
  heroPointsAmount,
  totalPriceInPoints,
}: Omit<ConversionFromPointsParams, 'totalPriceInDollar'>): number => {
  if (totalPriceInPoints === 0) {
    return 0;
  }

  return heroPointsAmount / totalPriceInPoints;
};

/**
 * Calculate points dollar value by product price to 2 decimal places. Used to calculate the amount of dollars to be deducted for a given amount of points.
 */
export const calculatePointsDollarValueByProductPrice = ({
  heroPointsAmount,
  totalPriceInDollar,
  totalPriceInPoints,
}: ConversionFromPointsParams): number => {
  if (totalPriceInDollar === 0) {
    return 0;
  }
  if (totalPriceInPoints === 0) {
    return 0;
  }

  return roundDown((heroPointsAmount / totalPriceInPoints) * totalPriceInDollar);
};

/**
 * Calculate amount due in points. Used for partial payment with points.
 */
export const calculateAmountDueInPoints = ({
  dollarAmount,
  totalPriceInDollar,
  totalPriceInPoints,
}: ConversionFromDollarParams): number => {
  if (totalPriceInDollar === 0) {
    return 0;
  }
  if (totalPriceInPoints === 0) {
    return 0;
  }

  return roundUp((dollarAmount / totalPriceInDollar) * totalPriceInPoints, 0);
};
