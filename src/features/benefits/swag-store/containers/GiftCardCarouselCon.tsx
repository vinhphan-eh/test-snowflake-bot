import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { useGetSuperAppToken } from '../../../../common/auth/store/useSuperAppTokenStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { isEnabledForEh } from '../../../../common/types/react-query';
import { useGetSsAllOffersQuery } from '../../../../new-graphql/generated';

import { CategoryCodes } from '../../common/constants/benefits';
import { GiftCardsCarousel } from '../components/GiftCardsCarousel';
import { useSwagStorePermission } from '../hooks/useSwagStorePermission';
import type { ProductLocationKeys } from '../shop/store/useDiscountShopStore';

type GiftCardsCarouselConProps = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  testID?: string;
  location: ProductLocationKeys;
};
export const GiftCardsCarouselCon = ({ location, onPress, style, testID }: GiftCardsCarouselConProps) => {
  const { loginProvider, token } = useGetSuperAppToken('GiftCardsCarouselCon');
  const orgId = useSessionStore(state => state.currentOrgId ?? '');
  const { permission } = useSwagStorePermission();

  const {
    data: giftCardsData,
    isError: isErrorGiftcard,
    isLoading: isLoadingGiftcard,
  } = useGetSsAllOffersQuery(
    {
      allOffersInput: {
        orgId,
        first: 10,
        categoryCode: CategoryCodes.GiftCard,
      },
    },
    {
      enabled: !!orgId && isEnabledForEh(token, loginProvider) && permission,
    }
  );

  const giftCardProducts = giftCardsData?.me?.swagStore?.allOffers?.edges.map(e => e.node) ?? [];

  return (
    <GiftCardsCarousel
      testID={testID}
      style={style}
      onPress={onPress}
      location={location}
      isLoading={isLoadingGiftcard}
      giftCards={giftCardProducts}
      isError={isErrorGiftcard}
    />
  );
};
