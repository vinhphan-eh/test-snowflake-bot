import React from 'react';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { PillComp } from '../PillComp';

describe('PillComponent', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(
      <PillComp onPress={() => {}} icon="dollar-credit-card-outlined" label="label" />
    );

    expect(getByText('label')).toBeTruthy();
    expect(getByTestId('dollar-credit-card-outlined')).toBeTruthy();
  });

  it('onPress works correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<PillComp onPress={mockOnPress} icon="dollar-credit-card-outlined" label="label" />);

    fireEvent.press(getByText('label'));

    expect(mockOnPress).toBeCalledTimes(1);
  });
});
