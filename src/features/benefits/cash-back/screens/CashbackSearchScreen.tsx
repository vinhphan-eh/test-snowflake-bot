import React, { useState } from 'react';
import { Box, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import debounce from 'lodash.debounce';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import type {
  InStoreOffer,
  Advertiser,
  Category,
  OnlineOffer,
  InstoreOfferV2,
} from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { isOnlineOffer } from '../../common/utils/cashbackOffer';
import { OfferListView } from '../containers/OfferListView';
import { PartialMapListViewV2 } from '../containers/PartialMapListViewV2';
import { SearchOfferCon } from '../containers/SearchOfferCon';
import { SelectSearchType } from '../containers/SelectSearchType';
import { useCashbackTracking } from '../hooks/useCashbackTracking';
import type { CashbackNavigationProp, CashbackRouteProp } from '../navigation/navigationTypes';
import type { CashbackSearchType } from '../types';

export const CashbackSearchScreen = () => {
  const { colors, space } = useTheme();
  const Intl = useIntl();
  const navigation = useNavigation<CashbackNavigationProp<'CashbackSearch'>>();
  const route = useRoute<CashbackRouteProp<'CashbackSearch'>>();
  const { selectedCategory, selectedSearchType } = route?.params ?? {
    selectedSearchType: undefined,
    selectedCategory: undefined,
  };
  const [categoryFilter, setCategoryFilter] = useState<Category | undefined>(selectedCategory);
  const [selectedType, setSelectedType] = useState<CashbackSearchType>(selectedSearchType);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { trackClickOnCashbackCategory, trackTypeInSearchCashbackOffer } = useCashbackTracking();

  const selectSearchType = (type: CashbackSearchType) => {
    if (selectedType === type) {
      setSelectedType(undefined);
    } else {
      setSelectedType(type);
    }
  };

  const onSelectionCategoryFilter = (option: Category) => {
    trackClickOnCashbackCategory(option);
    setCategoryFilter(option);
  };

  const onGoToOnlineDetail = (offer: OnlineOffer) => {
    navigation.navigate('OnlineOfferDetail', {
      offerId: offer.id,
      offer,
    });
  };

  const onGoToInstoreDetailV2 = (advertiser: Advertiser) => {
    navigation.navigate('BenefitsStack', {
      screen: 'CashbackStack',
      params: {
        screen: 'InstoreOfferDetailV2',
        params: { offers: advertiser.offers as InstoreOfferV2[], advertiserId: advertiser.advertiserId },
      },
    });
  };

  const onListItemPress = (offer: OnlineOffer | InStoreOffer) => {
    if (isOnlineOffer(offer)) {
      onGoToOnlineDetail(offer);
    }
  };

  const searchBarPlaceholder = categoryFilter
    ? `Search ${categoryFilter.name}`
    : Intl.formatMessage(
        { id: 'benefits.cashback.searchOffers' },
        {
          offerType: selectedType ? ` ${selectedType === 'instore' ? 'in-store' : 'online'} ` : ' ',
        }
      );

  const onChangeText = debounce((text: string) => {
    trackTypeInSearchCashbackOffer({ searchQuery: text, selectedType, categoryFilter });
    setSearchQuery(text);
  }, 500);

  return (
    <>
      <CustomStatusBar backgroundColor={colors.defaultGlobalSurface} />
      <TouchOutsideDismissKeyboard>
        <Box flex={1} backgroundColor="defaultGlobalSurface">
          <SearchOfferCon
            location={selectedType === 'instore' ? 'search instore' : 'search online'}
            onChangeText={onChangeText}
            placeHolder={searchBarPlaceholder}
            onGoBack={navigation.goBack}
            selectedCategory={categoryFilter?.categoryCode ?? ''}
            onSelectionChange={onSelectionCategoryFilter}
            onClearFilter={() => setCategoryFilter(undefined)}
          />
          <SelectSearchType selectedType={selectedType} onSelect={selectSearchType} />
          {selectedType === 'instore' ? (
            <PartialMapListViewV2
              testID="partial-map-list-view"
              searchQuery={searchQuery}
              categoryFilter={categoryFilter}
              style={{ flex: 1, marginTop: space.medium }}
              onGoToInstoreDetail={onGoToInstoreDetailV2}
            />
          ) : (
            <OfferListView
              searchQuery={searchQuery}
              categoryFilter={categoryFilter}
              testID="list-view"
              style={{ marginTop: space.medium }}
              onItemPress={onListItemPress}
              selectedType={selectedType}
            />
          )}
        </Box>
      </TouchOutsideDismissKeyboard>
    </>
  );
};
