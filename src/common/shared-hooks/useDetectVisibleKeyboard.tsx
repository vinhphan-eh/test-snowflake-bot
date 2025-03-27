import { useState, useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';

const eventShow = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
const evenHide = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

export const useDetectVisibleKeyboard = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(eventShow, () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener(evenHide, () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};
