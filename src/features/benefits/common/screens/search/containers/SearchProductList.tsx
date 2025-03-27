import React from 'react';
import type { ListRenderItem, ViewStyle } from 'react-native';
import { FlatList, StyleSheet } from 'react-native';
import { Box, useTheme } from '@hero-design/rn';
import { OutcomeTemplate } from '../../../../../../common/components/outcome-template/OutcomeTemplate';
import { navigateToBenefitsTopTabs } from '../../../../../../navigation/rootNavigation';
import type {
  Advertiser,
  BmOffer,
  InstoreOfferV2,
  OnlineOffer,
  SwagStoreOffer,
} from '../../../../../../new-graphql/generated';
import { OfferType } from '../../../../../../new-graphql/generated';
import { useIntl } from '../../../../../../providers/LocalisationProvider';
import { BillOffersCarousel } from '../../../../bill-streaming/components/BillOffersCarousel';
import { BillOfferSearchListView } from '../../../../bill-streaming/containers/BillOfferSearchListView';
import { CashbackSearchListView } from '../../../../cash-back/containers/CashbackSearchListView';
import { InStoreCashbackSearchListView } from '../../../../cash-back/containers/InStoreCashbackSearchListView';
import { InstoreCashbackOfferCarousel } from '../../../../cash-back/instore-offer/components/InstoreCashbackOfferCarousel';
import { OnlineCashbackOfferCarousel } from '../../../../cash-back/online-offer/components/OnlineCashbackOfferCarousel';
import { GiftCardsCarouselV2 } from '../../../../swag-store/components/GiftCardCarouselV2';
import { GiftCardsSearchListView } from '../../../../swag-store/containers/GiftCardsSearchListView';
import { prepareDataBeforeNavigateV2 } from '../../../../swag-store/shop/store/useDiscountShopStore';
import { DefaultProductItemSkeleton } from '../../../components/skeletons/DefaultProductItemSkeleton';
import type { SearchLocationContainerChildrenProps } from '../../../containers/SearchLocationContainer';
import { SearchLocationContainer } from '../../../containers/SearchLocationContainer';
import type { BenefitsTabKeysType } from '../../../hooks/useBenefitsTabs/constants';
import { useNearestLocation } from '../../../hooks/useNearestLocation';
import { useSearchAllProducts } from '../../../hooks/useSearchAllProducts';
import type { BenefitsScreenNavigationProp } from '../../../navigation/navigationTypes';
import { isOnlineOffer } from '../../../utils/cashbackOffer';

const DataKeys = {
  bills: 'bills',
  onlineCashback: 'online-cashback',
  instoreCashback: 'instore-cashback',
  giftcards: 'giftcards',
} as const;

type DataKeysType = (typeof DataKeys)[keyof typeof DataKeys];
type DataKeyWithPermission = {
  [K in DataKeysType]: {
    key: K;
    permission: boolean;
  };
}[DataKeysType];

export type SearchProductListProps = {
  query: string;
  categoryCode: string;
  categoryName: string;
  navigation: BenefitsScreenNavigationProp<'GeneralSearchScreen'>;
  fromTab?: BenefitsTabKeysType;
};
const LIMIT = 10;

const heightRatio = 112 / 178;

export const SearchProductListInner = (props: SearchProductListProps & SearchLocationContainerChildrenProps) => {
  const {
    allowDataToLoad,
    categoryCode,
    categoryName,
    fromTab,
    keyedAddress,
    navigation,
    openSearchLocationBottomSheet,
    query,
    setKeyedAddress,
  } = props;
  const { colors, space } = useTheme();
  const Intl = useIntl();

  const {
    billOffers,
    instoreCashbackAdvertisers,
    isError: isErrorProducts,
    isLoading,
    onlineCashbackOffers,
    shouldLoadBill,
    shouldLoadCashback,
    shouldLoadSwagStore,
    ssOffers,
  } = useSearchAllProducts({
    query,
    itemPerPage: LIMIT,
    categoryCode,
    latitude: keyedAddress.latitude,
    longitude: keyedAddress.longitude,
    allowDataToLoad,
  });

  const {
    isError: isErrorNearestLocation,
    isLoading: isLoadingNearestLocation,
    isNearestLocationEmptyAfterFetch,
    nearestLocation,
  } = useNearestLocation({
    keyedAddress,
    query,
    categoryCode,
    enabled:
      shouldLoadCashback &&
      fromTab !== 'benefits-online' &&
      !isLoading &&
      instoreCashbackAdvertisers?.length === 0 &&
      !isErrorProducts,
  });

  const isLoadingProducts = isLoading || !allowDataToLoad; // Show loading while waiting for permission

  // will turn on instore cashback later
  const showInstoreCashback =
    shouldLoadCashback &&
    fromTab !== 'benefits-online' &&
    !(isLoadingNearestLocation || isErrorNearestLocation || isNearestLocationEmptyAfterFetch);
  const showOnlineCashback = shouldLoadCashback && (onlineCashbackOffers.length > 0 || isLoadingProducts);
  const showBill = shouldLoadBill && (billOffers.length > 0 || isLoadingProducts);
  const showGiftCard = shouldLoadSwagStore && (ssOffers.length > 0 || isLoadingProducts);

  const bottomLineStyle: ViewStyle = {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: space.medium,
    borderBottomColor: colors.disabledOnDefaultGlobalSurface,
  };

  const data: DataKeyWithPermission[] = [
    ...(showBill ? [{ key: DataKeys.bills, permission: showBill }] : []),
    ...(showOnlineCashback ? [{ key: DataKeys.onlineCashback, permission: showOnlineCashback }] : []),
    ...(showInstoreCashback ? [{ key: DataKeys.instoreCashback, permission: showInstoreCashback }] : []),
    ...(showGiftCard ? [{ key: DataKeys.giftcards, permission: showGiftCard }] : []),
  ];

  const navigateToOnlineOfferDetail = (item: OnlineOffer) => {
    navigation.navigate('CashbackStack', {
      screen: 'OnlineOfferDetail',
      params: {
        offer: item,
        offerId: item.id,
      },
    });
  };

  const navigateToInstoreOfferDetail = (item: Advertiser) => {
    navigation.navigate('CashbackStack', {
      screen: 'InstoreOfferDetailV2',
      params: {
        advertiserId: item.advertiserId,
        offers: item.offers as InstoreOfferV2[],
      },
    });
  };

  const navigateToGiftCardDetail = (item: SwagStoreOffer) => {
    prepareDataBeforeNavigateV2(item, 'gift card search screen');
    navigation.navigate('DiscountShopStack', {
      screen: 'ProductDetail',
      params: {
        productCode: item.productCode,
      },
    });
  };

  const navigateToBillOfferDetail = (offer: BmOffer) => {
    navigation.navigate('BenefitsStack', {
      screen: 'BillStreamStack',
      params: {
        screen: 'BillOfferDetailScreen',
        params: {
          data: offer,
          onBackToBill: () => {
            navigateToBenefitsTopTabs('benefits-settings');
          },
        },
      },
    });
  };

  // Used to determine whether to render data as a vertical list when only one data type is available
  const hasOnlyBill =
    showBill && !showOnlineCashback && !(showInstoreCashback && instoreCashbackAdvertisers.length > 0) && !showGiftCard;
  const hasOnlyOnlineCashback =
    showOnlineCashback && !showBill && !(showInstoreCashback && instoreCashbackAdvertisers.length > 0) && !showGiftCard;
  const hasOnlyInstoreCashback =
    showInstoreCashback && instoreCashbackAdvertisers.length > 0 && !showBill && !showOnlineCashback && !showGiftCard;
  const hasOnlyGiftCard =
    showGiftCard && !showBill && !showOnlineCashback && !(showInstoreCashback && instoreCashbackAdvertisers.length > 0);

  const isOnlyOneDataType = hasOnlyBill || hasOnlyOnlineCashback || hasOnlyInstoreCashback || hasOnlyGiftCard;

  if (isLoadingProducts) {
    return (
      <Box
        testID="products-list"
        flex={1}
        padding="medium"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <DefaultProductItemSkeleton heightRatio={heightRatio} />
        <DefaultProductItemSkeleton heightRatio={heightRatio} />
        <DefaultProductItemSkeleton heightRatio={heightRatio} />
        <DefaultProductItemSkeleton heightRatio={heightRatio} />
        <DefaultProductItemSkeleton heightRatio={heightRatio} />
        <DefaultProductItemSkeleton heightRatio={heightRatio} />
      </Box>
    );
  }

  if (!isLoadingProducts && !isLoadingNearestLocation && isOnlyOneDataType) {
    switch (true) {
      case hasOnlyBill:
        return (
          <BillOfferSearchListView
            initData={billOffers}
            onItemPressed={navigateToBillOfferDetail}
            query={query}
            testID="vertical-bill-product-list"
            isShowNavBar={false}
            isShowSearchBar={false}
            categoryCode={categoryCode}
            categoryName={categoryName}
          />
        );
      case hasOnlyOnlineCashback:
        return (
          <CashbackSearchListView
            categoryCode={categoryCode}
            categoryName={categoryName}
            initData={onlineCashbackOffers}
            offerType={OfferType.Online}
            onItemPressed={item => {
              if (isOnlineOffer(item)) {
                navigateToOnlineOfferDetail(item);
              }
            }}
            query={query}
            testID="vertical-online-product-list"
            isShowNavBar={false}
            isShowSearchBar={false}
          />
        );
      case hasOnlyInstoreCashback:
        return (
          <InStoreCashbackSearchListView
            categoryCode={categoryCode}
            categoryName={categoryName}
            initData={instoreCashbackAdvertisers}
            onItemPressed={navigateToInstoreOfferDetail}
            query={query}
            testID="vertical-instore-product-list"
            isShowNavBar={false}
            isShowSearchBar={false}
            setKeyedAddress={setKeyedAddress}
            keyedAddress={keyedAddress}
            allowDataToLoad={allowDataToLoad}
            openSearchLocationBottomSheet={openSearchLocationBottomSheet}
          />
        );
      case hasOnlyGiftCard:
        return (
          <GiftCardsSearchListView
            initData={ssOffers}
            onItemPressed={navigateToGiftCardDetail}
            query={query}
            testID="vertical-giftcard-product-list"
            isShowNavBar={false}
            isShowSearchBar={false}
          />
        );
      default:
        break;
    }
  }

  const renderItem: ListRenderItem<DataKeyWithPermission> = ({ index, item }) => {
    const isLastIndex = index === data.length - 1;
    const { key, permission } = item;
    if (!permission) {
      return null;
    }
    switch (key) {
      case DataKeys.bills:
        return (
          <BillOffersCarousel
            testID="bill-carousel"
            style={{
              marginTop: space.medium,
              ...(isLastIndex ? {} : bottomLineStyle),
            }}
            onPress={() => {
              navigation.navigate('BillStreamStack', {
                screen: 'BillOfferSearchScreen',
                params: {
                  query,
                  defaultCategory: {
                    code: categoryCode,
                    name: categoryName,
                  },
                },
              });
            }}
            billOffers={billOffers}
            isLoading={isLoadingProducts}
            isError={isErrorProducts}
          />
        );
      case DataKeys.onlineCashback:
        return (
          <OnlineCashbackOfferCarousel
            testID="online-cashback-carousel"
            style={{
              marginTop: space.medium,
              ...(isLastIndex ? {} : bottomLineStyle),
            }}
            onPress={() => {
              navigation.navigate('CashbackStack', {
                screen: 'CashbackSearchScreenV2',
                params: {
                  defaultCategory: {
                    code: categoryCode,
                    name: categoryName,
                  },
                  offerType: OfferType.Online,
                  query,
                },
              });
            }}
            isLoading={isLoadingProducts}
            offers={onlineCashbackOffers}
            isError={isErrorProducts}
            onNavigateToDetail={navigateToOnlineOfferDetail}
          />
        );
      case DataKeys.instoreCashback:
        return (
          <InstoreCashbackOfferCarousel
            testID="instore-cashback-carousel"
            style={{
              marginTop: space.medium,
              ...(isLastIndex ? {} : bottomLineStyle),
            }}
            onPress={() => {
              navigation.navigate('CashbackStack', {
                screen: 'InStoreCashbackSearchScreen',
                params: {
                  defaultCategory: {
                    code: categoryCode,
                    name: categoryName,
                  },
                  query,
                },
              });
            }}
            isLoading={isLoadingProducts}
            advertisers={instoreCashbackAdvertisers}
            isError={isErrorProducts}
            onNavigateToDetail={navigateToInstoreOfferDetail}
            keyedAddress={keyedAddress}
            setKeyedAddress={setKeyedAddress}
            openSearchLocationBottomSheet={openSearchLocationBottomSheet}
            nearestLocation={nearestLocation}
          />
        );
      case DataKeys.giftcards:
        return (
          <GiftCardsCarouselV2
            testID="giftcard-carousel"
            style={{ marginTop: space.medium, ...(isLastIndex ? {} : bottomLineStyle) }}
            onPress={() => {
              navigation.navigate('SwagStoreStack', {
                screen: 'GiftCardsSearchScreen',
                params: {
                  query,
                },
              });
            }}
            onNavigateToProductDetail={navigateToGiftCardDetail}
            location="search all products screen"
            isLoading={isLoadingProducts}
            isError={isErrorProducts}
            giftCards={ssOffers}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FlatList
      testID="products-list"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      keyExtractor={item => item.key}
      data={data}
      ListEmptyComponent={() => (
        <OutcomeTemplate
          bodyStyle={{ justifyContent: 'flex-start' }}
          title={Intl.formatMessage({ id: 'benefits.error.noResults' })}
          content={Intl.formatMessage({ id: 'benefits.error.pleaseAdjustYourSearch' })}
          imageName="goggles"
          backgroundColor="defaultGlobalSurface"
        />
      )}
      // tricky hack to add padding bottom, padding bottom at container level doesn't work in this case
      ListFooterComponent={() => <Box style={{ height: space.large, width: 1 }} />}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: colors.defaultGlobalSurface }}
    />
  );
};

export const SearchProductList = (props: SearchProductListProps) => (
  <SearchLocationContainer>
    {childrenProps => <SearchProductListInner {...props} {...childrenProps} />}
  </SearchLocationContainer>
);
