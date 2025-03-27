import React from 'react';
import { render, fireEvent } from '../../../../../../common/utils/testing';
import CategoryChip from '../CategoryChip';

describe('CategoryChip', () => {
  it('uncheck', () => {
    const props = {
      label: 'The Label',
      selected: false,
      onPress: jest.fn(),
    };
    const { getByText, queryByTestId } = render(<CategoryChip {...props} />);

    expect(queryByTestId('checkmark-icon')).toBeFalsy();
    expect(getByText('The Label')).toBeTruthy();
    fireEvent.press(getByText('The Label'));
    expect(props.onPress).toBeCalled();
  });

  it('check', () => {
    const props = {
      label: 'The Label',
      selected: true,
      onPress: jest.fn(),
    };
    const { getByTestId, getByText } = render(<CategoryChip {...props} />);
    expect(getByTestId('checkmark-icon')).toBeTruthy();
    expect(getByText('The Label')).toBeTruthy();
    fireEvent.press(getByText('The Label'));
    expect(props.onPress).toBeCalled();
  });
});
