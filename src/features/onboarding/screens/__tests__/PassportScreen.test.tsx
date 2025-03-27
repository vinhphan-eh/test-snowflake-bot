import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { mockedGoBack, mockedNavigate } from '../../../../../__mocks__/react-navigation';
import type { RenderAPI } from '../../../../common/utils/testing';
import { addInputSuffix, fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { useOnboardingStore } from '../../stores/useOnboardingStore';
import { PassportScreen } from '../PassportScreen';

describe('Passport Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('User entered valid passport number', () => {
    let renderAPI: RenderAPI;
    beforeEach(() => {
      renderAPI = render(<PassportScreen />);
    });

    it('should render UI properly', () => {
      const { getByLabelText, getByTestId, getByText } = renderAPI;
      expect(getByText('We need some details from your passport.')).toBeTruthy();
      expect(getByTestId(addInputSuffix('passport'))).toBeTruthy();
      expect(getByLabelText('Next')).toBeTruthy();
    });

    it('should handle click properly when user entered valid number', async () => {
      const { getByLabelText, getByTestId } = renderAPI;
      const { result } = renderHook(() => useOnboardingStore());
      const textField = getByTestId(addInputSuffix('passport'));
      fireEvent.changeText(textField, 'PA0123456');

      await waitFor(() => {
        const button = getByLabelText('Next');
        fireEvent.press(button);
        expect(result.current.personalDetails.identityDocumentType).toEqual('PASSPORT');
        expect(result.current.personalDetails.identityDocumentNumber).toEqual('PA0123456');
        expect(mockedNavigate).toBeCalledWith('IdentityVerificationTerm');
      });
    });
  });

  describe('User entered invalid passport number', () => {
    let renderAPI: RenderAPI;
    beforeEach(() => {
      renderAPI = render(<PassportScreen />);
    });

    it('should display required error when passport number is empty', async () => {
      const { getByDisplayValue, getByTestId, getByText } = renderAPI;
      const textField = getByTestId(addInputSuffix('passport'));
      fireEvent.changeText(textField, '');

      await waitFor(() => expect(getByDisplayValue('')).toBeTruthy());

      fireEvent(textField, 'blur');

      await waitFor(() => {
        expect(getByText('This field is required')).toBeTruthy();
      });
    });

    it('should display syntax error when passport number is invalid', async () => {
      const { getByDisplayValue, getByTestId, getByText } = renderAPI;
      const textField = getByTestId(addInputSuffix('passport'));
      fireEvent.changeText(textField, 'P123456');

      await waitFor(() => expect(getByDisplayValue('P123456')).toBeTruthy());

      fireEvent(textField, 'blur');

      await waitFor(() => {
        expect(getByText('Invalid passport number.')).toBeTruthy();
      });
    });

    it('should display syntax error when passport number length is greater than 9', async () => {
      const { getByDisplayValue, getByTestId, getByText } = renderAPI;
      const textField = getByTestId(addInputSuffix('passport'));
      fireEvent.changeText(textField, 'P1234567890');

      await waitFor(() => expect(getByDisplayValue('P1234567890')).toBeTruthy());

      fireEvent(textField, 'blur');

      await waitFor(() => {
        expect(getByText('Invalid passport number.')).toBeTruthy();
      });
    });

    it('should go back previous screen by using back chevron', () => {
      const { getByTestId } = renderAPI;
      const button = getByTestId('topbar-back-icon');
      fireEvent.press(button);
      expect(mockedGoBack).toBeCalled();
    });
  });
});
