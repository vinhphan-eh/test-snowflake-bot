import { mockGetTransactionsV2Query } from '../generated';
import { aFinancialTransaction } from '../mocks/generated-mocks';

export const transactionV2Handlers = [
  mockGetTransactionsV2Query((_, res, ctx) => {
    return res(
      ctx.delay(600),
      ctx.data({
        getTransactionsV2: [
          aFinancialTransaction({
            id: '1',
            dateTimeUTC: '2022-08-30T00:00:00Z',
            currencyAmount: { currency: 'AUD', amount: -20 },
            type: 'Test',
            cardId: 'test-uuid',
            description: 'mock transaction',
          }),
          aFinancialTransaction({
            id: '1',
            dateTimeUTC: '2022-08-30T00:00:00Z',
            currencyAmount: { currency: 'AUD', amount: -30 },
            type: 'Test',
            cardId: 'test-uuid',
            merchant: {
              name: 'Test',
              singleLineAddress: 'street B',
            },
          }),
          aFinancialTransaction({
            id: '1',
            cardId: null,
            dateTimeUTC: '2022-08-30T00:00:00Z',
            currencyAmount: { currency: 'AUD', amount: 30 },
            type: 'Test',
            merchant: {},
            description: 'PokitPal 2',
            transferPeerDetails: {
              name: 'POKITPAL PTY LIM',
            },
            reference: null,
          }),
          aFinancialTransaction({
            id: '1',
            cardId: null,
            dateTimeUTC: '2022-08-30T00:00:00Z',
            currencyAmount: { currency: 'AUD', amount: 30 },
            type: 'Test',
            merchant: {},
            description: 'a description',
            transferPeerDetails: {
              name: 'Transfer Peer Name',
            },
            reference: null,
          }),
        ],
      })
    );
  }),
];
