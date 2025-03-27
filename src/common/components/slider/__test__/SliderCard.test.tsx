import React from 'react';
import { fireEvent, render } from '../../../utils/testing';
import { SliderCard } from '../SliderCard';

describe('SliderCard', () => {
  it('should render correctly', () => {
    const { getByText } = render(<SliderCard title="title" description="description" onPress={() => {}} />);

    expect(getByText('title')).toBeVisible();
    expect(getByText('description')).toBeVisible();
  });

  it('onPress should work correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<SliderCard title="title" description="description" onPress={mockOnPress} />);

    fireEvent.press(getByText('title'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
