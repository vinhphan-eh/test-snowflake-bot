import React from 'react';
import { ActionSheetIOS, Linking } from 'react-native';
import { render, fireEvent } from '../../../../../../../common/utils/testing';
import { NearByLocationItem } from '../NearByLocationItem';

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(() => Promise.resolve('mockResolve')),
  addEventListener: jest.fn(),
}));

jest.mock('react-native/Libraries/ActionSheetIOS/ActionSheetIOS', () => ({
  showActionSheetWithOptions: jest.fn(),
}));

const showActionSheetWithOptions = ActionSheetIOS.showActionSheetWithOptions as unknown as jest.Mock;
const openURL = Linking.openURL as unknown as jest.Mock;

describe('NearByLocationItem', () => {
  beforeEach(() => {
    openURL.mockReset();
    showActionSheetWithOptions.mockReset();
  });

  it('should display correctly', () => {
    const { queryByText } = render(
      <NearByLocationItem
        advertiserName="advertiser"
        location={{
          address: '123 street, city, state, code',
          latitude: 1,
          longitude: 1,
          locationId: '1',
          distance: 1,
        }}
        keyedAddress={undefined}
        index={0}
      />
    );

    expect(queryByText('advertiser')).toBeTruthy();
    expect(queryByText('1km away')).not.toBeTruthy();
  });

  it('should not display city if not available', () => {
    const { queryByText } = render(
      <NearByLocationItem
        advertiserName="advertiser"
        location={{
          address: 'something, country',
          latitude: 1,
          longitude: 1,
          locationId: '1',
          distance: 1,
        }}
        keyedAddress={undefined}
        index={0}
      />
    );

    expect(queryByText('advertiser')).toBeTruthy();
    expect(queryByText('1km away')).not.toBeTruthy();
  });

  it('should display distance if available', () => {
    const { queryByText } = render(
      <NearByLocationItem
        advertiserName="advertiser"
        location={{
          address: '123 street, city, state, code',
          latitude: 1,
          longitude: 1,
          locationId: '1',
          distance: 1,
        }}
        keyedAddress={{
          name: '123 street, city, state, code',
          isCurrentLocation: false,
          latitude: 1,
          longitude: 1,
        }}
        index={0}
      />
    );

    expect(queryByText('1km away')).toBeTruthy();
  });

  it('should open map on click', () => {
    const { getByTestId } = render(
      <NearByLocationItem
        advertiserName="advertiser"
        location={{
          address: '123 street, city, state, code',
          latitude: 1,
          longitude: 1,
          locationId: '1',
          distance: 1,
        }}
        keyedAddress={{
          name: '123 street, city, state, code',
          isCurrentLocation: false,
          latitude: 1,
          longitude: 1,
        }}
        index={0}
      />
    );

    fireEvent.press(getByTestId('nearby-location-item-0'));

    expect(ActionSheetIOS.showActionSheetWithOptions).toHaveBeenCalledWith(
      {
        cancelButtonIndex: 2,
        options: ['Google Maps', 'Apple Maps', 'Cancel'],
      },
      expect.anything()
    );
    showActionSheetWithOptions.mock.calls[0][1](0);
    expect(openURL).toHaveBeenCalledWith('https://www.google.com/maps/search/?api=1&query=1,1');
    openURL.mockReset();
    showActionSheetWithOptions.mock.calls[0][1](0);
    expect(openURL).toHaveBeenCalledWith('https://www.google.com/maps/search/?api=1&query=1,1');
  });
});
