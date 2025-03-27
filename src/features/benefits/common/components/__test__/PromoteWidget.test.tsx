import React from 'react';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { PromoteWidget } from '../PromoteWidget';

describe('PromoteWidget', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(
      <PromoteWidget onPress={() => {}} title="title" subTitle="sub title" imgSrc={0} />
    );

    expect(getByText('title')).toBeTruthy();
    expect(getByText('sub title')).toBeTruthy();
    expect(getByTestId('arrow-right')).toBeTruthy();
  });

  it('onPress should work correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<PromoteWidget onPress={mockOnPress} title="title" subTitle="sub title" imgSrc={0} />);

    fireEvent.press(getByText('title'));

    expect(mockOnPress).toBeCalledTimes(1);
  });
});
