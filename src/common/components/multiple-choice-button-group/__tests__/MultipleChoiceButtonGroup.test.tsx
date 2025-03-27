import React from 'react';
import { fireEvent, render } from '../../../utils/testing';
import { MultipleChoiceButtonGroup } from '../MultipleChoiceButtonGroup';

describe('Multiple Choice Button Group', () => {
  it('renders the choices', () => {
    const { queryByText } = render(
      <MultipleChoiceButtonGroup choices={[{ label: 'one' }, { label: 'two' }]} onChoicePressed={() => null} />
    );

    expect(queryByText('one')).toBeTruthy();
    expect(queryByText('two')).toBeTruthy();
    expect(queryByText('three')).toBeFalsy();
  });

  it('calls onChoicePressed with proper label when pressed the item', () => {
    const onChoicePressed = jest.fn();
    const { getByText } = render(
      <MultipleChoiceButtonGroup choices={[{ label: 'one' }, { label: 'two' }]} onChoicePressed={onChoicePressed} />
    );

    fireEvent.press(getByText('two'));
    expect(onChoicePressed).toHaveBeenLastCalledWith('two');
  });
});
