import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { BillOffersCarousel } from '../components/BillOffersCarousel';
import { useGetAllBillOffers } from '../hooks/useGetAllBillOffers';

type BillOffersCarouselConProps = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  testID?: string;
};
export const BillOffersCarouselCon = ({ onPress, style, testID }: BillOffersCarouselConProps) => {
  const { billOffers, isError, isLoading } = useGetAllBillOffers({});

  return (
    <BillOffersCarousel
      testID={testID}
      style={style}
      onPress={onPress}
      billOffers={billOffers}
      isLoading={isLoading}
      isError={isError}
    />
  );
};
