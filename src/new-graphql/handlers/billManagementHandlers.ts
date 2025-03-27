import {
  mockGetBmOfferQuery,
  mockGetSubscriptionsQuery,
  mockGetSubscriptionDetailQuery,
  mockGetSubscriptionTransactionsQuery,
  mockGetPromotionQuery,
} from '../generated';
import {
  aSubscriptionTransactionsQuery,
  mockBillOffers,
  mockPromotionQuery,
  mockSubscriptionDetailQuery,
  mockSubscriptionsQuery,
} from './custom-mock/billManangement';

export const billManagementHandlers = [
  mockGetBmOfferQuery((_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.data({
        me: {
          billManagement: {
            offersV3: mockBillOffers,
          },
        },
      })
    )
  ),
  mockGetSubscriptionsQuery((_, res, ctx) => res(ctx.status(200), ctx.data(mockSubscriptionsQuery))),
  mockGetSubscriptionDetailQuery((_, res, ctx) => res(ctx.status(200), ctx.data(mockSubscriptionDetailQuery))),
  mockGetSubscriptionTransactionsQuery((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data(aSubscriptionTransactionsQuery));
  }),
  mockGetPromotionQuery((_, res, ctx) => res(ctx.status(200), ctx.data(mockPromotionQuery))),
];
