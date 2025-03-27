import React from 'react';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../navigation/__mocks__/rootNavigation';
import { StashFailedScreen } from '../StashFailedScreen';

describe('StashFailedScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render properly', () => {
    const { getByText } = render(<StashFailedScreen />);

    expect(getByText("We're sorry, something went wrong")).toBeTruthy();
    expect(getByText('Please try again later')).toBeTruthy();
  });

  it('should go to Stash dashboard', async () => {
    const { getByText } = render(<StashFailedScreen />);
    fireEvent.press(getByText('Close'));
    await waitFor(() => {
      expect(mockNavigateToTopTabs).toBeCalledWith('stash-tab');
    });
  });

  it('should go to Stash selection', async () => {
    const { getByText } = render(<StashFailedScreen />);
    fireEvent.press(getByText('Try again'));
    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('StashSelection');
    });
  });
});
