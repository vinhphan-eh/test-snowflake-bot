import { mockGetHeroPointsBalanceQuery, mockGetHeroPointsTransactionDetailQuery, mockGetHeroPointsTransactionHistoriesQuery } from '../generated';
import { mockHeroPointsTransactionDetail, mockHeroPointsTransactionHistories } from './custom-mock/heroPoints';

export const heroPointsHandlers = [
  mockGetHeroPointsBalanceQuery((_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(100),
      ctx.data({ 
        me: {
          heroPoints: {
            balance: 123456789
          }
        }
      }));
  }),
  mockGetHeroPointsTransactionDetailQuery((req, res, ctx) => {
    const transactionId = req.variables.id;
    return res(
      ctx.status(200),
      ctx.delay(100),
      ctx.data({ 
        me: {
          heroPoints: {
            transactionDetails: mockHeroPointsTransactionDetail(transactionId) 
          }
        }
      }));
  }),

  mockGetHeroPointsTransactionHistoriesQuery((req, res, ctx) => {
    const pageIndex = req.variables.pageIndex || 1;
    return res(
      ctx.status(200),
      ctx.delay(100),
      ctx.data({ 
        me: {
          heroPoints: {
            transactionHistories: mockHeroPointsTransactionHistories(pageIndex)
          }
        }
      }));
  }),
];