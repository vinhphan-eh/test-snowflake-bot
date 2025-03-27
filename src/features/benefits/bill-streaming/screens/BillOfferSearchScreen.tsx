import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { capitalize } from '../../../../common/utils/string';
import { navigateToBenefitsTopTabs } from '../../../../navigation/rootNavigation';
import type { BmOffer } from '../../../../new-graphql/generated';
import { CategoryCodes } from '../../common/constants/benefits';
import { BenefitsCategoryTabs } from '../../common/containers/BenefitsCategoryTabs';
import { BillOfferSearchListView } from '../containers/BillOfferSearchListView';
import type { BillStreamNavigationProp, BillStreamRouteProp } from '../navigation/navigationTypes';

export const BillOfferSearchScreen = () => {
  const route = useRoute<BillStreamRouteProp<'BillOfferSearchScreen'>>();
  const {
    defaultCategory = {
      code: CategoryCodes.All,
      name: capitalize(CategoryCodes.All),
    },
    query = '',
  } = route?.params ?? {};

  const [selectedTab, setSelectedTab] = useState<{
    key: string;
    name: string;
  }>({
    key: defaultCategory?.code,
    name: defaultCategory?.name,
  });

  const navigation = useNavigation<BillStreamNavigationProp<'BillOfferSearchScreen'>>();
  const [searchQuery, setSearchQuery] = useState(query);

  const navigateToProductDetail = (item: BmOffer) => {
    navigation.navigate('BillOfferDetailScreen', {
      data: item,
      onBackToBill: () => {
        navigateToBenefitsTopTabs('benefits-settings');
      },
    });
  };

  return (
    <BillOfferSearchListView
      categoryCode={selectedTab.key}
      categoryName={selectedTab.name}
      onItemPressed={navigateToProductDetail}
      query={searchQuery}
      setSearchQuery={setSearchQuery}
      renderTop={() => (
        <BenefitsCategoryTabs
          location="search online offers"
          onTabChange={(key, name) => setSelectedTab({ key, name })}
          tabKey={selectedTab.key}
        />
      )}
      testID="bill-search-screen"
    />
  );
};
