import {
  mockOnlineOffersQuery,
  mockOnlineOfferDetailQuery,
  mockCashbackCategoriesQuery,
  mockCashbackIntroductionContentQuery,
  mockCashbackBanksQuery,
  mockCashbackOnboardUserMutation,
  mockCashbackTransactionsQuery,
  mockCashbackInStoreOffersQuery,
  mockCashbackFeaturedOnlineOffersQuery,
  mockCashbackTermsAndConditionsAcceptanceQuery,
  mockCashbackAcceptTermsAndConditionsMutation,
  mockCashbackInStoreOfferDetailQuery,
  mockCashbackOnboardStatusQuery,
  mockCashbackTransactionsV2Query,
} from '../generated';
import { MockCashbackItemList } from './custom-mock/cashbackList';
import { MockCashbackDetail } from './custom-mock/cashbackDetail';
import { MockCashbackCategories } from './custom-mock/cashbackCategories';
import { mockCashbackIntroductionContentV2 } from './custom-mock/cashbackIntroductionContent';
import { mockCashbackBanks } from './custom-mock/cashbackBanks';
import { MockCashbackTransactions } from './custom-mock/cashbackTransactions';
import { MockInStoreOffers } from './custom-mock/cashbackInStoreOffers';
import { MockFeaturedOnlineOffers } from './custom-mock/cashbackFeaturedOnlineOffers';
import { aCashbackOnboardStatus } from '../mocks/generated-mocks';

export const cashbackOffersHandlers = [
  mockOnlineOffersQuery((req, res, ctx) => {
    const pageIndex = req.variables?.pageIndex || 1;
    // @ts-ignore
    const data = MockCashbackItemList[pageIndex];
    return res(ctx.delay(100), ctx.data({ onlineOffers: data ? { ...data, pageIndex: pageIndex } : null }));
  }),
  mockOnlineOfferDetailQuery((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ onlineOfferDetail: MockCashbackDetail }));
  }),
  mockCashbackCategoriesQuery((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ cashbackCategories: MockCashbackCategories }));
  }),
  mockCashbackIntroductionContentQuery((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ cashbackIntroductionContent: mockCashbackIntroductionContentV2 }));
  }),
  mockCashbackBanksQuery((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ cashbackBanks: mockCashbackBanks }));
  }),
  mockCashbackTransactionsQuery((_, res, ctx) => {
    // return res(ctx.delay(100),ctx.errors('something went wrong' ))
    return res(ctx.delay(100), ctx.data({ cashbackTransactions: MockCashbackTransactions }));
  }),
  mockCashbackOnboardUserMutation((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ cashbackOnboardUser: true }));
  }),
  mockCashbackInStoreOffersQuery((req, res, ctx) => {
    const pageIndex = req.variables?.pageIndex || 1;
    const data = MockInStoreOffers[pageIndex - 1];
    return res(ctx.delay(100), ctx.data({ cashbackInStoreOffers: { ...data, pageIndex: pageIndex } }));
  }),
  mockCashbackFeaturedOnlineOffersQuery((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ cashbackFeaturedOnlineOffers: MockFeaturedOnlineOffers }));
  }),
  mockCashbackAcceptTermsAndConditionsMutation((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ cashbackAcceptTermsAndConditions: { isAccepted: true } }));
  }),
  mockCashbackTermsAndConditionsAcceptanceQuery((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ cashbackTermsAndConditionsAcceptance: { isAccepted: true } }));
  }),
  mockCashbackInStoreOfferDetailQuery((_, res, ctx) => {
    const data = MockInStoreOffers[0].items[0];
    return res(ctx.delay(100), ctx.data({ cashbackInStoreOfferDetail: data }));
  }),
  mockCashbackOnboardStatusQuery((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ cashbackOnboardStatus: aCashbackOnboardStatus({ hasCLOOnboarded: true }) }));
  }),
  mockCashbackTransactionsV2Query((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ cashbackTransactionsV2: MockCashbackTransactions }));
  }),
];
