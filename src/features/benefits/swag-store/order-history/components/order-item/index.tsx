import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Typography, useTheme, List } from '@hero-design/rn';
import { AttributeRow } from './AttributeRow';
import type { OrderProductType, OrderStatus } from '../../../../../../new-graphql/generated';
import { removeSpecialCharacters } from '../../../../common/utils/orders';
import { productTypeWithPurchaseItems } from '../../constants';

type OrderItemProps = {
  purchaseAmount: string;
  quantity: number;
  status: OrderStatus;
  date: string;
  orderName: string;
  purchaseItemName?: string;
  productType?: `${OrderProductType}`;
  onItemPress?: (index: number) => void;
  havePurchaseItems?: boolean;
  style?: StyleProp<ViewStyle>;
};

const OrderItem = ({
  date,
  havePurchaseItems = false,
  onItemPress = () => {},
  orderName = '',
  productType,
  purchaseAmount,
  purchaseItemName = '',
  quantity,
  status,
  style,
}: OrderItemProps) => {
  const statusText = removeSpecialCharacters(status).toUpperCase();
  const { colors, space } = useTheme();
  const renderPurchaseItems = () => {
    return Array(quantity)
      .fill(undefined)
      .map((_, i) => {
        const isLastItem = i === quantity - 1;
        return (
          <Box // this data won't be update, index is safe here
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            style={{ marginBottom: isLastItem ? 0 : space.medium }}
          >
            <List.Item
              variant="card"
              suffix="arrow-right"
              disabled={!havePurchaseItems}
              onPress={() => onItemPress(i)}
              title={
                <Typography.Body
                  variant="regular"
                  accessibilityLabel={purchaseItemName}
                  style={{ textTransform: 'capitalize' }}
                >
                  {purchaseItemName}
                </Typography.Body>
              }
              testID={`purchase_item_${i}`}
            />
          </Box>
        );
      });
  };

  return (
    <Box style={style}>
      <Box paddingHorizontal="smallMedium" paddingVertical="small" style={{ backgroundColor: '#ead7f9' }}>
        <Typography.Body variant="small" accessibilityLabel="Create At">
          {date}
        </Typography.Body>
      </Box>
      <Box marginHorizontal="medium">
        <Typography.Title
          level="h5"
          accessibilityLabel="Order Name"
          style={{ color: colors.onDefaultGlobalSurface, marginTop: space.medium, opacity: 0.8 }}
        >
          {orderName}
        </Typography.Title>
        <AttributeRow
          accessibilityLabel="Status"
          style={{ marginTop: space.smallMedium }}
          label="Status"
          content={statusText}
        />
        <AttributeRow
          accessibilityLabel="Purchase Amount"
          style={{ marginTop: space.smallMedium }}
          label="Purchase amount"
          content={purchaseAmount}
        />
        <AttributeRow
          accessibilityLabel="Quantity"
          style={{ marginTop: space.smallMedium }}
          label="Quantity"
          content={quantity.toString()}
        />
        {productTypeWithPurchaseItems.includes(productType ?? '') && (
          <Box accessibilityLabel="Card Items" marginTop="large">
            {renderPurchaseItems()}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OrderItem;
