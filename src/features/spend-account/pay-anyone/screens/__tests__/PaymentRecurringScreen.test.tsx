import React from 'react';
import dayjs from 'dayjs';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { DISPLAY_FORMAT } from '../../../../../common/constants/date';
import { addInputSuffix, fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { usePayAnyoneStore } from '../../stores/usePayAnyoneStore';
import { PaymentRecurringScreen } from '../PaymentRecurringScreen';

const validDate = dayjs(new Date()).add(5, 'day').toDate();

describe('Payment Recurring Screen', () => {
  beforeEach(() => {
    usePayAnyoneStore.setState({
      payeeDetails: {
        accountName: 'Test Account',
        accountNumber: '123456',
        bsb: '123456',
      },
      paymentDetails: {
        amount: '123',
        description: 'Test Description',
        reference: 'Test Reference',
      },
    });
  });

  test('should render correctly', () => {
    const { getByText } = render(<PaymentRecurringScreen />);
    expect(
      getByText('If a recurring payment is declined due to insufficient funds, all future payments will be cancelled.')
    ).toBeTruthy();
    expect(getByText('Frequency')).toBeTruthy();
    expect(getByText('Start date')).toBeTruthy();
    expect(getByText('End')).toBeTruthy();
  });

  test.each([
    {
      fieldName: 'Frequency',
      testId: 'frequency',
      options: ['Weekly', 'Fortnightly', 'Monthly', 'Quarterly'],
      expectedValue: 'Weekly',
    },
    {
      fieldName: 'End',
      testId: 'end type',
      options: ['Number of payments', 'End by', 'No end'],
      expectedValue: 'No end',
    },
  ])(`should select $fieldName and select one of them`, ({ expectedValue, options, testId }) => {
    const { getByTestId, getByText } = render(<PaymentRecurringScreen />);

    const button = getByTestId(testId);
    fireEvent.press(button);

    options.forEach(option => {
      expect(getByText(option)).toBeTruthy();
    });

    fireEvent.press(getByText(expectedValue));
    expect(getByText(expectedValue)).toBeTruthy();
  });

  test('should submit correctly with No End', async () => {
    const { getByDisplayValue, getByTestId, getByText } = render(<PaymentRecurringScreen />);

    await waitFor(() => {
      const frequencyBtn = getByTestId('frequency');
      const startDateBtn = getByTestId(addInputSuffix('start-date'));
      const endTypeBtn = getByTestId('end type');
      const nextBtn = getByText('Next');

      // Select frequency
      fireEvent.press(frequencyBtn);
      fireEvent.press(getByText('Weekly'));
      expect(getByDisplayValue('Weekly')).toBeTruthy();

      // Select start date
      fireEvent.press(startDateBtn);
      fireEvent(getByTestId('datePickerIOS'), 'onChange', {
        nativeEvent: { timestamp: validDate },
        validDate,
      });

      fireEvent.press(getByText('Confirm'));
      expect(getByDisplayValue(dayjs(new Date(validDate)).format(DISPLAY_FORMAT))).toBeTruthy();

      // Select end type
      fireEvent.press(endTypeBtn);
      fireEvent.press(getByText('No end'));
      expect(getByDisplayValue('No end')).toBeTruthy();

      // Press next button
      fireEvent.press(nextBtn);
      expect(mockedNavigate).toBeCalledWith('PaymentConfirmation');
    });
  });

  test('should submit correctly with End Date', async () => {
    const { getByDisplayValue, getByTestId, getByText } = render(<PaymentRecurringScreen />);

    await waitFor(() => {
      const frequencyBtn = getByTestId('frequency');
      const startDateBtn = getByTestId(addInputSuffix('start-date'));
      const endTypeBtn = getByTestId('end type');
      const nextBtn = getByText('Next');

      // Select frequency
      fireEvent.press(frequencyBtn);
      fireEvent.press(getByText('Weekly'));
      expect(getByDisplayValue('Weekly')).toBeTruthy();

      // Select start date
      fireEvent.press(startDateBtn);
      fireEvent(startDateBtn, 'onChange', validDate);
      fireEvent.press(getByText('Confirm'));

      // Select end type
      fireEvent.press(endTypeBtn);
      fireEvent.press(getByText('End by'));
      const endDateBtn = getByTestId(addInputSuffix('end-date'));
      fireEvent(endDateBtn, 'onChange', validDate);

      // Press next button
      fireEvent.press(nextBtn);
      expect(mockedNavigate).toBeCalledWith('PaymentConfirmation');
    });
  });

  test('should submit correctly with Number of Payments', async () => {
    const { getByDisplayValue, getByTestId, getByText } = render(<PaymentRecurringScreen />);

    await waitFor(() => {
      const frequencyBtn = getByTestId('frequency');

      // Select frequency
      fireEvent.press(frequencyBtn);
      fireEvent.press(getByText('Weekly'));
      expect(getByDisplayValue('Weekly')).toBeTruthy();
    });

    const startDateBtn = getByTestId(addInputSuffix('start-date'));
    const endTypeBtn = getByTestId('end type');
    const nextBtn = getByText('Next');

    // Select start date
    fireEvent.press(startDateBtn);
    fireEvent(startDateBtn, 'onChange', validDate);
    fireEvent.press(getByText('Confirm'));

    // Select end type
    fireEvent.press(endTypeBtn);
    fireEvent.press(getByText('Number of payments'));
    const paymentInput = getByTestId(addInputSuffix('number-of-payments'));
    fireEvent.changeText(paymentInput, '10');

    await waitFor(() => {
      // Press next button
      fireEvent.press(nextBtn);
      expect(mockedNavigate).toBeCalledWith('PaymentConfirmation');
    });
  });

  describe('should display error properly if users enter invalid Number of Payments', () => {
    test('Number of payments input is less than 1', async () => {
      const { getByDisplayValue, getByTestId, getByText, queryByText } = render(<PaymentRecurringScreen />);

      await waitFor(() => {
        const frequencyBtn = getByTestId('frequency');

        // Select frequency
        fireEvent.press(frequencyBtn);
        fireEvent.press(getByText('Weekly'));
        expect(getByDisplayValue('Weekly')).toBeTruthy();
      });

      const startDateBtn = getByTestId(addInputSuffix('start-date'));
      const endTypeBtn = getByTestId('end type');
      const nextBtn = getByText('Next');

      // Select start date
      fireEvent.press(startDateBtn);
      fireEvent(startDateBtn, 'onChange', validDate);
      fireEvent.press(getByText('Confirm'));

      // Select end type
      fireEvent.press(endTypeBtn);
      fireEvent.press(getByText('Number of payments'));
      const paymentInput = getByTestId(addInputSuffix('number-of-payments'));

      fireEvent.changeText(paymentInput, '0');
      await waitFor(() => expect(getByDisplayValue('0')).toBeTruthy());
      fireEvent(paymentInput, 'blur');

      await waitFor(() => {
        expect(queryByText('Number of payments must be greater than 0.')).toBeTruthy();

        // Press next button
        fireEvent.press(nextBtn);
        expect(mockedNavigate).not.toHaveBeenCalledWith('PaymentConfirmation');
      });
    });
  });
});
