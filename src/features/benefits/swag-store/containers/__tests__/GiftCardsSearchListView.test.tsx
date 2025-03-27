import React from 'react';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { mockUseInfiniteGetSsAllOffersQuery } from '../../../../../new-graphql/__mocks__/mockBenefits';
import { mockAllOfferGiftCardsData } from '../../../../../new-graphql/handlers/custom-mock/swagStore';
import { GiftCardsSearchListView } from '../GiftCardsSearchListView';

const getDefaultProps = () => {
  return {
    isShowNavBar: true,
    onItemPressed: jest.fn(),
    query: '',
    setSearchQuery: jest.fn(),
  };
};

describe('GiftCardsSearchListView', () => {
  const props = getDefaultProps();
  const setup = () => {
    return render(<GiftCardsSearchListView {...props} />);
  };

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

  it('should render default correctly', async () => {
    const { getAllByText, getByText } = setup();
    expect(getByText('Gift cards')).toBeTruthy();
    expect(
      getAllByText(mockAllOfferGiftCardsData.me?.swagStore?.allOffers.edges[0].node.title ?? '').length
    ).toBeTruthy();
  });

  it('should work correctly when click on offer', async () => {
    const { getByTestId } = setup();
    fireEvent.press(getByTestId(`gift-card-item-0`));
    expect(props.onItemPressed).toHaveBeenCalled();
  });

  it('should render correctly when is error', () => {
    mockUseInfiniteGetSsAllOffersQuery.mockReturnValue({
      isError: true,
      isLoading: false,
      data: undefined as never,
    });
    const { getByText } = setup();

    expect(getByText('No results found!')).toBeTruthy();
    expect(getByText(`Please adjust your search to find the offers you're looking for.`)).toBeTruthy();
  });

  it('should render correctly when is empty', () => {
    mockUseInfiniteGetSsAllOffersQuery.mockReturnValue({
      isError: false,
      isLoading: false,
      data: {} as never,
    });
    const { getByText } = setup();

    expect(getByText('No results found!')).toBeTruthy();
    expect(getByText(`Please adjust your search to find the offers you're looking for.`)).toBeTruthy();
  });

  it('should render correctly when is loading', () => {
    mockUseInfiniteGetSsAllOffersQuery.mockReturnValue({
      isError: false,
      isLoading: true,
      data: {} as never,
    });
    const { getByTestId } = setup();

    expect(getByTestId('skeleton-loading')).toBeTruthy();
  });
});
