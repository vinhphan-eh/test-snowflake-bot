import React from 'react';
import { render } from '../../../../../../common/utils/testing';
import { FeeType, InstapayBankAccountSource } from '../../../../../../new-graphql/generated';
import { aMoneyV2 } from '../../../../../../new-graphql/mocks/generated-mocks';
import { useGetFreeTransactionProgress } from '../../../hooks/useGetFreeTransactionProgress';
import type { FormattedInstapayBankAccount } from '../../../hooks/useInstapayBankOptions';
import { SimplifiedInstaPayNowFee } from '../SimplifiedInstaPayNowFee';

jest.mock('../../../hooks/useGetFreeTransactionProgress');

const mockUseGetFreeTransactionProgress = useGetFreeTransactionProgress as jest.MockedFunction<
  typeof useGetFreeTransactionProgress
>;

describe('SimplifiedInstaPayNowFee', () => {
  it('renders the fee amount correctly', () => {
    mockUseGetFreeTransactionProgress.mockReturnValueOnce({
      applyFreeFee: false,
      progress: 0,
      showFreeProgress: false,
      remainingProgress: 0,
    });
    const amount = 1000;
    const bankAccount: FormattedInstapayBankAccount = {
      isSSA: true,
      accountName: 'bank account',
      accountNumber: 'B123',
      bankAccountSource: InstapayBankAccountSource.Kp,
      externalId: 'fcad937e-fe96-4dca-9ab3-6bb7a6716f05',
      feeV2: {
        type: FeeType.Percentage,
        percentage: 1.3,
      },
    };

    const { getByText } = render(<SimplifiedInstaPayNowFee amount={amount} bankAccount={bankAccount} />);

    expect(getByText('$13.00 fee')).toBeVisible();
    expect(getByText('based on 1.3% fee')).toBeVisible();
  });

  describe('free fee for transaction', () => {
    test('should render $0.00 when a user inputs the same max threshold', () => {
      mockUseGetFreeTransactionProgress.mockReturnValueOnce({
        applyFreeFee: true,
        progress: 100,
        remainingProgress: 0,
        showFreeProgress: true,
        maxTransactionThreshold: aMoneyV2({
          units: 500,
          subUnits: 0,
        }),
      });
      const amount = 500;
      const bankAccount: FormattedInstapayBankAccount = {
        isSSA: true,
        accountName: 'bank account',
        accountNumber: 'B123',
        bankAccountSource: InstapayBankAccountSource.Kp,
        externalId: 'fcad937e-fe96-4dca-9ab3-6bb7a6716f05',
        feeV2: {
          type: FeeType.Percentage,
          percentage: 1.3,
        },
      };

      const { getByText } = render(<SimplifiedInstaPayNowFee amount={amount} bankAccount={bankAccount} />);

      expect(getByText('$0.00 fee')).toBeVisible();
      expect(getByText('free transaction')).toBeVisible();
    });

    test('should render $0.00 when a user inputs less than max threshold', () => {
      mockUseGetFreeTransactionProgress.mockReturnValueOnce({
        applyFreeFee: true,
        progress: 100,
        remainingProgress: 0,
        showFreeProgress: true,
        maxTransactionThreshold: aMoneyV2({
          units: 500,
          subUnits: 0,
        }),
      });
      const amount = 300;
      const bankAccount: FormattedInstapayBankAccount = {
        isSSA: true,
        accountName: 'bank account',
        accountNumber: 'B123',
        bankAccountSource: InstapayBankAccountSource.Kp,
        externalId: 'fcad937e-fe96-4dca-9ab3-6bb7a6716f05',
        feeV2: {
          type: FeeType.Percentage,
          percentage: 1.3,
        },
      };

      const { getByText } = render(<SimplifiedInstaPayNowFee amount={amount} bankAccount={bankAccount} />);

      expect(getByText('$0.00 fee')).toBeVisible();
      expect(getByText('free transaction')).toBeVisible();
    });

    test('should render final price when a user inputs over max threshold', () => {
      mockUseGetFreeTransactionProgress.mockReturnValueOnce({
        applyFreeFee: true,
        progress: 100,
        remainingProgress: 0,
        showFreeProgress: true,
        maxTransactionThreshold: aMoneyV2({
          units: 500,
          subUnits: 0,
        }),
      });
      const amount = 1000;
      const bankAccount: FormattedInstapayBankAccount = {
        isSSA: true,
        accountName: 'bank account',
        accountNumber: 'B123',
        bankAccountSource: InstapayBankAccountSource.Kp,
        externalId: 'fcad937e-fe96-4dca-9ab3-6bb7a6716f05',
        feeV2: {
          type: FeeType.Percentage,
          percentage: 1.3,
        },
      };

      const { getByText } = render(<SimplifiedInstaPayNowFee amount={amount} bankAccount={bankAccount} />);

      expect(getByText('$13.00')).toBeVisible();
      expect(getByText('based on 1.3% fee')).toBeVisible();
      expect(getByText('$6.50 fee')).toBeVisible();
    });
  });
});
