import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { addInputSuffix, fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { PayeeDetailsScreen } from '../PayeeDetailsScreen';

const mockedSetPayeeDetails = jest.fn();
const mockSetSavingPayeeDetails = jest.fn();

jest.mock('../../stores/usePayAnyoneStore', () => {
  return {
    usePayAnyoneStore: () => ({
      setPayeeDetails: mockedSetPayeeDetails,
      setSavingPayeeDetails: mockSetSavingPayeeDetails,
    }),
  };
});

describe('Payee details screen', () => {
  it('should render properly', async () => {
    const { getByTestId } = render(<PayeeDetailsScreen />);

    expect(getByTestId(addInputSuffix('accountName'))).toBeTruthy();
    expect(getByTestId(addInputSuffix('accountNumber'))).toBeTruthy();
    expect(getByTestId(addInputSuffix('bsb'))).toBeTruthy();
  });

  describe('user is able to click next', () => {
    it('should pass all the validation', async () => {
      const { getByTestId } = render(<PayeeDetailsScreen />);
      const accountNameInput = getByTestId(addInputSuffix('accountName'));
      const accountNumberInput = getByTestId(addInputSuffix('accountNumber'));
      const bsbInput = getByTestId(addInputSuffix('bsb'));

      fireEvent.changeText(accountNameInput, `Test's Account-name`);
      fireEvent.changeText(accountNumberInput, '1234567');
      fireEvent.changeText(bsbInput, '123456');
      fireEvent(bsbInput, 'onBlur', { nativeEvent: { text: '123456' } });

      await waitFor(() => {
        const nextButton = getByTestId('new-payee-next');

        fireEvent.press(nextButton);

        expect(mockedSetPayeeDetails).toBeCalledWith({
          accountName: `Test's Account-name`,
          accountNumber: '1234567',
          bsb: '123-456',
        });

        expect(mockedNavigate).toBeCalledWith('PaymentDetails');
      });
    });
  });

  describe('user is unable to click next', () => {
    it('should show error message with invalid account name', async () => {
      const { getByDisplayValue, getByTestId, getByText } = render(<PayeeDetailsScreen />);
      const accountNameInput = getByTestId(addInputSuffix('accountName'));

      fireEvent.changeText(accountNameInput, 'sp3c1Al ch4rAct3r');

      await waitFor(() => expect(getByDisplayValue('sp3c1Al ch4rAct3r')).toBeTruthy());

      fireEvent(accountNameInput, 'blur');
      fireEvent.press(getByTestId('new-payee-next'));

      await waitFor(() => {
        expect(getByText('Field cannot contain numbers or special characters')).toBeTruthy();
        expect(mockedNavigate).not.toBeCalledWith('PaymentDetails');
      });
    });

    it('should show error message with invalid account number length', async () => {
      const { getByDisplayValue, getByTestId, getByText } = render(<PayeeDetailsScreen />);
      const accountNumberInput = getByTestId(addInputSuffix('accountNumber'));

      fireEvent.changeText(accountNumberInput, '1234');

      await waitFor(() => expect(getByDisplayValue('1234')).toBeTruthy());

      fireEvent(accountNumberInput, 'blur');
      fireEvent.press(getByTestId('new-payee-next'));

      await waitFor(() => {
        expect(getByText('Account number must be between 6-9 characters')).toBeTruthy();
        expect(mockedNavigate).not.toBeCalledWith('PaymentDetails');
      });
    });

    it('should show error message with invalid account number characters', async () => {
      const { getByDisplayValue, getByTestId, getByText } = render(<PayeeDetailsScreen />);
      const accountNumberInput = getByTestId(addInputSuffix('accountNumber'));

      fireEvent.changeText(accountNumberInput, '1234.5');

      await waitFor(() => {
        expect(getByDisplayValue('1234.5')).toBeTruthy();
      });

      fireEvent(accountNumberInput, 'blur');
      fireEvent.press(getByTestId('new-payee-next'));

      await waitFor(() => {
        expect(getByText('Account number must be numeric')).toBeTruthy();
        expect(mockedNavigate).not.toBeCalledWith('PaymentDetails');
      });
    });

    it('should show error message with invalid bsb', async () => {
      const { getByDisplayValue, getByTestId, getByText } = render(<PayeeDetailsScreen />);
      const bsbInput = getByTestId(addInputSuffix('bsb'));

      fireEvent.changeText(bsbInput, '1234');

      await waitFor(() => expect(getByDisplayValue('1234')).toBeTruthy());

      fireEvent(bsbInput, 'blur');
      fireEvent.press(getByTestId('new-payee-next'));

      await waitFor(() => {
        expect(getByText('BSB must be 6 characters')).toBeTruthy();
        expect(mockedNavigate).not.toBeCalledWith('PaymentDetails');
      });
    });

    it('should go back previous screen by using back chevron', () => {
      const { getByTestId } = render(<PayeeDetailsScreen />);
      const button = getByTestId('topbar-back-icon');
      fireEvent.press(button);
      expect(mockedGoBack).toBeCalled();
    });
  });
});
