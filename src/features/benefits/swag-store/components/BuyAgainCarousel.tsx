import React from 'react';
import type { PromotedGiftCardProps } from './PromotedGiftCards';
import { PromotedGiftCard } from './PromotedGiftCards';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';

type BuyAgainCarouselProps = Pick<PromotedGiftCardProps, 'location' | 'style'>;

export const BuyAgainCarousel = ({ location, style }: BuyAgainCarouselProps) => {
  const buyAgainPermission = usePermissionStore(state => state.permissions?.ebenStoreBuyAgainCarousel?.view);
  if (!buyAgainPermission) {
    return null;
  }
  return <PromotedGiftCard location={location} carouselType="buy again" title="Buy again" style={style} />;
};
