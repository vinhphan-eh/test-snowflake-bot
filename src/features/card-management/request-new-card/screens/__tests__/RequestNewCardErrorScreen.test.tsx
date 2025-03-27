import React from 'react';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import { RequestNewCardErrorScreen } from '../RequestNewCardErrorScreen';

describe('Request New Card Error Screen', () => {
  it('should render properly', () => {
    const { getByText } = render(<RequestNewCardErrorScreen />);
    expect(getByText(`We're sorry, your PIN didn't reset.`)).toBeTruthy();
    expect(getByText('Done')).toBeTruthy();
  });

  it('should go to Wallet dashboard', () => {
    const { getByText } = render(<RequestNewCardErrorScreen />);
    const button = getByText('Done');
    fireEvent.press(button);
    expect(mockNavigateToTopTabs).toBeCalledWith('card-tab');
  });
});
