import BigNumber from 'bignumber.js';
import type { MoneyV2 } from '../../../../new-graphql/generated';
import type { FormattedInstapayBankAccount } from '../hooks/useInstapayBankOptions';

export const getFeePercentage = (bankAccount: FormattedInstapayBankAccount) => {
  const { percentage } = bankAccount.feeV2;

  return percentage ?? 0;
};

/**
 * returns InstaPay Now fee by percentage
 *
 * @param amount - amount to calculate fee from
 * @param bankAccount - bank account details
 */
export const calculateFeeByPercentage = (amount: number, bankAccount: FormattedInstapayBankAccount) => {
  const amountBigNumber = new BigNumber(amount);
  const feePercentage = new BigNumber(getFeePercentage(bankAccount));

  return parseFloat(amountBigNumber.multipliedBy(feePercentage).dividedBy(100).decimalPlaces(2).toString());
};

/**
 * returns InstaPay Now fee by percentage with free amount
 *
 * @param amount - amount to calculate fee from
 * @param bankAccount - bank account details
 */
export const calculateFeeByPercentageWithFreeAmount = ({
  amount,
  bankAccount,
  maxTransactionThreshold,
}: {
  amount: number;
  bankAccount: FormattedInstapayBankAccount;
  maxTransactionThreshold: MoneyV2;
}) => {
  const amountBigNumber = new BigNumber(amount);
  const feePercentage = new BigNumber(bankAccount.feeV2.percentage ?? 0);
  const maxThreshold = parseFloat(`${maxTransactionThreshold.units}.${maxTransactionThreshold.subUnits}`);
  const maxThresholdBigNumber = new BigNumber(maxThreshold);

  const originalFee = amountBigNumber.multipliedBy(feePercentage).dividedBy(100);
  const maxFreeFee = maxThresholdBigNumber.multipliedBy(feePercentage).dividedBy(100);
  let finalFee = new BigNumber(0);

  if (originalFee.lte(maxFreeFee)) {
    finalFee = new BigNumber(0);
  } else {
    finalFee = originalFee.minus(maxFreeFee);
  }

  return {
    originalFee: parseFloat(originalFee.decimalPlaces(2).toString()),
    finalFee: parseFloat(finalFee.decimalPlaces(2).toString()),
  };
};
