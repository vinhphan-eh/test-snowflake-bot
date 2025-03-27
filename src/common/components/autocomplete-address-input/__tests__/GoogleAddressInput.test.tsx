import React from 'react';
import { mockUseGetLocationsQuery } from '../../../../new-graphql/__mocks__/mockLocation';
import { render } from '../../../utils/testing';
import { GoogleAddressInput } from '../GoogleAddressInput';

describe('GoogleAddressInput', () => {
  beforeEach(() => {
    mockUseGetLocationsQuery.mockReturnValue({
      data: {
        getLocations: {
          addresses: [
            {
              formattedAddress: 'Haymarket NSW, Australia',
              latitude: null,
              longitude: null,
              placeId: 'ChIJBbYoni-uEmsR4LkyFmh9AQU',
            },
            {
              formattedAddress: 'Haymarket, Edinburgh, UK',
              latitude: null,
              longitude: null,
              placeId: 'ChIJzWHbP6_Hh0gRICAHxPPeyec',
            },
          ],
        },
      },
    });
  });

  it('should render correctly', () => {
    const { getByTestId, getByText } = render(
      <GoogleAddressInput
        testID="google-address-input"
        inputProps={{ placeholder: 'placeholder' }}
        onLocationSelect={() => {}}
      />
    );

    expect(getByText('placeholder')).toBeTruthy();
    expect(getByTestId('google-address-list')).toBeTruthy();
    expect(getByTestId('google-address-input')).toBeTruthy();
  });

  it('render addresses correctly', () => {
    const { getByTestId, getByText } = render(
      <GoogleAddressInput
        testID="google-address-input"
        inputProps={{ placeholder: 'placeholder' }}
        onLocationSelect={() => {}}
      />
    );

    expect(getByTestId('ChIJBbYoni-uEmsR4LkyFmh9AQU')).toBeTruthy();
    expect(getByTestId('ChIJzWHbP6_Hh0gRICAHxPPeyec')).toBeTruthy();
    expect(getByText('Haymarket NSW, Australia')).toBeTruthy();
    expect(getByText('Haymarket, Edinburgh, UK')).toBeTruthy();
  });
});
