import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { DiscountShopParamList } from './navigationTypes';
import { noHeader } from '../../../../../common/navigation/navigationPresets';
import { PaymentFailedScreen } from '../screens/PaymentFailedScreen';
import { PaymentSuccessScreen } from '../screens/PaymentSuccessScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';

const Stack = createStackNavigator<DiscountShopParamList>();

export const DiscountShopNavigator = () => {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
      <Stack.Screen name="PaymentFailed" component={PaymentFailedScreen} />
    </Stack.Navigator>
  );
};
