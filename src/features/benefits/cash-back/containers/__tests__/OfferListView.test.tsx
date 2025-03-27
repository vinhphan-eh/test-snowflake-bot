import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { mockUseInfiniteGetCashbackOffersQuery } from '../../../../../new-graphql/__mocks__/mockBenefits';
import { mockInstoreOffer, mockOnlineOffer } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { OfferListView } from '../OfferListView';

describe('OfferListView', () => {
  it('should render correctly when is loading', () => {
    mockUseInfiniteGetCashbackOffersQuery.mockReturnValue({
      isLoading: true,
      data: undefined as never,
    });
    const { getByTestId } = render(<OfferListView onItemPress={() => {}} searchQuery="" selectedType={undefined} />);

    expect(getByTestId('skeleton-loading')).toBeTruthy();
  });

  it('should render correctly when is error', () => {
    mockUseInfiniteGetCashbackOffersQuery.mockReturnValue({
      isError: true,
      isLoading: false,
      data: undefined as never,
    });
    const { getByText } = render(<OfferListView onItemPress={() => {}} searchQuery="" selectedType={undefined} />);

    expect(getByText('No results found!')).toBeTruthy();
    expect(getByText(`Please adjust your search to find the offers you're looking for.`)).toBeTruthy();
  });

  it('should render correctly when is empty', () => {
    mockUseInfiniteGetCashbackOffersQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {} as never,
    });
    const { getByText } = render(<OfferListView onItemPress={() => {}} searchQuery="" selectedType={undefined} />);

    expect(getByText('No results found!')).toBeTruthy();
    expect(getByText(`Please adjust your search to find the offers you're looking for.`)).toBeTruthy();
  });

  it('should render correctly', () => {
    mockUseInfiniteGetCashbackOffersQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        pages: [
          {
            me: {
              cashback: {
                allOffers: {
                  edges: [
                    {
                      node: mockOnlineOffer,
                    },
                    {
                      node: mockInstoreOffer,
                    },
                  ],
                } as never,
              },
            },
          },
        ],
        pageParams: {} as never,
      },
    });
    const { getByTestId } = render(<OfferListView onItemPress={() => {}} searchQuery="" selectedType={undefined} />);

    expect(getByTestId('online-offer-0')).toBeTruthy();
    expect(getByTestId('instore-offer-1')).toBeTruthy();
  });
});
