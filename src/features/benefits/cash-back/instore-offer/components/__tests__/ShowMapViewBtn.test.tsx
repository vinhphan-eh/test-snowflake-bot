import React from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { render, fireEvent } from '../../../../../../common/utils/testing';
import { ShowMapViewBtn } from '../ShowMapViewBtn';

const mockOnPress = jest.fn();

const TestComp = () => {
  const visibleSharedValue = useSharedValue(1);
  return <ShowMapViewBtn onPress={mockOnPress} visibleSharedValue={visibleSharedValue} />;
};

describe('ShowMapViewBtn', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<TestComp />);
    expect(getByText('Map')).toBeTruthy();
    expect(getByTestId('map-icon')).toBeTruthy();
  });

  it('onPress should work correctly', () => {
    const { getByTestId } = render(<TestComp />);
    fireEvent.press(getByTestId('map-icon'));

    expect(mockOnPress).toBeCalledTimes(1);
  });
});
