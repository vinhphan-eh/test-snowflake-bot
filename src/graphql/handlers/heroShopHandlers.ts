import {
  mockDiscountShopProductsQuery,
  mockDiscountShopProductDetailQuery,
  mockMakePaymentMutation,
  mockPickForYouQuery,
  mockDiscountOrderHistoryQuery,
  mockPaymentVerifyCreditCardQuery,
  mockPopularGiftCardsQuery,
  mockBuyAgainGiftCardsQuery,
} from '../generated';
import { MockGetCatalogues } from './custom-mock/catalogues';
import { mockProductDetailStock } from './custom-mock/productDetail';
import { MockGetOrderHistory } from './custom-mock/orderHistory';
import { aMakePaymentResponse, aVerifyCreditCard } from '../mocks/generated-mocks';

export const heroShopHandlers = [
  mockDiscountShopProductsQuery((req, res, ctx) => {
    const pageIndex = req.variables?.pageIndex || 1;
    const data = MockGetCatalogues[pageIndex - 1];
    return res(ctx.delay(100), ctx.data({ discountShopProducts: { ...data, pageIndex: pageIndex } }));
  }),
  mockDiscountShopProductDetailQuery((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ discountShopProductDetail: mockProductDetailStock() }));
  }),
  mockMakePaymentMutation((_, res, ctx) => {
    return res(ctx.status(201), ctx.delay(100), ctx.data({ makePayment: aMakePaymentResponse() }));
    // return res(ctx.delay(500),ctx.status(400),ctx.errors([{message:"Something went wrong"}]));
  }),
  mockPickForYouQuery((_, res, ctx) => {
    const data = MockGetCatalogues[0];
    return res(ctx.delay(100), ctx.data({ pickForYou: { items: [data.items[5]] } }));
  }),
  mockDiscountOrderHistoryQuery((req, res, ctx) => {
    const pageIndex = req.variables.pageIndex || 1;
    // @ts-ignore
    const data = MockGetOrderHistory[pageIndex];
    return res(ctx.delay(100), ctx.data({ discountOrderHistory: data ? { ...data, pageIndex: pageIndex } : null }));
  }),
  mockPaymentVerifyCreditCardQuery((_, res, ctx) =>
    res(ctx.delay(100), ctx.data({ paymentVerifyCreditCard: aVerifyCreditCard() }))
  ),
  mockPopularGiftCardsQuery((_, res, ctx) => {
    const data = MockGetCatalogues[0].items.slice(0, 5);
    return res(ctx.delay(100), ctx.data({ popularGiftCards: data }));
  }),
  mockBuyAgainGiftCardsQuery((_, res, ctx) => {
    const data = MockGetCatalogues[1].items.slice(0, 5);
    return res(ctx.delay(100), ctx.data({ buyAgainGiftCards: data }));
  }),
];
