import React from 'react';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import { ErrorScreen } from '../ErrorScreen';

describe('Error Screen', () => {
  it('should render properly', () => {
    const { getByText } = render(<ErrorScreen />);
    expect(getByText("We're sorry, something went wrong")).toBeTruthy();
    expect(getByText('Please try again later')).toBeTruthy();
  });

  it('should go to Wallet Dashboard screen by clicking Close button', () => {
    const { getByText } = render(<ErrorScreen />);
    const button = getByText('Close');
    fireEvent.press(button);
    expect(mockNavigateToTopTabs).toBeCalledWith('spend-tab');
  });
});
