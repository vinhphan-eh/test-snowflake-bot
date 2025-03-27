import React from 'react';
import { fireEvent, render, waitFor } from '../../../../../../common/utils/testing';
import { mockUseGetLocationsQuery } from '../../../../../../new-graphql/__mocks__/mockLocation';
import { mockUseCashbackPermission } from '../../../../common/hooks/__mocks__/useCashbackPermission';
import { InstoreCashbackOfferCarouselEmptyState } from '../InstoreCashbackOfferCarouselEmptyState';

describe('InstoreCashbackOfferCarousel', () => {
  beforeEach(() => {
    mockUseCashbackPermission.mockReturnValue({
      permission: true,
      isFetched: true,
      isLoading: false,
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
