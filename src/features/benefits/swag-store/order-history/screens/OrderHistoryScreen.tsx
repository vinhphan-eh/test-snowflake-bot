import React from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native';
import { Box, Typography, useTheme, Spinner, Alert } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetSuperAppToken } from '../../../../../common/auth/store/useSuperAppTokenStore';
import { GeneralError } from '../../../../../common/components/error';
import { Page } from '../../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../../common/components/status-bar/CustomStatusBar';
import { useIsAccountUK } from '../../../../../common/hooks/useIsAccountUK';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { isEnabledForEh } from '../../../../../common/types/react-query';
import { formatUTCToLocalDateTimeString } from '../../../../../common/utils/date';
import type { SupportedCurrency } from '../../../../../common/utils/numbers';
import { FALLBACK_CURRENCY, createCurrencyFormatter } from '../../../../../common/utils/numbers';
import { OrderProductType, useInfiniteGetDiscountOrderHistoryQuery } from '../../../../../new-graphql/generated';
import type { DiscountHistory, OrderStatus } from '../../../../../new-graphql/generated';
import { removeSpecialCharacters } from '../../../common/utils/orders';
import { useSwagStoreTracking } from '../../hooks/useSwagStoreTracking';
import OrderItem from '../components/order-item';
import { productTypeWithPurchaseItems } from '../constants';
import type { OrderHistoryScreenNavigationProp } from '../navigation/navigationType';
import { usePurchaseHistoryStore } from '../store/usePurchaseHistoryStore';

const ITEM_PER_PAGE = 10;
export const OrderHistoryScreen = () => {
  const navigation = useNavigation<OrderHistoryScreenNavigationProp<'OrderHistory'>>();
  const { loginProvider, token } = useGetSuperAppToken('OrderHistoryScreen');
  const { space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const orgId = useSessionStore(state => state.currentOrgId ?? '');
  const showAlert = usePurchaseHistoryStore(state => state.showMultiProductsAlert ?? true);
  const setAlertVisibility = usePurchaseHistoryStore(state => state.setAlertVisibility);
  const isUK = useIsAccountUK();
  const { trackClickAlertPurchaseHistory, trackClickIntoBoughtOrderItem } = useSwagStoreTracking();

  const {
    data: orderHistoryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isLoadingError,
  } = useInfiniteGetDiscountOrderHistoryQuery(
    {
      input: {
        first: ITEM_PER_PAGE,
        orgId,
      },
    },
    {
      enabled: !!orgId && isEnabledForEh(token, loginProvider),
      getNextPageParam: lastPage => {
        const endCursor = lastPage.me?.swagStore?.discountOrderHistory?.pageInfo.endCursor;

        if (endCursor) {
          return {
            first: ITEM_PER_PAGE,
            orgId,
            after: endCursor,
          };
        }

        return undefined;
      },
    }
  );
  const formatCurrency = createCurrencyFormatter();

  const orders: Array<DiscountHistory> =
    orderHistoryData?.pages?.flatMap(page => {
      return page.me?.swagStore?.discountOrderHistory?.edges.map(e => e.node) || [];
    }) ?? [];

  const filterOrders = orders.filter(
    e => e.orderDetails?.[0]?.productVariant?.product?.productType === OrderProductType.Giftcard
  );

  const onEndReached = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  const renderItem: ListRenderItem<DiscountHistory> = ({ item }) => {
    const [orderDetails] = item.orderDetails;
    const { currency, productVariant, purchaseItems, quantity, status } = orderDetails;
    const { product, variantCode } = productVariant ?? { product: undefined, variantCode: '' };

    const orderName = item.name;
    const { productType } = product ?? { name: '', productType: undefined };
    const productCurrency = (currency ?? FALLBACK_CURRENCY) as SupportedCurrency;
    const formatDate = formatUTCToLocalDateTimeString(item.createdAt, true);
    const purchaseItemName = removeSpecialCharacters(variantCode);
    const purchaseAmount = formatCurrency(item.billableAmount, { currency: productCurrency });
    const shouldDisable = productTypeWithPurchaseItems.includes(productType ?? '');
    const havePurchaseItems = purchaseItems ? purchaseItems.length > 0 : false;

    return (
      <TouchableOpacity accessibilityLabel="Order item" activeOpacity={0.6} disabled={shouldDisable}>
        <OrderItem
          purchaseAmount={purchaseAmount}
          quantity={quantity}
          status={status as OrderStatus}
          date={formatDate}
          orderName={orderName ?? ''}
          productType={productType ?? undefined}
          purchaseItemName={purchaseItemName}
          havePurchaseItems={havePurchaseItems}
          onItemPress={purchaseIndex => {
            trackClickIntoBoughtOrderItem({
              productName: purchaseItemName,
              productCategory: productType ?? '',
              purchaseAmount,
            });
            navigation.navigate('OrderDetails', {
              name: purchaseItemName,
              purchaseItem: purchaseItems?.[purchaseIndex],
              orderDetails,
            });
          }}
          style={{ marginBottom: space.large }}
        />
      </TouchableOpacity>
    );
  };

  const renderFooterComp = () => (isFetchingNextPage ? <Spinner size="small" intent="primary" /> : null);

  const renderEmptyComp = () => (
    <Typography.Title level="h6" style={{ marginLeft: space.medium }}>
      You haven’t made any purchases.
    </Typography.Title>
  );

  const renderHeaderComp = () => {
    if (isUK) {
      return null;
    }

    if (orders.length > 0 && showAlert) {
      return (
        <Alert
          onClose={() => {
            setAlertVisibility(false);
            trackClickAlertPurchaseHistory();
          }}
          style={{ marginHorizontal: space.medium, marginBottom: space.medium }}
          title="Don’t worry, your purchase history for other items still exist!"
          content="We’re working on bringing them here soon. For now, they can be viewed in your HR web app."
        />
      );
    }
    return null;
  };

  const renderBody = () => {
    if (isLoading) {
      return (
        <Box justifyContent="center" alignItems="center" marginBottom="xxxlarge" flex={1}>
          <Spinner accessibilityLabel="Spinner" intent="primary" />
        </Box>
      );
    }

    if (isLoadingError) {
      return <GeneralError themeName="eBens" onCtaPress={navigation.goBack} />;
    }

    return (
      <FlatList
        data={filterOrders}
        accessibilityLabel="Order item list"
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.5}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: bottomInset ?? space.large,
          paddingTop: space.large,
        }}
        onEndReached={onEndReached}
        ListHeaderComponent={renderHeaderComp}
        ListFooterComponent={renderFooterComp}
        ListEmptyComponent={renderEmptyComp}
      />
    );
  };

  return (
    <Box flex={1} backgroundColor="neutralGlobalSurface">
      <CustomStatusBar />
      <Page.TopBar hideRight onBack={navigation.goBack} title="Gift card Purchase history" />

      {renderBody()}
    </Box>
  );
};
