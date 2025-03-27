import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { render, fireEvent } from '../../../../../common/utils/testing';

import type { GetFeaturedOffersQuery } from '../../../../../new-graphql/generated';
import { useGetFeaturedOffersQuery } from '../../../../../new-graphql/generated';
import { mockFeaturedOffersData } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { FeaturedCashbackOffers } from '../FeaturedCashbackOffers';

const mockUseGetFeaturedOffersQuery = useGetFeaturedOffersQuery as unknown as jest.Mock<
  MockQueryResult<GetFeaturedOffersQuery>
>;

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetFeaturedOffersQuery: jest.fn(),
}));

describe('FeaturedCashbackOffer', () => {
  beforeEach(() => {
    mockUseGetFeaturedOffersQuery.mockReturnValue({
      data: mockFeaturedOffersData,
      isLoading: false,
      isError: false,
    });
  });
  it('should render correctly', () => {
    const { getAllByLabelText, getByText } = render(<FeaturedCashbackOffers title="Feature cashback offers" />);

    expect(getByText('Feature cashback offers')).toBeTruthy();
    expect(getAllByLabelText('Cashback item').length).toBe(
      mockFeaturedOffersData.me?.cashback?.featuresOffers.edges.length
    );
  });

  it('should handle item pressed correctly', () => {
    const { getAllByLabelText, getByText } = render(<FeaturedCashbackOffers title="Feature cashback offers" />);

    expect(getByText('Feature cashback offers')).toBeTruthy();
    expect(getAllByLabelText('Cashback item').length).toBe(
      mockFeaturedOffersData.me?.cashback?.featuresOffers.edges.length
    );

    const [firstOffer] = getAllByLabelText('Cashback item');

    fireEvent.press(firstOffer);

    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'CashbackStack',
      params: {
        screen: 'OnlineOfferDetail',
        params: {
          offerId: mockFeaturedOffersData.me?.cashback?.featuresOffers.edges[0].node.id,
          offer: expect.anything(),
        },
      },
    });
  });

  it.each`
    isLoadingFeaturedOffers | expected
    ${true}                 | ${true}
    ${false}                | ${false}
  `('should show skeleton loading correctly', ({ expected, isLoadingFeaturedOffers }) => {
    mockUseGetFeaturedOffersQuery.mockReturnValue({
      data: mockFeaturedOffersData,
      isLoading: isLoadingFeaturedOffers,
      isError: false,
    });

    const { queryByTestId } = render(<FeaturedCashbackOffers title="Feature cashback offers" />);

    if (expected) {
      expect(queryByTestId('skeleton-loading')).not.toBeNull();
    } else {
      expect(queryByTestId('skeleton-loading')).toBeNull();
    }
  });

  it.each`
    isErrorFeaturedOffers | expected
    ${true}               | ${true}
    ${false}              | ${false}
  `('should show nothing when having error', ({ expected, isErrorFeaturedOffers }) => {
    mockUseGetFeaturedOffersQuery.mockReturnValue({
      data: mockFeaturedOffersData,
      isLoading: false,
      isError: isErrorFeaturedOffers,
    });

    const { queryByText } = render(<FeaturedCashbackOffers title="Feature cashback offers" />);

    if (expected) {
      expect(queryByText('Feature cashback offers')).toBeNull();
    } else {
      expect(queryByText('Feature cashback offers')).not.toBeNull();
    }
  });
});
