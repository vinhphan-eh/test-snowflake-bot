import {
  calculateAmountDueInPoints,
  calculatePercentagePaidByHeroPoints,
  calculatePointsDollarValueByProductPrice,
} from '../heroPointsConversion';

describe('calculatePercentagePaidByHeroPoints', () => {
  it.each<[number, number, number]>([
    [0, 0, 0],
    [0, 100, 0],
    [60, 100, 0.6],
    [30, 100, 0.3],
  ])('should work properly', (heroPointsAmount, totalPriceInPoints, expected) => {
    expect(
      calculatePercentagePaidByHeroPoints({
        heroPointsAmount,
        totalPriceInPoints,
      })
    ).toEqual(expected);
  });
});

describe('calculatePointsDollarValueByProductPrice', () => {
  it.each<[number, number, number, number]>([
    [0, 0, 0, 0],
    [0, 100, 40, 0],
    [0, 100, 0, 0],
    [60, 100, 48, 125],
    [30, 100, 48, 62.5],
    [30, 133, 218, 18.3],
  ])('should work properly', (heroPointsAmount, totalPriceInDollar, totalPriceInPoints, expected) => {
    expect(
      calculatePointsDollarValueByProductPrice({
        heroPointsAmount,
        totalPriceInDollar,
        totalPriceInPoints,
      })
    ).toEqual(expected);
  });
});

describe('calculateAmountDueInPoints', () => {
  it.each<[number, number, number, number]>([
    [0, 0, 0, 0],
    [50, 100, 48, 24],
    [0, 100, 40, 0],
    [100, 100, 48, 48],
    [88, 150, 320, 188],
  ])('should work properly', (dollarAmount, totalPriceInDollar, totalPriceInPoints, expected) => {
    expect(
      calculateAmountDueInPoints({
        dollarAmount,
        totalPriceInDollar,
        totalPriceInPoints,
      })
    ).toEqual(expected);
  });
});
