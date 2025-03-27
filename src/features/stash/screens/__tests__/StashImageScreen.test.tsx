import React from 'react';
import { mockedNavigate, mockedGoBack } from '../../../../../__mocks__/react-navigation';
import { fireEvent, render } from '../../../../common/utils/testing';
import { StashImageScreen } from '../StashImageScreen';

const mockSetImage = jest.fn();

jest.mock('../../stores/useCreateStashStore', () => {
  return {
    useCreateStashStore: () => ({
      setImage: mockSetImage,
    }),
  };
});

describe('StashImageScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render properly', () => {
    const { getByTestId, getByText } = render(<StashImageScreen />);
    expect(getByText('Select an image for your Stash')).toBeTruthy();
    expect(getByText('Create a Stash')).toBeTruthy();
    expect(getByText('Skip')).toBeTruthy();
    expect(getByTestId('topbar-back-icon')).toBeTruthy();
  });

  it('should navigate back on clicked', async () => {
    const { getByTestId } = render(<StashImageScreen />);
    const button = getByTestId('topbar-back-icon');

    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });

  it('should navigate to next step if clicked on Skip', async () => {
    const { getByText } = render(<StashImageScreen />);
    const buttonSkip = getByText('Skip');

    fireEvent.press(buttonSkip);

    expect(mockSetImage).toHaveBeenCalledWith('');
    expect(mockedNavigate).toHaveBeenCalledWith('StashConfirmation');
  });

  it('should set stash image and move to next step on selection', async () => {
    const { getByTestId } = render(<StashImageScreen />);
    const stashImage1 = getByTestId('stashImage1');

    fireEvent.press(stashImage1);

    expect(mockSetImage).toHaveBeenCalledWith('stashImage01');
    expect(mockedNavigate).toHaveBeenCalledWith('StashConfirmation');
  });
});
