import React from 'react';
import { fireEvent, render, waitFor } from '../../../../../../common/utils/testing';
import { mockUseGetLocationsQuery } from '../../../../../../new-graphql/__mocks__/mockLocation';
import { mockUseCashbackPermission } from '../../../../common/hooks/__mocks__/useCashbackPermission';
import { InstoreCashbackOfferCarousel } from '../InstoreCashbackOfferCarousel';
import { InstoreCashbackOfferCarouselEmptyState } from '../InstoreCashbackOfferCarouselEmptyState';

describe('InstoreCashbackOfferCarousel', () => {
  beforeEach(() => {
    mockUseCashbackPermission.mockReturnValue({
      permission: true,
      isFetched: true,
      isLoading: false,
    });
  });

  it('should render nothing when is error', () => {
    const { queryByText } = render(
      <InstoreCashbackOfferCarousel
        isError
        isLoading={false}
        advertisers={[]}
        onNavigateToDetail={() => {}}
        onPress={() => {}}
        keyedAddress={{
          name: '123 street, city, state, code',
          isCurrentLocation: false,
          latitude: -33.877,
          longitude: 151.205,
        }}
        openSearchLocationBottomSheet={jest.fn()}
        setKeyedAddress={jest.fn()}
        nearestLocation={null}
      />
    );

    expect(queryByText('In-Store cashback')).toBeNull();
  });

  it('should render skeleton when is loading', () => {
    const { getByTestId } = render(
      <InstoreCashbackOfferCarousel
        isError={false}
        isLoading
        advertisers={[]}
        onNavigateToDetail={() => {}}
        onPress={() => {}}
        keyedAddress={{
          name: '123 street, city, state, code',
          isCurrentLocation: false,
          latitude: -33.877,
          longitude: 151.205,
        }}
        openSearchLocationBottomSheet={jest.fn()}
        setKeyedAddress={jest.fn()}
        nearestLocation={null}
      />
    );

    expect(getByTestId('skeleton-loading')).toBeTruthy();
  });

  it('should display empty state correctly', async () => {
    const nearestAddress = '644 George St, Sydney NSW 2000, Australia';
    const setKeyedAddress = jest.fn();

    mockUseGetLocationsQuery.mockReturnValue({
      data: {
        getLocations: { addresses: [{ formattedAddress: nearestAddress }] },
      },
      isLoading: false,
      isSuccess: true,
    });
    const { getByText } = render(
      <InstoreCashbackOfferCarousel
        isError={false}
        isLoading={false}
        advertisers={[]}
        onNavigateToDetail={() => {}}
        onPress={() => {}}
        keyedAddress={{
          name: '123 street, city, state, code',
          isCurrentLocation: false,
          latitude: -33.877,
          longitude: 151.205,
        }}
        openSearchLocationBottomSheet={jest.fn()}
        setKeyedAddress={setKeyedAddress}
        nearestLocation={{
          address: 'World Square Sydney, Sydney, NSW, 2000',
          latitude: -33.877181,
          locationId: '927796',
          longitude: 151.206879,
        }}
      />
    );

    await waitFor(() => {
      expect(getByText('No store found near this location, try Sydney NSW 2000')).toBeTruthy();
    });

    fireEvent.press(getByText('Sydney NSW 2000'));

    expect(setKeyedAddress).toBeCalledWith({
      isCurrentLocation: false,
      name: nearestAddress,
      latitude: -33.877181,
      longitude: 151.206879,
    });
  });

  it('should render correctly', async () => {
    const nearestAddress = '644 George St, Sydney NSW 2000, Australia';
    mockUseGetLocationsQuery.mockReturnValue({
      data: {
        getLocations: { addresses: [{ formattedAddress: nearestAddress }] },
      },
      isLoading: false,
      isSuccess: true,
    });
    const props = {
      setKeyedAddress: jest.fn(),
      nearestLocation: {
        locationId: '927796',
        address: 'World Square Sydney, Sydney, NSW, 2000',
        latitude: -33.877181,
        longitude: 151.206879,
      },
    };
    const { getByText } = render(<InstoreCashbackOfferCarouselEmptyState {...props} />);

    await waitFor(() => {
      expect(getByText('No store found near this location, try Sydney NSW 2000')).toBeTruthy();
    });

    fireEvent.press(getByText('Sydney NSW 2000'));

    expect(props.setKeyedAddress).toBeCalledWith({
      isCurrentLocation: false,
      name: nearestAddress,
      latitude: -33.877181,
      longitude: 151.206879,
    });
  });
});
