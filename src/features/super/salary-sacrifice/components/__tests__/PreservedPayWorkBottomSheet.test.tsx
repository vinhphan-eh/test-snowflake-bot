import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { PreservedPayWorkBottomSheet } from '../PreservedPayWorkBottomSheet';

describe('PreservedPayWorkBottomSheet', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<PreservedPayWorkBottomSheet />);
    expect(
      getByText(
        'If you are paid $500, your salary sacrifice of $100 will be made to your super, as after deducting your salary sacrifice, you will still be paid your preserved pay amount of $400.'
      )
    ).toBeTruthy();

    expect(getByTestId('salary-sacrifice-preserve-pay-1')).toBeTruthy();

    expect(
      getByText(
        "Let's say you get usually paid $500 weekly and want to make a weekly salary sacrifice of $100 to your super. You want to ensure you get paid at least $400 each week, so you set a preserved pay amount of $400."
      )
    ).toBeTruthy();

    expect(getByTestId('salary-sacrifice-preserve-pay-1')).toBeTruthy();
  });
});
