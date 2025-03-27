import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import type { BillManagementMoneyParamList } from './navigationTypes';
import { noHeader } from '../../../common/navigation/navigationPresets';
import { BillingActivityScreen } from '../screens/BillingActivityScreen';

const Stack = createStackNavigator<BillManagementMoneyParamList>();

export const BillManagementMoneyNavigator = () => {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen name="BillingActivity" component={BillingActivityScreen} />
    </Stack.Navigator>
  );
};
