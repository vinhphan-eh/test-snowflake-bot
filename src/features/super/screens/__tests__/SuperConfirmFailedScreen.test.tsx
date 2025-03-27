import React from 'react';
import { fireEvent, render } from '../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../navigation/__mocks__/rootNavigation';
import { SuperConfirmFailedScreen } from '../SuperConfirmFailedScreen';

describe('SuperConfirmFailedScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    const { getByText } = render(<SuperConfirmFailedScreen />);
    expect(getByText(`We're sorry, something went wrong`)).toBeTruthy();
    expect(getByText('Please try again later')).toBeTruthy();
  });

  it('should go to Super Dashboard', () => {
    const { getByText } = render(<SuperConfirmFailedScreen />);
    const button = getByText('Close');
    fireEvent.press(button);
    expect(getByText(`We're sorry, something went wrong`)).toBeTruthy();
    expect(getByText('Please try again later')).toBeTruthy();
    expect(mockNavigateToTopTabs).toBeCalledWith('super-tab');
  });
});
