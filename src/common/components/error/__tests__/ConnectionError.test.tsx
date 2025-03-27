import React from 'react';
import { fireEvent, render } from '../../../utils/testing';
import { ConnectionError } from '../ConnectionError';

describe('ConnectionError', () => {
  it('should render error screen with default title and description', () => {
    const { getByText } = render(<ConnectionError />);

    expect(getByText('Wake up your connection!')).toBeTruthy();
    expect(getByText('Your internet seems to be sleeping')).toBeTruthy();
  });

  it('should render error screen with buttons and handle callback', () => {
    const ctaPress = jest.fn();
    const { getByText } = render(<ConnectionError ctaText="Retry" onCtaPress={ctaPress} />);

    const button = getByText('Retry');
    fireEvent.press(button);
    expect(ctaPress).toBeCalled();
  });

  it('should render error screen with custom title and description', () => {
    const { getByText } = render(<ConnectionError title="title" description="description" />);

    expect(getByText('title')).toBeTruthy();
    expect(getByText('description')).toBeTruthy();
  });
});
