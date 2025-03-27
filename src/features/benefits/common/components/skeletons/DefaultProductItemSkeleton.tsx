import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Dimensions } from 'react-native';
import { useTheme } from '@hero-design/rn';
import { ProductItemSkeleton } from './ProductItemSkeleton';

const { width: screenWidth } = Dimensions.get('screen');

const defaultHeightRatio = 100 / 170;

type DefaultProductItemSkeletonProps = {
  heightRatio?: number;
  style?: StyleProp<ViewStyle>;
};
export const DefaultProductItemSkeleton = ({ heightRatio, style }: DefaultProductItemSkeletonProps) => {
  const { space } = useTheme();
  const imgWidth = (screenWidth - space.medium * 3) / 2;
  const imgHeight = imgWidth * (heightRatio ?? defaultHeightRatio);
  return (
    <ProductItemSkeleton
      testID="product-item-skeleton"
      style={[{ marginBottom: space.large }, style]}
      imgWidth={imgWidth}
      imgHeight={imgHeight}
    />
  );
};
