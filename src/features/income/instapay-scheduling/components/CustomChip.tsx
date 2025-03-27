import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import { CurrencyInput } from '../../../../common/components/currency-input';
import { getCurrencySymbol, type SupportedCurrency } from '../../../../common/utils/numbers';
import { OTHER_OPTION_CHIP_LABEL } from '../constants';

type LimitCheckDetails = {
  value: number;
  errorMessage: string;
};

interface CustomChipProps {
  labels: string[];
  onChange: (value?: number) => void;
  confirmText: string;
  confirmAction: () => void;
  helperText?: string;
  maxLimitCheck?: LimitCheckDetails;
  minLimitCheck?: LimitCheckDetails;
  defaultSelectedChip?: string;
  currency: SupportedCurrency;
}

export type CustomChipHandler = {
  onReset: (amountToReset?: string) => void;
};

const CustomChip = forwardRef<CustomChipHandler, CustomChipProps>(
  (
    {
      confirmAction,
      confirmText,
      currency,
      defaultSelectedChip,
      helperText,
      labels,
      maxLimitCheck,
      minLimitCheck,
      onChange,
    },
    ref
  ) => {
    const { colors, radii, space } = useTheme();
    const [maxAmount] = labels;
    const [selectedChip, setSelectedChip] = useState(defaultSelectedChip ?? maxAmount);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentInputValue, setCurrentInputValue] = useState<string>('');
    const isOtherOption = selectedChip === OTHER_OPTION_CHIP_LABEL;

    const handleValueChange = (value: string) => {
      if (value === OTHER_OPTION_CHIP_LABEL) {
        /**
         * On changing to the Other chip, it is expected to clear the input box
         * These two lines of code will reset the input box and CTA to its proper caption and
         * disable the CTA by default
         */
        onChange();
        setCurrentInputValue('');
        return;
      }

      setCurrentInputValue(value);
      /**
       * Since <CurrencyInput/> accepts comma as a separator between whole and decimal parts while
       * parseFloat does not, converting all commas into dots before parsing to make sure the value
       * is correctly parsed and stored.
       */
      const amount = parseFloat(value.replace(getCurrencySymbol(currency), '').replace(',', '.'));

      if (maxLimitCheck && amount > maxLimitCheck.value) {
        setErrorMessage(maxLimitCheck.errorMessage);
      } else if (minLimitCheck && amount < minLimitCheck.value) {
        setErrorMessage(minLimitCheck.errorMessage);
      } else {
        setErrorMessage('');
      }

      onChange(amount);
    };

    useImperativeHandle(ref, () => ({
      onReset: amountToReset => {
        setSelectedChip(amountToReset ?? maxAmount);
        handleValueChange(amountToReset ?? maxAmount);
      },
    }));

    useEffect(() => {
      if (selectedChip) {
        handleValueChange(selectedChip);
      }
    }, []);

    return (
      <Box style={{ width: '100%' }}>
        <Box flexDirection="row">
          {labels.map(label => {
            const selected = selectedChip === label;
            return (
              <TouchableOpacity
                key={label}
                style={{
                  marginHorizontal: space.xsmall,
                  backgroundColor: selected ? colors.darkGlobalSurface : 'transparent',
                  borderRadius: radii.rounded,
                  borderWidth: 1,
                  borderColor: colors.primaryOutline,
                  padding: space.small,
                  paddingHorizontal: space.smallMedium,
                }}
                testID={`custom-chip-${label}`}
                onPress={() => {
                  setSelectedChip(label);
                  handleValueChange(label);
                }}
              >
                <Typography.Body intent={selected ? 'inverted' : undefined}>{label}</Typography.Body>
              </TouchableOpacity>
            );
          })}
        </Box>
        {isOtherOption && (
          <Box marginTop="medium">
            <CurrencyInput
              testID="custom-chip-input"
              prefix="dollar-sign"
              onChange={value => {
                handleValueChange(value);
              }}
              helpText={helperText}
              error={errorMessage}
              keyboardType="numeric"
              currencySymbol={<Typography.Body variant="small">{getCurrencySymbol(currency)}</Typography.Body>}
            />
          </Box>
        )}
        <Button
          testID="custom-chip-cta"
          style={{ marginTop: space.large }}
          text={confirmText}
          onPress={confirmAction}
          disabled={!!errorMessage || !currentInputValue}
        />
      </Box>
    );
  }
);

export { CustomChip };
