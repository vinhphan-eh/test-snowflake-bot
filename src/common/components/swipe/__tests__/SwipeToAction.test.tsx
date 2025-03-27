import React from 'react';
import { render } from '../../../utils/testing';
import { SwipeToAction } from '../SwipeToAction';

describe('Swipe to action', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <SwipeToAction
        text="Swipe to pay"
        loadingText="Processing"
        loadingSpeed={0}
        isLoading={false}
        onAction={() => {}}
      />
    );
    expect(getByText('Swipe to pay')).toBeTruthy();
  });

  it('should render correctly when loading', () => {
    const { getByTestId } = render(
      <SwipeToAction text="Swipe to pay" loadingText="Processing" loadingSpeed={0} isLoading onAction={() => {}} />
    );
    expect(getByTestId('loading_text')).toBeTruthy();
  });
});
