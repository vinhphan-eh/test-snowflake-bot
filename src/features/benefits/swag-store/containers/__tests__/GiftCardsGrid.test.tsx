import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { MockGetCatalogues } from '../../../../../graphql/handlers/custom-mock/catalogues';
import { useGetSsAllOffersQuery, type GetSsAllOffersQuery } from '../../../../../new-graphql/generated';
import { mockUseSwagStorePermission } from '../../hooks/__mocks__/useSwagStorePermission';
import { GiftCardsGrid } from '../GiftCardsGrid';

const mockUseGetSsAllOffersQuery = useGetSsAllOffersQuery as unknown as jest.Mock<MockQueryResult<GetSsAllOffersQuery>>;
(mockUseGetSsAllOffersQuery as unknown as { getKey: () => string }).getKey = jest.fn();

const giftCards = MockGetCatalogues[0].items;

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetSsAllOffersQuery: jest.fn(),
}));

describe('GiftCardsGrid', () => {
  beforeEach(() => {
    mockUseSwagStorePermission.mockReturnValue({ permission: true, isFetched: true });
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
  });

  it('should render correctly', async () => {
    const { getByText } = render(<GiftCardsGrid onPress={() => {}} location="gift card grid online tab" />);
    expect(getByText('Gift cards')).toBeTruthy();
  });

  it('should render correctly when loading', async () => {
    mockUseGetSsAllOffersQuery.mockReturnValue({
      data: {
        me: {
          swagStore: {
            allOffers: {
              edges: [],
              pageInfo: {
                hasNextPage: false,
                endCursor: null,
              },
            },
          },
        },
      },
      isLoading: true,
      isError: false,
    });
    const { getAllByTestId } = render(<GiftCardsGrid location="gift card grid online tab" onPress={() => {}} />);
    expect(getAllByTestId('product-item-skeleton').length).toEqual(6);
  });

  it('should handle click on ', async () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <GiftCardsGrid location="gift card grid online tab" testID="gift-cards" onPress={mockOnPress} />
    );
    fireEvent.press(getByTestId('gift-cards-header-icon'));
    expect(mockOnPress).toBeCalledTimes(1);
  });

  it('should navigate to product detail when productItems are pressed', async () => {
    const { getAllByTestId } = render(
      <GiftCardsGrid location="gift card grid online tab" testID="gift-cards" onPress={() => {}} />
    );
    fireEvent.press(getAllByTestId('gift-cards-item')[0]);

    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'DiscountShopStack',
      params: { params: { productCode: giftCards[0].productCode }, screen: 'ProductDetail' },
    });
  });
});
