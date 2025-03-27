import React from 'react';
import { View } from 'react-native';
import { render } from '../../utils/testing';
import { withHDTheme } from '../withHDTheme';

const MockComponent = () => <View testID="mock-component" />;

describe('withHDTheme', () => {
  test('should return component', () => {
    const ThemedComponent = withHDTheme(MockComponent, 'eBens');
    const { getByTestId } = render(<ThemedComponent />);
    expect(getByTestId('mock-component')).toBeDefined();
  });

  test('should return component with default theme name', () => {
    const ThemedComponent = withHDTheme(MockComponent);
    const { getByTestId } = render(<ThemedComponent />);
    expect(getByTestId('mock-component')).toBeDefined();
  });
});
