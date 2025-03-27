import React from 'react';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import { DailyLimitErrorScreen } from '../DailyLimitErrorScreen';

describe('DailyLimitErrorScreen', () => {
  it('should back to Spend tab when press close ', async () => {
    const { getByText } = render(<DailyLimitErrorScreen />);

    const closeBtn = getByText('Close');
    expect(getByText('Oops! Looks like you have reached your Swag Spend Account daily transfer limit')).toBeTruthy();
    expect(getByText('Please contact support for further assistance.')).toBeTruthy();
    expect(closeBtn).toBeTruthy();

    fireEvent.press(closeBtn);
    expect(mockNavigateToTopTabs).toHaveBeenCalledWith('spend-tab');
  });
});
