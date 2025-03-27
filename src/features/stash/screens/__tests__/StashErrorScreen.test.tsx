import React from 'react';
import { fireEvent, render } from '../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../navigation/__mocks__/rootNavigation';
import { StashErrorScreen } from '../StashErrorScreen';

describe('StashErrorScreen', () => {
  it('should render properly', () => {
    const { getByText } = render(<StashErrorScreen />);
    expect(getByText("We're sorry, something went wrong")).toBeTruthy();
    expect(getByText('Please try again later')).toBeTruthy();
    expect(getByText('Close')).toBeTruthy();
  });

  it('should navigate back to Stash dashboard if clicked on Close button', async () => {
    const { getByText } = render(<StashErrorScreen />);
    const buttonClose = getByText('Close');

    fireEvent.press(buttonClose);

    expect(mockNavigateToTopTabs).toBeCalledWith('stash-tab');
  });
});
