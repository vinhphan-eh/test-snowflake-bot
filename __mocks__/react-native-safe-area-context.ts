import React from 'react';
import type { PropsWithChildren } from 'react';

export const useSafeArea = () => ({
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
});

export const useSafeAreaInsets = () => ({
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
});
export const SafeAreaInsetsContext = React.createContext({
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
});
export const SafeAreaConsumer = SafeAreaInsetsContext.Consumer;

export const SafeAreaContext = SafeAreaInsetsContext;

export const SafeAreaView = ({ children, ...otherProps }: PropsWithChildren<unknown>) => {
  return React.createElement('RNCSafeAreaView', otherProps, children);
};
export const SafeAreaProvider = ({ children, ...otherProps }: PropsWithChildren<unknown>) => {
  return React.createElement('RNCSafeAreaProvider', otherProps, children);
};
