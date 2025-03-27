import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Select, Typography, useTheme } from '@hero-design/rn';
import type { OptionType, ListRenderOptionInfo } from '@hero-design/rn/types/components/Select/types';
import { createCurrencyFormatter, type SupportedCurrency } from '../../../../../common/utils/numbers';
import type { ShopProductDetails, ShopProductVariant } from '../../../../../new-graphql/generated';

type MultiVariantWithQuantitySelectProps = {
  product: Partial<ShopProductDetails>;
  currency: SupportedCurrency;
  onSelected: (selectedVariant: ShopProductVariant) => void;
};

export const MultiVariantAmountSelect = ({ currency, onSelected, product }: MultiVariantWithQuantitySelectProps) => {
  const { space } = useTheme();
  const formatCurrency = createCurrencyFormatter();
  const allVariants = useMemo(() => product.productVariants ?? [], [product.productVariants]);

  const variantOptions: OptionType<number>[] = useMemo(() => {
    return allVariants
      .map(variant => {
        const { price = 0 } = variant;
        return {
          value: price,
          text: `${formatCurrency(price, { currency })}`,
          disabled: !variant.stockAvailable,
        };
      })
      .sort((a, b) => a.value - b.value);
  }, [allVariants, formatCurrency, currency]);

  const lowestPriceOption = useMemo(() => {
    return variantOptions.reduce<OptionType<number> | null>((lowest, option) => {
      if (option.disabled) {
        return lowest;
      }
      return !lowest || option.value < lowest.value ? option : lowest;
    }, null);
  }, [variantOptions]);

  const [selectedPrice, setSelectedPrice] = useState<number | undefined>(lowestPriceOption?.value);

  const renderOption = ({ item: { disabled, text }, onPress }: ListRenderOptionInfo<number, OptionType<number>>) => (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{ opacity: disabled ? 0.3 : 1, paddingVertical: space.small, paddingLeft: space.xsmall }}
    >
      <Typography.Body intent="body">{text}</Typography.Body>
    </TouchableOpacity>
  );

  useEffect(() => {
    const selectedVariant = allVariants.find(variant => variant.price === selectedPrice && variant.stockAvailable);

    if (selectedVariant) {
      onSelected(selectedVariant);
    }
  }, [selectedPrice, allVariants]);

  if (!selectedPrice) {
    return null;
  }

  return (
    <Box style={{ marginHorizontal: space.medium }}>
      <Select<number, OptionType<number>>
        testID="multi-variant-select"
        label="Value"
        value={selectedPrice}
        onConfirm={confirmedValue => {
          if (confirmedValue === null) {
            return;
          }

          setSelectedPrice(confirmedValue);
        }}
        options={variantOptions}
        renderOption={renderOption}
        disabled={variantOptions.length === 0}
      />
    </Box>
  );
};
