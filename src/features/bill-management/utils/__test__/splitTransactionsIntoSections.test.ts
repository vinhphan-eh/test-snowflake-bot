import type { Transaction } from '../../../../new-graphql/generated';
import { BillStatus, Currency, PaymentMethod, PaymentType, TxnType } from '../../../../new-graphql/generated';
import { splitTransactionsIntoSections } from '../splitTransactionsIntoSections';

const transactions: Transaction[] = [
  {
    id: '123',
    createdAt: '2023-05-24T00:00:00.000Z',
    type: TxnType.Bill,
    issueDate: '123',
    dateFrom: '2023-05-24T00:00:00.000Z',
    dateTo: '2023-05-24T00:00:00.000Z',
    dueDate: '2023-05-24T00:00:00.000Z',
    transactionDate: '2023-05-24T00:00:00.000Z',
    status: BillStatus.Overdue,
    amount: {
      amount: 123,
      currency: Currency.Aud,
    },
  },
  {
    id: '123',
    createdAt: '2023-05-24T00:00:00.000Z',
    type: TxnType.Bill,
    issueDate: '123',
    dateFrom: '2023-05-24T00:00:00.000Z',
    dateTo: '2023-05-24T00:00:00.000Z',
    dueDate: '2023-05-24T00:00:00.000Z',
    transactionDate: '2023-05-24T00:00:00.000Z',
    status: BillStatus.Paid,
    amount: {
      amount: 234.54,
      currency: Currency.Aud,
    },
  },
  {
    id: '123',
    createdAt: '2023-05-24T00:00:00.000Z',
    type: TxnType.Payment,
    issueDate: '123',
    paymentDate: '2023-05-24T00:00:00.000Z',
    paymentMethod: PaymentMethod.DirectToProvider,
    paymentType: PaymentType.Mastercard,
    transactionDate: '2023-05-24T00:00:00.000Z',
    amount: {
      amount: 67.32,
      currency: Currency.Aud,
    },
  },

  {
    id: '123',
    createdAt: '2023-05-24T00:00:00.000Z',
    type: TxnType.Payment,
    issueDate: '123',
    paymentDate: '2023-05-24T00:00:00.000Z',
    paymentMethod: PaymentMethod.DirectToProvider,
    paymentType: PaymentType.Visa,
    transactionDate: '2023-05-24T00:00:00.000Z',
    amount: {
      amount: 55.43,
      currency: Currency.Aud,
    },
  },
];

const expectedSections = {
  sections: [
    {
      data: [
        {
          amount: { amount: 123, currency: 'AUD' },
          createdAt: '2023-05-24T00:00:00.000Z',
          dateFrom: '2023-05-24T00:00:00.000Z',
          dateTo: '2023-05-24T00:00:00.000Z',
          dueDate: '2023-05-24T00:00:00.000Z',
          id: '123',
          issueDate: '123',
          status: 'Overdue',
          transactionDate: '2023-05-24T00:00:00.000Z',
          type: 'BILL',
        },
        {
          amount: { amount: 234.54, currency: 'AUD' },
          createdAt: '2023-05-24T00:00:00.000Z',
          dateFrom: '2023-05-24T00:00:00.000Z',
          dateTo: '2023-05-24T00:00:00.000Z',
          dueDate: '2023-05-24T00:00:00.000Z',
          id: '123',
          issueDate: '123',
          status: 'Paid',
          transactionDate: '2023-05-24T00:00:00.000Z',
          type: 'BILL',
        },
        {
          amount: { amount: 67.32, currency: 'AUD' },
          createdAt: '2023-05-24T00:00:00.000Z',
          id: '123',
          issueDate: '123',
          paymentDate: '2023-05-24T00:00:00.000Z',
          paymentMethod: 'DIRECT_TO_PROVIDER',
          paymentType: 'MASTERCARD',
          transactionDate: '2023-05-24T00:00:00.000Z',
          type: 'PAYMENT',
        },
        {
          amount: { amount: 55.43, currency: 'AUD' },
          createdAt: '2023-05-24T00:00:00.000Z',
          id: '123',
          issueDate: '123',
          paymentDate: '2023-05-24T00:00:00.000Z',
          paymentMethod: 'DIRECT_TO_PROVIDER',
          paymentType: 'VISA',
          transactionDate: '2023-05-24T00:00:00.000Z',
          type: 'PAYMENT',
        },
      ],
      title: '24 May 2023',
    },
  ],
};

describe('splitTransactionsIntoSections', () => {
  it('should work properly', () => {
    expect(splitTransactionsIntoSections({ transactions })).toEqual(expectedSections);
  });
});
