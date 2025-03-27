import type { ReactNode } from 'react';
import React from 'react';
import type { TouchableWithoutFeedbackProps } from 'react-native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

type TouchOutsideDismissKeyboardProps = {
  /**
   * action triggers when pressed
   */
  onPress?: () => void;
  /**
   * children of this component
   */
  children?: ReactNode;
} & TouchableWithoutFeedbackProps;

/**
 * @describe Wrap this component around touch area that you want to support dismiss keyboard
 * @component TouchableWithoutFeedback
 */
const TouchOutsideDismissKeyboard = ({ children, onPress, ...rest }: TouchOutsideDismissKeyboardProps) => {
  const handlePress = () => {
    Keyboard.dismiss();
    onPress?.();
  };
  return (
    <TouchableWithoutFeedback {...rest} onPress={handlePress}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export { TouchOutsideDismissKeyboard };
