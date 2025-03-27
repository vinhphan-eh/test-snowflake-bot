import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { SwagPayslipsExperimentStackParamsList } from './navigationTypes';
import { noHeader } from '../../../common/navigation/navigationPresets';
import { BudgetingIntroScreen } from '../screens/BudgetingIntroScreen';

const Stack = createStackNavigator<SwagPayslipsExperimentStackParamsList>();

export const SwagPayslipsExperimentStack = () => {
  return (
    <Stack.Navigator initialRouteName="BudgetingIntroScreen" screenOptions={noHeader}>
      <Stack.Screen name="BudgetingIntroScreen" component={BudgetingIntroScreen} />
    </Stack.Navigator>
  );
};
