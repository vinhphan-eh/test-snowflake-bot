import React from 'react';
import { render } from '../../../utils/testing';
import { TopTabItem } from '../TopTabItem';

describe('TopTabItem', () => {
  it('should render correctly', () => {
    const { getByText } = render(<TopTabItem title="Hey" />);

    expect(getByText('Hey')).toBeTruthy();
  });

  it('should render status correctly', () => {
    const { getByText } = render(<TopTabItem status="NEW" title="Hey" />);

    expect(getByText('Hey')).toBeTruthy();
    expect(getByText('NEW')).toBeTruthy();
  });
});
