import { mockGetTransactionsQuery } from '../generated';
import { aCurrencyAmount, aTransaction } from '../mocks/generated-mocks';

export const transactionHandlers = [
  mockGetTransactionsQuery((_, res, ctx) => {
    const currency = aCurrencyAmount();
    return res(
      ctx.delay(600),
      ctx.data({
        getTransactions: [
          aTransaction({
            accountId: '1',
            clearingTimeUtc: '1',
            currencyAmount: currency,
            description: 'Hello',
            transactionId: '1234',
          }),
          aTransaction({
            accountId: '1',
            clearingTimeUtc: '1',
            currencyAmount: currency,
            description: 'Hello',
            transactionId: '1234',
          }),
        ],
      })
    );
  }),
];
