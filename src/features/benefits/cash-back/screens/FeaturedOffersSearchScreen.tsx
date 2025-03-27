import React from 'react';
import type { ListRenderItem } from 'react-native';
import { useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { OnlineOffer } from '../../../../new-graphql/generated';
import { useInfiniteGetFeaturedOffersQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { ProductSearchTemplate } from '../../common/containers/ProductSearchTemplate';
import { CashbackGridItem } from '../components/CashbackGridItem';
import { useCashbackTracking } from '../hooks/useCashbackTracking';
import type { CashbackNavigationProp } from '../navigation/navigationTypes';
import { formatAdvertiserName } from '../utils/offer';

const ITEM_PER_PAGE = 10;

export const FeaturedOffersSearchScreen = () => {
  const { colors, space } = useTheme();
  const { formatMessage } = useIntl();
  const { trackClickOnFeaturedOfferInListingPage } = useCashbackTracking();

  const navigation = useNavigation<CashbackNavigationProp<'FeaturedOffersSearchScreen'>>();

  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage, isLoading } =
    useInfiniteGetFeaturedOffersQuery(
      {
        input: {
          first: ITEM_PER_PAGE,
        },
      },
      {
        cacheTime: 0,
        getNextPageParam: previousPage => {
          const { pageInfo } = previousPage.me?.cashback?.featuresOffers || {
            pageInfo: {
              hasNextPage: false,
              endCursor: null,
            },
          };
          if (pageInfo.hasNextPage) {
            return {
              input: {
                first: ITEM_PER_PAGE,
                after: pageInfo.endCursor,
              },
            };
          }
          return undefined;
        },
      }
    );
  const offers = (data?.pages?.flatMap(page => page.me?.cashback?.featuresOffers.edges).map(e => e?.node) ??
    []) as Array<OnlineOffer>;

  const onEndReached = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  const navigateToOnlineOfferDetail = (offer: OnlineOffer) => {
    navigation.navigate('BenefitsStack', {
      screen: 'CashbackStack',
      params: { screen: 'OnlineOfferDetail', params: { offerId: offer.id, offer } },
    });
  };
  const renderFeaturedOnlineOfferItem: ListRenderItem<OnlineOffer> = ({ item }) => {
    const { advertiserName, categoryCode, imageUrl, isCardLinkedOffer, logoUrl, title } = item;
    const onOfferPress = () => {
      trackClickOnFeaturedOfferInListingPage({
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
        subTitle={formatMessage({ id: 'benefits.cashback.onlineType' })}
      />
    );
  };

  return (
    <ProductSearchTemplate<OnlineOffer>
      location="search featured offer"
      testID="featured-offers-search-screen"
      keyExtractor={item => item.id}
      style={{ backgroundColor: colors.defaultGlobalSurface }}
      onChangeText={() => {}}
      title={formatMessage({ id: 'benefits.cashback.featuredOffers' })}
      placeholder={formatMessage({ id: 'benefits.cashback.searchOffers' }, { offerType: ' featured ' })}
      products={offers}
      isLoading={isLoading}
      renderItem={renderFeaturedOnlineOfferItem}
      isShowSearchBar={false}
      onEndReached={onEndReached}
      isFetchingNextPage={isFetchingNextPage}
      isError={isError}
    />
  );
};
