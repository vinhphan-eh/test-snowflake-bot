import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { regionLocalisationMockUtil } from '../../../../../test-setup/utils/regionLocalisationMockUtil';
import { addInputSuffix, fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { ProfilePhoneNumberScreen } from '../ProfilePhoneNumberScreen';

const setDataDetails = jest.fn();
jest.mock('../../stores/useOnboardingStore', () => {
  return {
    useOnboardingStore: () => ({
      setPersonalDetails: setDataDetails,
      getNextProfileInputPage: () => 'ProfileResidentialAddress',
    }),
  };
});

describe('Profile Phone Number Screen', () => {
  describe('AU User', () => {
    beforeEach(() => {
      regionLocalisationMockUtil('AU');
    });

    it('should render default country code properly', () => {
      const { getByDisplayValue } = render(<ProfilePhoneNumberScreen />);

      expect(getByDisplayValue('Australia (+61)')).toBeTruthy();
    });

    it('should render properly', () => {
      const { getByTestId, getByText } = render(<ProfilePhoneNumberScreen />);
      const selectCountry = getByTestId('country-code');
      fireEvent.press(selectCountry);
      const option = getByText('Australia (+61)');

      expect(getByText(`What's your mobile number?`)).toBeTruthy();
      expect(option).toBeTruthy();

      expect(getByText('Personal details')).toBeTruthy();
      expect(getByText('Next')).toBeTruthy();
    });

    it('should handle click properly', async () => {
      const { getByLabelText } = render(<ProfilePhoneNumberScreen />);
      const button = getByLabelText('Next');

      fireEvent.press(button);
      expect(mockedNavigate).not.toBeCalledWith();
    });

    it('should show error message if invalid value', async () => {
      const { getByDisplayValue, getByTestId, getByText } = render(<ProfilePhoneNumberScreen />);
      const textInput = getByTestId(addInputSuffix('phoneNumber'));
      fireEvent.changeText(textInput, 'phoneNumber123');

      await waitFor(() => expect(getByDisplayValue('phoneNumber123')).toBeTruthy());

      fireEvent(textInput, 'blur');

      await waitFor(() => {
        expect(getByText('Mobile number is invalid.')).toBeTruthy();
      });
    });

    it('should show error message if fail minLength', async () => {
      const { getByDisplayValue, getByTestId, getByText } = render(<ProfilePhoneNumberScreen />);
      const textInput = getByTestId(addInputSuffix('phoneNumber'));
      fireEvent.changeText(textInput, '41234567');

      await waitFor(() => expect(getByDisplayValue('41234567')).toBeTruthy());

      fireEvent(textInput, 'blur');

      await waitFor(() => {
        expect(getByText('Mobile number is invalid.')).toBeTruthy();
      });
    });

    it('should select code correctly', async () => {
      const { getByTestId, getByText } = render(<ProfilePhoneNumberScreen />);
      fireEvent.press(getByTestId('country-code'));

      fireEvent.press(getByText('Albania (+355)'));

      await waitFor(() => {
        expect(getByText('Albania (+355)')).toBeTruthy();
      });
    });

    it('should submit success', async () => {
      const { getByLabelText, getByTestId } = render(<ProfilePhoneNumberScreen />);
      const textInput = getByTestId(addInputSuffix('phoneNumber'));
      fireEvent.changeText(textInput, '4123456789011');

      await waitFor(() => {
        const button = getByLabelText('Next');
        fireEvent.press(button);
        expect(setDataDetails).toBeCalledWith({
          phoneNumber: {
            countryCode: 'Australia (+61)',
            number: '4123456789011',
          },
        });
        expect(mockedNavigate).toBeCalledWith('ProfileResidentialAddress');
      });
    });

    it('should remove leading 0 when submit', async () => {
      const { getByLabelText, getByTestId } = render(<ProfilePhoneNumberScreen />);
      const textInput = getByTestId(addInputSuffix('phoneNumber'));
      fireEvent.changeText(textInput, '0488888888');

      await waitFor(() => {
        const button = getByLabelText('Next');
        fireEvent.press(button);
        expect(setDataDetails).toBeCalledWith({
          phoneNumber: {
            countryCode: 'Australia (+61)',
            number: '488888888',
          },
        });
        expect(mockedNavigate).toBeCalledWith('ProfileResidentialAddress');
      });
    });

    it('should go back previous screen by using back chevron', () => {
      const { getByTestId } = render(<ProfilePhoneNumberScreen />);
      const button = getByTestId('topbar-back-icon');
      fireEvent.press(button);
      expect(mockedGoBack).toBeCalled();
    });
  });

  describe('UK User', () => {
    beforeEach(() => {
      regionLocalisationMockUtil('GB');
    });

    it('should render default country code properly', () => {
      const { getByDisplayValue } = render(<ProfilePhoneNumberScreen />);

      expect(getByDisplayValue('United Kingdom (+44)')).toBeTruthy();
    });
  });
});
