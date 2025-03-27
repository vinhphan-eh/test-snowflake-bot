import React from 'react';
import type { ProductItemSkeletonProps } from './ProductItemSkeleton';
import { ProductItemSkeleton } from './ProductItemSkeleton';
import { scale } from '../../../../../common/utils/layout';

const imgWidth = scale(140, 'width');
const imgHeight = (imgWidth * 96) / 140;

type ProductItemCarouselSkeletonProps = Omit<ProductItemSkeletonProps, 'imgWidth' | 'imgHeight'> & {
  imgWidth?: number;
  imgHeight?: number;
};
export const ProductItemCarouselSkeleton = (props: ProductItemCarouselSkeletonProps) => {
  return <ProductItemSkeleton {...props} imgWidth={imgWidth} imgHeight={imgHeight} />;
};
