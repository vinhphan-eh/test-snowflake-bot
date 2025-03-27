import React from 'react';
import { render } from '../../../../../../../common/utils/testing';
import { AmountCard } from '../AmountCard';

describe('AmountCard', () => {
  it('Should render properly', () => {
    const { getByText } = render(<AmountCard amount={1.23} title="confirm" subtitle="money" titleIntent="success" />);
    expect(getByText('$1')).toBeTruthy();
    expect(getByText('.23')).toBeTruthy();
    expect(getByText('confirm')).toBeTruthy();
    expect(getByText('money')).toBeTruthy();
  });
});
