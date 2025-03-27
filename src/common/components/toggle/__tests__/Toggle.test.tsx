import React from 'react';
import { render, fireEvent, waitFor } from '../../../utils/testing';
import { Toggle } from '../Toggle';

describe('Toggle', () => {
  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render with default props', () => {
    const { getByTestId } = render(<Toggle testID="toggle" />);
    expect(getByTestId('toggle')).toBeDefined();
  });

  it('should render with custom colors', () => {
    const { getByTestId } = render(
      <Toggle
        testID="toggle"
        thumbColors={{ true: 'primary', false: 'secondary' }}
        trackColors={{ true: 'success', false: 'archived' }}
      />
    );
    expect(getByTestId('toggle')).toBeDefined();
  });

  it('should render with disabled state', () => {
    const { getByTestId } = render(<Toggle testID="toggle" disabled />);
    expect(getByTestId('toggle')).toBeDefined();
  });

  it('should call onChange when pressed', async () => {
    const { getByTestId } = render(<Toggle testID="toggle" onChange={mockOnChange} />);
    fireEvent.press(getByTestId('toggle'));
    jest.advanceTimersByTime(1000);
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  it('should toggle state when pressed', async () => {
    const { getByTestId } = render(<Toggle testID="toggle" onChange={mockOnChange} />);
    fireEvent.press(getByTestId('toggle'));
    jest.advanceTimersByTime(1000);
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(true);
    });

    fireEvent.press(getByTestId('toggle'));
    jest.advanceTimersByTime(1000);
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(false);
    });
  });

  it('should not toggle state when disabled', () => {
    const { getByTestId } = render(<Toggle testID="toggle" onChange={mockOnChange} disabled />);
    fireEvent.press(getByTestId('toggle'));
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('should respond to gesture events', () => {
    const { getByTestId } = render(<Toggle testID="toggle" onChange={mockOnChange} />);
    const toggle = getByTestId('toggle');
    fireEvent(toggle, 'pressIn', { nativeEvent: { locationX: 0 } });
    fireEvent(toggle, 'onGestureEvent', { nativeEvent: { translationX: 24 } });
    fireEvent(toggle, 'pressOut');
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
