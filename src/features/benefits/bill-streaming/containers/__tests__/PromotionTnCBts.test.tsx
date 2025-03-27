import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { PromotionTnCBts } from '../PromotionTnCBts';

describe('PromotionTnCBts', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<PromotionTnCBts />);
    expect(getByText('Got it')).toBeTruthy();
    expect(getByTestId('bottom-sheet-scroll-view')).toBeTruthy();
  });
});
