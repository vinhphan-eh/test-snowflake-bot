import type { MockInfiniteQueryResult, MockMutation, MockQueryResult } from '../../common/types/react-query';
import {
  useGetBenefitsCategoriesQuery,
  type GetBenefitsCategoriesQuery,
  useSearchAllProductsQuery,
  type SearchAllProductsQuery,
  useGetCashbackOffersQuery,
  useInfiniteGetCashbackOffersQuery,
  type GetCashbackOffersQuery,
  useInfiniteGetCashbackOffersGroupByAdvertiserQuery,
  useGetCashbackOffersGroupByAdvertiserQuery,
  type GetCashbackOffersGroupByAdvertiserQuery,
  useShowInstapayIntroductionQuery,
  type ShowInstapayIntroductionQuery,
  useAddPreferInstapayOptionMutation,
  type GetSsAllOffersQuery,
  useInfiniteGetSsAllOffersQuery,
} from '../generated';
import { mockBenefitsCategories } from '../handlers/custom-mock/benefits';

export const mockUseGetBenefitsCategoriesQuery = useGetBenefitsCategoriesQuery as unknown as jest.Mock<
  MockQueryResult<GetBenefitsCategoriesQuery>
>;

export const mockUseSearchAllProductsQuery = useSearchAllProductsQuery as unknown as jest.Mock<
  MockQueryResult<SearchAllProductsQuery>
>;

export const mockUseGetCashbackOffersQuery = useGetCashbackOffersQuery as unknown as jest.Mock<
  MockQueryResult<GetCashbackOffersQuery>
>;

export const mockUseInfiniteGetCashbackOffersQuery = useInfiniteGetCashbackOffersQuery as unknown as jest.Mock<
  MockInfiniteQueryResult<GetCashbackOffersQuery>
>;

export const mockUseInfiniteGetCashbackOffersGroupByAdvertiserQuery =
  useInfiniteGetCashbackOffersGroupByAdvertiserQuery as unknown as jest.Mock<
    MockInfiniteQueryResult<GetCashbackOffersGroupByAdvertiserQuery>
  >;

export const mockUseGetCashbackOffersGroupByAdvertiserQuery =
  useGetCashbackOffersGroupByAdvertiserQuery as unknown as jest.Mock<
    MockQueryResult<GetCashbackOffersGroupByAdvertiserQuery>
  >;

export const mockUseInfiniteGetSsAllOffersQuery = useInfiniteGetSsAllOffersQuery as unknown as jest.Mock<
  MockInfiniteQueryResult<GetSsAllOffersQuery>
>;

export const mockUseShowInstapayIntroductionQuery = useShowInstapayIntroductionQuery as unknown as jest.Mock<
  MockQueryResult<ShowInstapayIntroductionQuery>
>;

export const mockUseAddPreferInstapayOptionMutation =
  useAddPreferInstapayOptionMutation as unknown as jest.Mock<MockMutation>;

jest.mock('../generated', () => ({
  ...jest.requireActual('../generated'),
  useGetBenefitsCategoriesQuery: jest.fn(),
  useSearchAllProductsQuery: jest.fn(),
  useGetCashbackOffersQuery: jest.fn(),
  useInfiniteGetCashbackOffersQuery: jest.fn(),
  useInfiniteGetCashbackOffersGroupByAdvertiserQuery: jest.fn(),
  useGetCashbackOffersGroupByAdvertiserQuery: jest.fn(),
  useInfiniteGetSsAllOffersQuery: jest.fn(),
  useShowInstapayIntroductionQuery: jest.fn(),
  useAddPreferInstapayOptionMutation: jest.fn(),
}));

beforeEach(() => {
  mockUseGetBenefitsCategoriesQuery.mockReturnValue({
    data: {
      me: {
        benefits: {
          categories: mockBenefitsCategories,
        },
      },
    },
    isLoading: false,
    isError: false,
  });
});
