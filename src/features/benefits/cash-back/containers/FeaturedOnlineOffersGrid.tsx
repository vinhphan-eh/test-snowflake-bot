import React from 'react';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import type { OnlineOffer } from '../../../../new-graphql/generated';
import { useGetFeaturedOffersQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { ProductGrid } from '../../common/components/ProductGrid';
import { DefaultProductItemSkeleton } from '../../common/components/skeletons/DefaultProductItemSkeleton';
import { useCashbackPermission } from '../../common/hooks/useCashbackPermission';
import { CashbackGridItem } from '../components/CashbackGridItem';
import { useCashbackTracking } from '../hooks/useCashbackTracking';
import { formatAdvertiserName } from '../utils/offer';

type FeatureOnlineOffersGridProps = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  testID?: string;
  numberOfItems?: number;
};

export const FeaturedOnlineOffersGrid = ({ numberOfItems, onPress, style, testID }: FeatureOnlineOffersGridProps) => {
  const Intl = useIntl();
  const { space } = useTheme();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { permission } = useCashbackPermission();
  const { trackClickOnFeaturedOfferInGrid } = useCashbackTracking();
  const {
    data: featuredOnlineOffersData,
    isError: isErrorFeaturedOnlineOffers,
    isLoading: isLoadingFeaturedOnlineOffers,
  } = useGetFeaturedOffersQuery({}, { enabled: permission });

  let featuredOnlineOffers = featuredOnlineOffersData?.me?.cashback?.featuresOffers.edges.map(edge => edge.node) ?? [];
  if (numberOfItems !== undefined) {
    featuredOnlineOffers = featuredOnlineOffers.slice(0, numberOfItems);
  }

  const isEmptyAfterFetch =
    !isLoadingFeaturedOnlineOffers && featuredOnlineOffers?.length === 0 && !isErrorFeaturedOnlineOffers;

  if (isErrorFeaturedOnlineOffers || isEmptyAfterFetch || !permission) {
    return null;
  }

  const navigateToOnlineOfferDetail = (offer: OnlineOffer) => {
    navigation.navigate('BenefitsStack', {
      screen: 'CashbackStack',
      params: { screen: 'OnlineOfferDetail', params: { offerId: offer.id, offer } },
    });
  };
  const renderFeaturedOnlineOfferItem: ListRenderItem<OnlineOffer> = ({ item }) => {
    const { advertiserName, categoryCode, imageUrl, isCardLinkedOffer, logoUrl, title } = item;
    const onOfferPress = () => {
      trackClickOnFeaturedOfferInGrid({
        offerName: title,
        platform: 'online',
        offerType: isCardLinkedOffer ? 'card linked' : 'affiliate',
        category: categoryCode,
        merchantName: formatAdvertiserName(advertiserName),
      });
      navigateToOnlineOfferDetail(item);
    };
    return (
      <CashbackGridItem
        kicker={advertiserName}
        numberOfLines={1}
        testID={`online-offer-${item.id}`}
        title={title}
        imgSrc={
          imageUrl
            ? {
                uri: imageUrl,
              }
            : undefined
        }
        logoSrc={
          logoUrl
            ? {
                uri: logoUrl,
              }
            : undefined
        }
        onPress={onOfferPress}
        style={{ marginBottom: space.large }}
        subTitle={Intl.formatMessage({ id: 'benefits.cashback.onlineType' })}
        key={item.id}
      />
    );
  };

  return (
    <ProductGrid
      title={Intl.formatMessage({ id: 'benefits.cashback.featuredOffers' })}
      style={style}
      testID={`${testID}`}
      isLoading={isLoadingFeaturedOnlineOffers}
      onPress={onPress}
      renderItem={renderFeaturedOnlineOfferItem}
      renderItemSkeleton={() => <DefaultProductItemSkeleton />}
      products={featuredOnlineOffers}
    />
  );
};
