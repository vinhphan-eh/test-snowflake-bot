import React from 'react';
import { render } from '../../../utils/testing';
import { AnimatedLoadingText } from '../AnimatedLoadingText';

describe('Animated loading text', () => {
  it('should render correctly', () => {
    const text = 'Loading';
    const { getByText } = render(<AnimatedLoadingText text={text} />);
    text.split('').forEach(char => {
      expect(getByText(char)).toBeTruthy();
    });
  });
});
