import React from 'react';
import { mockedGoBack } from '../../../../../../__mocks__/react-navigation';
import { MINIMUM_TRANSFERRED_AMOUNT_PER_TIME } from '../../../../../common/constants/payment';
import { createCurrencyFormatter } from '../../../../../common/utils/numbers';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { useGetSpendAmount } from '../../../hooks/useGetSpendAmount';
import { UkPaymentDetailsScreen } from '../UkPaymentDetailsScreen';

const mockedSetPaymentDetails = jest.fn();

jest.mock('../../../hooks/useGetSpendAmount');

const mockUseGetSpendAmount = useGetSpendAmount as jest.MockedFunction<typeof useGetSpendAmount>;

jest.mock('../../stores/useUkPayAnyoneStore', () => {
  return {
    useUkPayAnyoneStore: () => ({
      setPaymentDetails: mockedSetPaymentDetails,
    }),
  };
});

describe('Payment Details Screen', () => {
  beforeEach(() => {
    mockUseGetSpendAmount.mockReturnValue({
      availableAmount: 100,
      availableBalance: 100,
      stashedAmount: 0,
      walletLoading: false,
    });
  });

  it('should render properly', async () => {
    const { getByLabelText, getByTestId, getByText } = render(<UkPaymentDetailsScreen />);

    await waitFor(() => {
      expect(getByText('Available balance: £100.00')).toBeTruthy();
      expect(getByTestId('uk-amount-input')).toBeTruthy();
      expect(getByTestId('uk-description-input')).toBeTruthy();
      expect(getByLabelText('next')).toBeDisabled();
    });
  });

  describe('user is able to click next', () => {
    it('should pass all the validation', async () => {
      const { getByLabelText, getByTestId } = render(<UkPaymentDetailsScreen />);

      const amountInput = getByTestId('uk-amount-input');
      const descriptionInput = getByTestId('uk-description-input');
      fireEvent.changeText(amountInput, '1.5');
      fireEvent.changeText(descriptionInput, 'Send money');

      const nextButton = getByLabelText('next');
      await waitFor(() => {
        expect(nextButton).toBeEnabled();
      });
      fireEvent.press(nextButton);

      await waitFor(() => {
        expect(mockedSetPaymentDetails).toBeCalledWith({
          amount: '1.5',
          description: 'Send money',
        });
      });
    });
  });

  describe('user is unable to click next', () => {
    it('should show error if user enter amount less than lower limit', async () => {
      const formatCurrency = createCurrencyFormatter();

      const { getByDisplayValue, getByTestId, queryByText } = render(<UkPaymentDetailsScreen />);

      const amount = '0.00';
      const expectedError = `Amount must be ${formatCurrency(MINIMUM_TRANSFERRED_AMOUNT_PER_TIME)} or more`;

      const amountInput = getByTestId('uk-amount-input');
      fireEvent.changeText(amountInput, amount);

      await waitFor(() => expect(getByDisplayValue(amount)).toBeTruthy());

      fireEvent(amountInput, 'blur');

      await waitFor(() => {
        expect(queryByText(expectedError)).toBeTruthy();
      });
    });

    it('should show error if users does not have enough funds to handle the payment', async () => {
      const { getByDisplayValue, getByTestId, queryByText } = render(<UkPaymentDetailsScreen />);

      const amount = '300';
      const expectedError = 'You do not have enough funds.';

      const amountInput = getByTestId('uk-amount-input');
      fireEvent.changeText(amountInput, amount);

      await waitFor(() => expect(getByDisplayValue(amount)).toBeTruthy());

      fireEvent(amountInput, 'blur');

      await waitFor(() => {
        expect(queryByText(expectedError)).toBeTruthy();
      });
    });

    it('should show error when user enters more than 18 characters in description', async () => {
      const { getByDisplayValue, getByTestId, getByText } = render(<UkPaymentDetailsScreen />);

      const description =
        'You may be requested by the business or person you are paying to enter information in this field to identify your payment';

      const descriptionInput = getByTestId('uk-description-input');
      fireEvent.changeText(descriptionInput, description);

      await waitFor(() => expect(getByDisplayValue(description)).toBeTruthy());

      fireEvent(descriptionInput, 'blur');

      await waitFor(() => {
        expect(getByText(`${description.length}/18 characters. Description too long.`)).toBeTruthy();
      });
    });
  });

  it('should go back previous screen by using back chevron', () => {
    const { getByTestId } = render(<UkPaymentDetailsScreen />);
    const button = getByTestId('topbar-back-icon');
    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });
});
