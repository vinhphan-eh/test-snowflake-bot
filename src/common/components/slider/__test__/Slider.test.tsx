import React from 'react';
import { fireEvent, render } from '../../../utils/testing';
import { Slider } from '../Slider';

const onPress = jest.fn();

describe('Slider', () => {
  it('render items correctly', () => {
    const { getByText } = render(
      <Slider
        cards={[
          { title: 'item-1-title', description: 'item-1-desc' },
          { title: 'item-2-title', description: 'item-2-desc', onPress: () => onPress() },
        ]}
      />
    );

    expect(getByText('item-1-title')).toBeVisible();
    expect(getByText('item-1-desc')).toBeVisible();
    expect(getByText('item-2-title')).toBeVisible();
    expect(getByText('item-2-desc')).toBeVisible();
  });

  it('onPress should work correctly', () => {
    const { getByText } = render(
      <Slider
        cards={[
          { title: 'item-1-title', description: 'item-1-desc' },
          { title: 'item-2-title', description: 'item-2-desc', onPress: () => onPress() },
        ]}
      />
    );

    fireEvent.press(getByText('item-2-desc'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
