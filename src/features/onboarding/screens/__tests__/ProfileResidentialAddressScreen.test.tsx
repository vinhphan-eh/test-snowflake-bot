import React from 'react';
import { act } from '@testing-library/react-hooks';
import { mockedGoBack, mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { addInputSuffix, fireEvent, render } from '../../../../common/utils/testing';
import { ProfileResidentialAddressScreen } from '../ProfileResidentialAddressScreen';

const mockSetBoardingData = jest.fn();

jest.mock('../../stores/useOnboardingStore', () => {
  return {
    useOnboardingStore: () => ({
      setPersonalDetails: mockSetBoardingData,
      getNextProfileInputPage: () => 'ProfilePhoneNumber',
    }),
  };
});

describe('Profile Residential Address Screen', () => {
  it('renders properly', () => {
    const { getByText } = render(<ProfileResidentialAddressScreen />);
    expect(getByText('Next')).toBeTruthy();
    expect(getByText('Personal details')).toBeTruthy();
    expect(getByText(`What's your residential address?`)).toBeTruthy();
    expect(
      getByText(
        'Please ensure that your residential address matches your chosen identification document exactly, including any abbreviations, initials, hyphens, etc.'
      )
    ).toBeTruthy();
    expect(getByText('Address')).toBeTruthy();
  });

  it('should handle click properly', async () => {
    const { getByLabelText } = render(<ProfileResidentialAddressScreen />);
    const button = getByLabelText('Next');

    fireEvent.press(button);
    expect(mockedNavigate).not.toBeCalled();
  });

  it('should go back properly', async () => {
    const { getByTestId } = render(<ProfileResidentialAddressScreen />);
    const button = getByTestId('topbar-back-icon');

    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });

  it('should submit success for AU', async () => {
    const { getByLabelText, getByTestId } = render(<ProfileResidentialAddressScreen />);

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
    const button = getByLabelText('Next');

    await act(() => {
      fireEvent(addressInput, 'onAddressSelected', address);
    });

    fireEvent.press(button);

    expect(mockSetBoardingData).toBeCalledWith({
      residentialAddress: {
        longForm: address.addressLine,
        postcode: address.postCode,
        region: address.region,
        townOrCity: address.townOrCity,
        country: 'AUS',
        unitNumber: address.unitNumber,
        streetNumber: address.streetNumber,
        streetName: address.streetName,
        streetType: address.streetType,
      },
    });
  });

  it('should submit success for GB', async () => {
    const { getByLabelText, getByTestId } = render(<ProfileResidentialAddressScreen />);

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
      geometry: {
        latitude: 51.51798629760742,
        longitude: -0.15587779879570007,
      },
    };
    const button = getByLabelText('Next');

    await act(() => {
      fireEvent(addressInput, 'onAddressSelected', address);
    });

    fireEvent.press(button);

    expect(mockSetBoardingData).toBeCalledWith({
      residentialAddress: {
        longForm: address.addressLine,
        postcode: address.postCode,
        region: address.region,
        townOrCity: address.townOrCity,
        country: address.country,
        unitNumber: address.unitNumber,
        streetNumber: address.streetNumber,
        streetName: address.streetName,
        streetType: address.streetType,
      },
    });
  });

  it('should render address error message', async () => {
    const { getByTestId, getByText } = render(<ProfileResidentialAddressScreen />);

    const addressInput = getByTestId(addInputSuffix('search-address'));

    const address = {
      addressLine: 'A Street',
      townOrCity: 'City',
      postCode: '0000',
      region: 'NSW',
      country: 'AUS',
      formattedAddress: '123 A St, City NSW 2000, Australia',
      unitNumber: '',
      streetNumber: '',
      streetName: 'streetName',
      streetType: 'streetType',
    };

    await act(() => {
      fireEvent(addressInput, 'onAddressSelected', address);
    });

    await act(() => {
      expect(
        getByText(
          `Oops, it looks like the street number is missing from your address. If you live in a unit, apartment, or townhouse, don't forget to include the unit or apartment number.`
        )
      ).toBeTruthy();
    });
  });

  it('should open address edit screen', async () => {
    const { getByTestId } = render(<ProfileResidentialAddressScreen />);

    const addressInput = getByTestId(addInputSuffix('search-address'));

    await act(() => fireEvent(addressInput, 'onOpenManualInput'));
    expect(mockedNavigate).toBeCalledWith('ProfileResidentialAddressManual');
  });
});
