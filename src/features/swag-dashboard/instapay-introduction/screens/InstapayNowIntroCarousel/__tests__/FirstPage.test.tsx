import React from 'react';
import { render } from '../../../../../../common/utils/testing';
import { FirstPage } from '../FirstPage';

describe('FirstPage', () => {
  it('should render correctly', () => {
    const { getByText } = render(<FirstPage />);

    expect(getByText('Access to your earnings instantly')).toBeTruthy();
    expect(
      getByText('You’ve worked hard, so why wait. Get access to the money you’ve already earned before pay day.')
    ).toBeTruthy();
    expect(getByText('No credit, no interest.')).toBeTruthy();
    expect(getByText('Withdraw directly to your Swag Spend account.')).toBeTruthy();
    expect(getByText('Spend, save, or invest as you please!')).toBeTruthy();
  });
});
