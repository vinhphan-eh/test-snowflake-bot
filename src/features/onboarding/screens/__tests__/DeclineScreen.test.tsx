import React from 'react';
import { fireEvent, render } from '../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../navigation/__mocks__/rootNavigation';
import { DeclineScreen } from '../DeclineScreen';

describe('Decline Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render properly', () => {
    const { getByText } = render(<DeclineScreen />);
    expect(getByText(`We're unable to process your application at this time.`)).toBeTruthy();
    expect(getByText(`Unfortunately you don't meet our requirements for opening an account.`)).toBeTruthy();
  });

  it('should exit current stack by clicking Close button', () => {
    const { getByLabelText } = render(<DeclineScreen />);
    const button = getByLabelText('Close');
    fireEvent.press(button);
    expect(mockNavigateToTopTabs).toBeCalledWith('spend-tab');
  });
});
