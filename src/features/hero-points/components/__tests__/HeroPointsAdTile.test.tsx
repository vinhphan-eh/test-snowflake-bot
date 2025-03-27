import React from 'react';
import { fireEvent, render } from '../../../../common/utils/testing';
import { HeroPointsAdTile } from '../HeroPointsAdTile';

describe('Hero Points ad tile', () => {
  it('should show spinner while loading', () => {
    const { getByTestId } = render(
      <HeroPointsAdTile
        isLoading
        onPressTile={jest.fn()}
        accessibilityLabel="hero points ad tile 1"
        thumbnailName="heroPointsAdTile1"
        title="title1"
        description="description1"
      />
    );
    expect(getByTestId('hero points ad tile 1-loading')).toBeTruthy();
  });

  it('should trigger navigation handling function when pressed on the tile', () => {
    const mockedOnPress = jest.fn();

    const { getByTestId } = render(
      <HeroPointsAdTile
        isLoading={false}
        onPressTile={mockedOnPress}
        accessibilityLabel=""
        thumbnailName="heroPointsAdTile1"
        title="title1"
        description="description1"
      />
    );
    const tile = getByTestId('hero-points-title1-ad-tile');
    fireEvent.press(tile);

    expect(mockedOnPress).toHaveBeenCalled();
  });

  it('should render as expected with title and description when loaded', () => {
    const { getByText } = render(
      <HeroPointsAdTile
        isLoading={false}
        onPressTile={jest.fn()}
        accessibilityLabel=""
        thumbnailName="heroPointsAdTile1"
        title="Example Title"
        description="Example Description"
      />
    );

    expect(getByText('Example Title')).toBeTruthy();
    expect(getByText('Example Description')).toBeTruthy();
  });
});
