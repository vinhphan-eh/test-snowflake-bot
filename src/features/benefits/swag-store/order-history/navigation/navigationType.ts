import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../../navigation/navigationTypes';
import type { OrderDetails, OrderPurchaseItem } from '../../../../../new-graphql/generated';

export type OrderHistoryStackParamList = {
  OrderHistory: undefined;
  OrderDetails: OrderDetailRouteProps;
};

export type OrderHistoryScreenNavigationProp<T extends keyof OrderHistoryStackParamList> = CompositeNavigationProp<
  StackNavigationProp<OrderHistoryStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type OrderHistoryScreenRouteProp<T extends keyof OrderHistoryStackParamList> = RouteProp<
  OrderHistoryStackParamList,
  T
>;

type OrderDetailRouteProps = {
  name: string;
  purchaseItem?: OrderPurchaseItem;
  orderDetails: OrderDetails;
};
