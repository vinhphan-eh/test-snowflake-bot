import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { DynamicText } from '../DynamicText';

describe('DynamicText', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <DynamicText content="You’ll also get u{5% off the electricity reference price} and 10% off ENGIE’s gas usage and supply charges." />
    );

    expect(getByText('You’ll also get ')).toBeTruthy();
    expect(getByText('5% off the electricity reference price')).toBeTruthy();
    expect(getByText(' and 10% off ENGIE’s gas usage and supply charges.')).toBeTruthy();
  });
});
