import React, { useState } from 'react';
import { useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsAccountAU } from '../../../../common/hooks/useIsAccountAU';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import type { SwagStoreOffer } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { BillOffersCarouselCon } from '../../bill-streaming/containers/BillOfferCarouselCon';
import { useBillPromotionPermission } from '../../bill-streaming/hooks/useBillPromotionPermission';
import { FeaturedOnlineOffersGrid } from '../../cash-back/containers/FeaturedOnlineOffersGrid';
import { ShopByCategories } from '../../cash-back/containers/ShopByCategories';
import { GroupList } from '../../group/components/group-list';
import { GiftCardsCarouselCon } from '../../swag-store/containers/GiftCardCarouselCon';
import { GiftCardsSearchListView } from '../../swag-store/containers/GiftCardsSearchListView';
import { prepareDataBeforeNavigateV2 } from '../../swag-store/shop/store/useDiscountShopStore';
import { IdleSearchBox } from '../components/IdleSearchBox';
import { WaitlistSignupCaro2 } from '../components/WaitlistSignupCaro2';
import { useBenefitsTracking } from '../hooks/useBenefitsTracking';

export const OnlineOffersTab = () => {
  const { colors, space } = useTheme();
  const { trackClickOnCategoryShortcut, trackClickOnFeaturedOffersSection, trackClickOnSearchBar } =
    useBenefitsTracking();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { formatMessage } = useIntl();
  const { havingPermission: isPromotion } = useBillPromotionPermission();
  const [searchQuery, setSearchQuery] = useState('');
  const isAU = useIsAccountAU();

  const navigateToFeatureOffersSearchScreen = () => {
    trackClickOnFeaturedOffersSection('benefits-online');
    navigation.navigate('BenefitsStack', {
      screen: 'CashbackStack',
      params: {
        screen: 'FeaturedOffersSearchScreen',
      },
    });
  };

  const navigateToGiftCardsSearchScreen = () => {
    navigation.navigate('BenefitsStack', {
      screen: 'SwagStoreStack',
      params: {
        screen: 'GiftCardsSearchScreen',
      },
    });
  };

  const navigateToGiftCardDetail = (item: SwagStoreOffer) => {
    prepareDataBeforeNavigateV2(item, 'gift card grid online tab');
    navigation.navigate('BenefitsStack', {
      screen: 'DiscountShopStack',
      params: {
        screen: 'ProductDetail',
        params: {
          productCode: item.productCode,
        },
      },
    });
  };

  const renderAUContent = () => (
    <ScrollView
      testID="online-tab-v2"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottomInset || space.medium, paddingHorizontal: space.medium }}
      style={{ flex: 1, backgroundColor: colors.neutralGlobalSurface }}
    >
      <IdleSearchBox
        style={{ marginHorizontal: 0, marginTop: space.large }}
        placeholder={formatMessage(
          { id: 'benefits.cashback.searchOffers' },
          {
            offerType: ' online ',
          }
        )}
        onPress={() => {
          trackClickOnSearchBar('benefits-online');
          navigation.navigate('BenefitsStack', {
            screen: 'GeneralSearchScreen',
            params: {
              fromTab: 'benefits-online',
            },
          });
        }}
      />
      <ShopByCategories
        hideTitle
        onItemPress={category => {
          trackClickOnCategoryShortcut({
            location: 'benefits-online',
            selectedCategory: category.name.toLowerCase(),
          });
          navigation.navigate('BenefitsStack', {
            screen: 'GeneralSearchScreen',
            params: {
              defaultCategory: {
                code: category.categoryCode,
                name: category.name,
              },
              fromTab: 'benefits-online',
            },
          });
        }}
        testID="shop-by-category-container"
        style={{ marginHorizontal: -space.medium, marginTop: space.large }}
      />
      {/* TODO: update onpress */}
      {isPromotion ? (
        <WaitlistSignupCaro2 style={{ marginHorizontal: -space.medium, marginTop: space.large }} />
      ) : (
        <BillOffersCarouselCon
          testID="bill-carousel"
          onPress={() => {
            navigation.navigate('BenefitsStack', {
              screen: 'BillStreamStack',
              params: {
                screen: 'BillOfferSearchScreen',
              },
            });
          }}
          style={{ marginHorizontal: -space.medium, marginTop: space.large }}
        />
      )}
      {/* the list only displays at most 6 items, however, the API does not support pagination yet // so we have to limit
      the number of items to 6 here */}
      <FeaturedOnlineOffersGrid
        style={{ marginTop: space.large }}
        numberOfItems={6}
        onPress={navigateToFeatureOffersSearchScreen}
        testID="featured-offers"
      />
      <GroupList
        style={{
          paddingVertical: space.medium,
          marginHorizontal: -space.medium,
          backgroundColor: colors.decorativePrimarySurface,
        }}
        title={formatMessage({ id: 'megadeal.group.list.onlineTitle' })}
      />
      <GiftCardsCarouselCon
        style={{ marginHorizontal: -space.medium, marginTop: space.large }}
        location="gift card carousel online tab"
        onPress={navigateToGiftCardsSearchScreen}
        testID="gift-cards"
      />
    </ScrollView>
  );

  const renderUKAndNZContent = () => (
    <GiftCardsSearchListView
      onItemPressed={navigateToGiftCardDetail}
      query={searchQuery}
      setSearchQuery={setSearchQuery}
      testID="online-tab-giftcard-search"
      isShowBackIcon={false}
      isShowNavBar={false}
      style={{ paddingTop: space.large }}
    />
  );

  return isAU ? renderAUContent() : renderUKAndNZContent();
};
