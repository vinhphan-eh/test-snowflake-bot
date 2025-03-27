import React from 'react';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { FlatList } from 'react-native';
import { Box, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { GiftCardCarouselItem } from './GiftCardCarouselItem';
import { SectionHeader } from './SectionHeader';
import { stringAsId } from '../../../../common/utils/string';
import type { PopularGiftCardsQuery } from '../../../../graphql/generated';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import type { GetBuyAgainGiftCardsQuery, Product } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider/hooks/useIntl';
import { ProductItemCarouselSkeleton } from '../../common/components/skeletons/ProductItemCarouselSkeleton';
import { getDiscountPercentage } from '../../common/utils/calculations';
import type { PromotedGiftcardType } from '../hooks/useGetPromotedGiftcard';
import { useGetPromotedGiftcard } from '../hooks/useGetPromotedGiftcard';
import { useServiceFeeFeature } from '../shop/hooks/useServiceFeeFeature';
import type { ProductLocationKeys } from '../shop/store/useDiscountShopStore';
import { prepareDataBeforeNavigate } from '../shop/store/useDiscountShopStore';

export type PromotedGiftCardProps = {
  style?: StyleProp<ViewStyle>;
  location: ProductLocationKeys;
  carouselType: PromotedGiftcardType;
  title: string;
};

const getData = (type: PromotedGiftcardType, responseData: GetBuyAgainGiftCardsQuery | PopularGiftCardsQuery) => {
  if (type === 'buy again') {
    return (
      (responseData as GetBuyAgainGiftCardsQuery).me?.swagStore?.buyAgainGiftCards?.edges.map(edge => edge?.node) || []
    );
  }

  return (responseData as PopularGiftCardsQuery).popularGiftCards;
};

export const PromotedGiftCard = ({ carouselType, location, style, title }: PromotedGiftCardProps) => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { getPriceWithFee } = useServiceFeeFeature();
  const { space } = useTheme();
  const Intl = useIntl();
  const { data, isError, isLoading } = useGetPromotedGiftcard({ type: carouselType });
  const giftCardData = data ? getData(carouselType, data) : undefined;
  const giftCardsLength = giftCardData?.length || 0;
  const emptyListAfterFetch = !isLoading && giftCardsLength === 0 && !isError;

  const lastIndex = giftCardsLength - 1;

  const navigateToCheckOut = (item: Product) => {
    prepareDataBeforeNavigate(item, location);
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

  const renderItem: ListRenderItem<Product> = ({ index, item }) => {
    const {
      image: { url },
      name,
    } = item;

    const isLastIndex = lastIndex === index;
    return (
      <GiftCardCarouselItem
        imgSrc={url ? { uri: url } : undefined}
        title={name}
        onPress={() => navigateToCheckOut(item)}
        testID={`${stringAsId(carouselType)}-shop-item-${index + 1}`}
        style={{ marginRight: isLastIndex ? 0 : space.smallMedium }}
        subTitle={Intl.formatMessage(
          { id: 'benefits.online.saveUpTo' },
          { discount: getDiscountPercentage(item.price, getPriceWithFee(item.discountPrice, item.serviceFee)) }
        )}
      />
    );
  };
  const renderList = () => {
    if (isLoading) {
      return (
        <Box testID="skeleton-loading" marginLeft="medium" flexDirection="row" marginTop="large">
          <ProductItemCarouselSkeleton />
          <ProductItemCarouselSkeleton />
          <ProductItemCarouselSkeleton />
        </Box>
      );
    }

    return (
      <FlatList<Product>
        data={giftCardData}
        accessibilityLabel={`${carouselType} gift cards`}
        accessibilityRole="menu"
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: space.medium }}
      />
    );
  };

  if (isError || emptyListAfterFetch) {
    return null;
  }

  return (
    <Box backgroundColor="neutralGlobalSurface" marginBottom="large" style={style}>
      <SectionHeader style={{ marginBottom: space.medium, paddingHorizontal: space.medium }} title={title} />
      {renderList()}
    </Box>
  );
};
