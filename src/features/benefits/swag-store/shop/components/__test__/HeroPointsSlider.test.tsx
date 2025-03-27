import React from 'react';
import { render } from '../../../../../../common/utils/testing';
import { HeroPointsSlider } from '../HeroPointsSlider';

describe(HeroPointsSlider, () => {
  it('should render current points', () => {
    const maxPoints = 1000;
    const onSelectedPointChange = jest.fn();
    const selectedPoints = 500;
    const { getByText } = render(
      <HeroPointsSlider
        maxPoints={maxPoints}
        onSelectedPointChange={onSelectedPointChange}
        selectedPoints={selectedPoints}
      />
    );

    expect(getByText('Hero Points')).toBeTruthy();
    expect(getByText('500 PTS')).toBeTruthy();
  });
});
