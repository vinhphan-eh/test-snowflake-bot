import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { NotificationStackParamList } from './navigationTypes';
import { TransactWithIncentiveModal } from '../screens/TransactWithIncentiveModal';

const Stack = createStackNavigator<NotificationStackParamList>();

const NotificationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="TransactWithIncentive" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TransactWithIncentive" component={TransactWithIncentiveModal} />
    </Stack.Navigator>
  );
};

export default NotificationNavigator;
