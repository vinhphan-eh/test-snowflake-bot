import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { mockInstoreOffer } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { CashbackMapView } from '../CashbackMapView';

describe('CashbackMapView', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <CashbackMapView
        initialRegion={{
          latitude: -33.8698439,
          longitude: 151.2082848,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onMapTap={() => {}}
        data={[mockInstoreOffer]}
        onRegionChangeComplete={() => {}}
        onSelectedItemPress={() => {}}
        searchQuery=""
        keyedAddress={undefined}
        shouldSelectNearestOfferByDefault={{
          current: false,
        }}
      />
    );

    expect(getByTestId('back-to-current-location')).toBeTruthy();
    expect(getByTestId('near-me-outlined')).toBeTruthy();
  });

  it('should render correctly when having keyed address', () => {
    const { getByTestId } = render(
      <CashbackMapView
        initialRegion={{
          latitude: -33.8698439,
          longitude: 151.2082848,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onMapTap={() => {}}
        data={[mockInstoreOffer]}
        onRegionChangeComplete={() => {}}
        onSelectedItemPress={() => {}}
        searchQuery=""
        keyedAddress={{
          latitude: 123,
          longitude: 12,
          name: '4 San Jose',
          isCurrentLocation: true,
        }}
        shouldSelectNearestOfferByDefault={{
          current: false,
        }}
      />
    );

    expect(getByTestId('back-to-current-location')).toBeTruthy();
    expect(getByTestId('near-me')).toBeTruthy();
  });
});
