import React from 'react';
import { scale } from '../../../../../common/utils/layout';
import type { ProductItemSkeletonProps } from '../../../common/components/skeletons/ProductItemSkeleton';
import { ProductItemSkeleton } from '../../../common/components/skeletons/ProductItemSkeleton';

const imgWidth = scale(171, 'width');
const imgHeight = (imgWidth * 100) / 171;

type CashbackCarouselItemSkeletonProps = Omit<ProductItemSkeletonProps, 'imgWidth' | 'imgHeight'> & {
  imgWidth?: number;
  imgHeight?: number;
};
export const CashbackCarouselItemSkeleton = (props: CashbackCarouselItemSkeletonProps) => {
  return <ProductItemSkeleton {...props} imgWidth={imgWidth} imgHeight={imgHeight} />;
};
