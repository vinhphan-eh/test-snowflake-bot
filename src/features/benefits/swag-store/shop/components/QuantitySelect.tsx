import React, { useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Select } from '@hero-design/rn';
import type { OptionType } from '@hero-design/rn/types/components/Select/types';

type QuantitySelectProps = {
  accessibilityLabel?: string;
  value: number;
  quantity: number;
  onQuantitySelect: (quantity: number | null) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  selectStyle?: StyleProp<ViewStyle>;
};

export const QuantitySelect = ({
  accessibilityLabel,
  disabled = false,
  onQuantitySelect,
  quantity,
  selectStyle,
  style,
  value,
}: QuantitySelectProps) => {
  const options = useMemo(
    () =>
      Array(quantity)
        .fill(undefined)
        .map(
          (_, i) =>
            ({
              value: i + 1,
              text: `${i + 1}`,
            } as OptionType<number>)
        ),
    [quantity]
  );
  return (
    <Box accessibilityLabel={accessibilityLabel} style={style}>
      <Select
        style={selectStyle}
        disabled={disabled}
        label="Quantity"
        options={options}
        value={value}
        onConfirm={onQuantitySelect}
        keyExtractor={opt => `${opt.value}`}
      />
    </Box>
  );
};
