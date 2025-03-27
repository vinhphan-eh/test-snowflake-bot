import React from 'react';
import { render } from '../../../../../../../common/utils/testing';
import { BillSignup } from '../BillSignup';

describe('BillSignup', () => {
  it('Should render properly', () => {
    const { getByText } = render(<BillSignup onPress={() => {}} />);
    expect(getByText('Sign up today')).toBeTruthy();
    expect(getByText('Exclusive energy discount')).toBeTruthy();
  });
});
