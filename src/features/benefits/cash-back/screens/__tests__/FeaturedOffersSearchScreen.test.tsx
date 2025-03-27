import React from 'react';
import type { InfiniteData } from 'react-query';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { render, fireEvent } from '../../../../../common/utils/testing';
import type { GetFeaturedOffersQuery, OnlineOffer } from '../../../../../new-graphql/generated';
import { useInfiniteGetFeaturedOffersQuery } from '../../../../../new-graphql/generated';
import { mockFeaturedOffersData } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { FeaturedOffersSearchScreen } from '../FeaturedOffersSearchScreen';

const mockUseInfiniteGetFeaturedOffersQuery = useInfiniteGetFeaturedOffersQuery as unknown as jest.Mock<
  MockQueryResult<InfiniteData<GetFeaturedOffersQuery>>
>;
(mockUseInfiniteGetFeaturedOffersQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useInfiniteGetFeaturedOffersQuery: jest.fn(),
}));

describe('FeaturedOffersSearchScreen', () => {
  beforeEach(() => {
    mockUseInfiniteGetFeaturedOffersQuery.mockReturnValue({
      data: {
        pages: [mockFeaturedOffersData],
      } as never,
      isError: false,
      isLoading: false,
      isSuccess: true,
    });
  });

  it('should render correctly', async () => {
    const { getAllByText, getByText } = render(<FeaturedOffersSearchScreen />);
    expect(getByText('Featured offers')).toBeTruthy();
    expect(
      getAllByText(mockFeaturedOffersData.me?.cashback?.featuresOffers.edges[0].node.title ?? '').length
    ).toBeGreaterThan(1);
  });

  it('should navigate to OnlineOfferDetailScreen when click on offer', async () => {
    const { getByTestId } = render(<FeaturedOffersSearchScreen />);
    const offer = mockFeaturedOffersData.me?.cashback?.featuresOffers.edges[0].node as OnlineOffer;
    fireEvent.press(getByTestId(`online-offer-${offer.id}`));
    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'CashbackStack',
      params: { screen: 'OnlineOfferDetail', params: { offerId: offer.id, offer } },
    });
  });
});
