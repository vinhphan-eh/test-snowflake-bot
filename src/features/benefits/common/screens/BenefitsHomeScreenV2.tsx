import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { navigateToBenefitsTopTabs } from '../../../../navigation/rootNavigation';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { NearbyOfferTile } from '../../cash-back/containers/NearbyOfferTile';
import { GroupList } from '../../group/components/group-list';
import { BuyAgainCarousel } from '../../swag-store/components/BuyAgainCarousel';
import { BillPromoteEntryPoint } from '../components/BillPromoteEntryPoint';
import { IdleSearchBox } from '../components/IdleSearchBox';
import { BalanceTilesCon } from '../containers/BalanceTilesCon';
import { BenefitsCategoriesCTA } from '../containers/BenefitsCategoriesCTA';
import { PromoteFeatureWidgets } from '../containers/PromoteFeatureWidgets';
import { useBenefitsTracking } from '../hooks/useBenefitsTracking';
import { useIsBenefitsNewUser } from '../hooks/useIsBenefitsNewUser';

export const BenefitsHomeScreenV2 = () => {
  const { colors, space } = useTheme();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const Intl = useIntl();
  const { trackClickOnCategoryShortcut, trackClickOnMapViewHomePage, trackClickOnSearchBar, trackVisitHomePage } =
    useBenefitsTracking();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { isNewUser } = useIsBenefitsNewUser();

  useEffect(() => {
    trackVisitHomePage();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: bottomInset || space.medium }}
      style={{ flexGrow: 1, backgroundColor: colors.neutralGlobalSurface }}
      testID="benefits-home-screen-v2"
    >
      <IdleSearchBox
        style={{ marginTop: space.large }}
        onPress={() => {
          trackClickOnSearchBar('benefits-home');
          navigation.navigate('BenefitsStack', {
            screen: 'GeneralSearchScreen',
          });
        }}
        placeholder={Intl.formatMessage(
          { id: 'benefits.cashback.searchOffers' },
          {
            offerType: ' ',
          }
        )}
      />
      <BalanceTilesCon />
      <BenefitsCategoriesCTA
        testID="benefits-categories-cta"
        style={{ marginTop: space.large }}
        onItemPress={item => {
          trackClickOnCategoryShortcut({
            location: 'benefits-home',
            selectedCategory: item.name.toLowerCase(),
          });
          navigation.navigate('BenefitsStack', {
            screen: 'GeneralSearchScreen',
            params: {
              defaultCategory: {
                code: item.categoryCode,
                name: item.name,
              },
            },
          });
        }}
      />
      <PromoteFeatureWidgets contentContainerStyle={{ paddingHorizontal: space.medium, marginBottom: space.xxlarge }} />
      <BillPromoteEntryPoint testID="bill-promoted-entry-point" />
      <GroupList
        style={{ paddingVertical: space.medium, backgroundColor: colors.decorativePrimarySurface }}
        title={Intl.formatMessage({ id: 'megadeal.group.joinCommunityAskingForDeal' })}
      />
      {!isNewUser && (
        <NearbyOfferTile
          testID="nearby-offer-tile"
          onShopNowPress={() => {
            trackClickOnMapViewHomePage();
            navigateToBenefitsTopTabs('benefits-instore');
          }}
          style={{ marginLeft: space.medium, marginTop: space.large }}
        />
      )}
      {!isNewUser && <BuyAgainCarousel style={{ marginTop: space.large }} location="buy again carousel home tab" />}
    </ScrollView>
  );
};
