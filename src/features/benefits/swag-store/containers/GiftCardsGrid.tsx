import React, { useCallback } from 'react';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useGetSuperAppToken } from '../../../../common/auth/store/useSuperAppTokenStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { isEnabledForEh } from '../../../../common/types/react-query';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import type { SwagStoreOffer } from '../../../../new-graphql/generated';
import { useGetSsAllOffersQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { ProductGrid } from '../../common/components/ProductGrid';
import { CategoryCodes } from '../../common/constants/benefits';
import { getDiscountPercentage } from '../../common/utils/calculations';
import { GiftCardGridItem } from '../components/GiftCardGridItem';
import { GiftCardGridSkeleton } from '../components/skeletons/GiftCardGridSkeleton';
import { useSwagStorePermission } from '../hooks/useSwagStorePermission';
import { useServiceFeeFeature } from '../shop/hooks/useServiceFeeFeature';
import type { ProductLocationKeys } from '../shop/store/useDiscountShopStore';
import { prepareDataBeforeNavigateV2 } from '../shop/store/useDiscountShopStore';

type GiftCardsGridProps = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  testID?: string;
  numberOfItems?: number;
  location: ProductLocationKeys;
};
export const GiftCardsGrid = ({ location, numberOfItems = 6, onPress, style, testID }: GiftCardsGridProps) => {
  const Intl = useIntl();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { space } = useTheme();
  const { getPriceWithFee } = useServiceFeeFeature();
  const orgId = useSessionStore(state => state.currentOrgId ?? '');
  const { loginProvider, token } = useGetSuperAppToken('GiftCardsGrid');
  const { permission } = useSwagStorePermission();

  const { data, isError, isLoading } = useGetSsAllOffersQuery(
    {
      allOffersInput: {
        orgId,
        first: numberOfItems,
        categoryCode: CategoryCodes.GiftCard,
      },
    },
    {
      enabled: !!orgId && isEnabledForEh(token, loginProvider) && permission,
    }
  );
  const giftCardProducts = data?.me?.swagStore?.allOffers?.edges.map(e => e.node) ?? [];

  const navigateToProductDetail = useCallback((item: SwagStoreOffer) => {
    prepareDataBeforeNavigateV2(item, location);
    navigation.navigate('BenefitsStack', {
      screen: 'DiscountShopStack',
      params: {
        screen: 'ProductDetail',
        params: {
          productCode: item.productCode,
        },
      },
    });
  }, []);

  const isEmptyAfterFetch = !isLoading && !isError && giftCardProducts?.length === 0;

  if (isError || isEmptyAfterFetch || !permission) {
    return null;
  }

  const renderItem: ListRenderItem<SwagStoreOffer> = ({ index, item }) => {
    return (
      <GiftCardGridItem
        key={index}
        title={item.name}
        testID={`${testID}-item`}
        imgSrc={{ uri: item.imageUrl }}
        onPress={() => navigateToProductDetail(item)}
        style={{ marginBottom: space.large }}
        subTitle={Intl.formatMessage(
          { id: 'benefits.online.saveUpTo' },
          { discount: getDiscountPercentage(item.price, getPriceWithFee(item.discountPrice, item.serviceFee)) }
        )}
      />
    );
  };

  const renderItemSkeleton = () => <GiftCardGridSkeleton testID="product-item-skeleton" />;

  return (
    <ProductGrid
      title={Intl.formatMessage({ id: 'benefits.giftcard.title' })}
      style={style}
      testID={`${testID}`}
      isLoading={isLoading}
      onPress={onPress}
      renderItem={renderItem}
      renderItemSkeleton={renderItemSkeleton}
      products={giftCardProducts}
    />
  );
};
