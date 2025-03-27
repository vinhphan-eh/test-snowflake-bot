import React, { useEffect, useRef, useState } from 'react';
import type {
  NativeSyntheticEvent,
  TextInput as TextInputRN,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
} from 'react-native';
import type { IconName, TextInputProps } from '@hero-design/rn';
import { TextInput, Typography } from '@hero-design/rn';
import {
  convertToRawValue,
  decimalSeparatorRegex,
  formatNumberValue,
  userInputToMachineNumber,
} from '../../utils/numbers';

export interface CurrencyInputProps extends Omit<TextInputProps, 'onChange'> {
  /**
   * Currency symbol we will use
   */
  currencySymbol?: IconName | React.ReactElement;
  /**
   * Number precision. Value will be round by provided precision
   */
  precision?: number;
  /**
   * Callback when formatted value is changed. Raw value change still be triggered by `onChange` callback
   * @param displayedValue
   */
  onDisplayedValueChange?: (formattedValue: string) => void;

  /**
   * callback when raw value is changed
   * @param rawValue
   */
  onChange?: (rawValue: string) => void;
}

export const CurrencyInput = React.forwardRef<TextInputRN, CurrencyInputProps>((props, ref) => {
  const {
    currencySymbol = <Typography.Body variant="small">$</Typography.Body>,
    onChange: onRawValueChange,
    onDisplayedValueChange,
    precision = 2,
    textAlign = 'left',
    ...textfieldProps
  } = props;

  const [displayedValue, setDisplayedValue] = useState(props.value || '');
  const decimalSeparatorInputByUser = useRef('');

  useEffect(() => {
    onDisplayedValueChange?.(displayedValue);
  }, [displayedValue]);

  const onChange = (newValue: string) => {
    const unExpectedChar = newValue.replace(/[0-9\\.\\,]/g, '');
    const decimalSeparatorMatch = newValue.match(decimalSeparatorRegex);
    const isTypingNew = newValue.length > displayedValue.length;
    const countDecimals = decimalSeparatorMatch?.length ?? 0;

    const firstDecimal = newValue.search(decimalSeparatorRegex); // Index of first decimal
    // do this so typing super fast, it won't fail
    const resultStr =
      newValue.substring(0, firstDecimal + 1) + newValue.slice(firstDecimal + 1).replace(decimalSeparatorRegex, '');

    if (countDecimals === 0 && decimalSeparatorInputByUser.current) {
      decimalSeparatorInputByUser.current = '';
    }

    if (isTypingNew) {
      // only apply restriction when typing, when deleting: not restrict
      if (unExpectedChar || countDecimals > 1 || firstDecimal === 0 || (precision === 0 && countDecimals > 0)) {
        // invalid char | multiple decimal | decimal at first item | decimal when precision is 0
        return;
      }

      if (countDecimals === 1 && !decimalSeparatorInputByUser.current && precision > 0) {
        // cache decimal separator only if precision > 0
        decimalSeparatorInputByUser.current = resultStr.charAt(firstDecimal);
      }

      if (countDecimals === 1 && resultStr.length - 1 > firstDecimal + precision) {
        // when having decimal, prevent surpass precision
        return;
      }
    }

    onRawValueChange?.(resultStr);
    setDisplayedValue(resultStr);
  };

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const rawValue = convertToRawValue({
      formattedValue: displayedValue,
      decimal: decimalSeparatorInputByUser.current,
      delimiter: ',',
    });

    setDisplayedValue(rawValue);
    if (textfieldProps?.onFocus) {
      textfieldProps.onFocus(e);
    }
  };

  // Format value when finish editing
  const customOnEndEditing = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    // Nothing input yet => skip
    if (displayedValue === '') {
      return;
    }

    const machineNumber = userInputToMachineNumber({
      inputValue: displayedValue,
    });

    if (Number.isNaN(machineNumber)) {
      return;
    }
    const formattedValue = formatNumberValue({ rawValue: machineNumber, delimiter: ',', precision });
    setDisplayedValue(formattedValue);
    onRawValueChange?.(formattedValue);

    // // Parent callback if exists
    props.onEndEditing?.(e);
  };

  const showPrefix = displayedValue !== '';

  useEffect(() => {
    /**
     * This is to help with displaying initially set value before the first interaction
     * If the value is passed to the component but none displayedValue was identified,
     * call onChange to set the default value to the box
     */
    if (textfieldProps.defaultValue && !displayedValue) {
      onChange(textfieldProps.defaultValue);
    }
  }, [textfieldProps.defaultValue]);

  return (
    <TextInput
      autoComplete="off"
      {...textfieldProps}
      ref={ref}
      textAlign={textAlign}
      prefix={showPrefix ? currencySymbol : undefined}
      value={displayedValue}
      onChangeText={onChange}
      onEndEditing={customOnEndEditing}
      onFocus={onFocus}
      keyboardType="numeric"
    />
  );
});
