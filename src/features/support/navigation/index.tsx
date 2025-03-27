import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { SupportStackParamList } from './navigationTypes';
import { noHeader } from '../../../common/navigation/navigationPresets';
import { GeneralErrorScreen } from '../../onboarding/screens/GeneralErrorScreen';
import { FinancialWellnessScreen } from '../screens/FinancialWellnessScreen';
import { InstaPayHistoryScreen } from '../screens/InstaPayHistoryScreen';
import { SupportRequestOutcomeScreen } from '../screens/SupportRequestOutcomeScreen';
import { SupportRequestScreen } from '../screens/SupportRequestScreen';

const Stack = createStackNavigator<SupportStackParamList>();

export const SupportNavigator = () => {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen name="Request" component={SupportRequestScreen} />
      <Stack.Screen name="RequestOutcome" component={SupportRequestOutcomeScreen} />
      <Stack.Screen name="GeneralError" component={GeneralErrorScreen} />
      <Stack.Screen name="InstaPayHistory" component={InstaPayHistoryScreen} />
      <Stack.Screen name="FinancialWellness" component={FinancialWellnessScreen} />
    </Stack.Navigator>
  );
};
