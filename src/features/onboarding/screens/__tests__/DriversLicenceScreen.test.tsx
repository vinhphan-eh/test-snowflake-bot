import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../__mocks__/react-navigation';
import type { RenderAPI } from '../../../../common/utils/testing';
import { addInputSuffix, fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { DriversLicenceScreen } from '../DriversLicenceScreen';

describe('Drivers Licence Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('User entered invalid value', () => {
    let renderAPI: RenderAPI;
    beforeEach(() => {
      renderAPI = render(<DriversLicenceScreen />);
    });

    it('should display required error when drivers licence is empty', async () => {
      const { getAllByDisplayValue, getByTestId, getByText } = renderAPI;
      const driversLicenceInput = getByTestId(addInputSuffix('drivers-licence'));
      fireEvent.changeText(driversLicenceInput, '');

      await waitFor(() => expect(getAllByDisplayValue('')[0]).toBeTruthy());

      fireEvent(driversLicenceInput, 'blur');

      await waitFor(() => {
        expect(getByText('This field is required')).toBeTruthy();
      });
    });

    it('should display syntax error when drivers licence is invalid', async () => {
      const { getByDisplayValue, getByTestId, getByText } = renderAPI;
      const driversLicenceInput = getByTestId(addInputSuffix('drivers-licence'));
      fireEvent.changeText(driversLicenceInput, '21,2');

      await waitFor(() => expect(getByDisplayValue('21,2')).toBeTruthy());

      fireEvent(driversLicenceInput, 'blur');

      await waitFor(() => {
        expect(getByText('Invalid drivers licence number.')).toBeTruthy();
      });
    });

    it('should display max length error when drivers licence is so long', async () => {
      const { getByDisplayValue, getByTestId, getByText } = renderAPI;
      const driversLicenceInput = getByTestId(addInputSuffix('drivers-licence'));
      fireEvent.changeText(driversLicenceInput, '21228765555');

      await waitFor(() => expect(getByDisplayValue('21228765555')).toBeTruthy());

      fireEvent(driversLicenceInput, 'blur');

      await waitFor(() => {
        expect(getByText('Invalid drivers licence number.')).toBeTruthy();
      });
    });

    it('should display errors when card number is invalid', async () => {
      const { getByDisplayValue, getByTestId, getByText } = renderAPI;
      const cardNumberInput = getByTestId(addInputSuffix('card-number'));

      fireEvent.changeText(cardNumberInput, '4lts');

      await waitFor(() => expect(getByDisplayValue('4lts')).toBeTruthy());

      fireEvent(cardNumberInput, 'blur');

      await waitFor(() => {
        expect(getByText('Invalid card number.')).toBeTruthy();
      });
    });

    it('should disable submit button when drivers licence is invalid', async () => {
      const { getByLabelText, getByTestId } = renderAPI;
      const driversLicenceInput = getByTestId(addInputSuffix('drivers-licence'));
      fireEvent.changeText(driversLicenceInput, '1234567890ABCD');

      await waitFor(() => {
        const submitButtonDisabled = getByLabelText('Next');
        expect(submitButtonDisabled).toBeDisabled();
      });
    });

    it('should disable submit button when issuing state is not selected', async () => {
      const { getByLabelText, getByTestId } = render(<DriversLicenceScreen />);
      const driversLicenceInput = getByTestId(addInputSuffix('drivers-licence'));
      fireEvent.changeText(driversLicenceInput, '21228765');

      await waitFor(() => {
        const submitButtonDisabled = getByLabelText('Next');
        expect(submitButtonDisabled).toBeDisabled();
      });
    });

    it('should disable submit button when card number is empty', async () => {
      const { getByLabelText, getByTestId, getByText } = render(<DriversLicenceScreen />);
      const driversLicenceInput = getByTestId(addInputSuffix('drivers-licence'));
      fireEvent.changeText(driversLicenceInput, '21228765');

      const cardNumberInput = getByTestId(addInputSuffix('card-number'));
      fireEvent.changeText(cardNumberInput, '');

      const issuingStateInput = getByTestId('issuing-state');
      fireEvent.press(issuingStateInput);

      await waitFor(() => {
        const stateOption = getByText('NSW');
        fireEvent.press(stateOption);

        const submitButtonDisabled = getByLabelText('Next');
        expect(submitButtonDisabled).toBeDisabled();
      });
    });
  });

  describe('User entered valid input', () => {
    it('should navigate to personal details screen when drivers licence is valid', async () => {
      const { getByLabelText, getByTestId, getByText } = render(<DriversLicenceScreen />);
      const driversLicenceInput = getByTestId(addInputSuffix('drivers-licence'));
      fireEvent.changeText(driversLicenceInput, '21228765');

      const issuingStateInput = getByTestId('issuing-state');
      fireEvent.press(issuingStateInput);

      await waitFor(() => {
        const stateOption = getByText('NSW');
        fireEvent.press(stateOption);

        const cardNumberInput = getByTestId(addInputSuffix('card-number'));
        fireEvent.changeText(cardNumberInput, '0909889');

        const submitButton = getByLabelText('Next');
        fireEvent.press(submitButton);

        expect(mockedNavigate).toBeCalledWith('IdentityVerificationTerm');
      });
    });

    it('should go back previous screen by using back chevron', () => {
      const { getByTestId } = render(<DriversLicenceScreen />);
      const button = getByTestId('topbar-back-icon');
      fireEvent.press(button);
      expect(mockedGoBack).toBeCalled();
    });
  });
});
