import React from 'react';
import { render } from '../../../../../../../../common/utils/testing';
import { Confirm } from '../Confirm';

describe('Confirm', () => {
  it('Should render properly', () => {
    const { getByText } = render(<Confirm amount={1.23} />);
    expect(getByText('$1')).toBeTruthy();
    expect(getByText('.23')).toBeTruthy();
    expect(getByText('Coming your way!')).toBeTruthy();
  });
});
