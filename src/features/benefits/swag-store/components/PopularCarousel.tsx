import React from 'react';
import type { PromotedGiftCardProps } from './PromotedGiftCards';
import { PromotedGiftCard } from './PromotedGiftCards';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';

type PopularCarouselProps = Pick<PromotedGiftCardProps, 'location' | 'style'>;

export const PopularCarousel = ({ location, style }: PopularCarouselProps) => {
  const popularPermission = usePermissionStore(state => state.permissions?.ebenStorePopularList?.view);
  if (!popularPermission) {
    return null;
  }
  return <PromotedGiftCard location={location} carouselType="popular" title="Popular gift cards" style={style} />;
};
