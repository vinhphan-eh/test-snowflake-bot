import React from 'react';
import { Image, Pressable } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { GiftCardStatus } from './GiftCardStatus';
import { formatUTCToLocalDateString } from '../../../../../../common/utils/date';
import { scale as layoutScale } from '../../../../../../common/utils/layout';
import { createCurrencyFormatter, type SupportedCurrency } from '../../../../../../common/utils/numbers';
import type { RootStackNavigationProp } from '../../../../../../navigation/navigationTypes';
import type { DiscountHistory, OrderDetails, OrderPurchaseItem } from '../../../../../../new-graphql/generated';
import { removeSpecialCharacters } from '../../../utils/orders';

interface GiftCardListItemProps {
  item: DiscountHistory;
  purchaseItem?: OrderPurchaseItem;
  orderDetail: OrderDetails;
}

const currencyFormatter = createCurrencyFormatter();

export const GiftCardListItem = ({ item, orderDetail, purchaseItem }: GiftCardListItemProps) => {
  const { colors, space } = useTheme();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();

  const imgWidth = layoutScale(108, 'width');
  const imgHeight = (imgWidth * 68) / 108;
  const { currency, price, productVariant } = orderDetail;
  const { variantCode } = productVariant ?? { product: undefined, variantCode: '' };
  // FIXME: get correct variant name from BE instead of using variantCode
  const purchaseItemName = removeSpecialCharacters(variantCode).toUpperCase();

  const onItemPress = () => {
    navigation.navigate('BenefitsStack', {
      screen: 'OrderHistoryStack',
      params: {
        screen: 'OrderDetails',
        params: {
          name: purchaseItemName,
          purchaseItem,
          orderDetails: orderDetail,
        },
      },
    });
  };

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        paddingHorizontal: space.medium,
        paddingBottom: space.large,
        backgroundColor: colors.defaultGlobalSurface,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onItemPress}
    >
      <Image
        resizeMode="cover"
        accessibilityLabel="Thumbnail"
        style={{ width: imgWidth, height: imgHeight, marginRight: space.medium }}
        source={{ uri: orderDetail.productVariant?.product.imageUrl ?? '' }}
      />
      <Box flexDirection="column" paddingVertical="xsmall" flex={1}>
        <Box flexDirection="row" justifyContent="space-between">
          <Box flex={1}>
            <Typography.Body intent="body" variant="regular-bold" numberOfLines={1}>
              {purchaseItemName}
            </Typography.Body>
          </Box>
        </Box>

        <Box flexDirection="row" justifyContent="space-between" marginVertical="xsmall">
          <Typography.Caption intent="subdued">{formatUTCToLocalDateString(item.createdAt)}</Typography.Caption>
          <Typography.Caption intent="subdued">
            {currencyFormatter(price, { currency: currency as SupportedCurrency })}
          </Typography.Caption>
        </Box>
        {/* TODO Update isUsed when it ready */}
        <GiftCardStatus status={item.status} isUsed={false} />
      </Box>
    </Pressable>
  );
};
