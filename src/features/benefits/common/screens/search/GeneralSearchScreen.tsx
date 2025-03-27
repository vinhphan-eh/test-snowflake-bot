import React, { useState } from 'react';
import { Box, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import debounce from 'lodash.debounce';
import { SearchProductList } from './containers/SearchProductList';
import { CustomStatusBar } from '../../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../../common/components/touch-dismiss-keyboard';
import { capitalize } from '../../../../../common/utils/string';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { SearchOfferCon } from '../../../cash-back/containers/SearchOfferCon';
import { CategoryCodes } from '../../constants/benefits';
import { BenefitsCategoryTabs } from '../../containers/BenefitsCategoryTabs';
import { useBenefitsTracking } from '../../hooks/useBenefitsTracking';
import type { BenefitsScreenNavigationProp, BenefitsScreenRouteProp } from '../../navigation/navigationTypes';

export const GeneralSearchScreen = () => {
  const { colors } = useTheme();
  const route = useRoute<BenefitsScreenRouteProp<'GeneralSearchScreen'>>();
  const {
    defaultCategory = {
      code: CategoryCodes.All,
      name: capitalize(CategoryCodes.All),
    },
    fromTab,
  } = route?.params ?? {};
  const [selectedTab, setSelectedTab] = useState<{
    key: string;
    name: string;
  }>({
    key: defaultCategory.code,
    name: defaultCategory.name,
  });
  const navigation = useNavigation<BenefitsScreenNavigationProp<'GeneralSearchScreen'>>();
  const [searchQuery, setSearchQuery] = useState('');
  const { trackTypeAndSearch } = useBenefitsTracking();
  const Intl = useIntl();

  const placeholder = Intl.formatMessage(
    { id: 'benefits.cashback.searchOffers' },
    {
      offerType: ` ${selectedTab.name.toLowerCase()} `,
    }
  );
  const onChangeText = debounce((text: string) => {
    trackTypeAndSearch({
      query: text,
      selectedCategory: selectedTab.name.toLowerCase(),
      location: 'search all',
    });
    setSearchQuery(text);
  }, 500);

  return (
    <>
      <CustomStatusBar backgroundColor={colors.defaultGlobalSurface} />
      <Box paddingTop="small" backgroundColor="defaultGlobalSurface">
        <SearchOfferCon
          location="search all"
          placeHolder={placeholder}
          onChangeText={onChangeText}
          isShowCategoryFilter={false}
          onGoBack={navigation.goBack}
        />
      </Box>
      <BenefitsCategoryTabs
        location="search all"
        onTabChange={(key, name) => setSelectedTab({ key, name })}
        tabKey={selectedTab.key}
      />
      <TouchOutsideDismissKeyboard>
        <SearchProductList
          fromTab={fromTab}
          query={searchQuery}
          categoryCode={selectedTab.key}
          categoryName={selectedTab.name}
          navigation={navigation}
        />
      </TouchOutsideDismissKeyboard>
    </>
  );
};
