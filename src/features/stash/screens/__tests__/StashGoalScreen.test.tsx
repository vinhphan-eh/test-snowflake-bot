import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { MINIMUM_TRANSFERRED_AMOUNT_PER_TIME } from '../../../../common/constants/payment';
import { createCurrencyFormatter } from '../../../../common/utils/numbers';
import { fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { EXAMPLE_STASH } from '../../constants';
import { StashGoalScreen } from '../StashGoalScreen';

const EXAMPLE_STASH_NAME = EXAMPLE_STASH.name;
const mockSetTargetAmount = jest.fn();

jest.mock('../../stores/useCreateStashStore', () => {
  return {
    useCreateStashStore: () => ({
      name: EXAMPLE_STASH_NAME,
      setTargetAmount: mockSetTargetAmount,
    }),
  };
});

describe('StashGoalScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render properly', () => {
    const { getByTestId, getByText } = render(<StashGoalScreen />);
    expect(getByText(`Set a goal for your ${EXAMPLE_STASH_NAME} Stash`)).toBeTruthy();
    expect(getByText('Create a Stash')).toBeTruthy();
    expect(getByText('Target amount')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
    expect(getByText('Skip')).toBeTruthy();
    expect(getByTestId('topbar-back-icon')).toBeTruthy();
  });

  it('should navigate back on clicked', async () => {
    const { getByTestId } = render(<StashGoalScreen />);
    const button = getByTestId('topbar-back-icon');

    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });

  it('should disable Next button by default', async () => {
    const { getByLabelText } = render(<StashGoalScreen />);
    const button = getByLabelText('Next');

    fireEvent.press(button);
    expect(mockedNavigate).not.toBeCalled();
  });

  it('should navigate to next step if clicked on Skip', async () => {
    const { getByText } = render(<StashGoalScreen />);
    const buttonSkip = getByText('Skip');

    fireEvent.press(buttonSkip);

    expect(mockSetTargetAmount).toHaveBeenCalledWith(0);
    expect(mockedNavigate).toHaveBeenCalledWith('StashImage');
  });

  describe('Invalid stash target amount', () => {
    it('should display error if input stash target amount exceeded the maximum limit', async () => {
      const { getByDisplayValue, getByTestId, queryByText } = render(<StashGoalScreen />);
      const inputStashGoalAmount = getByTestId('targetAmount-input');
      const formatCurrency = createCurrencyFormatter();

      fireEvent.changeText(inputStashGoalAmount, '50001');

      await waitFor(() => expect(getByDisplayValue('50001')).toBeTruthy());

      fireEvent(inputStashGoalAmount, 'blur');

      await waitFor(() => {
        expect(queryByText(`You cannot Stash more than ${formatCurrency(50000)}`)).toBeTruthy();
      });
    });

    it('should display error if input stash target amount less than the minimum limit', async () => {
      const { getByDisplayValue, getByTestId, queryByText } = render(<StashGoalScreen />);
      const inputStashGoalAmount = getByTestId('targetAmount-input');
      const formatCurrency = createCurrencyFormatter();

      fireEvent.changeText(inputStashGoalAmount, '0.00');

      await waitFor(() => expect(getByDisplayValue('0.00')).toBeTruthy());

      fireEvent(inputStashGoalAmount, 'blur');

      await waitFor(() => {
        expect(
          queryByText(`Amount must be ${formatCurrency(MINIMUM_TRANSFERRED_AMOUNT_PER_TIME)} or more`)
        ).toBeTruthy();
      });
    });
  });

  describe('User clicked on the Next button', () => {
    it('should set all the required information and navigate to the next step', async () => {
      const { getByDisplayValue, getByLabelText, getByTestId } = render(<StashGoalScreen />);
      const button = getByLabelText('Next');
      const inputStashGoalAmount = getByTestId('targetAmount-input');

      fireEvent.changeText(inputStashGoalAmount, '10000');

      await waitFor(() => expect(getByDisplayValue('10000')).toBeTruthy());

      fireEvent(inputStashGoalAmount, 'blur');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockSetTargetAmount).toHaveBeenCalledWith(parseFloat('10000'));
        expect(mockedNavigate).toHaveBeenCalledWith('StashImage');
      });
    });
  });
});
