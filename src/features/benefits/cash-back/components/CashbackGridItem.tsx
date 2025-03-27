import React from 'react';
import { Dimensions } from 'react-native';
import { useTheme } from '@hero-design/rn';
import type { ProductItemProps } from '../../common/components/ProductItem';
import { ProductItem } from '../../common/components/ProductItem';

type CashbackGridItemProps = Omit<ProductItemProps, 'imgWidth' | 'imgHeight'> & {
  imgWidth?: number;
  imgHeight?: number;
};
const { width: screenWidth } = Dimensions.get('screen');
const heightRatio = 100 / 171;

export const CashbackGridItem = (props: CashbackGridItemProps) => {
  const { space } = useTheme();
  const imgWidth = (screenWidth - space.medium * 3) / 2;
  const imgHeight = imgWidth * heightRatio;
  return <ProductItem numberOfLines={1} imgWidth={imgWidth} imgHeight={imgHeight} {...props} />;
};
