import React from 'react';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { IdleSearchBox } from '../IdleSearchBox';

describe('IdleSearchBox', () => {
  it('should render correctly', () => {
    const { getByPlaceholderText } = render(<IdleSearchBox placeholder="Search offers" onPress={() => {}} />);

    expect(getByPlaceholderText('Search offers')).toBeTruthy();
  });

  it('onPress should work correctly', () => {
    const mockOnPress = jest.fn();
    const { getByPlaceholderText } = render(<IdleSearchBox onPress={mockOnPress} placeholder="Search offers" />);

    fireEvent.press(getByPlaceholderText('Search offers'));

    expect(mockOnPress).toBeCalledTimes(1);
  });
});
