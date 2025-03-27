import React from 'react';
import { useRoute } from '@react-navigation/native';
import { regionLocalisationMockUtil } from '../../../../../test-setup/utils/regionLocalisationMockUtil';
import { act, addInputSuffix, fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { aResidentialAddress } from '../../../../graphql/mocks/generated-mocks';
import { ResidentialAddressScreen } from '../ResidentialAddressScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

const mockUseRoute = () => {
  const value = {
    params: {
      onBack: jest.fn(),
      updateCallback: jest.fn(),
      residentialAddress: aResidentialAddress(),
    },
    key: '',
    name: '',
  };
  mockedUseRoute.mockReturnValue(value);
  return value;
};

describe('Residential Address Screen', () => {
  let route: ReturnType<typeof mockUseRoute>;

  beforeEach(() => {
    jest.resetAllMocks();
    route = mockUseRoute();
    regionLocalisationMockUtil('AU');
  });

  it('should render correctly', () => {
    const { getByText } = render(<ResidentialAddressScreen />);
    expect(getByText(`Residential address`)).toBeTruthy();
    expect(getByText(`Save`)).toBeTruthy();
  });

  it('should render correctly without default value', () => {
    mockedUseRoute.mockReturnValue({
      params: {
        onBack: jest.fn(),
        updateCallback: jest.fn(),
        residentialAddress: aResidentialAddress({ streetName: undefined }),
      },
      key: '',
      name: '',
    });

    const { getByText } = render(<ResidentialAddressScreen />);
    expect(getByText(`Residential address`)).toBeTruthy();
    expect(getByText(`Save`)).toBeTruthy();
  });

  test('should go back', () => {
    const { getByTestId } = render(<ResidentialAddressScreen />);
    const button = getByTestId('topbar-right-icon');
    fireEvent.press(button);
    expect(route.params.onBack).toHaveBeenCalled();
  });

  it('click on save button should work correctly for AU', async () => {
    const mockUpdateCallback = jest.fn().mockResolvedValue(true);
    mockedUseRoute.mockReturnValue({
      params: {
        onBack: jest.fn(),
        updateCallback: mockUpdateCallback,
        residentialAddress: aResidentialAddress({ streetName: undefined }),
      },
      key: '',
      name: '',
    });

    const { getByLabelText, getByTestId } = render(<ResidentialAddressScreen />);

    const addressInput = getByTestId(addInputSuffix('search-address'));

    const address = {
      addressLine: '123 A Street',
      townOrCity: 'City',
      postCode: '0000',
      region: 'NSW',
      country: 'AU',
      formattedAddress: '123 A St, City NSW 2000, Australia',
      unitNumber: '123',
      streetNumber: 'streetNumber',
      streetName: 'streetName',
      streetType: 'streetType',
    };
    const button = getByLabelText('Save');

    act(() => {
      fireEvent(addressInput, 'onAddressSelected', address);
    });

    fireEvent.press(button);
    await waitFor(() => {
      expect(mockUpdateCallback).toHaveBeenCalledWith({
        country: 'AUS',
        longForm: '123 A Street',
        postcode: '0000',
        region: 'NSW',
        streetName: 'streetName',
        streetNumber: 'streetNumber',
        streetType: 'streetType',
        townOrCity: 'City',
        unitNumber: '123',
      });
    });
  });

  it('click on save button should work correctly for GB', async () => {
    const mockUpdateCallback = jest.fn().mockResolvedValue(true);
    mockedUseRoute.mockReturnValue({
      params: {
        onBack: jest.fn(),
        updateCallback: mockUpdateCallback,
        residentialAddress: aResidentialAddress({ streetName: undefined }),
      },
      key: '',
      name: '',
    });

    const { getByLabelText, getByTestId } = render(<ResidentialAddressScreen />);

    const addressInput = getByTestId(addInputSuffix('search-address'));

    const address = {
      addressLine: '35 Baker St',
      townOrCity: 'London',
      postCode: 'W1U 8EN',
      region: 'ENG',
      country: 'GB',
      formattedAddress: '35 Baker St, London W1U 8EN, UK',
      unitNumber: '',
      streetNumber: '35',
      streetName: 'Baker',
      streetType: 'St',
    };
    const button = getByLabelText('Save');

    act(() => {
      fireEvent(addressInput, 'onAddressSelected', address);
    });

    fireEvent.press(button);
    await waitFor(() => {
      expect(mockUpdateCallback).toHaveBeenCalledWith({
        country: 'GB',
        longForm: '35 Baker St',
        postcode: 'W1U 8EN',
        region: 'ENG',
        streetName: 'Baker',
        streetNumber: '35',
        streetType: 'St',
        townOrCity: 'London',
        unitNumber: '',
      });
    });
  });
});
