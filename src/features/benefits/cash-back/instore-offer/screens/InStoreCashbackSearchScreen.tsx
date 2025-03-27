import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { capitalize } from '../../../../../common/utils/string';
import type { Advertiser, InstoreOfferV2 } from '../../../../../new-graphql/generated';
import { CategoryCodes } from '../../../common/constants/benefits';
import { BenefitsCategoryTabs } from '../../../common/containers/BenefitsCategoryTabs';
import {
  SearchLocationContainer,
  type SearchLocationContainerChildrenProps,
} from '../../../common/containers/SearchLocationContainer';
import { InStoreCashbackSearchListView } from '../../containers/InStoreCashbackSearchListView';
import type { CashbackNavigationProp, CashbackRouteProp } from '../../navigation/navigationTypes';

export const InStoreCashbackSearchScreenInner = (props: SearchLocationContainerChildrenProps) => {
  const route = useRoute<CashbackRouteProp<'CashbackSearchScreenV2'>>();

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
  const navigation = useNavigation<CashbackNavigationProp<'CashbackSearchScreenV2'>>();
  const [searchQuery, setSearchQuery] = useState(query);

  const navigateToProductDetail = (item: Advertiser) => {
    navigation.navigate('InstoreOfferDetailV2', {
      advertiserId: item.advertiserId,
      offers: item.offers as InstoreOfferV2[],
    });
  };

  return (
    <InStoreCashbackSearchListView
      categoryCode={selectedTab.key}
      categoryName={selectedTab.name}
      onItemPressed={navigateToProductDetail}
      query={searchQuery}
      renderTop={() => (
        <BenefitsCategoryTabs
          location="search instore"
          onTabChange={(key, name) => setSelectedTab({ key, name })}
          tabKey={selectedTab.key}
        />
      )}
      setSearchQuery={setSearchQuery}
      testID="instore-cashback-search-screen"
      {...props}
    />
  );
};

export const InStoreCashbackSearchScreen = () => {
  return (
    <SearchLocationContainer>
      {childProps => <InStoreCashbackSearchScreenInner {...childProps} />}
    </SearchLocationContainer>
  );
};
