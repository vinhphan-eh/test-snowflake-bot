import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash.debounce';
import TouchOutsideDismissKeyboard from '../../../../../common/components/touch-dismiss-keyboard';
import { BenefitsTabKeys } from '../../../../../common/constants/navigation';
import { useLoadLocationByPostcode } from '../../../../../common/hooks/useLoadLocationByPostcode';
import type { DeeplinkParamsList } from '../../../../../common/stores/useDeeplinkStore';
import type { RootStackNavigationProp } from '../../../../../navigation/navigationTypes';
import type { Advertiser, Category, InstoreOfferV2 } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { CategoryCodes } from '../../../common/constants/benefits';
import { useCallbackOnDeeplink } from '../../../common/hooks/useCallbackOnDeeplink';
import { usePreventLazyLoad } from '../../../common/hooks/usePreventLazyLoad';
import { PartialMapListViewV2 } from '../../containers/PartialMapListViewV2';
import { SearchOfferCon } from '../../containers/SearchOfferCon';
import { useCashbackTracking } from '../../hooks/useCashbackTracking';
import { setDefaultSearchQuery, useInstoreTabStore } from '../hooks/useInstoreTabStore';

export const InstoreScreen = () => {
  const { space } = useTheme();
  const Intl = useIntl();

  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const [categoryFilter, setCategoryFilter] = useState<Category | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { trackClickOnCashbackCategory, trackTypeInSearchCashbackOffer } = useCashbackTracking();
  const { shouldUseFakeScreen } = usePreventLazyLoad(BenefitsTabKeys.INSTORE);
  const [postcode, setPostcode] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const defaultSearchQuery = useInstoreTabStore(state => state.defaultSearchQuery);

  useLoadLocationByPostcode(postcode, region);
  useCallbackOnDeeplink({
    isLoading: false,
    callback: async (params: DeeplinkParamsList['cashback-instore-offer']) => {
      setPostcode(params.postcode ?? '');
      setRegion(params.region ?? '');
    },
    deeplinkType: 'cashback-instore-offer',
  });

  useEffect(() => {
    if (defaultSearchQuery) {
      setSearchQuery(defaultSearchQuery.query);
      if (defaultSearchQuery.categoryCode === CategoryCodes.All) {
        setCategoryFilter(undefined);
      } else {
        setCategoryFilter({
          categoryCode: defaultSearchQuery.categoryCode,
          name: defaultSearchQuery.categoryName,
          imageUrl: '',
        });
      }

      setDefaultSearchQuery(undefined);
    }
  }, [defaultSearchQuery]);

  const onSelectionCategoryFilter = (option: Category) => {
    trackClickOnCashbackCategory(option);
    setCategoryFilter(option);
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

  const searchBarPlaceholder = categoryFilter
    ? `Search ${categoryFilter.name}`
    : Intl.formatMessage(
        { id: 'benefits.cashback.searchOffers' },
        {
          offerType: ' ',
        }
      );

  const onChangeText = debounce((text: string) => {
    trackTypeInSearchCashbackOffer({ searchQuery: text, selectedType: 'instore', categoryFilter });
    setSearchQuery(text);
  }, 500);

  if (shouldUseFakeScreen) {
    return null;
  }

  return (
    <TouchOutsideDismissKeyboard>
      <Box flex={1} backgroundColor="defaultGlobalSurface" paddingTop="smallMedium" testID="instore-tab">
        <SearchOfferCon
          location="instore tab"
          defaultValue={searchQuery}
          onChangeText={onChangeText}
          placeHolder={searchBarPlaceholder}
          selectedCategory={categoryFilter?.categoryCode ?? ''}
          onSelectionChange={onSelectionCategoryFilter}
          onClearFilter={() => setCategoryFilter(undefined)}
        />
        <PartialMapListViewV2
          testID="partial-map-list-view"
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          style={{ flex: 1, marginTop: space.medium }}
          onGoToInstoreDetail={onGoToInstoreDetailV2}
        />
      </Box>
    </TouchOutsideDismissKeyboard>
  );
};
