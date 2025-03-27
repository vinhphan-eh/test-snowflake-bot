import React from 'react';
import dayjs from 'dayjs';
import { mockedGoBack, mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { DISPLAY_FORMAT, SEND_FORMAT } from '../../../../../common/constants/date';
import { addInputSuffix, fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { PaymentLaterScreen } from '../PaymentLaterScreen';

const mockSetPaymentLater = jest.fn();

jest.mock('../../stores/usePayAnyoneStore', () => {
  return {
    usePayAnyoneStore: () => ({
      setPaymentLater: mockSetPaymentLater,
      payeeDetails: { accountName: 'Receiver', accountNumber: '11112222', bsb: '111222' },
      paymentDetails: { amount: '2.35', description: 'Test 1', reference: undefined },
    }),
  };
});

describe('Payment later screen', () => {
  it('should render properly', async () => {
    const { getByLabelText, getByTestId, getByText } = render(<PaymentLaterScreen />);

    await waitFor(() => {
      expect(getByText('Let’s send $2.35 to Receiver')).toBeTruthy();
      expect(getByTestId(addInputSuffix('start-date'))).toBeTruthy();
      expect(getByLabelText('Next')).toBeTruthy();
    });
  });

  it('should not be able to go to next screen by default', () => {
    const { getByLabelText } = render(<PaymentLaterScreen />);
    const nextButton = getByLabelText('Next');
    fireEvent.press(nextButton);
    expect(mockedNavigate).not.toBeCalled();
  });

  it('should be able to go back if clicked on the back chevron', () => {
    const { getByTestId } = render(<PaymentLaterScreen />);
    const backButton = getByTestId('topbar-back-icon');
    fireEvent.press(backButton);
    expect(mockedGoBack).toBeCalled();
  });

  describe('user inputs valid date', () => {
    it('works correctly with default start date', async () => {
      const { getByDisplayValue, getByTestId, getByText } = render(<PaymentLaterScreen />);
      const startDateInput = getByTestId(addInputSuffix('start-date'));

      await waitFor(() => {
        fireEvent.press(startDateInput);
        fireEvent.press(getByText('Confirm'));
      });

      // Default date as the minimum allowed date, one date after the current date
      const tomorrow = dayjs(new Date()).add(1, 'day').toDate();
      expect(getByDisplayValue(dayjs(new Date(tomorrow)).format(DISPLAY_FORMAT))).toBeTruthy();
    });

    it('works correctly when choosing a valid date', async () => {
      const { getByDisplayValue, getByTestId, getByText } = render(<PaymentLaterScreen />);
      const startDateInput = getByTestId(addInputSuffix('start-date'));

      await waitFor(() => {
        fireEvent.press(startDateInput);

        const validDate = dayjs(new Date()).add(2, 'day').toDate();
        fireEvent(getByTestId('datePickerIOS'), 'onChange', {
          nativeEvent: { timestamp: validDate },
          validDate,
        });

        fireEvent.press(getByText('Confirm'));
        expect(getByDisplayValue(dayjs(new Date(validDate)).format(DISPLAY_FORMAT))).toBeTruthy();
      });
    });

    it('works correctly when clicking on Next', async () => {
      const { getByTestId, getByText } = render(<PaymentLaterScreen />);
      const startDateInput = getByTestId(addInputSuffix('start-date'));

      await waitFor(() => {
        fireEvent.press(startDateInput);
        fireEvent.press(getByText('Confirm'));
      });

      const buttonNext = getByText('Next');
      fireEvent.press(buttonNext);

      await waitFor(() => {
        expect(mockSetPaymentLater).toBeCalledWith({
          startDate: dayjs(dayjs(new Date()).add(1, 'day').toDate()).format(SEND_FORMAT),
        });
        expect(mockedNavigate).toBeCalledWith('PaymentConfirmation');
      });
    });
  });
});
