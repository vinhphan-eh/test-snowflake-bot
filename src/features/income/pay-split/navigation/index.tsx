import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { PaySplitStackParamList } from './navigationTypes';
import { IncomeErrorScreen } from '../../screens/IncomeErrorScreen';
import { PaySplitDollarAllocationScreen } from '../screens/PaySplitDollarAllocationScreen';
import { PaySplitIntroScreen } from '../screens/PaySplitIntroScreen';
import { PaySplitOrgListScreen } from '../screens/PaySplitOrgListScreen';
import { PaySplitOutcomeScreen } from '../screens/PaySplitOutcomeScreen';
import { PaySplitPercentageAllocationScreen } from '../screens/PaySplitPercentageAllocationScreen/PaySplitPercentageAllocationScreen';
import { PaySplitPercentageInputScreen } from '../screens/PaySplitPercentageInputScreen';
import { PaySplitSelectAllocationScreen } from '../screens/PaySplitSelectAllocationScreen';

const Stack = createStackNavigator<PaySplitStackParamList>();

const PaySplitNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="PaySplitIntro" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PaySplitIntro" component={PaySplitIntroScreen} />
      <Stack.Screen name="PaySplitOrgList" component={PaySplitOrgListScreen} />
      <Stack.Screen name="PaySplitSelectAllocation" component={PaySplitSelectAllocationScreen} />
      <Stack.Screen name="PaySplitDollarAllocation" component={PaySplitDollarAllocationScreen} />
      <Stack.Screen name="PaySplitPercentageAllocation" component={PaySplitPercentageAllocationScreen} />
      <Stack.Screen name="PaySplitPercentageInput" component={PaySplitPercentageInputScreen} />
      <Stack.Screen name="PaySplitOutcome" component={PaySplitOutcomeScreen} />
      <Stack.Screen name="PaySplitError" component={IncomeErrorScreen} />
    </Stack.Navigator>
  );
};

export default PaySplitNavigator;
