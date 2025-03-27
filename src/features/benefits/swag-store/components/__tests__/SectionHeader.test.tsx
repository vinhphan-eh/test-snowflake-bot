import React from 'react';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { SectionHeader } from '../SectionHeader';

describe('Section Header', () => {
  it('should render correctly', () => {
    const { getByText } = render(<SectionHeader title="Hello" />);
    expect(getByText('Hello')).toBeTruthy();
  });

  it('action works correctly', () => {
    const mockClick = jest.fn();
    const { getByText } = render(<SectionHeader onActionPressed={mockClick} title="Hello" actionText="Click" />);

    const action = getByText('Click');

    fireEvent.press(action);

    expect(action).toBeTruthy();
    expect(mockClick).toBeCalled();
  });
});
