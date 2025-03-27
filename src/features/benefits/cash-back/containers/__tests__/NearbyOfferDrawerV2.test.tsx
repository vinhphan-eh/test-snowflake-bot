import React from 'react';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { mockInstoreOffersGroupByAdvertisers } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { NearbyOfferDrawerV2 } from '../NearbyOfferDrawerV2';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const mockAdvertisers = mockInstoreOffersGroupByAdvertisers.me!.cashback!.allAdvertisers.edges.map(e => e.node);

describe('NearbyOfferDrawer', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(
      <NearbyOfferDrawerV2
        isFetched
        shouldSelectNearestOfferByDefault={{
          current: false,
        }}
        drawerRef={{} as never}
        onSelectLocation={() => {}}
        data={mockAdvertisers}
        onItemPress={() => {}}
        currentRegion={{ latitude: -33.877, longitude: 151.205, latitudeDelta: 0, longitudeDelta: 0 }}
        isLoading={false}
        isFetchingNextPage={false}
        onEndReached={() => {}}
        keyedAddress={{
          name: '123 street, city, state, code',
          isCurrentLocation: false,
          latitude: -33.877,
          longitude: 151.205,
        }}
      />
    );
    expect(getByTestId('advertiser-0')).toBeTruthy();
    expect(getByTestId('advertiser-1')).toBeTruthy();
    expect(getByText('2 cashback offers nearby')).toBeTruthy();
    expect(getByTestId('near-me')).toBeTruthy();
  });

  it('onItemPress should work correctly', () => {
    const mockOnItemPress = jest.fn();
    const { getByTestId } = render(
      <NearbyOfferDrawerV2
        isFetched
        shouldSelectNearestOfferByDefault={{
          current: false,
        }}
        drawerRef={{} as never}
        onSelectLocation={() => {}}
        data={mockAdvertisers}
        onItemPress={mockOnItemPress}
        currentRegion={{ latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0 }}
        isLoading={false}
        isFetchingNextPage={false}
        onEndReached={() => {}}
        keyedAddress={{
          name: '123 street, city, state, code',
          isCurrentLocation: false,
          latitude: -33.877,
          longitude: 151.205,
        }}
      />
    );

    fireEvent.press(getByTestId('advertiser-0'));
    expect(mockOnItemPress).toBeCalledTimes(1);
  });

  it('should show address when there is any', () => {
    const { getByTestId, getByText, queryByText } = render(
      <NearbyOfferDrawerV2
        isFetched
        shouldSelectNearestOfferByDefault={{
          current: false,
        }}
        drawerRef={{} as never}
        onSelectLocation={() => {}}
        data={mockAdvertisers}
        onItemPress={() => {}}
        currentRegion={{ latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0 }}
        isLoading={false}
        isFetchingNextPage={false}
        onEndReached={() => {}}
        keyedAddress={{
          name: '123 street, city, state, code',
          isCurrentLocation: false,
          latitude: -33.877,
          longitude: 151.205,
        }}
      />
    );

    expect(getByText('city')).toBeTruthy();
    expect(queryByText('Select location')).toBeNull();
    expect(getByTestId('near-me')).toBeTruthy();
  });
});
