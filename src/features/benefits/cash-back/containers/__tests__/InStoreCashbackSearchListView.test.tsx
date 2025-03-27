import React from 'react';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { mockNavigateToBenefitsTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import { mockUseInfiniteGetCashbackOffersGroupByAdvertiserQuery } from '../../../../../new-graphql/__mocks__/mockBenefits';
import { OfferType } from '../../../../../new-graphql/generated';
import { mockInstoreOffersGroupByAdvertisers } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { InStoreCashbackSearchListView } from '../InStoreCashbackSearchListView';

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
    keyedAddress: {
      name: '123 street, city and state, code',
      isCurrentLocation: false,
      latitude: -33.877,
      longitude: 151.205,
    },
    openSearchLocationBottomSheet: jest.fn(),
    allowDataToLoad: true,
    setKeyedAddress: jest.fn(),
  };
};

describe('InStoreCashbackSearchListView', () => {
  const props = getDefaultProps();
  const setup = () => {
    return render(<InStoreCashbackSearchListView {...props} />);
  };

  beforeEach(() => {
    mockUseInfiniteGetCashbackOffersGroupByAdvertiserQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        pages: [mockInstoreOffersGroupByAdvertisers],
        pageParams: {} as never,
      },
    });
  });

  it('should render default correctly', () => {
    const { getByText } = setup();

    expect(getByText('Search all offers')).toBeTruthy();
    expect(getByText('In-store cashback')).toBeTruthy();
  });

  it('should render with correct category', () => {
    const mockProps = {
      ...props,
      categoryCode: 'dining',
      categoryName: 'Dining',
    };
    const { getByText } = render(<InStoreCashbackSearchListView {...mockProps} />);

    expect(getByText('Search dining offers')).toBeTruthy();
    expect(getByText('In-store cashback')).toBeTruthy();
  });

  it('should render instore item correctly', () => {
    const { getByTestId, getByText } = setup();

    expect(getByTestId('instore-advertiser-0')).toBeTruthy();
    expect(getByText('6% Cashback on All Purchases')).toBeTruthy();
    expect(getByText('Forever New')).toBeTruthy();
    expect(getByText('13 stores near you')).toBeTruthy();

    expect(getByTestId('instore-advertiser-1')).toBeTruthy();
    expect(getByText('7% Cashback on All Purchases')).toBeTruthy();
    expect(getByText('Breadtop')).toBeTruthy();
    expect(getByText('17 stores near you')).toBeTruthy();

    fireEvent.press(getByTestId('instore-advertiser-1'));

    expect(props.onItemPressed).toHaveBeenCalled();
  });

  it('should render correctly when is error', () => {
    mockUseInfiniteGetCashbackOffersGroupByAdvertiserQuery.mockReturnValue({
      isError: true,
      isLoading: false,
      data: undefined as never,
    });
    const { getByText } = setup();

    expect(getByText('No results found!')).toBeTruthy();
    expect(getByText(`Please adjust your search to find the offers you're looking for.`)).toBeTruthy();
  });

  it('should render correctly when is empty', () => {
    mockUseInfiniteGetCashbackOffersGroupByAdvertiserQuery.mockReturnValue({
      isError: false,
      isLoading: false,
      data: {} as never,
    });
    const { getByText } = setup();

    expect(getByText('No results found!')).toBeTruthy();
    expect(getByText(`Please adjust your search to find the offers you're looking for.`)).toBeTruthy();
  });

  it('should render correctly when is loading', () => {
    mockUseInfiniteGetCashbackOffersGroupByAdvertiserQuery.mockReturnValue({
      isError: false,
      isLoading: true,
      data: {} as never,
    });
    const { getByTestId } = setup();

    expect(getByTestId('skeleton-loading')).toBeTruthy();
  });

  it('should open search location bottom sheet correctly', () => {
    const { getByText } = setup();
    fireEvent.press(getByText('city and state'));
    expect(props.openSearchLocationBottomSheet).toBeCalled();
  });

  it('should bring to instore tab when clicking to map btn', () => {
    const { getByText } = setup();
    fireEvent.press(getByText('Map'));

    expect(mockNavigateToBenefitsTopTabs).toBeCalledWith('benefits-instore');
  });
});
