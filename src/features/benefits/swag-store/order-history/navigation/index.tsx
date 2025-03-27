import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { OrderHistoryStackParamList } from './navigationType';
import { noHeader } from '../../../../../common/navigation/navigationPresets';
import { OrderDetailScreen } from '../screens/OrderDetailScreen';
import { OrderHistoryScreen } from '../screens/OrderHistoryScreen';

const Stack = createStackNavigator<OrderHistoryStackParamList>();

export const OrderHistoryNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="OrderHistory" screenOptions={noHeader}>
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="OrderDetails" component={OrderDetailScreen} />
    </Stack.Navigator>
  );
};
