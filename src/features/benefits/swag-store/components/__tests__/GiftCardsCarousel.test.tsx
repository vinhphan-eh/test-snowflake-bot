import React from 'react';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { mockAllOfferGiftCardsData } from '../../../../../new-graphql/handlers/custom-mock/swagStore';
import { mockUseSwagStorePermission } from '../../hooks/__mocks__/useSwagStorePermission';
import { GiftCardsCarousel } from '../GiftCardsCarousel';

const giftCards = mockAllOfferGiftCardsData.me?.swagStore?.allOffers.edges.map(edge => edge.node) || [];

describe('GiftCardsCarousel', () => {
  beforeEach(() => {
    mockUseSwagStorePermission.mockReturnValue({
      permission: true,
      isLoading: false,
      isFetched: true,
    });
  });

  it('should render nothing when no permisison', () => {
    mockUseSwagStorePermission.mockReturnValue({
      permission: false,
      isLoading: false,
      isFetched: true,
    });
    const { queryByText } = render(
      <GiftCardsCarousel
        onPress={() => {}}
        location="buy again carousel"
        isLoading={false}
        giftCards={[]}
        isError={false}
      />
    );

    expect(queryByText('Gift cards')).toBeNull();
  });

  it('should render nothing when data is empty', () => {
    const { queryByText } = render(
      <GiftCardsCarousel
        onPress={() => {}}
        location="buy again carousel"
        isLoading={false}
        giftCards={[]}
        isError={false}
      />
    );

    expect(queryByText('Gift cards')).toBeNull();
  });

  it('should render nothing when is error', () => {
    const { queryByText } = render(
      <GiftCardsCarousel onPress={() => {}} location="buy again carousel" isLoading={false} giftCards={[]} isError />
    );

    expect(queryByText('Gift cards')).toBeNull();
  });

  it('should render skeleton when is loading', () => {
    const { getByTestId, getByText } = render(
      <GiftCardsCarousel onPress={() => {}} location="buy again carousel" isLoading giftCards={[]} isError={false} />
    );

    expect(getByText('Gift cards')).toBeTruthy();
    expect(getByTestId('skeleton-loading')).toBeTruthy();
  });

  it('should display at most 10 giftCard items', async () => {
    const { getAllByTestId } = render(
      <GiftCardsCarousel
        testID="gift-cards"
        onPress={() => {}}
        location="buy again carousel"
        isLoading={false}
        giftCards={giftCards}
        isError={false}
      />
    );
    expect(getAllByTestId('gift-cards-item').length).toBeLessThanOrEqual(10);
  });

  it('onPress should work correctly', async () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <GiftCardsCarousel
        testID="gift-cards"
        onPress={mockOnPress}
        location="buy again carousel"
        isLoading={false}
        giftCards={giftCards}
        isError={false}
      />
    );

    fireEvent.press(getByTestId('gift-cards-header-icon'));
    expect(mockOnPress).toBeCalledTimes(1);
  });
});
