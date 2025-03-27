import React from 'react';
import { fireEvent, render } from '../../../../../../common/utils/testing';
import { PopupContent } from '../PopupContent';

describe('PopupContent', () => {
  it('should render correctly with braze card', () => {
    const { getByTestId, getByText } = render(
      <PopupContent
        brazeCard={
          {
            type: 'Captioned',
            image: 'https://via.placeholder.com/150',
            imageAspectRatio: 1.6,
            title: 'Braze title',
            extras: { actionText: 'Braze action' },
          } as never
        }
        onPress={() => {}}
      />
    );

    expect(getByTestId('braze-image')).toBeTruthy();
    expect(getByText('Braze title')).toBeTruthy();
    expect(getByText('Braze action')).toBeTruthy();
  });

  it('onPress should work correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <PopupContent
        brazeCard={
          {
            type: 'Captioned',
            image: 'https://via.placeholder.com/150',
            imageAspectRatio: 1.6,
            title: 'Braze title',
            extras: { actionText: 'Braze action' },
          } as never
        }
        onPress={mockOnPress}
      />
    );

    fireEvent.press(getByText('Braze action'));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
