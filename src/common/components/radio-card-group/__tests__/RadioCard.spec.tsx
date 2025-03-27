import React from 'react';
import { fireEvent, render } from '../../../utils/testing';
import { RadioCard } from '../RadioCard';

describe('rendering', () => {
  it('renders correctly when checked', () => {
    const { getByText, queryAllByTestId } = render(
      <RadioCard
        title="Option A title"
        subtitle="Option A subtitle"
        content="Option A content"
        testID="Option A"
        onPress={jest.fn}
        checked
      />
    );

    expect(getByText('Option A title')).toBeDefined();
    expect(getByText('Option A subtitle')).toBeDefined();
    expect(getByText('Option A content')).toBeDefined();
    expect(queryAllByTestId('Option A content-checked')).toHaveLength(1);
  });

  it('renders correctly when not checked', () => {
    const { getByText, queryAllByTestId } = render(
      <RadioCard
        title="Option A title"
        subtitle="Option A subtitle"
        content="Option A content"
        testID="Option A"
        onPress={jest.fn}
        checked={false}
      />
    );

    expect(getByText('Option A title')).toBeDefined();
    expect(getByText('Option A subtitle')).toBeDefined();
    expect(getByText('Option A content')).toBeDefined();
    expect(queryAllByTestId('Option A content-selected-circle')).toHaveLength(0);
  });
});

describe('behavior', () => {
  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <RadioCard
        title="Option A title"
        subtitle="Option A subtitle"
        content="Option A content"
        testID="Option A"
        onPress={onPress}
        checked
      />
    );

    fireEvent.press(getByTestId('Option A'));
    expect(onPress).toBeCalledTimes(1);
  });
});
