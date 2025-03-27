import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { HECSAndHelpDebtBottomSheet } from '../HECSAndHelpDebtBottomSheet';

describe('HECSAndHelpDebtBottomSheet', () => {
  it('should render correctly', () => {
    const { getByText } = render(<HECSAndHelpDebtBottomSheet />);
    expect(
      getByText(
        'Consider seeking financial advice before proceeding with salary sacrifice, as it may increase the value of your pre-tax salary and require an increase in regular HECS or HELP repayments to avoid a tax bill.'
      )
    ).toBeTruthy();
    expect(getByText('Close')).toBeTruthy();
  });
});
