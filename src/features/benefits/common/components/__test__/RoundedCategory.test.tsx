import React from 'react';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { RoundedCategory } from '../RoundedCategory';

describe('RoundedCategory', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(
      <RoundedCategory
        onPress={() => {}}
        icon="dollar-credit-card-outlined"
        badgeIcon="star-circle-outlined"
        label="label"
      />
    );

    expect(getByText('label')).toBeTruthy();
    expect(getByTestId('dollar-credit-card-outlined')).toBeTruthy();
    expect(getByTestId('star-circle-outlined')).toBeTruthy();
  });

  it('should render nothing when icon is undefined', () => {
    const { queryByText } = render(<RoundedCategory onPress={() => {}} icon={undefined} label="label" />);

    expect(queryByText('label')).toBeNull();
  });

  it('onPress works correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <RoundedCategory onPress={mockOnPress} icon="dollar-credit-card-outlined" label="label" />
    );

    fireEvent.press(getByText('label'));

    expect(mockOnPress).toBeCalledTimes(1);
  });
});
