import React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { QuantitySelect } from './QuantitySelect';
import { scale } from '../../../../../common/utils/layout';
import type { SupportedCurrency } from '../../../../../common/utils/numbers';
import { createCurrencyFormatter } from '../../../../../common/utils/numbers';

type ProductInfoCardProps = {
  imageSource: ImageSourcePropType;
  name: string;
  quantity: number;
  price: number;
  disableSelect: boolean;
  numberInStock: number;
  priceInPoints?: number;
  onQuantitySelect: (quantity: number | null) => void;
  currency: SupportedCurrency;
};

const imgWidth = scale(96, 'width');
const imgHeight = scale(72, 'width');

export const ProductInfoCard = ({
  currency,
  disableSelect,
  imageSource,
  name,
  numberInStock,
  onQuantitySelect,
  price,
  priceInPoints,
  quantity,
}: ProductInfoCardProps) => {
  const { radii, space } = useTheme();
  const formatCurrency = createCurrencyFormatter();

  return (
    <Box
      flexGrow={1}
      backgroundColor="defaultGlobalSurface"
      alignItems="center"
      paddingHorizontal="medium"
      flexDirection="row"
      borderRadius="medium"
    >
      <Image
        accessibilityLabel="Product image"
        resizeMode="contain"
        source={imageSource}
        style={{
          width: imgWidth,
          height: imgHeight,
          borderRadius: radii.medium,
          marginVertical: space.medium,
        }}
      />
      <Box flex={1} marginHorizontal="medium" justifyContent="space-between">
        <Typography.Body accessibilityLabel="Name" numberOfLines={2} variant="regular-bold">
          {name}
        </Typography.Body>

        <Typography.Body accessibilityLabel="Price" intent="subdued" variant="small">
          {`${formatCurrency(price, { currency })}${priceInPoints ? ` or ${priceInPoints} PTS` : ''} each`}
        </Typography.Body>
      </Box>
      <QuantitySelect
        accessibilityLabel="Quantity selection"
        disabled={disableSelect}
        value={quantity}
        quantity={numberInStock}
        onQuantitySelect={onQuantitySelect}
      />
    </Box>
  );
};
