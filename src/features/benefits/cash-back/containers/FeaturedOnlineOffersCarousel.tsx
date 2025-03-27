import React from 'react';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import type { OnlineOffer } from '../../../../new-graphql/generated';
import { useGetFeaturedOffersQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { ProductCarousel } from '../../common/components/ProductCarousel';
import { DefaultProductItemSkeleton } from '../../common/components/skeletons/DefaultProductItemSkeleton';
import { useCashbackPermission } from '../../common/hooks/useCashbackPermission';
import { CashbackGridItem } from '../components/CashbackGridItem';
import { useCashbackTracking } from '../hooks/useCashbackTracking';
import { formatAdvertiserName } from '../utils/offer';

type FeatureOnlineOffersCarouselProps = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  testID?: string;
  numberOfItems?: number;
};

export const FeaturedOnlineOffersCarousel = ({
  numberOfItems,
  onPress,
  style,
  testID,
}: FeatureOnlineOffersCarouselProps) => {
  const Intl = useIntl();
  const { space } = useTheme();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { trackClickOnFeaturedOfferInCarousel } = useCashbackTracking();
  const { permission } = useCashbackPermission();
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
  const renderFeaturedOnlineOfferItem: ListRenderItem<OnlineOffer> = ({ index, item }) => {
    const isLastIndex = index === featuredOnlineOffers.length - 1;
    const { advertiserName, categoryCode, imageUrl, isCardLinkedOffer, logoUrl, title } = item;
    const onOfferPress = () => {
      trackClickOnFeaturedOfferInCarousel({
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
        style={{ marginRight: isLastIndex ? 0 : space.smallMedium }}
        subTitle={Intl.formatMessage({ id: 'benefits.cashback.onlineType' })}
        key={item.id}
      />
    );
  };

  return (
    <ProductCarousel
      keyExtractor={item => item.id}
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
