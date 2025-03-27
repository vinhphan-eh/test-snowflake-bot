import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { InstaPaySchedulingStackParamList } from './navigationTypes';
import { noHeader } from '../../../../common/navigation/navigationPresets';
import { InstaPayRecurringByDayScreen } from '../screens/InstaPayRecurringByDayScreen';
import { InstaPaySchedulingBankAccountSelectionScreen } from '../screens/InstaPaySchedulingBankAccountSelectionScreen';
import { InstaPaySchedulingConfirmationScreen } from '../screens/InstaPaySchedulingConfirmationScreen';
import { InstaPaySchedulingErrorScreen } from '../screens/InstaPaySchedulingErrorScreen';
import { InstaPaySchedulingModificationScreen } from '../screens/InstaPaySchedulingModificationScreen';
import { InstaPaySchedulingOptOutSurveyScreen } from '../screens/InstaPaySchedulingOptOutSurveyScreen';
import { InstaPaySchedulingSuccessScreen } from '../screens/InstaPaySchedulingSuccessScreen';

const Stack = createStackNavigator<InstaPaySchedulingStackParamList>();

export const InstaPaySchedulingStack = () => {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen name="InstaPaySchedulingConfirmation" component={InstaPaySchedulingConfirmationScreen} />
      <Stack.Screen name="InstaPaySchedulingModification" component={InstaPaySchedulingModificationScreen} />
      <Stack.Screen name="InstaPaySchedulingError" component={InstaPaySchedulingErrorScreen} />
      <Stack.Screen name="InstaPaySchedulingSuccess" component={InstaPaySchedulingSuccessScreen} />
      <Stack.Screen name="InstaPaySchedulingOptOutSurvey" component={InstaPaySchedulingOptOutSurveyScreen} />
      <Stack.Screen name="InstaPayRecurringByDay" component={InstaPayRecurringByDayScreen} />
      <Stack.Screen
        name="InstaPaySchedulingBankAccountSelection"
        component={InstaPaySchedulingBankAccountSelectionScreen}
      />
    </Stack.Navigator>
  );
};
