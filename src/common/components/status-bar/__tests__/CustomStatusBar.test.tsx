import React from 'react';
import { render } from '../../../utils/testing';
import { CustomStatusBar } from '../CustomStatusBar';

describe('Custom Status Bar', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<CustomStatusBar />);
    expect(getByTestId('custom-status-bar')).toBeTruthy();
  });

  it('should render correctly with bar style value', () => {
    const { getByTestId } = render(<CustomStatusBar barStyle="decorative" />);
    expect(getByTestId('custom-status-bar')).toBeTruthy();
  });
});
