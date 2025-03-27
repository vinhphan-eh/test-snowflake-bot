import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { mockUseIsAccountAU } from '../../../../../common/hooks/__mocks__/useIsAccountAU';
import type { MockInfiniteQueryResult, MockQueryResult } from '../../../../../common/types/react-query';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { MockGetCatalogues } from '../../../../../graphql/handlers/custom-mock/catalogues';
import type {
  CashbackCategoriesQuery,
  GetSsAllOffersQuery,
  SwagStoreOffer,
} from '../../../../../new-graphql/generated';
import {
  useCashbackCategoriesQuery,
  useGetSsAllOffersQuery,
  useInfiniteGetSsAllOffersQuery,
} from '../../../../../new-graphql/generated';
import { mockCashbackCategories } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { mockAllOfferGiftCardsData } from '../../../../../new-graphql/handlers/custom-mock/swagStore';
import { mockUseBillPromotionPermission } from '../../../bill-streaming/hooks/__mocks__/useBillPromotionPermission';
import {
  mockUseBillStreamPermission,
  mockUseBillStreamPermissionByProvider,
} from '../../../bill-streaming/hooks/__mocks__/useBillStreamPermission';
import { mockUseSwagStorePermission } from '../../../swag-store/hooks/__mocks__/useSwagStorePermission';
import { mockUseCashbackPermission } from '../../hooks/__mocks__/useCashbackPermission';
import { OnlineOffersTab } from '../OnlineOffersTab';

const mockUseCashbackCategoriesQuery = useCashbackCategoriesQuery as unknown as jest.Mock<
  MockQueryResult<CashbackCategoriesQuery>
>;
(mockUseCashbackCategoriesQuery as unknown as { getKey: () => string }).getKey = jest.fn();

const mockUseInfiniteGetSsAllOffersQuery = useInfiniteGetSsAllOffersQuery as unknown as jest.Mock<
  MockInfiniteQueryResult<GetSsAllOffersQuery>
>;
(mockUseInfiniteGetSsAllOffersQuery as unknown as { getKey: () => string }).getKey = jest.fn();

const mockUseGetSsAllOffersQuery = useGetSsAllOffersQuery as unknown as jest.Mock<MockQueryResult<GetSsAllOffersQuery>>;
(mockUseGetSsAllOffersQuery as unknown as { getKey: () => string }).getKey = jest.fn();
const giftCards = MockGetCatalogues[0].items;

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useCashbackCategoriesQuery: jest.fn(),
  useGetSsAllOffersQuery: jest.fn(),
  useInfiniteGetSsAllOffersQuery: jest.fn(),
}));

describe('OnlineOffersScreenV2 AU', () => {
  beforeEach(() => {
    mockUseSwagStorePermission.mockReturnValue({
      permission: true,
      isLoading: false,
      isFetched: true,
    });

    mockUseBillStreamPermissionByProvider.mockReturnValue({ permission: true, isFetched: true });

    mockUseBillPromotionPermission.mockReturnValue({ havingPermission: false, isFetched: true });

    mockUseCashbackCategoriesQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            categories: mockCashbackCategories,
          },
        },
      },
      isLoading: false,
      isError: false,
    });

    mockUseGetSsAllOffersQuery.mockReturnValue({
      data: {
        me: {
          swagStore: {
            allOffers: {
              edges: giftCards.map(item => ({
                node: {
                  ...item,
                  imageUrl: item.image.url || '',
                },
              })),
              pageInfo: {
                hasNextPage: false,
                endCursor: null,
              },
            },
          },
        },
      },
      isSuccess: true,
      isError: false,
    });
    mockUseIsAccountAU.mockReturnValue(true);
    mockUseBillStreamPermission.mockReturnValue({ permission: true, isFetched: true });
    mockUseCashbackPermission.mockReturnValue({ permission: true } as never);
  });

  it('should work correctly when pressing search box', () => {
    const { getByTestId } = render(<OnlineOffersTab />);
    fireEvent.press(getByTestId('search-box'));

    expect(mockedEventTracking).toBeCalledWith({
      categoryName: 'user action',
      event: 'Click on benefits search bar',
      metaData: {
        location: 'benefits-online',
        module: 'Benefits pillar',
      },
    });

    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'GeneralSearchScreen',
      params: {
        fromTab: 'benefits-online',
      },
    });
  });

  it('shoudl work correctly when pressing category', () => {
    const { getByText } = render(<OnlineOffersTab />);
    fireEvent.press(getByText('Fashion'));

    expect(mockedEventTracking).toHaveBeenCalledWith({
      event: 'Click on category shortcut',
      categoryName: 'user action',
      metaData: {
        module: 'Benefits pillar',
        location: 'benefits-online',
        selectedCategory: 'fashion',
      },
    });

    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'GeneralSearchScreen',
      params: {
        defaultCategory: {
          code: 'fashion',
          name: 'Fashion',
        },
        fromTab: 'benefits-online',
      },
    });
  });

  it('should render correctly', async () => {
    const { getByText } = render(<OnlineOffersTab />);
    expect(getByText('Bills & Subscriptions')).toBeTruthy();
    expect(getByText('Featured offers')).toBeTruthy();
    expect(getByText('Gift cards')).toBeTruthy();
  });

  it('should handle click on featured offers grid', async () => {
    const { getByTestId } = render(<OnlineOffersTab />);
    fireEvent.press(getByTestId('featured-offers-header-icon'));
    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'CashbackStack',
      params: {
        screen: 'FeaturedOffersSearchScreen',
      },
    });
  });

  it('should handle click on gift cards carousel', async () => {
    const { getByTestId } = render(<OnlineOffersTab />);
    fireEvent.press(getByTestId('gift-cards-header-icon'));
    expect(mockedNavigate).toBeCalled();
    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'SwagStoreStack',
      params: {
        screen: 'GiftCardsSearchScreen',
      },
    });
  });
});

describe('OnlineOffersScreenV2 non-AU', () => {
  beforeEach(() => {
    mockUseSwagStorePermission.mockReturnValue({
      permission: true,
      isLoading: false,
      isFetched: true,
    });

    mockUseBillPromotionPermission.mockReturnValue({ havingPermission: false, isFetched: true });
    mockUseIsAccountAU.mockReturnValue(false);

    mockUseInfiniteGetSsAllOffersQuery.mockReturnValue({
      data: {
        pages: [mockAllOfferGiftCardsData],
      } as never,
      isError: false,
      isLoading: false,
      isSuccess: true,
    });
  });

  it('should render correctly', async () => {
    const { queryByTestId } = render(<OnlineOffersTab />);
    expect(queryByTestId('online-tab-giftcard-search')).toBeVisible();
  });

  it('should navigate to ProductDetail when click on offer', async () => {
    const { getByTestId } = render(<OnlineOffersTab />);
    const offer = mockAllOfferGiftCardsData.me?.swagStore?.allOffers.edges[0].node as SwagStoreOffer;
    fireEvent.press(getByTestId(`gift-card-item-0`));
    expect(mockedNavigate).toHaveBeenCalledWith('BenefitsStack', {
      screen: 'DiscountShopStack',
      params: {
        screen: 'ProductDetail',
        params: {
          productCode: offer.productCode,
        },
      },
    });
  });
});
