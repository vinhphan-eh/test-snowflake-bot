import React from 'react';
import dayjs from 'dayjs';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { fireEvent, render } from '../../../../common/utils/testing';
import { CurrencyType, TransactionType } from '../../../../new-graphql/generated';
import { aFinancialTransaction } from '../../../../new-graphql/mocks/generated-mocks';
import { TransactionListItem, TRANSACTION_TIME_FORMAT } from '../TransactionListItem';

describe('Transaction List Item', () => {
  it('should render correctly', () => {
    const transaction = aFinancialTransaction({
      id: '1',
      dateTimeUTC: '2022-08-30T00:00:00Z',
      currencyAmount: { type: CurrencyType.CurrencyTypeAud, units: 20, subUnits: 0 },
      type: TransactionType.TransferOut,
      merchant: { name: 'Hello World' },
    });
    const { getByText } = render(<TransactionListItem transaction={transaction} />);

    expect(getByText(dayjs(transaction.dateTimeUTC).format(TRANSACTION_TIME_FORMAT))).toBeTruthy();
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('should render card transaction correctly', () => {
    const transaction = aFinancialTransaction({
      id: '1',
      dateTimeUTC: '2022-08-30T00:00:00Z',
      currencyAmount: { type: CurrencyType.CurrencyTypeAud, units: -20, subUnits: 0 },
      type: TransactionType.TransferOut,
      cardId: 'test-uuid',
      merchant: {
        name: 'Test',
        singleLineAddress: 'street',
      },
    });
    const { getByText } = render(<TransactionListItem transaction={transaction} />);

    expect(getByText(dayjs(transaction.dateTimeUTC).format(TRANSACTION_TIME_FORMAT))).toBeTruthy();
    expect(getByText('Test')).toBeTruthy();
  });

  it('should navigate to transaction details screen if pressed', async () => {
    const transaction = aFinancialTransaction();

    const { getByTestId } = render(<TransactionListItem transaction={transaction} />);
    fireEvent.press(getByTestId(`transaction-list-item-${transaction.id}`));

    expect(mockedNavigate).toHaveBeenCalledWith('PayAnyoneStack', {
      screen: 'TransactionDetails',
      params: { transaction },
    });
  });

  describe('transactionTitle', () => {
    it('should return Hero Points when showTransferFromHeroPoints is true', () => {
      const transaction = aFinancialTransaction({
        id: '1',
        dateTimeUTC: '2022-08-30T00:00:00Z',
        currencyAmount: { type: CurrencyType.CurrencyTypeAud, units: 20, subUnits: 0 },
        type: TransactionType.TransferOut,
        merchant: { name: 'Hello World' },
        description: 'Transfer from Hero Points',
        transferPeerDetails: {
          name: 'Employment Hero',
        },
      });
      const { getByText } = render(<TransactionListItem transaction={transaction} />);

      expect(getByText('Reimbursed by Hero Points')).toBeTruthy();
    });

    it('should return the "InstaPay Daily" when description starts with "DP"', () => {
      const transaction = aFinancialTransaction({
        id: '1',
        dateTimeUTC: '2022-08-30T00:00:00Z',
        currencyAmount: { type: CurrencyType.CurrencyTypeAud, units: 20, subUnits: 0 },
        type: TransactionType.TransferOut,
        merchant: { name: 'Hello World' },
        description: 'DP07112300000539MD',
      });
      const { getByText } = render(<TransactionListItem transaction={transaction} />);

      expect(getByText('Earned Pay Daily')).toBeTruthy();
    });

    it('should return the name of merchant or name of transferPeerDetails', () => {
      const transaction = aFinancialTransaction({
        id: '1',
        dateTimeUTC: '2022-08-30T00:00:00Z',
        currencyAmount: { type: CurrencyType.CurrencyTypeAud, units: 20, subUnits: 0 },
        type: TransactionType.TransferOut,
        merchant: { name: 'Employment Hero' },
      });
      const { getByText } = render(<TransactionListItem transaction={transaction} />);

      expect(getByText('Employment Hero')).toBeTruthy();
    });
  });
});
