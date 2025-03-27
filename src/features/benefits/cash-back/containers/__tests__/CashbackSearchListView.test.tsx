import React from 'react';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { mockUseInfiniteGetCashbackOffersQuery } from '../../../../../new-graphql/__mocks__/mockBenefits';
import { OfferType } from '../../../../../new-graphql/generated';
import { mockInstoreOffer, mockOnlineOffer } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { CashbackSearchListView } from '../CashbackSearchListView';

const getDefaultProps = () => {
  return {
    categoryCode: 'all',
    categoryName: 'All',
    isShowNavBar: true,
    offerType: OfferType.Online,
    onItemPressed: jest.fn(),
    query: '',
    renderTop: jest.fn(),
    setSearchQuery: jest.fn(),
  };
};

describe('CashbackSearchListView', () => {
  const props = getDefaultProps();
  const setup = () => {
    return render(<CashbackSearchListView {...props} />);
  };

  beforeEach(() => {
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
                  ],
                } as never,
              },
            },
          },
        ],
        pageParams: {} as never,
      },
    });
  });

  it('should render default correctly', () => {
    const { getByText } = setup();

    expect(getByText('Search all offers')).toBeTruthy();
    expect(getByText('Online cashback')).toBeTruthy();
  });

  it('should render with correct category', () => {
    const mockProps = {
      ...props,
      categoryCode: 'dining',
      categoryName: 'Dining',
    };
    const { getByText } = render(<CashbackSearchListView {...mockProps} />);

    expect(getByText('Search dining offers')).toBeTruthy();
    expect(getByText('Online cashback')).toBeTruthy();
  });

  it('should render correctly with instore offers', () => {
    const mockProps = {
      ...props,
      categoryCode: 'dining',
      categoryName: 'Dining',
      offerType: OfferType.Instore,
    };
    const { getByText } = render(<CashbackSearchListView {...mockProps} />);

    expect(getByText('Search dining offers')).toBeTruthy();
    expect(getByText('In-store cashback')).toBeTruthy();
  });

  it('should render online item correctly', () => {
    const { getByLabelText, getByTestId, getByText } = setup();

    expect(getByTestId('online-offer-0')).toBeTruthy();
    expect(getByText('Online')).toBeTruthy();
    expect(getByText('8% Cashback on All Purchases')).toBeTruthy();
    expect(getByText('Gourmet Basket')).toBeTruthy();
    expect(getByLabelText('Product Image')).toBeTruthy();
    expect(getByLabelText('Product Logo')).toBeTruthy();

    fireEvent.press(getByTestId('online-offer-0'));

    expect(props.onItemPressed).toHaveBeenCalled();
  });

  it('should render instore item correctly', () => {
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
    const { getByLabelText, getByTestId, getByText } = setup();

    expect(getByTestId('instore-offer-0')).toBeTruthy();
    expect(getByText('Up to 4% Cashback')).toBeTruthy();
    expect(getByText('Novo Shoes')).toBeTruthy();
    expect(getByLabelText('Product Image')).toBeTruthy();
    expect(getByLabelText('Product Logo')).toBeTruthy();

    fireEvent.press(getByTestId('instore-offer-0'));

    expect(props.onItemPressed).toHaveBeenCalled();
  });

  it('should render correctly when is error', () => {
    mockUseInfiniteGetCashbackOffersQuery.mockReturnValue({
      isError: true,
      isLoading: false,
      data: undefined as never,
    });
    const { getByText } = setup();

    expect(getByText('No results found!')).toBeTruthy();
    expect(getByText(`Please adjust your search to find the offers you're looking for.`)).toBeTruthy();
  });

  it('should render correctly when is empty', () => {
    mockUseInfiniteGetCashbackOffersQuery.mockReturnValue({
      isError: false,
      isLoading: false,
      data: {} as never,
    });
    const { getByText } = setup();

    expect(getByText('No results found!')).toBeTruthy();
    expect(getByText(`Please adjust your search to find the offers you're looking for.`)).toBeTruthy();
  });

  it('should render correctly when is loading', () => {
    mockUseInfiniteGetCashbackOffersQuery.mockReturnValue({
      isError: false,
      isLoading: true,
      data: {} as never,
    });
    const { getByTestId } = setup();

    expect(getByTestId('skeleton-loading')).toBeTruthy();
  });
});
