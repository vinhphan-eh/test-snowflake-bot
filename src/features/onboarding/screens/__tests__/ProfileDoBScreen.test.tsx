import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import dayjs from 'dayjs';
import { mockedGoBack, mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { DISPLAY_FORMAT } from '../../../../common/constants/date';
import { addInputSuffix, render } from '../../../../common/utils/testing';
import { ProfileDoBScreen } from '../ProfileDoBScreen';

const setDataDetails = jest.fn();

jest.mock('../../stores/useOnboardingStore', () => {
  return {
    useOnboardingStore: () => ({
      setPersonalDetails: setDataDetails,
      getNextProfileInputPage: () => 'PersonalDetails',
    }),
  };
});

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Profile Date of Birth Screen', () => {
  it('renders properly', () => {
    const { getByLabelText, getByTestId, getByText } = render(<ProfileDoBScreen />);
    expect(getByTestId('topbar-back-icon')).toBeTruthy();
    expect(getByText('Personal details')).toBeTruthy();
    expect(getByText(`What's your birthday?`)).toBeTruthy();
    expect(getByTestId(addInputSuffix('dob'))).toBeTruthy();
    expect(getByLabelText('Next')).toBeTruthy();
  });

  it('should not go to next screen', () => {
    const { getByLabelText } = render(<ProfileDoBScreen />);
    const saveButton = getByLabelText('Next');
    fireEvent.press(saveButton);
    expect(mockedNavigate).not.toBeCalled();
  });

  it('should be able to go back', () => {
    const { getByTestId } = render(<ProfileDoBScreen />);
    const saveButton = getByTestId('topbar-back-icon');
    fireEvent.press(saveButton);
    expect(mockedGoBack).toBeCalled();
  });

  describe('user input valid date', () => {
    it('works correctly with default start date', async () => {
      const { getByDisplayValue, getByTestId, getByText } = render(<ProfileDoBScreen />);
      const dobInput = getByTestId(addInputSuffix('dob'));
      const date = dayjs(new Date()).format(DISPLAY_FORMAT);

      await waitFor(() => {
        fireEvent.press(dobInput);
        fireEvent.press(getByText('Confirm'));
      });
      expect(getByDisplayValue(date)).toBeTruthy();
    });

    it('works correctly when choosing date', async () => {
      const { getByDisplayValue, getByTestId, getByText } = render(<ProfileDoBScreen />);
      const dobInput = getByTestId(addInputSuffix('dob'));

      await waitFor(() => {
        fireEvent.press(dobInput);

        const date = new Date('1998-09-11');
        fireEvent(getByTestId('datePickerIOS'), 'onChange', {
          nativeEvent: { timestamp: date },
          date,
        });

        fireEvent.press(getByText('Confirm'));
        expect(getByDisplayValue('11 Sep 1998')).toBeTruthy();
      });
    });

    it('should go to next screen when pressing save button', async () => {
      const { getByTestId, getByText } = render(<ProfileDoBScreen />);
      const dobInput = getByTestId(addInputSuffix('dob'));

      await waitFor(() => {
        fireEvent.press(dobInput);
        fireEvent.press(getByText('Confirm'));
      });

      const button = getByTestId('birthday-next-btn');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockedNavigate).toBeCalledWith('PersonalDetails');
      });
    });
  });
});
