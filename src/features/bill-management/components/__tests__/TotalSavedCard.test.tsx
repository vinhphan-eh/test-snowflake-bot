import React from 'react';
import { render, fireEvent } from '../../../../common/utils/testing';
import { TotalSavedCard } from '../TotalSavedCard';

describe('TotalSavedCard', () => {
  it('should render correctly', () => {
    const { getByText } = render(<TotalSavedCard amount={10.2} text="You have saved" onPress={() => {}} />);

    expect(getByText('You have saved')).toBeTruthy();
    expect(getByText('$10')).toBeTruthy();
    expect(getByText('.20')).toBeTruthy();
  });

  it('onPress works correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<TotalSavedCard amount={10.2} text="You have saved" onPress={mockOnPress} />);

    fireEvent.press(getByText('You have saved'));
    expect(mockOnPress).toBeCalled();
  });
});
