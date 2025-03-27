import React from 'react';
import { render } from '../../../../../../common/utils/testing';
import CategoryBadge from '../CategoryBadge';

describe('CategoryBadge', () => {
  it('should render correctly', () => {
    const { getByText } = render(<CategoryBadge text="mobile phones" />);
    expect(getByText('MOBILE PHONES')).toBeTruthy();
  });
});
