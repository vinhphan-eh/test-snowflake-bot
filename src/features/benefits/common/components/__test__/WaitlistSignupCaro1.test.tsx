import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { WaitlistSignupCaro1 } from '../WaitlistSignupCaro1';

describe('WaitlistSignupCaro1', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<WaitlistSignupCaro1 testID="test" />);

    expect(getByTestId('test')).toBeTruthy();
  });
});
