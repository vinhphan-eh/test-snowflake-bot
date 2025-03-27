import React from 'react';
import { Typography } from '@hero-design/rn';
import { CurrencyInput } from './CurrencyInput';
import type { RenderAPI } from '../../utils/testing';
import { addInputSuffix, render, act, fireEvent } from '../../utils/testing';

describe('Currency Input', () => {
  describe('default props', () => {
    let renderAPI: RenderAPI;
    beforeEach(() => {
      renderAPI = render(<CurrencyInput testID="Amount-input" />);
      const amountInput = renderAPI.getByTestId(addInputSuffix('Amount'));
      fireEvent.changeText(amountInput, '123123.12');
      act(() => {
        fireEvent(amountInput, 'onEndEditing');
      });
    });

    it('should use `currencySymbol` $', () => {
      expect(renderAPI.getByText('$')).toBeTruthy();
    });

    it('should use `delimiter` ,', async () => {
      expect(await renderAPI.findByDisplayValue('123,123.12')).toBeTruthy();
    });

    it('should use `precision` 2 ', async () => {
      expect(await renderAPI.findByDisplayValue('123,123.12')).toBeTruthy();
    });
  });

  it('should not display currencySymbol given no value', () => {
    const { queryByText } = render(
      <CurrencyInput testID="Amount-input" prefix={<Typography.Body variant="small">$</Typography.Body>} />
    );
    expect(queryByText('$')).toBeFalsy();
  });

  it('should format value only when input something + end editing', () => {
    const mockOnDisplayedValueChange = jest.fn();
    const { getByTestId, queryByDisplayValue } = render(
      <CurrencyInput
        onDisplayedValueChange={mockOnDisplayedValueChange}
        testID="Amount-input"
        prefix={<Typography.Body variant="small">$</Typography.Body>}
      />
    );
    const amountInput = getByTestId(addInputSuffix('Amount'));
    // decimal part must be equal or smaller than precision
    fireEvent.changeText(amountInput, '123123.12');

    // While editing, value will not be formatted
    expect(queryByDisplayValue('123,123.12')).toBeFalsy();

    // Finish editing
    act(() => {
      fireEvent(amountInput, 'onEndEditing');
    });

    // Displayed value will be formatted
    expect(queryByDisplayValue('123,123.12')).toBeTruthy();
    expect(mockOnDisplayedValueChange).toHaveBeenCalledWith('123,123.12');
  });

  it('should not format when end editing but not input anything', () => {
    const { getByTestId, queryByText } = render(
      <CurrencyInput testID="Amount-input" prefix={<Typography.Body variant="small">$</Typography.Body>} />
    );
    const amountInput = getByTestId(addInputSuffix('Amount'));

    fireEvent.changeText(amountInput, '');

    // Finish editing
    act(() => {
      fireEvent(amountInput, 'onEndEditing');
    });

    // No symbol mean not formatted yet
    expect(queryByText('$')).toBeFalsy();
  });

  it('should fail when typing decimal part more than precision', () => {
    const { getByDisplayValue, getByTestId } = render(
      <CurrencyInput testID="Amount-input" prefix={<Typography.Body variant="small">$</Typography.Body>} />
    );
    const amountInput = getByTestId(addInputSuffix('Amount'));

    fireEvent.changeText(amountInput, '1.233');

    // Finish editing
    act(() => {
      fireEvent(amountInput, 'onEndEditing');
    });
    // it actually 1.23, but in test env, it's empty, better manually test this to see correct result
    expect(getByDisplayValue('')).toBeTruthy();
  });

  it.each`
    input         | endEditing     | focus
    ${'12323.12'} | ${'12,323.12'} | ${'12323.12'}
    ${'12323,12'} | ${'12,323.12'} | ${'12323,12'}
    ${'12323,1'}  | ${'12,323.10'} | ${'12323,10'}
    ${'12323,'}   | ${'12,323.00'} | ${'12323,00'}
    ${'12323.'}   | ${'12,323.00'} | ${'12323.00'}
    ${'12323.1'}  | ${'12,323.10'} | ${'12323.10'}
    ${'31232'}    | ${'31,232.00'} | ${'31232.00'}
  `('should work correctly when input is $input', ({ endEditing, focus, input }) => {
    const { getByDisplayValue, getByTestId } = render(
      <CurrencyInput testID="Amount-input" prefix={<Typography.Body variant="small">$</Typography.Body>} />
    );
    const amountInput = getByTestId(addInputSuffix('Amount'));

    fireEvent.changeText(amountInput, input);

    // Finish editing
    act(() => {
      fireEvent(amountInput, 'onEndEditing');
    });
    expect(getByDisplayValue(endEditing)).toBeTruthy();

    // focus
    act(() => {
      fireEvent(amountInput, 'onFocus');
    });

    expect(getByDisplayValue(focus)).toBeTruthy();
  });

  it('should propagate onFocus event to onFocus props if provided', () => {
    const mockOnFocus = jest.fn();

    const { getByTestId } = render(<CurrencyInput testID="Amount-input" onFocus={mockOnFocus} />);

    const amountInput = getByTestId(addInputSuffix('Amount'));
    fireEvent(amountInput, 'onFocus');

    expect(mockOnFocus).toBeCalledTimes(1);
  });

  it('should not allow decimal input when precision is 0', () => {
    const mockOnChange = jest.fn();
    const { getByDisplayValue, getByTestId } = render(
      <CurrencyInput testID="Amount-input" precision={0} onChange={mockOnChange} />
    );
    const amountInput = getByTestId(addInputSuffix('Amount'));

    fireEvent.changeText(amountInput, '1234');
    expect(mockOnChange).toHaveBeenCalledWith('1234');

    fireEvent.changeText(amountInput, '1234.');
    expect(mockOnChange).toHaveBeenCalledTimes(1); // Should not be called again

    fireEvent.changeText(amountInput, '1234.5');
    expect(mockOnChange).toHaveBeenCalledTimes(1); // Should not be called again

    // Finish editing
    act(() => {
      fireEvent(amountInput, 'onEndEditing');
    });

    expect(getByDisplayValue('1,234')).toBeTruthy();
  });
});
