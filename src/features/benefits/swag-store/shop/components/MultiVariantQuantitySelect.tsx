import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Button, Divider, Select, Typography, useTheme } from '@hero-design/rn';
import type { OptionType, ListRenderOptionInfo } from '@hero-design/rn/types/components/Select/types';
import type { VariantsWithQuantity } from './VariantQuantitySelect';
import { createCurrencyFormatter } from '../../../../../common/utils/numbers';
import type { ShopProductDetails } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { roundNum } from '../../../common/utils/calculations';
import { useSwagStoreTracking } from '../../hooks/useSwagStoreTracking';
import { useServiceFeeFeature } from '../hooks/useServiceFeeFeature';

type MultiVariantWithQuantitySelectProps = {
  allVariants: VariantsWithQuantity[];
  onQuantityChanged: (variant: VariantsWithQuantity, quantity: number) => void;
  product: Partial<ShopProductDetails>;
};

const formatCurrency = createCurrencyFormatter();

const VariantOptionDetails = ({
  item: { disabled, value: variant },
  onPress,
}: ListRenderOptionInfo<VariantsWithQuantity, OptionType<VariantsWithQuantity>>) => {
  const { space } = useTheme();
  const { formatMessage } = useIntl();
  const { getPriceWithFee } = useServiceFeeFeature();

  const discountPriceWithServiceFee = getPriceWithFee(variant.discountPrice, variant.serviceFee);
  const discountAmount = roundNum(variant.price - discountPriceWithServiceFee);

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={{ opacity: disabled ? 0.3 : 1 }}>
      <Box marginTop="smallMedium" flexDirection="row" justifyContent="space-between">
        <Typography.Body>{variant.label}</Typography.Body>
        <Typography.Body intent="subdued">
          <Typography.Body intent={disabled ? 'subdued' : 'primary'} variant="regular-bold">
            {formatCurrency(variant.discountPriceInPoints ?? 0, { currency: 'POINTS' })}
          </Typography.Body>
          /{formatCurrency(discountPriceWithServiceFee, { currency: variant.currency })}
        </Typography.Body>
      </Box>
      <Box justifyContent="space-between" marginTop="small" flexDirection="row">
        <Typography.Caption intent="subdued">
          {formatMessage(
            { id: 'benefits.swagStore.saveAmountPerTicket' },
            {
              amount: formatCurrency(discountAmount, { currency: variant.currency }),
            }
          )}
        </Typography.Caption>
        <Typography.Caption intent="subdued" style={{ textDecorationLine: 'line-through' }}>
          {formatCurrency(variant.price, { currency: variant.currency })}
        </Typography.Caption>
      </Box>
      {variant.description && (
        <Box marginTop="xsmall" flexDirection="row">
          <Typography.Label intent="subdued">{variant.description}</Typography.Label>
        </Box>
      )}

      <Divider style={{ width: '100%', marginTop: space.smallMedium }} />
    </TouchableOpacity>
  );
};

const LineItem = ({
  onQuantityChanged,
  onRemoved,
  onVariantChanged,
  removable,
  switchableVariants,
  variant,
}: {
  removable: boolean;
  variant: VariantsWithQuantity | null;
  switchableVariants: VariantsWithQuantity[];
  onVariantChanged: (variantCode: string | null) => void;
  onRemoved: () => void;
  onQuantityChanged: (quantity: number | null) => void;
}) => {
  const { space } = useTheme();
  const quantityOptions = Array.from({ length: variant?.numberInStock ?? 0 }, (_, i) => ({
    value: i + 1,
    text: (i + 1).toString(),
  }));

  const variantOptions = switchableVariants.map(v => ({
    value: v,
    text: v.label,
    disabled: !v.stockAvailable,
  }));

  return (
    <Box flexDirection="row" style={{ columnGap: space.smallMedium }} paddingLeft="medium">
      <Box flex={2}>
        <Select<VariantsWithQuantity, OptionType<VariantsWithQuantity>>
          value={variant}
          onConfirm={v => {
            onVariantChanged(v?.variantCode ?? null);
          }}
          keyExtractor={v => v.value.variantCode}
          renderOption={VariantOptionDetails}
          options={variantOptions}
          label="Ticket types"
        />
      </Box>

      <Box flexDirection="row" style={{ width: 160 }} alignItems="center" paddingRight="medium">
        <Box flex={1}>
          <Select<number, OptionType<number>>
            disabled={!variant}
            value={variant?.selectedQuantity ?? null}
            onConfirm={onQuantityChanged}
            options={quantityOptions}
            label="Qty"
          />
        </Box>
        {removable && (
          <Button.Icon
            intent="danger"
            style={{ alignItems: 'center', marginLeft: space.medium }}
            icon="trash-bin-outlined"
            testID={`remove-variant-button-${variant?.variantCode}`}
            onPress={onRemoved}
          />
        )}
      </Box>
    </Box>
  );
};

export const MultiVariantWithQuantitySelect = ({
  allVariants,
  onQuantityChanged,
  product,
}: MultiVariantWithQuantitySelectProps) => {
  const { trackSelectVariant } = useSwagStoreTracking();
  const { space } = useTheme();
  // List of variant codes to render
  const [renderVariantCodes, setRenderVariantCodes] = useState<Array<string | undefined>>([undefined]);

  const onAddNewLine = () => {
    setRenderVariantCodes(v => [...v, undefined]);
  };

  const onLineVariantChanged = (index: number) => (variantCode: string | null) => {
    if (!variantCode) {
      return;
    }

    trackSelectVariant({
      productName: product.name ?? '',
      productCategory: product.productType ?? '',
      variantCode,
    });

    const prevVariantCode = renderVariantCodes[index];
    const prevVariant = allVariants.find(v => v.variantCode === prevVariantCode);
    // As the prev variant is removed, set its quantity to 0
    if (prevVariant) {
      // Reset the quantity of the previously selected variant
      onQuantityChanged(prevVariant, 0);
    }

    const selectedVariant = allVariants.find(v => v.variantCode === variantCode);
    // Default the quantity to 1 if the selected variant is available on stock
    if (selectedVariant) {
      onQuantityChanged(selectedVariant, selectedVariant.stockAvailable ? 1 : 0);
    }

    setRenderVariantCodes(v => {
      const newVariantCodes = [...v];
      newVariantCodes[index] = variantCode;
      return newVariantCodes;
    });
  };

  const onRemoveLine = (index: number) => {
    const variantCode2Remove = renderVariantCodes[index];

    // Set quantity to 0 for the variant that is removed
    const variant2Remove = allVariants.find(v => v.variantCode === variantCode2Remove);
    if (variant2Remove) {
      onQuantityChanged(variant2Remove, 0);
    }

    // Remove the variant code from the render list
    setRenderVariantCodes(v => v.filter((_, i) => i !== index));
  };

  const unable2AddNewLine = renderVariantCodes.some(variantCode => variantCode === undefined);

  return (
    <Box testID="multi-variant-quantity-select">
      {renderVariantCodes.map((variantCode, index) => {
        const variant = allVariants.find(v => v.variantCode === variantCode);

        const switchableVariants = allVariants.filter(
          v =>
            // Include the current render variant code
            v.variantCode === variantCode ||
            // Include only the variants that are not already rendered
            !renderVariantCodes.includes(v.variantCode)
        );

        return (
          <LineItem
            // It's fine to use index as key here because
            // - we add new item to bottom
            // - variantCode is changeable
            // eslint-disable-next-line react/no-array-index-key
            key={index.toString()}
            removable={index !== 0}
            variant={variant ?? null}
            switchableVariants={switchableVariants}
            onVariantChanged={onLineVariantChanged(index)}
            onRemoved={() => onRemoveLine(index)}
            onQuantityChanged={quantity => {
              if (variant) {
                onQuantityChanged(variant, quantity ?? 0);
              }
            }}
          />
        );
      })}
      <Button
        icon="add"
        onPress={onAddNewLine}
        disabled={unable2AddNewLine}
        text="Add"
        variant="text"
        style={{ justifyContent: 'flex-end', marginRight: space.smallMedium }}
      />
    </Box>
  );
};
