import React from 'react';
import { fireEvent, render } from '../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../navigation/__mocks__/rootNavigation';
import { IncomeErrorScreen } from '../IncomeErrorScreen';

describe('Pay Account Switch Error Screen', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<IncomeErrorScreen />);

    expect(getByText(`We're sorry, something went wrong`)).toBeTruthy();
    expect(getByText('Please try again later')).toBeTruthy();
    expect(getByTestId('Income error')).toBeTruthy();
    expect(getByText('Close')).toBeTruthy();
  });

  it('should end the flow', () => {
    const { getByText } = render(<IncomeErrorScreen />);

    const nextBtn = getByText('Close');

    fireEvent.press(nextBtn);
    expect(mockNavigateToTopTabs).toBeCalledWith('income-tab');
  });
});
