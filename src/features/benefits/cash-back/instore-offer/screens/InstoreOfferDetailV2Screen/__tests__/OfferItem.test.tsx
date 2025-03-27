import React from 'react';
import { render, fireEvent, waitFor } from '../../../../../../../common/utils/testing';
import { mockUseGetLocationsQuery } from '../../../../../../../new-graphql/__mocks__/mockLocation';
import type { InstoreOfferV2 } from '../../../../../../../new-graphql/generated';
import { mockInstoreOffersByAdvertiserId } from '../../../../../../../new-graphql/handlers/custom-mock/cashback';
import { OfferItem } from '../OfferItem';

const mockInstoreOfferV2 = mockInstoreOffersByAdvertiserId.me?.cashback?.instoreOffersByAdvertiserId
  .offers[0] as InstoreOfferV2;

describe('OrderItem', () => {
  it('should display only upto 3 nearby locations', async () => {
    const onOpenAllNearbyLocationsBts = jest.fn();

    const { getByTestId, queryAllByTestId } = render(
      <OfferItem
        item={mockInstoreOfferV2}
        keyedAddress={{
          name: '123 street, city, state, code',
          isCurrentLocation: false,
          latitude: -33.877,
          longitude: 151.205,
        }}
        setKeyedAddress={jest.fn()}
        setAllNearbyBtsData={jest.fn()}
        onOpenAllNearbyLocationsBts={onOpenAllNearbyLocationsBts}
        width={100}
      />
    );

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 3; i++) {
      expect(queryAllByTestId(`nearby-location-item-${i}`)).toBeTruthy();
    }

    fireEvent.press(getByTestId('view-all-nearby-stores'));

    await waitFor(() => {
      expect(onOpenAllNearbyLocationsBts).toBeCalled();
    });
  });

  it('should display nearest location if current location is too far', async () => {
    const setKeyedAddress = jest.fn();

    const nearestAddress = 'SHOP 229A CASUARINA S/C, CASUARINA, NT, 810';
    mockUseGetLocationsQuery.mockReturnValue({
      data: {
        getLocations: { addresses: [{ formattedAddress: nearestAddress }] },
      },
      isLoading: false,
      isSuccess: true,
    });

    const { getByText, queryAllByTestId } = render(
      <OfferItem
        item={mockInstoreOfferV2}
        keyedAddress={{
          name: nearestAddress,
          isCurrentLocation: false,
          latitude: 20.9574728,
          longitude: 105.7698546,
        }}
        setKeyedAddress={setKeyedAddress}
        setAllNearbyBtsData={jest.fn()}
        onOpenAllNearbyLocationsBts={jest.fn()}
        width={100}
      />
    );

    expect(queryAllByTestId('nearby-location-item')).toHaveLength(0);

    await waitFor(() => {
      expect(getByText('No store found near this location, try CASUARINA')).toBeTruthy();
    });

    fireEvent.press(getByText('CASUARINA'));

    expect(setKeyedAddress).toBeCalledWith({
      isCurrentLocation: false,
      name: nearestAddress,
      latitude: -12.374391,
      longitude: 130.881721,
    });
  });
});
