import React from 'react';
import { AdCard } from './AdCard';
import images from '../../assets/images';
import { render, fireEvent } from '../../utils/testing';

describe('AdCard', () => {
  it('should display all given content', () => {
    const { getByText } = render(
      <AdCard
        image={images.instapayAd}
        title="InstaPay Now"
        cta="Learn more"
        description="InstaPay Now desc"
        onPressCta={() => {}}
      />
    );

    getByText('InstaPay Now');
    getByText('Learn more');
    getByText('InstaPay Now desc');
  });

  it('should call onPressCta when click CTA', () => {
    const mockOnPress = jest.fn();
    const { getByLabelText } = render(
      <AdCard
        image={images.instapayAd}
        title="InstaPay Now"
        accessibilityLabel="InstaPay Now ad"
        cta="Learn more"
        ctaAccessibilityLabel="Learn more"
        onPressCta={mockOnPress}
      />
    );

    const ctaBtn = getByLabelText('Learn more');
    fireEvent.press(ctaBtn);

    expect(mockOnPress).toBeCalledTimes(1);
  });
});
