import {
  mockCashbackCategoriesQuery,
  mockGetInstoreOfferByIdQuery,
  mockGetOnlineOfferByIdQuery,
  mockGetFeaturedOffersQuery,
  mockGetInstoreOffersByAdvertiserIdQuery,
  mockGetCashbackOffersGroupByAdvertiserQuery,
} from '../generated';
import {
  mockCashbackCategories,
  mockInstoreOffer,
  mockOnlineOffer,
  mockFeaturedOffersData,
  mockInstoreOffersByAdvertiserId,
  mockInstoreOffersGroupByAdvertisers, mockCashbackUserToken, mockCashbackUserInfo, mockCashbackEHProviderId
} from './custom-mock/cashback';
import {
  mockCashbackEmploymentHeroProviderIdQuery,
  mockCashbackUserInfoQuery,
  mockCashbackUserTokenQuery, mockMinSupportVersionQuery
} from "../../graphql/generated";

export const cashbackHandlers = [
  mockGetOnlineOfferByIdQuery((_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(100),
      ctx.data({
        me: {
          cashback: {
            onlineOfferById: mockOnlineOffer,
          },
        },
      })
    );
  }),
  mockGetInstoreOfferByIdQuery((_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(100),
      ctx.data({
        me: {
          cashback: {
            inStoreOfferById: mockInstoreOffer,
          },
        },
      })
    );
  }),
  mockCashbackCategoriesQuery((_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(100),
      ctx.data({
        me: {
          cashback: {
            categories: mockCashbackCategories,
          },
        },
      })
    );
  }),
  mockGetFeaturedOffersQuery((_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(100), ctx.data(mockFeaturedOffersData));
  }),
  mockGetInstoreOffersByAdvertiserIdQuery((_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(100),
      ctx.data(mockInstoreOffersByAdvertiserId)
    );
  }),
  mockGetCashbackOffersGroupByAdvertiserQuery((_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(100),
      ctx.data(mockInstoreOffersGroupByAdvertisers)
    );
  }),
  mockCashbackUserTokenQuery((_, res, ctx) => {
    return res(ctx.status(200),ctx.delay(100),ctx.data(mockCashbackUserToken))
  }),
  mockCashbackUserInfoQuery((_, res, ctx) => {
    return res(ctx.status(200),ctx.delay(100),ctx.data(mockCashbackUserInfo))
  }),
  mockCashbackEmploymentHeroProviderIdQuery((_, res, ctx) => {
    return res(ctx.status(200),ctx.delay(100),ctx.data(mockCashbackEHProviderId))
  }),
    mockMinSupportVersionQuery((_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.delay(100),
            ctx.data({
              minSupportVersion: {
                benefits: {
                  minSupportAppVersion: '1.0.0',
                },
              },
            })
        );
    })
];
