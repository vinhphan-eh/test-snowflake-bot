import {
  mockHeroDollarBalanceQuery,
  mockHeroDollarTransactionDetailQuery,
  mockHeroDollarTransactionsQuery,
} from '../generated';
import { mockHDBalance, mockHDTransactionDetail, mockHDTransactions } from './custom-mock/heroDollar';

export const heroDollarHandlers = [
  mockHeroDollarBalanceQuery((_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(100), ctx.data({ heroDollarBalance: mockHDBalance() }));
  }),
  mockHeroDollarTransactionsQuery((req, res, ctx) => {
    const pageIndex = req.variables.pageIndex || 1;

    return res(ctx.status(200), ctx.delay(100), ctx.data({ heroDollarTransactions: mockHDTransactions(pageIndex) }));
  }),
  mockHeroDollarTransactionDetailQuery((req, res, ctx) => {
    const transactionId = req.variables.transactionId;
    return res(
      ctx.status(200),
      ctx.delay(100),
      ctx.data({ heroDollarTransactionDetail: mockHDTransactionDetail(transactionId) })
    );
  }),
];
