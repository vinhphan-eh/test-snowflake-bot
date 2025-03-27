import React from 'react';
import { fireEvent, render } from '../../../utils/testing';
import { GeneralError } from '../GeneralError';

describe('GeneralError', () => {
  it('should show error screen with default title and description', () => {
    const { getByText } = render(<GeneralError themeName="eBens" />);

    expect(getByText("We're sorry, something went wrong")).toBeTruthy();
    expect(getByText('Please try again later')).toBeTruthy();
  });

  it('should show error screen with buttons and handle callback', () => {
    const ctaPress = jest.fn();
    const { getByText } = render(<GeneralError themeName="eBens" ctaText="Retry" onCtaPress={ctaPress} />);

    const button = getByText('Retry');
    fireEvent.press(button);
    expect(ctaPress).toBeCalled();
  });
  it('should render error screen with custom title and description', () => {
    const { getByText } = render(<GeneralError themeName="eBens" title="title" description="description" />);

    expect(getByText('title')).toBeTruthy();
    expect(getByText('description')).toBeTruthy();
  });
});
