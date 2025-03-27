import type { MoneyV2 } from '../../../../../new-graphql/generated';
import { CurrencyType, FeeType, InstapayBankAccountSource, Sign } from '../../../../../new-graphql/generated';
import type { FormattedInstapayBankAccount } from '../../hooks/useInstapayBankOptions';
import { calculateFeeByPercentage, calculateFeeByPercentageWithFreeAmount } from '../calculate-fee-by-percentage';

describe('calculateFeeByPercentage', () => {
  it.each([
    [100, 1.3, 1.3],
    [200, 2.5, 5],
    [33, 3.5, 1.16],
    [400, 4.5, 18],
  ])('should return the correct fee when the amount is %i and the percentage is %i', (amount, percentage, expected) => {
    const bankAccount: FormattedInstapayBankAccount = {
      isSSA: true,
      accountName: 'bank account',
      accountNumber: 'B123',
      bankAccountSource: InstapayBankAccountSource.Swag,
      externalId: 'fcad937e-fe96-4dca-9ab3-6bb7a6716f05',
      feeV2: {
        type: FeeType.Percentage,
        percentage,
      },
    };

    const result = calculateFeeByPercentage(amount, bankAccount);

    expect(result).toBe(expected);
  });
});

describe('calculateFeeByPercentageWithFreeAmount', () => {
  test.each([
    {
      amount: 1000,
      percentage: 1.3,
      promotionPercentage: 1,
      expectedOriginalFee: 13,
      expectedFinalFee: 6.5,
    },
    {
      amount: 1000,
      percentage: 1.5,
      promotionPercentage: 1,
      expectedOriginalFee: 15,
      expectedFinalFee: 7.5,
    },
    {
      amount: 500,
      percentage: 1.3,
      promotionPercentage: 1,
      expectedOriginalFee: 6.5,
      expectedFinalFee: 0,
    },
    {
      amount: 500,
      percentage: 1.5,
      promotionPercentage: 1,
      expectedOriginalFee: 7.5,
      expectedFinalFee: 0,
    },
    {
      amount: 789,
      percentage: 1.3,
      promotionPercentage: 1,
      expectedOriginalFee: 10.26,
      expectedFinalFee: 3.76,
    },
    {
      amount: 789,
      percentage: 1.5,
      promotionPercentage: 1,
      expectedOriginalFee: 11.84,
      expectedFinalFee: 4.34,
    },
    {
      amount: 400,
      percentage: 1.3,
      promotionPercentage: 1,
      expectedOriginalFee: 5.2,
      expectedFinalFee: 0,
    },
    {
      amount: 400,
      percentage: 1.5,
      promotionPercentage: 1,
      expectedOriginalFee: 6,
      expectedFinalFee: 0,
    },
    {
      amount: 459,
      percentage: 1.3,
      promotionPercentage: 1,
      expectedOriginalFee: 5.97,
      expectedFinalFee: 0,
    },
    {
      amount: 459,
      percentage: 1.5,
      promotionPercentage: 1,
      expectedOriginalFee: 6.89,
      expectedFinalFee: 0,
    },
  ])(
    'should return the correct final fee when the amount is $amount, the percentage is $percentage',
    ({ amount, expectedFinalFee, expectedOriginalFee, percentage }) => {
      const bankAccount: FormattedInstapayBankAccount = {
        isSSA: true,
        accountName: 'bank account',
        accountNumber: 'B123',
        bankAccountSource: InstapayBankAccountSource.Swag,
        externalId: 'fcad937e-fe96-4dca-9ab3-6bb7a6716f05',
        feeV2: {
          percentage,
          type: FeeType.Percentage,
        },
      };
      const maxTransactionThreshold: MoneyV2 = {
        units: 500,
        subUnits: 0,
        sign: Sign.Positive,
        type: CurrencyType.CurrencyTypeAud,
      };

      const result = calculateFeeByPercentageWithFreeAmount({ amount, bankAccount, maxTransactionThreshold });

      expect(result).toEqual({ originalFee: expectedOriginalFee, finalFee: expectedFinalFee });
    }
  );
});
