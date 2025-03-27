import React from 'react';
import { waitFor } from '@testing-library/react-native';
import { mockedNavigate, mockedGoBack } from '../../../../../__mocks__/react-navigation';
import { fireEvent, render } from '../../../../common/utils/testing';
import { EXAMPLE_STASH } from '../../constants';
import { StashNameScreen } from '../StashNameScreen';

const mockSetName = jest.fn();
jest.mock('../../stores/useCreateStashStore', () => {
  return {
    useCreateStashStore: () => ({
      ...EXAMPLE_STASH,
      setName: mockSetName,
    }),
  };
});

jest.mock('../../stores/useStashListStore.ts', () => {
  return {
    useStashListStore: () => ({
      stashNamesList: ['DUPLICATED_STASH_NAME'],
    }),
  };
});

describe('StashNameScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render properly', () => {
    const { getByTestId, getByText } = render(<StashNameScreen />);
    expect(getByText('What would you like to name your Stash?')).toBeTruthy();
    expect(getByText('Create a Stash')).toBeTruthy();
    expect(getByText('Stash name')).toBeTruthy();
    expect(getByTestId('topbar-back-icon')).toBeTruthy();
  });

  it('should navigate back on clicked', async () => {
    const { getByTestId } = render(<StashNameScreen />);
    const button = getByTestId('topbar-back-icon');

    fireEvent.press(button);

    await waitFor(() => {
      expect(mockedGoBack).toBeCalled();
    });
  });

  it('should disable Next button by default', async () => {
    const { getByLabelText } = render(<StashNameScreen />);
    const button = getByLabelText('Next');

    fireEvent.press(button);

    await waitFor(() => {
      expect(mockedNavigate).not.toBeCalled();
    });
  });

  it('should navigate to next step if clicked on the Next button', async () => {
    const { getByDisplayValue, getByLabelText, getByTestId } = render(<StashNameScreen />);
    const button = getByLabelText('Next');
    const inputStashName = getByTestId('stashName-input');
    const testStashName = 'Test Stash Name';

    fireEvent.changeText(inputStashName, testStashName);

    await waitFor(() => {
      expect(getByDisplayValue(testStashName)).toBeTruthy();
    });

    fireEvent.press(button);
    fireEvent(inputStashName, 'blur');

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('StashGoal');
      expect(mockSetName).toHaveBeenCalledWith(testStashName);
    });
  });

  it('should display error if the inputted name for new Stash is duplicated', async () => {
    const { getByDisplayValue, getByLabelText, getByTestId, queryByText } = render(<StashNameScreen />);
    const button = getByLabelText('Next');
    const inputStashName = getByTestId('stashName-input');
    const testStashName = 'DUPLICATED_STASH_NAME';

    fireEvent.changeText(inputStashName, testStashName);

    await waitFor(() => {
      expect(getByDisplayValue(testStashName)).toBeTruthy();
    });

    fireEvent.press(button);
    fireEvent(inputStashName, 'blur');

    await waitFor(() => {
      expect(queryByText(`You already have a Stash with this name. Choose a different name`)).toBeTruthy();
    });
  });
});
