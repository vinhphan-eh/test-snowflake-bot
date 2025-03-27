import React from 'react';
import images from '../../../../../common/assets/images';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { SubscriptionPromoteTile } from '../SubscriptionPromoteTile';

describe('SubscriptionPromoteTile', () => {
  it('should render correctly', () => {
    const mockOnPress = jest.fn();
    const { getByLabelText, getByText } = render(
      <SubscriptionPromoteTile
        onPress={mockOnPress}
        coverImg={images.simplyEnergyTileCover}
        logoImg={images.simplyEnergyLogo}
        title="Swag discounts on your energy"
        supplier="Simply Energy"
      />
    );

    expect(getByLabelText('Subscription Cover')).toBeTruthy();
    expect(getByLabelText('Subscription Logo')).toBeTruthy();
    expect(getByText('Swag discounts on your energy')).toBeTruthy();
    expect(getByText('Simply Energy')).toBeTruthy();

    fireEvent.press(getByLabelText('Subscription Cover'));

    expect(mockOnPress).toHaveBeenCalled();
  });
});
