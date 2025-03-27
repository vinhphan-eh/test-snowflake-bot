import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import { Box, Spinner, Typography, useTheme } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GiftCardListItem } from './components/GiftCardListItem';
import { PURCHASE_ITEM_LIMIT_PER_PAGE } from './constants';
import type { GiftCardPurchaseItem } from './types';
import { useGetSuperAppToken } from '../../../../../common/auth/store/useSuperAppTokenStore';
import { GeneralError } from '../../../../../common/components/error';
import { useCheckBenefitsNZ } from '../../../../../common/hooks/useCheckBenefitsNZ';
import { useCheckBenefitsUK } from '../../../../../common/hooks/useCheckBenefitsUK';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { isEnabledForEh } from '../../../../../common/types/react-query';
import {
  useInfiniteGetDiscountOrderHistoryQuery,
  OrderProductType,
  type DiscountHistory,
} from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { useOnTabFocusedEffect } from '../../hooks/useOnTabFocusedEffect';

const ALLOWED_PRODUCT_TYPES = [OrderProductType.Giftcard, OrderProductType.Ticket];

export const GiftcardsTab = () => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { formatMessage } = useIntl();
  const { colors, space } = useTheme();
  const { loginProvider, token } = useGetSuperAppToken('GiftcardsTab');
  const orgId = useSessionStore(state => state.currentOrgId ?? '');
  const hasUKPermission = useCheckBenefitsUK();
  const hasNZPermission = useCheckBenefitsNZ();
  const flatlistRef = useRef<FlatList<GiftCardPurchaseItem>>(null);

  const {
    data: orderHistoryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isLoadingError,
    refetch,
  } = useInfiniteGetDiscountOrderHistoryQuery(
    {
      input: {
        orgId,
        first: PURCHASE_ITEM_LIMIT_PER_PAGE,
      },
    },
    {
      enabled: !!orgId && isEnabledForEh(token, loginProvider),
      getNextPageParam: lastPage => {
        if (lastPage?.me?.swagStore?.discountOrderHistory?.pageInfo.hasNextPage) {
          return {
            input: {
              orgId,
              first: PURCHASE_ITEM_LIMIT_PER_PAGE,
              after: lastPage.me.swagStore.discountOrderHistory.pageInfo.endCursor,
            },
          };
        }

        return undefined;
      },
    }
  );

  useOnTabFocusedEffect('benefits-purchases', () => {
    flatlistRef.current?.scrollToOffset({ animated: false, offset: 0 });
    // invalidateQueries isn't working correctly because creating order might have a delay
    // safe to refetch everytime the tab is focused
    refetch();
  });

  const onEndReached = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  const renderEmptyComp = () => (
    <Box bgColor="defaultGlobalSurface" paddingBottom="large" justifyContent="center" alignItems="center" flex={1}>
      {!isLoading && !isFetchingNextPage ? (
        <Typography.Body variant="small">{formatMessage({ id: 'benefits.giftcard.noPurchase' })}</Typography.Body>
      ) : null}
    </Box>
  );

  const renderFooterComp = () =>
    isLoading || isFetchingNextPage ? (
      <Box
        style={{
          height: space['5xlarge'],
          backgroundColor: colors.neutralGlobalSurface,
        }}
      >
        <Spinner size="small" intent="primary" />
      </Box>
    ) : null;

  const renderHeaderComp = () => {
    return (
      <Box
        borderTopLeftRadius="large"
        borderTopRightRadius="large"
        paddingTop="medium"
        bgColor="defaultGlobalSurface"
        flex={1}
      >
        <Typography.Body style={{ marginLeft: space.medium, marginBottom: space.medium }} variant="regular-bold">
          {formatMessage({ id: 'benefits.giftcard.orderHistory' })}
        </Typography.Body>
      </Box>
    );
  };

  const orders: Array<DiscountHistory> =
    orderHistoryData?.pages?.flatMap(page => {
      return page?.me?.swagStore?.discountOrderHistory?.edges.map(e => e.node) || [];
    }) ?? [];

  // Get all purchase items.
  // Data structure
  // - Each order has an array of order details
  //    - One order detail is for one product variant
  // - Each order detail has an array of purchase items
  //    - If an user buys 2 items of a product, there will be 2 purchase items (if the order is fulfilled)
  //    - If an user buys 2 items of a product, but only 1 is fulfilled, there will be 1 purchase item
  //    - If an user buys 2 items of a product, but no one is fulfilled, there will be 0 purchase item
  // Example: if an order is for 2 Iphone 14 and 3 Iphone 14 Pro
  // - Order has 2 order details. One for Iphone 14 and one for Iphone 14 Pro
  // - Iphone 14 order detail has 2 purchase items
  // - Iphone 14 Pro order detail has 3 purchase items
  const purchaseItems: Array<GiftCardPurchaseItem> = orders.flatMap(order => {
    return order.orderDetails.flatMap(orderDetail => {
      // Based on the quantity to create an array of purchase items
      // Cannot use directly purchaseItems because it can be empty if the order is not fulfilled
      return Array(orderDetail.quantity)
        .fill(undefined)
        .map((_, index) => ({
          order,
          purchaseItem: orderDetail.purchaseItems[index],
          orderDetail,
        }));
    });
  });

  const giftCardAndTicketItems = purchaseItems.filter(({ orderDetail }) => {
    const productType = orderDetail?.productVariant?.product?.productType;

    return productType && ALLOWED_PRODUCT_TYPES.includes(productType);
  });

  if (isLoading) {
    return (
      <Box justifyContent="center" alignItems="center" marginBottom="xxxlarge" flex={1}>
        <Spinner accessibilityLabel="Spinner" intent="primary" testID="spinner" />
      </Box>
    );
  }

  if (isLoadingError) {
    return <GeneralError themeName="eBens" />;
  }

  return (
    <FlatList
      ref={flatlistRef}
      style={{ backgroundColor: colors.neutralGlobalSurface }}
      data={giftCardAndTicketItems}
      renderItem={({ item }) => (
        <GiftCardListItem item={item.order} purchaseItem={item.purchaseItem} orderDetail={item.orderDetail} />
      )}
      keyExtractor={(item, index) => `${item.order.id.toString()}${index}}`}
      onEndReached={onEndReached}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: bottomInset || space.medium,
        paddingHorizontal: hasUKPermission || hasNZPermission ? 0 : space.medium,
        paddingTop: hasUKPermission || hasNZPermission ? 0 : space.large,
      }}
      ListEmptyComponent={renderEmptyComp}
      ListHeaderComponent={renderHeaderComp}
      ListFooterComponent={renderFooterComp}
    />
  );
};
