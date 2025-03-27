import React from 'react';
import images from '../../../assets/images';
import { render, fireEvent } from '../../../utils/testing';
import { StashAdCard } from '../StashAdCard';

describe('StashAdCard', () => {
  it('should render and behave correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <StashAdCard
        cta="Boost now"
        image={images.salarySacrificeAd}
        onPress={mockOnPress}
        title="Boost your super with salary sacrifice"
      />
    );

    getByText('Boost now');
    getByText('Boost your super with salary sacrifice');

    const ctaBtn = getByText('Boost now');
    fireEvent.press(ctaBtn);

    expect(mockOnPress).toBeCalledTimes(1);
  });
});
