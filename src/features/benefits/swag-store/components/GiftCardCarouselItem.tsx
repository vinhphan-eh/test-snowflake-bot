import React from 'react';
import { scale } from '../../../../common/utils/layout';
import type { ProductItemProps } from '../../common/components/ProductItem';
import { ProductItem } from '../../common/components/ProductItem';

const imgWidth = scale(140, 'width');
const imgHeight = (imgWidth * 96) / 140;

type GiftCardCarouselItemProps = Omit<ProductItemProps, 'imgWidth' | 'imgHeight'> & {
  imgWidth?: number;
  imgHeight?: number;
};
export const GiftCardCarouselItem = (props: GiftCardCarouselItemProps) => {
  return <ProductItem imgWidth={imgWidth} imgHeight={imgHeight} {...props} />;
};
