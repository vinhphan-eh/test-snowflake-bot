import React, { useCallback } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { OfferSkeleton } from './skeletons/OfferSkeleton';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import type { OnlineOffer } from '../../../../new-graphql/generated';
import { useGetFeaturedOffersQuery } from '../../../../new-graphql/generated';
import { OnlineOfferItem } from '../online-offer/components/OnlineOfferItem';

type FeaturedCashbackOffersProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
  testID?: string;
};

export const FeaturedCashbackOffers = ({ style, testID, title }: FeaturedCashbackOffersProps) => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { space } = useTheme();

  const {
    data: featuredOnlineOffersData,
    isError: isErrorFeaturedOnlineOffers,
    isLoading: isLoadingFeaturedOffers,
  } = useGetFeaturedOffersQuery();
  const featuredOnlineOffers =
    featuredOnlineOffersData?.me?.cashback?.featuresOffers.edges.map(edge => edge.node) ?? [];

  const openOnlineOfferDetail = (offerId: string, item: OnlineOffer) => {
    navigation.navigate('BenefitsStack', {
      screen: 'CashbackStack',
      params: { screen: 'OnlineOfferDetail', params: { offerId, offer: item } },
    });
  };

  const renderItems = useCallback(() => {
    return featuredOnlineOffers.map((item, index) => {
      return (
        <OnlineOfferItem
          accessibilityLabel="Cashback item"
          item={item}
          // eslint-disable-next-line react/no-array-index-key
          key={`${item.id}${index}`}
          style={{ marginTop: index === 0 ? space.medium : 0 }}
          onPress={() => openOnlineOfferDetail(item.id, item)}
        />
      );
    });
  }, [featuredOnlineOffers]);

  const renderBody = () => {
    if (isLoadingFeaturedOffers) {
      return (
        <Box testID="skeleton-loading">
          <OfferSkeleton marginTop="medium" />
          <OfferSkeleton marginTop="medium" />
          <OfferSkeleton marginTop="medium" />
        </Box>
      );
    }

    return renderItems();
  };

  if (isErrorFeaturedOnlineOffers && !isLoadingFeaturedOffers) {
    return null;
  }

  return (
    <Box testID={testID} marginHorizontal="medium" style={style}>
      <Typography.Body variant="small" accessibilityLabel={title} style={{ marginBottom: space.xsmall }}>
        {title}
      </Typography.Body>
      {renderBody()}
    </Box>
  );
};
