import React from 'react';
import { render } from '../../../../common/utils/testing';
import { ReimburseHPBottomSheet } from '../ReimburseHPBottomSheet';

describe('ReimburseHPBottomSheet', () => {
  it('should render correctly', () => {
    const { getByText } = render(<ReimburseHPBottomSheet />);

    expect(getByText('Example:')).toBeTruthy();
    expect(getByText('Load your Swag Spend account with money.')).toBeTruthy();
    expect(getByText('Make a $10 purchase at a coffee shop using your Swag Visa Debit card.')).toBeTruthy();
    expect(
      getByText(
        'Within a few days, get reimbursed $10 in your Spend account, taken from your Hero Points balance (approx. 220 points).'
      )
    ).toBeTruthy();
    expect(getByText('Done')).toBeTruthy();
  });
});
