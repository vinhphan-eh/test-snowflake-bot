import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { capitalize } from '../../../../common/utils/string';
import type { InStoreOffer, OnlineOffer } from '../../../../new-graphql/generated';
import { OfferType } from '../../../../new-graphql/generated';
import { CategoryCodes } from '../../common/constants/benefits';
import { BenefitsCategoryTabs } from '../../common/containers/BenefitsCategoryTabs';
import { isOnlineOffer } from '../../common/utils/cashbackOffer';
import { CashbackSearchListView } from '../containers/CashbackSearchListView';
import type { CashbackNavigationProp, CashbackRouteProp } from '../navigation/navigationTypes';

export const CashbackSearchScreenV2 = () => {
  const route = useRoute<CashbackRouteProp<'CashbackSearchScreenV2'>>();

  const {
    defaultCategory = {
      code: CategoryCodes.All,
      name: capitalize(CategoryCodes.All),
    },
    offerType = OfferType.Online,
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

  const navigateToProductDetail = (item: OnlineOffer | InStoreOffer) => {
    if (isOnlineOffer(item)) {
      navigation.navigate('OnlineOfferDetail', { offer: item, offerId: item.id });
    } else {
      navigation.navigate('InstoreOfferDetail', { offer: item, offerId: item.id });
    }
  };

  return (
    <CashbackSearchListView
      categoryCode={selectedTab.key}
      categoryName={selectedTab.name}
      offerType={offerType}
      onItemPressed={navigateToProductDetail}
      query={searchQuery}
      renderTop={() => (
        <BenefitsCategoryTabs
          location="search online"
          onTabChange={(key, name) => {
            setSelectedTab({ key, name });
          }}
          tabKey={selectedTab.key}
        />
      )}
      setSearchQuery={setSearchQuery}
      testID={`${offerType.toLowerCase()}-search-screen`}
    />
  );
};
