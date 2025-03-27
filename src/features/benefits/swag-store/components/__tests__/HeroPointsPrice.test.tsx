import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { HeroPointsPrice } from '../HeroPointsPrice';

describe('HeroPointsPrice', () => {
  it('should work correctly', () => {
    const { getByText } = render(<HeroPointsPrice price={1000} />);

    expect(getByText('1,000 PTS')).toBeTruthy();
  });

  it('should render integer only', () => {
    const { getByText } = render(<HeroPointsPrice price={1000.12} />);

    expect(getByText('1,000 PTS')).toBeTruthy();
  });

  it('should hide icon when hideStarIcon is true', () => {
    const { queryByLabelText } = render(<HeroPointsPrice price={1000} hideStarIcon />);

    expect(queryByLabelText('hero points icon')).toBeNull();
  });
});
