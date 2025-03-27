import React, { useEffect, useState } from 'react';
import { Box, Button, TextInput, useTheme } from '@hero-design/rn';
import { MultiVariantWithQuantitySelect } from './MultiVariantQuantitySelect';
import type { SupportedCurrency } from '../../../../../common/utils/numbers';
import type { ShopProductDetails, ShopProductVariant } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { useSwagStoreTracking } from '../../hooks/useSwagStoreTracking';

export type VariantsWithQuantity = ShopProductVariant & {
  selectedQuantity: number;
  currency: SupportedCurrency;
  serviceFee: number;
};

type Props = {
  variantsWithQuantity: VariantsWithQuantity[];
  onQuantityChanged: React.Dispatch<React.SetStateAction<VariantsWithQuantity[]>>;
  product: Partial<ShopProductDetails>;
};

type QuantityInputProps = {
  value: number;
  maxValue: number;
  onValueChange: (value: number) => void;
  disabled?: boolean;
};

const isPositiveInteger = (value: number) => {
  return Number.isInteger(value) && value >= 0;
};

const QuantityInput = ({ disabled, maxValue, onValueChange, value }: QuantityInputProps) => {
  const { space } = useTheme();
  const { formatMessage } = useIntl();
  const [textInputValue, setTextInputValue] = useState(`${value}`);

  // When the value changes, update the text input value
  useEffect(() => {
    setTextInputValue(value.toString());
  }, [value]);

  const onIncrement = () => {
    if (value < maxValue) {
      onValueChange(value + 1);
    }
  };

  const onDecrement = () => {
    if (value > 0) {
      onValueChange(value - 1);
    }
  };

  const onEndManualInput = () => {
    // Validate the manual input, if valid, update the actual value
    const inputQuantity = Number(textInputValue);
    // If not a positive integer, revert text input to the current valid quantity
    if (!isPositiveInteger(inputQuantity)) {
      setTextInputValue(value.toString());
    }

    // If greater than the max value, set to max value
    if (inputQuantity > maxValue) {
      onValueChange(maxValue);
      // Manually calling this because when the value is already maxValue,
      // the side effect for value won't be triggered
      setTextInputValue(maxValue.toString());
    }
  };

  return (
    <Box flexDirection="row" alignItems="center" alignSelf="center" testID="single-variant-quantity-select">
      <Button.Icon
        disabled={disabled}
        style={{
          marginRight: space.medium,
          alignItems: 'center',
        }}
        size="small"
        icon="remove"
        intent="info"
        onPress={onDecrement}
        testID="remove-quantity-button"
      />
      <TextInput
        label={formatMessage({ id: 'benefits.swagStore.quantity' })}
        disabled={disabled}
        value={textInputValue}
        onChangeText={setTextInputValue}
        onBlur={onEndManualInput}
        textStyle={{
          margin: 0,
        }}
        keyboardType="numeric"
        textAlign="center"
        style={{
          marginLeft: space.small,
          minWidth: 90,
          // Override default width = 100% of TextInput
          width: undefined,
        }}
        testID="quantity-text-input"
      />
      <Button.Icon
        disabled={disabled}
        style={{ marginLeft: space.medium, alignItems: 'center' }}
        icon="add"
        size="small"
        intent="primary"
        onPress={onIncrement}
        testID="add-quantity-button"
      />
    </Box>
  );
};

export const VariantQuantitySelect = ({ onQuantityChanged, product, variantsWithQuantity }: Props) => {
  const { trackSelectVariantQuantity } = useSwagStoreTracking();

  if (!variantsWithQuantity.length) {
    return null;
  }

  const onVariantQuantityChanged = (variant: VariantsWithQuantity, quantity: number) => {
    onQuantityChanged(prevValue => {
      const newValue = prevValue.map(v => {
        if (v.variantCode === variant.variantCode) {
          return { ...v, selectedQuantity: quantity };
        }
        return v;
      });

      trackSelectVariantQuantity({
        productName: product.name ?? '',
        productCategory: product.productType ?? '',
        variantCode: variant.variantCode,
        quantity,
      });

      return newValue;
    });
  };

  const isSingleVariant = variantsWithQuantity.length === 1;
  if (isSingleVariant) {
    const [variant] = variantsWithQuantity;
    return (
      <QuantityInput
        disabled={!variant.stockAvailable}
        value={variant.selectedQuantity}
        maxValue={variant.numberInStock}
        onValueChange={value => onVariantQuantityChanged(variant, value)}
      />
    );
  }

  return (
    <MultiVariantWithQuantitySelect
      product={product}
      allVariants={variantsWithQuantity}
      onQuantityChanged={onVariantQuantityChanged}
    />
  );
};
