import React from 'react';
import { scale } from '../../../../common/utils/layout';
import type { ProductItemProps } from '../../common/components/ProductItem';
import { ProductItem } from '../../common/components/ProductItem';

const imgWidth = scale(171, 'width');
const imgHeight = (imgWidth * 100) / 171;

type CashbackCarouselItemProps = Omit<ProductItemProps, 'imgWidth' | 'imgHeight'> & {
  imgWidth?: number;
  imgHeight?: number;
};
export const CashbackCarouselItem = (props: CashbackCarouselItemProps) => {
  return <ProductItem numberOfLines={1} imgWidth={imgWidth} imgHeight={imgHeight} {...props} />;
};
