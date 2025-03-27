import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { useGetSpendAmount } from '../../../hooks/useGetSpendAmount';
import { UkPayeeDetailsScreen } from '../UkPayeeDetailsScreen';

const mockedSetPayeeDetails = jest.fn();

jest.mock('../../stores/useUkPayAnyoneStore', () => {
  return {
    useUkPayAnyoneStore: () => ({
      setPayeeDetails: mockedSetPayeeDetails,
    }),
  };
});

jest.mock('../../../hooks/useGetSpendAmount');

const mockUseGetSpendAmount = useGetSpendAmount as jest.MockedFunction<typeof useGetSpendAmount>;

describe('Uk Payee details screen', () => {
  beforeEach(() => {
    mockUseGetSpendAmount.mockReturnValue({
      availableAmount: 100,
      availableBalance: 100,
      stashedAmount: 0,
      walletLoading: false,
    });
  });

  it('should render properly', async () => {
    const { getByLabelText, getByTestId, getByText } = render(<UkPayeeDetailsScreen />);

    await waitFor(() => {
      expect(getByText('Available balance: £100.00')).toBeTruthy();
      expect(getByTestId('uk-account-name-input')).toBeTruthy();
      expect(getByTestId('sort-code-input')).toBeTruthy();
      expect(getByTestId('uk-account-number-input')).toBeTruthy();
      expect(getByLabelText('Next')).toBeTruthy();
    });
  });

  describe('user is able to click next', () => {
    it('should pass all the validation', async () => {
      const { getByLabelText, getByTestId } = render(<UkPayeeDetailsScreen />);
      const accountNameInput = getByTestId('uk-account-name-input');
      const accountNumberInput = getByTestId('uk-account-number-input');
      const sortCodeInput = getByTestId('sort-code-input');

      fireEvent.changeText(accountNameInput, `Test's Account-name`);
      fireEvent.changeText(accountNumberInput, '123456789');
      fireEvent.changeText(sortCodeInput, '123456');

      await waitFor(() => {
        const nextButton = getByLabelText('Next');

        fireEvent.press(nextButton);

        expect(mockedSetPayeeDetails).toBeCalledWith({
          accountName: `Test's Account-name`,
          accountNumber: '123456789',
          sortCode: '123456',
        });

        expect(mockedNavigate).toBeCalledWith('UkPaymentDetails');
      });
    });
  });

  describe('user is unable to click next', () => {
    it('should show error message with invalid account name', async () => {
      const { getByDisplayValue, getByLabelText, getByTestId, getByText } = render(<UkPayeeDetailsScreen />);
      const accountNameInput = getByTestId('uk-account-name-input');

      fireEvent.changeText(accountNameInput, 'sp3c1Al ch4rAct3r');

      await waitFor(() => expect(getByDisplayValue('sp3c1Al ch4rAct3r')).toBeTruthy());

      fireEvent(accountNameInput, 'blur');
      fireEvent.press(getByLabelText('Next'));

      await waitFor(() => {
        expect(getByText('Field cannot contain numbers or special characters')).toBeTruthy();
        expect(mockedNavigate).not.toBeCalledWith('PaymentDetails');
      });
    });

    it('should show error message with invalid account number length', async () => {
      const { getByDisplayValue, getByLabelText, getByTestId, getByText } = render(<UkPayeeDetailsScreen />);
      const accountNumberInput = getByTestId('uk-account-number-input');

      fireEvent.changeText(accountNumberInput, '1234');

      await waitFor(() => expect(getByDisplayValue('1234')).toBeTruthy());

      fireEvent(accountNumberInput, 'blur');
      fireEvent.press(getByLabelText('Next'));

      await waitFor(() => {
        expect(getByText('Account number must be between 8 characters')).toBeTruthy();
        expect(mockedNavigate).not.toBeCalledWith('UkPaymentDetails');
      });
    });

    it('should show error message with invalid account number characters', async () => {
      const { getByDisplayValue, getByLabelText, getByTestId, getByText } = render(<UkPayeeDetailsScreen />);
      const accountNumberInput = getByTestId('uk-account-number-input');

      fireEvent.changeText(accountNumberInput, '1234567.14');

      await waitFor(() => {
        expect(getByDisplayValue('1234567.14')).toBeTruthy();
      });

      fireEvent(accountNumberInput, 'blur');
      fireEvent.press(getByLabelText('Next'));

      await waitFor(() => {
        expect(getByText('Account number must be numeric')).toBeTruthy();
        expect(mockedNavigate).not.toBeCalledWith();
      });
    });

    it('should show error message with invalid sortCode', async () => {
      const { getByDisplayValue, getByLabelText, getByTestId, getByText } = render(<UkPayeeDetailsScreen />);
      const sortCodeInput = getByTestId('sort-code-input');

      fireEvent.changeText(sortCodeInput, '1234');

      await waitFor(() => expect(getByDisplayValue('1234')).toBeTruthy());

      fireEvent(sortCodeInput, 'blur');
      fireEvent.press(getByLabelText('Next'));

      await waitFor(() => {
        expect(getByText('Sort code must be 6 digits')).toBeTruthy();
        expect(mockedNavigate).not.toBeCalledWith();
      });
    });

    it('should go back previous screen by using back chevron', () => {
      const { getByTestId } = render(<UkPayeeDetailsScreen />);
      const button = getByTestId('topbar-back-icon');
      fireEvent.press(button);
      expect(mockedGoBack).toBeCalled();
    });
  });
});
