import React from 'react';
import { render, fireEvent } from '../../../../common/utils/testing';
import { ContactSupport } from '../ContactSupport';

describe('ContactSupport', () => {
  it('should render correctly', () => {
    const { getByText } = render(<ContactSupport text="Contact support" onPress={() => {}} />);

    expect(getByText('Contact support')).toBeTruthy();
  });

  it('onPress works correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<ContactSupport text="Contact support" onPress={mockOnPress} />);

    fireEvent.press(getByText('Contact support'));
    expect(mockOnPress).toBeCalled();
  });
});
