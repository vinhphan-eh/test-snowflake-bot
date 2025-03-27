import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { regionLocalisationMockUtil } from '../../../../../test-setup/utils/regionLocalisationMockUtil';
import { fireEvent, render, renderHook, waitFor } from '../../../../common/utils/testing';
import { useOnboardingStore } from '../../stores/useOnboardingStore';
import { ProfileResidentialAddressManualScreen } from '../ProfileResidentialAddressManualScreen';

describe('Profile Residential Address Manual Screen', () => {
  test('should go back', () => {
    const { getByTestId } = render(<ProfileResidentialAddressManualScreen />);
    const button = getByTestId('topbar-back-icon');
    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });

  describe('AU users', () => {
    beforeEach(() => {
      regionLocalisationMockUtil('AU');
    });

    it('can submit valid residential address', async () => {
      const { result } = renderHook(() => useOnboardingStore());

      // Prefill valid details for name and mobile to prevent being navigated back
      result.current.personalDetails.firstName = 'validFirstname';
      result.current.personalDetails.lastName = 'validLastName';
      result.current.personalDetails.phoneNumber = {
        countryCode: 'Australia (+60)',
        number: '4123567890',
      };
      const { getByLabelText, getByTestId } = render(<ProfileResidentialAddressManualScreen />);

      fireEvent.changeText(getByTestId('unitNumber'), 'a');
      fireEvent.changeText(getByTestId('streetNumber'), 'a');
      fireEvent.changeText(getByTestId('streetName'), 'a');
      fireEvent.changeText(getByTestId('streetType'), 'a');
      fireEvent.changeText(getByTestId('townOrCity'), 'a');
      fireEvent(getByTestId('region-input'), 'onConfirm', 'WA');
      fireEvent.changeText(getByTestId('postcode'), '7000');

      await waitFor(() => {
        fireEvent.press(getByLabelText('Next'));
        expect(mockedNavigate).toBeCalledWith('ProfileDoB');
      });
    });

    it('can submit valid residential address without unitNumber', async () => {
      const { result } = renderHook(() => useOnboardingStore());

      // Prefill valid details for name and mobile to prevent being navigated back
      result.current.personalDetails.firstName = 'validFirstname';
      result.current.personalDetails.lastName = 'validLastName';
      result.current.personalDetails.phoneNumber = {
        countryCode: 'Australia (+60)',
        number: '4123567890',
      };

      const { getByLabelText, getByTestId } = render(<ProfileResidentialAddressManualScreen />);

      fireEvent.changeText(getByTestId('unitNumber'), '');
      fireEvent.changeText(getByTestId('streetNumber'), 'a');
      fireEvent.changeText(getByTestId('streetName'), 'a');
      fireEvent.changeText(getByTestId('streetType'), 'a');
      fireEvent.changeText(getByTestId('townOrCity'), 'a');
      fireEvent(getByTestId('region-input'), 'onConfirm', 'WA');
      fireEvent.changeText(getByTestId('postcode'), '7000');

      await waitFor(() => {
        fireEvent.press(getByLabelText('Next'));
        expect(mockedNavigate).toBeCalledWith('ProfileDoB');
      });
    });
  });

  describe('UK users', () => {
    beforeEach(() => {
      regionLocalisationMockUtil('GB');
    });

    it('can submit valid residential address', async () => {
      const { result } = renderHook(() => useOnboardingStore());

      // Prefill valid details for name and mobile to prevent being navigated back
      result.current.personalDetails.firstName = 'validFirstname';
      result.current.personalDetails.lastName = 'validLastName';
      result.current.personalDetails.phoneNumber = {
        countryCode: 'United Kingdom (+44)',
        number: '7123456890',
      };

      const { getByLabelText, getByTestId } = render(<ProfileResidentialAddressManualScreen />);

      fireEvent.changeText(getByTestId('unitNumber'), 'a');
      fireEvent.changeText(getByTestId('streetNumber'), 'a');
      fireEvent.changeText(getByTestId('streetName'), 'a');
      fireEvent.changeText(getByTestId('streetType'), 'a');
      fireEvent.changeText(getByTestId('townOrCity'), 'a');
      fireEvent(getByTestId('region-input'), 'onConfirm', 'ENG');
      fireEvent.changeText(getByTestId('postcode'), 'GU16 7HF');

      await waitFor(() => {
        fireEvent.press(getByLabelText('Next'));
        expect(mockedNavigate).toBeCalledWith('ProfileDoB');
      });
    });
  });
});
