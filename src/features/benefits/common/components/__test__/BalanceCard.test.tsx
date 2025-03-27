import React from 'react';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { BalanceCard, type BalanceCardProps } from '../BalanceCard';

describe('BalanceCard', () => {
  const defaultProps: BalanceCardProps = {
    balanceText: 'Balance: $100.00',
    testID: 'balanceCard1',
    style: { flex: 1 },
    onPress: () => {},
  };

  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<BalanceCard {...defaultProps} />);

    expect(getByText(defaultProps.balanceText)).toBeTruthy();
    expect(getByTestId(defaultProps.testID || 'test id')).toBeTruthy();
  });

  it('should render the icon when provided', () => {
    const testIcon = 'star-circle-outlined';
    const { getByTestId } = render(<BalanceCard {...defaultProps} icon={testIcon} />);

    const icon = getByTestId(testIcon);
    expect(icon).toBeTruthy();
  });

  it('should not render the icon when not provided', () => {
    const { queryByTestId } = render(<BalanceCard {...defaultProps} icon={undefined} />);

    expect(queryByTestId('icon')).toBeNull();
  });

  it('onPress should work correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<BalanceCard {...defaultProps} onPress={mockOnPress} />);

    fireEvent.press(getByText(defaultProps.balanceText));

    expect(mockOnPress).toBeCalledTimes(1);
  });
});
