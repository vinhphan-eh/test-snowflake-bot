import React from 'react';
import { Dimensions } from 'react-native';
import { useTheme } from '@hero-design/rn';
import type { ProductItemSkeletonProps } from '../../../common/components/skeletons/ProductItemSkeleton';
import { ProductItemSkeleton } from '../../../common/components/skeletons/ProductItemSkeleton';

type GiftCardGridSkeletonProps = Omit<ProductItemSkeletonProps, 'imgWidth' | 'imgHeight'> & {
  imgWidth?: number;
  imgHeight?: number;
};
const { width: screenWidth } = Dimensions.get('screen');
const heightRatio = 116 / 171;

export const GiftCardGridSkeleton = (props: GiftCardGridSkeletonProps) => {
  const { space } = useTheme();
  const imgWidth = (screenWidth - space.medium * 3) / 2;
  const imgHeight = imgWidth * heightRatio;
  return <ProductItemSkeleton imgHeight={imgHeight} imgWidth={imgWidth} {...props} />;
};
