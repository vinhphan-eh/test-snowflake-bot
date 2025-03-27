import React from 'react';
import { mockedGoBack } from '../../../../../../__mocks__/react-navigation';
import {
  MAXIMUM_TRANSFERRED_AMOUNT_PER_TIME,
  MINIMUM_TRANSFERRED_AMOUNT_PER_TIME,
} from '../../../../../common/constants/payment';
import { createCurrencyFormatter } from '../../../../../common/utils/numbers';
import { addInputSuffix, fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { useGetSpendAmount } from '../../../hooks/useGetSpendAmount';
import { PaymentDetailsScreen } from '../PaymentDetailsScreen';

const mockedSetPaymentDetails = jest.fn();

jest.mock('../../../hooks/useGetSpendAmount');

const mockUseGetSpendAmount = useGetSpendAmount as jest.MockedFunction<typeof useGetSpendAmount>;

jest.mock('../../stores/usePayAnyoneStore', () => {
  return {
    usePayAnyoneStore: () => ({
      setPaymentDetails: mockedSetPaymentDetails,
    }),
  };
});

describe('Payment Details Screen', () => {
  beforeEach(() => {
    mockUseGetSpendAmount.mockReturnValue({
      availableAmount: 1600,
      availableBalance: 2000,
      stashedAmount: 500,
      walletLoading: false,
    });
  });

  it('should render properly', async () => {
    const { getByLabelText, getByTestId, getByText } = render(<PaymentDetailsScreen />);

    await waitFor(() => {
      expect(getByText('Available balance: $1,600.00')).toBeTruthy();
      expect(getByTestId(addInputSuffix('amount'))).toBeTruthy();
      expect(getByTestId(addInputSuffix('description'))).toBeTruthy();
      expect(getByTestId(addInputSuffix('reference'))).toBeTruthy();
      expect(getByLabelText('next')).toBeDisabled();
    });
  });

  describe('user is able to click next', () => {
    it('should pass all the validation', async () => {
      const { getByLabelText, getByTestId } = render(<PaymentDetailsScreen />);

      const amountInput = getByTestId(addInputSuffix('amount'));
      const descriptionInput = getByTestId(addInputSuffix('description'));
      fireEvent.changeText(amountInput, '1000.5');
      fireEvent.changeText(descriptionInput, 'Send money to someone');

      const nextButton = getByLabelText('next');
      await waitFor(() => {
        expect(nextButton).toBeEnabled();
      });
      fireEvent.press(nextButton);

      await waitFor(() => {
        expect(mockedSetPaymentDetails).toBeCalledWith({
          amount: '1000.5',
          description: 'Send money to someone',
        });
      });
    });
  });

  describe('user is unable to click next', () => {
    it('should show error if user enter amount less than lower limit', async () => {
      const formatCurrency = createCurrencyFormatter();

      const { getByDisplayValue, getByTestId, queryByText } = render(<PaymentDetailsScreen />);

      const amount = '0.00';
      const expectedError = `Amount must be ${formatCurrency(MINIMUM_TRANSFERRED_AMOUNT_PER_TIME)} or more`;

      const amountInput = getByTestId(addInputSuffix('amount'));
      fireEvent.changeText(amountInput, amount);

      await waitFor(() => expect(getByDisplayValue(amount)).toBeTruthy());

      fireEvent(amountInput, 'blur');

      await waitFor(() => {
        expect(queryByText(expectedError)).toBeTruthy();
      });
    });

    it('should show error if user enter amount higher than upper limit', async () => {
      const formatCurrency = createCurrencyFormatter();

      const { getByDisplayValue, getByTestId, queryByText } = render(<PaymentDetailsScreen />);

      const amount = '2100';
      const expectedError = `Over limit. Enter amount less than ${formatCurrency(MAXIMUM_TRANSFERRED_AMOUNT_PER_TIME)}`;

      const amountInput = getByTestId(addInputSuffix('amount'));
      fireEvent.changeText(amountInput, amount);

      await waitFor(() => expect(getByDisplayValue(amount)).toBeTruthy());

      fireEvent(amountInput, 'blur');

      await waitFor(() => {
        expect(queryByText(expectedError)).toBeTruthy();
      });
    });

    it('should show error if users does not have enough funds to handle the payment', async () => {
      const { getByDisplayValue, getByTestId, queryByText } = render(<PaymentDetailsScreen />);

      const amount = '1700';
      const expectedError = 'You do not have enough funds.';

      const amountInput = getByTestId(addInputSuffix('amount'));
      fireEvent.changeText(amountInput, amount);

      await waitFor(() => expect(getByDisplayValue(amount)).toBeTruthy());

      fireEvent(amountInput, 'blur');

      await waitFor(() => {
        expect(queryByText(expectedError)).toBeTruthy();
      });
    });

    it('should show error when user enters more than 45 characters in description', async () => {
      const { getByDisplayValue, getByTestId, getByText } = render(<PaymentDetailsScreen />);

      const description =
        'You may be requested by the business or person you are paying to enter information in this field to identify your payment';

      const descriptionInput = getByTestId(addInputSuffix('description'));
      fireEvent.changeText(descriptionInput, description);

      await waitFor(() => expect(getByDisplayValue(description)).toBeTruthy());

      fireEvent(descriptionInput, 'blur');

      await waitFor(() => {
        expect(getByText(`${description.length}/45 characters. Description too long.`)).toBeTruthy();
      });
    });
  });

  it('should go back previous screen by using back chevron', () => {
    const { getByTestId } = render(<PaymentDetailsScreen />);
    const button = getByTestId('topbar-back-icon');
    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });

  it('should show error when reference field is invalid', async () => {
    const { getByDisplayValue, getByTestId, getByText } = render(<PaymentDetailsScreen />);
    const amountInput = getByTestId(addInputSuffix('reference'));
    fireEvent.changeText(amountInput, 'a12!@#');

    await waitFor(() => expect(getByDisplayValue('a12!@#')).toBeTruthy());

    fireEvent(amountInput, 'blur');

    await waitFor(() => {
      expect(getByText('Field cannot contain special characters')).toBeTruthy();
    });
  });

  it('should show and close bottom sheet by clicking tooltip', async () => {
    const { getByTestId } = render(<PaymentDetailsScreen />);
    const tooltip = getByTestId('reference-tooltip');
    fireEvent.press(tooltip);

    await waitFor(() => {
      expect(getByTestId('ref_description_text')).toBeTruthy();
    });
  });
});
