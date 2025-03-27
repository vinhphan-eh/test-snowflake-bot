import React from 'react';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import { SetPinErrorScreen } from '../SetPinErrorScreen';

describe('Set Pin Error Screen', () => {
  it('should render properly', () => {
    const { getByText } = render(<SetPinErrorScreen />);
    expect(getByText(`We're sorry, your PIN didn't reset.`)).toBeTruthy();
    expect(
      getByText(
        'Your old card has been cancelled and your new one should arrive soon. You will need to reset your PIN in your Card settings before you activate your new card.'
      )
    ).toBeTruthy();
    expect(getByText('Close')).toBeTruthy();
  });

  it('should go to Wallet dashboard', () => {
    const { getByText } = render(<SetPinErrorScreen />);
    const button = getByText('Close');
    fireEvent.press(button);
    expect(mockNavigateToTopTabs).toBeCalledWith('card-tab');
  });
});
