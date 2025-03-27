import React from 'react';
import { fireEvent, render } from '../../../utils/testing';
import { InlineTextLink } from '../InlineTextLink';

describe('InlineTextLink', () => {
  const onPressHandler = jest.fn();

  it('render text link properly', () => {
    const comp = render(<InlineTextLink onPress={onPressHandler}>This is a text link</InlineTextLink>);

    const { getByText } = comp;
    const textLink = getByText('This is a text link');
    fireEvent.press(textLink);
    fireEvent(textLink, 'onPressIn');
    fireEvent(textLink, 'onPressOut');
    expect(onPressHandler).toBeCalled();
  });

  it('render disabled text link properly', () => {
    const comp = render(
      <InlineTextLink disabled onPress={onPressHandler}>
        This is a disabled text link
      </InlineTextLink>
    );

    const { getByText } = comp;
    const textLink = getByText('This is a disabled text link');
    fireEvent.press(textLink);
    fireEvent(textLink, 'onPressIn');
    fireEvent(textLink, 'onPressOut');
    expect(onPressHandler).not.toBeCalled();
  });
});
