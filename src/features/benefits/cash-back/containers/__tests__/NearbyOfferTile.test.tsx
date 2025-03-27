import React from 'react';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { mockUseGetCashbackOffersGroupByAdvertiserQuery } from '../../../../../new-graphql/__mocks__/mockBenefits';
import { mockInstoreOffersGroupByAdvertisers } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { mockUseCashbackPermission } from '../../../common/hooks/__mocks__/useCashbackPermission';
import { NearbyOfferTile } from '../NearbyOfferTile';

describe('NearbyOfferTile', () => {
  beforeEach(() => {
    mockUseCashbackPermission.mockReturnValue({
      permission: true,
      isLoading: false,
      isFetched: true,
    });
    mockUseGetCashbackOffersGroupByAdvertiserQuery.mockReturnValue({
      data: mockInstoreOffersGroupByAdvertisers,
    });
  });

  it('should render correctly', () => {
    const { getByText } = render(<NearbyOfferTile testID="nearby-offer-tile" onShopNowPress={() => {}} />);

    expect(getByText('Shop now')).toBeTruthy();
    expect(getByText('2 cashback offers nearby')).toBeTruthy();
  });

  it('onShopNowPress should work correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<NearbyOfferTile testID="nearby-offer-tile" onShopNowPress={mockOnPress} />);

    fireEvent.press(getByText('Shop now'));

    expect(mockedEventTracking).toBeCalledWith({
      categoryName: 'user action',
      event: 'Click shop now on nearby tile',
      metaData: {
        module: 'Benefits pillar',
      },
    });
    expect(mockOnPress).toBeCalledTimes(1);
  });

  it('should render nothing when having error', () => {
    mockUseGetCashbackOffersGroupByAdvertiserQuery.mockReturnValue({
      isError: true,
      data: mockInstoreOffersGroupByAdvertisers,
    });
    const { queryByTestId } = render(<NearbyOfferTile testID="nearby-offer-tile" onShopNowPress={() => {}} />);

    expect(queryByTestId('nearby-offer-tile')).toBeNull();
  });

  it('should render nothing when empty after fetch', () => {
    mockUseGetCashbackOffersGroupByAdvertiserQuery.mockReturnValue({
      isError: false,
      isLoading: false,
      data: {} as never,
    });
    const { queryByTestId } = render(<NearbyOfferTile testID="nearby-offer-tile" onShopNowPress={() => {}} />);

    expect(queryByTestId('nearby-offer-tile')).toBeNull();
  });

  it('should render nothing when fetching', () => {
    mockUseGetCashbackOffersGroupByAdvertiserQuery.mockReturnValue({
      isError: false,
      isLoading: true,
      data: {} as never,
    });
    const { queryByTestId } = render(<NearbyOfferTile testID="nearby-offer-tile" onShopNowPress={() => {}} />);

    expect(queryByTestId('nearby-offer-tile')).toBeNull();
  });

  it('should render nothing when no permission', () => {
    mockUseCashbackPermission.mockReturnValue({
      permission: false,
      isLoading: false,
      isFetched: true,
    });
    const { queryByTestId } = render(<NearbyOfferTile testID="nearby-offer-tile" onShopNowPress={() => {}} />);

    expect(queryByTestId('nearby-offer-tile')).toBeNull();
  });
});
