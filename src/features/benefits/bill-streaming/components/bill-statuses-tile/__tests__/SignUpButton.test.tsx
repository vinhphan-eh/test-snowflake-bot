import React from 'react';
import { fireEvent, render } from '../../../../../../common/utils/testing';
import { SignUpButton } from '../SignUpButton';

describe('SignUpButton', () => {
  it('should render correctly', () => {
    const onPress = jest.fn();
    const { getByText } = render(<SignUpButton onPress={onPress} text="Test" />);
    fireEvent.press(getByText('Test'));
    expect(onPress).toBeCalled();
  });
});
