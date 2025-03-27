import React from 'react';
import { render } from '../../../../../../../../common/utils/testing';
import { Pending } from '../Pending';

describe('Pending', () => {
  it('Should render properly', () => {
    const { getByText } = render(<Pending amount={1.23} />);
    expect(getByText('$1')).toBeTruthy();
    expect(getByText('.23')).toBeTruthy();
    expect(getByText('Confirming eligibility')).toBeTruthy();
  });
});
