import React from 'react';
import type { InfiniteData } from 'react-query';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { render, fireEvent } from '../../../../../common/utils/testing';
import type { GetSsAllOffersQuery, SwagStoreOffer } from '../../../../../new-graphql/generated';
import { useInfiniteGetSsAllOffersQuery } from '../../../../../new-graphql/generated';
import { mockAllOfferGiftCardsData } from '../../../../../new-graphql/handlers/custom-mock/swagStore';
import { GiftCardsSearchScreen } from '../GiftCardsSearchScreen';

const mockUseInfiniteGetSsAllOffersQuery = useInfiniteGetSsAllOffersQuery as unknown as jest.Mock<
  MockQueryResult<InfiniteData<GetSsAllOffersQuery>>
>;
(mockUseInfiniteGetSsAllOffersQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useInfiniteGetSsAllOffersQuery: jest.fn(),
}));

describe('GiftCardsSearchScreen', () => {
  beforeEach(() => {
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
    const { queryByTestId } = render(<GiftCardsSearchScreen />);
    expect(queryByTestId('giftcard-search-screen')).toBeVisible();
  });

  it('should navigate to ProductDetail when click on offer', async () => {
    const { getByTestId } = render(<GiftCardsSearchScreen />);
    const offer = mockAllOfferGiftCardsData.me?.swagStore?.allOffers.edges[0].node as SwagStoreOffer;
    fireEvent.press(getByTestId(`gift-card-item-0`));
    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
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
