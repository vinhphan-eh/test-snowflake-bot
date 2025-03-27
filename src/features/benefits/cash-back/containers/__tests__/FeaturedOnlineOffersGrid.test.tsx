import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { fireEvent, render } from '../../../../../common/utils/testing';
import type { GetFeaturedOffersQuery } from '../../../../../new-graphql/generated';
import { useGetFeaturedOffersQuery } from '../../../../../new-graphql/generated';
import { mockFeaturedOffersData } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { mockUseCashbackPermission } from '../../../common/hooks/__mocks__/useCashbackPermission';
import { FeaturedOnlineOffersGrid } from '../FeaturedOnlineOffersGrid';

const mockUseFeaturedOffersQuery = useGetFeaturedOffersQuery as unknown as jest.Mock<
  MockQueryResult<GetFeaturedOffersQuery>
>;

(mockUseFeaturedOffersQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetFeaturedOffersQuery: jest.fn(),
}));

describe('FeaturedOnlineOffersGrid', () => {
  beforeEach(() => {
    mockUseFeaturedOffersQuery.mockReturnValue({
      data: mockFeaturedOffersData,
      isSuccess: true,
      isLoading: false,
      isError: false,
    });
    mockUseCashbackPermission.mockReturnValue({ permission: true } as never);
  });

  it('should render correctly', async () => {
    const { getByText } = render(<FeaturedOnlineOffersGrid onPress={() => {}} />);
    expect(getByText('Featured offers')).toBeTruthy();
  });

  it('should render correctly when loading', async () => {
    mockUseFeaturedOffersQuery.mockReturnValue({
      data: mockFeaturedOffersData,
      isLoading: true,
      isError: false,
    });
    const { getAllByTestId } = render(<FeaturedOnlineOffersGrid onPress={() => {}} />);
    expect(getAllByTestId('product-item-skeleton').length).toEqual(6);
  });

  it('should handle click on carousel', async () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(<FeaturedOnlineOffersGrid onPress={mockOnPress} testID="featured-offers" />);
    fireEvent.press(getByTestId('featured-offers-header-icon'));
    expect(mockOnPress).toBeCalledTimes(1);
  });

  it('should display at most 6 featured offers item', async () => {
    const { getAllByText } = render(
      <FeaturedOnlineOffersGrid numberOfItems={6} onPress={() => {}} testID="featured-offers" />
    );
    expect(getAllByText('Online').length).toBeLessThanOrEqual(6);
  });

  it('should navigate to product detail when productItems are pressed', async () => {
    const { getAllByText } = render(
      <FeaturedOnlineOffersGrid numberOfItems={6} onPress={() => {}} testID="featured-offers" />
    );
    fireEvent.press(getAllByText('Online')[0]);
    expect(mockedNavigate).toBeCalledTimes(1);
    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'CashbackStack',
      params: {
        params: {
          offerId: mockFeaturedOffersData.me?.cashback?.featuresOffers.edges[0].node.id,
          offer: mockFeaturedOffersData.me?.cashback?.featuresOffers.edges[0].node,
        },
        screen: 'OnlineOfferDetail',
      },
    });
  });
});
