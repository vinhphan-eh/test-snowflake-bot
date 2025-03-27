import React, { useCallback, useRef, useState } from 'react';
import type { KeyboardAvoidingViewProps } from 'react-native';
import { KeyboardAvoidingView, Platform, StatusBar, View } from 'react-native';

const KeyboardAvoidingViewContainer = ({ children }: React.PropsWithChildren<unknown>) => {
  const viewRef = useRef<View>(null);

  const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(0);

  /**
   * Measure top distance between container view and top screen
   */
  const onLayout = useCallback(() => {
    viewRef.current?.measure((_x, _y, _width, _height, _pageX, pageY = 0) => {
      setKeyboardVerticalOffset(pageY + (StatusBar.currentHeight || 0));
    });
  }, []);

  const keyboardAvoidingViewProps: KeyboardAvoidingViewProps = {
    behavior: Platform.OS === 'ios' ? 'padding' : undefined,
    style: { flex: 1 },
    keyboardVerticalOffset,
  };

  // To fix issue keyboardVerticalOffset not affect on Android for the fist time keyboard is open
  // Ref
  // - https://github.com/facebook/react-native/issues/3282
  // - https://github.com/facebook/react-native/issues/29712
  if (Platform.OS === 'android') {
    keyboardAvoidingViewProps.onLayout = () => {};
  }

  return (
    <KeyboardAvoidingView {...keyboardAvoidingViewProps}>
      <View style={{ flex: 1 }} ref={viewRef} onLayout={onLayout}>
        {children}
      </View>
    </KeyboardAvoidingView>
  );
};

export { KeyboardAvoidingViewContainer };
