import React from 'react';
import { View, Keyboard } from 'react-native';
import { render, fireEvent } from '../../../utils/testing';

import { TouchOutsideDismissKeyboard } from '../TouchOutsideDismissKeyboard';

describe('TouchOutsideDismissKeyboard', () => {
  it('calls onPress correctly', () => {
    const props = {
      onPress: jest.fn(),
    };
    jest.spyOn(Keyboard, 'dismiss');

    const { getByTestId } = render(
      <TouchOutsideDismissKeyboard onPress={props.onPress}>
        <View testID="content" style={{ width: 100, height: 100 }} />
      </TouchOutsideDismissKeyboard>
    );
    fireEvent.press(getByTestId('content'));
    expect(Keyboard.dismiss).toBeCalledTimes(1);
    expect(props.onPress).toBeCalledTimes(1);
  });
});
