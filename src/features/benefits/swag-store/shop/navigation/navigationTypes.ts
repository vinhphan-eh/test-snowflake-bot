import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../../navigation/navigationTypes';

export type DiscountShopParamList = {
  ProductDetail: {
    productCode: string;
  };
  PaymentSuccess: undefined;
  PaymentFailed: undefined;
};

export type DiscountShopNavigationProp<T extends keyof DiscountShopParamList> = CompositeNavigationProp<
  StackNavigationProp<DiscountShopParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type DiscountShopRouteProp<T extends keyof DiscountShopParamList> = RouteProp<DiscountShopParamList, T>;
