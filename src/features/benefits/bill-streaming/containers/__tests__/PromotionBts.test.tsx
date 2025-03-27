import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { PromotionBts } from '../PromotionBts';

describe('PromotionBts', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<PromotionBts />);
    expect(getByText('Continue sign up')).toBeTruthy();
    expect(getByText('Got it')).toBeTruthy();
    expect(getByTestId('bottom-sheet-scroll-view')).toBeTruthy();
  });
});
