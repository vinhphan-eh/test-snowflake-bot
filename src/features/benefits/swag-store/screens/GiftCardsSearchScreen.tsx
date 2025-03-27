import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { SwagStoreOffer } from '../../../../new-graphql/generated';
import { GiftCardsSearchListView } from '../containers/GiftCardsSearchListView';
import type { SwagStoreNavigationProp, SwagStoreRouteProp } from '../navigation/navigationTypes';
import { prepareDataBeforeNavigateV2 } from '../shop/store/useDiscountShopStore';

export const GiftCardsSearchScreen = () => {
  const route = useRoute<SwagStoreRouteProp<'GiftCardsSearchScreen'>>();
  const { query = '' } = route?.params ?? {};

  const navigation = useNavigation<SwagStoreNavigationProp<'GiftCardsSearchScreen'>>();
  const [searchQuery, setSearchQuery] = useState(query);

  const navigateToProductDetail = (item: SwagStoreOffer) => {
    prepareDataBeforeNavigateV2(item, 'gift card search screen');

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

  return (
    <GiftCardsSearchListView
      onItemPressed={navigateToProductDetail}
      query={searchQuery}
      setSearchQuery={setSearchQuery}
      testID="giftcard-search-screen"
    />
  );
};
