import React from 'react';
import { Typography, List, Box, useTheme } from '@hero-design/rn';
import { BuyAgainCarousel } from './BuyAgainCarousel';
import { FeatureOffers } from './FeatureOffers';
import { PopularCarousel } from './PopularCarousel';
import { SectionHeader } from './SectionHeader';

type SwagStoreHeaderConProps = {
  navigateToPurchasesHistory: () => void;

  goToShopDiscount: () => void;
};

export const SwagStoreHeaderCon = ({ goToShopDiscount, navigateToPurchasesHistory }: SwagStoreHeaderConProps) => {
  const { space } = useTheme();

  return (
    <>
      <Typography.Title level="h3" style={{ margin: space.medium }} typeface="playful">
        Gift card store
      </Typography.Title>
      <List.Item
        style={{ marginBottom: space.xlarge, marginHorizontal: space.medium }}
        suffix="arrow-right"
        title="Gift card purchase history"
        variant="card"
        onPress={navigateToPurchasesHistory}
      />
      <BuyAgainCarousel location="buy again carousel" />
      <Box paddingHorizontal="medium">
        <FeatureOffers />
      </Box>
      <PopularCarousel location="popular carousel" />
      <Box marginHorizontal="medium">
        <SectionHeader
          onActionPressed={goToShopDiscount}
          style={{ marginBottom: space.medium }}
          title="Gift cards"
          actionText="View more"
        />
      </Box>
    </>
  );
};
