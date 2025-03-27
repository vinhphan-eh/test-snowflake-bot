import React from 'react';
import { render } from '../../../utils/testing';
import { OverlayLoadingScreen } from '../OverlayLoadingScreen';

describe('OverlayLoadingScreen', () => {
  it('render with default props should match snapshot', () => {
    const { getByTestId } = render(<OverlayLoadingScreen />);
    expect(getByTestId('overlay_loading_screen')).toBeTruthy();
  });
});
