import React from 'react';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@hero-design/rn';
import { GiftCardCarouselItem } from './GiftCardCarouselItem';
import type { SwagStoreOffer } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { ProductCarousel } from '../../common/components/ProductCarousel';

import { ProductItemCarouselSkeleton } from '../../common/components/skeletons/ProductItemCarouselSkeleton';
import { getDiscountPercentage } from '../../common/utils/calculations';
import { useSwagStorePermission } from '../hooks/useSwagStorePermission';
import { useServiceFeeFeature } from '../shop/hooks/useServiceFeeFeature';
import type { ProductLocationKeys } from '../shop/store/useDiscountShopStore';
import { prepareDataBeforeNavigateV2 } from '../shop/store/useDiscountShopStore';

type GiftCardsCarouselV2Props = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  testID?: string;
  location: ProductLocationKeys;
  isLoading: boolean;
  giftCards: SwagStoreOffer[];
  isError: boolean;
  onNavigateToProductDetail: (item: SwagStoreOffer) => void;
};
export const GiftCardsCarouselV2 = ({
  giftCards,
  isError,
  isLoading,
  location,
  onNavigateToProductDetail,
  onPress,
  style,
  testID,
}: GiftCardsCarouselV2Props) => {
  const Intl = useIntl();
  const { space } = useTheme();
  const { getPriceWithFee } = useServiceFeeFeature();
  const { permission } = useSwagStorePermission();

  const isEmptyAfterFetch = !isLoading && giftCards?.length === 0 && !isError;

  const navigateToProductDetail = (item: SwagStoreOffer) => {
    prepareDataBeforeNavigateV2(item, location);
    onNavigateToProductDetail(item);
  };

  const renderItem: ListRenderItem<SwagStoreOffer> = ({ index, item }) => {
    const isLastIndex = index === giftCards.length - 1;
    return (
      <GiftCardCarouselItem
        key={index}
        title={item.name}
        testID={`${testID}-item`}
        imgSrc={{ uri: item?.imageUrl ?? '' }}
        style={{ marginRight: isLastIndex ? 0 : space.smallMedium }}
        onPress={() => navigateToProductDetail(item)}
        subTitle={Intl.formatMessage(
          { id: 'benefits.online.saveUpTo' },
          { discount: getDiscountPercentage(item.price, getPriceWithFee(item.discountPrice, item.serviceFee)) }
        )}
      />
    );
  };
  const renderItemSkeleton = () => (
    <ProductItemCarouselSkeleton style={{ marginRight: space.smallMedium }} testID="product-item-skeleton" />
  );
  if (isError || isEmptyAfterFetch || !permission) {
    return null;
  }
  return (
    <ProductCarousel
      keyExtractor={item => item.id}
      style={style}
      title={Intl.formatMessage({
        id: 'benefits.giftcard.title',
      })}
      testID={testID}
      isLoading={isLoading}
      onPress={onPress}
      products={giftCards}
      renderItem={renderItem}
      renderItemSkeleton={renderItemSkeleton}
    />
  );
};
