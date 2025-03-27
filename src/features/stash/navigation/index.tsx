import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { StashStackParamList } from './navigationTypes';
import { noHeader } from '../../../common/navigation/navigationPresets';
import { StashConfirmationScreen } from '../screens/StashConfirmationScreen';
import { StashDashboardScreen } from '../screens/StashDashboardScreen';
import { StashDepositCashScreen } from '../screens/StashDepositCashScreen';
import { StashDepositSuccessScreen } from '../screens/StashDepositSuccessScreen';
import { StashErrorScreen } from '../screens/StashErrorScreen';
import { StashFailedScreen } from '../screens/StashFailedScreen';
import { StashGoalScreen } from '../screens/StashGoalScreen';
import { StashImageScreen } from '../screens/StashImageScreen';
import { StashIndividualScreen } from '../screens/StashIndividualScreen';
import { StashIntroductionScreen } from '../screens/StashIntroductionScreen';
import { StashNameScreen } from '../screens/StashNameScreen';
import { StashSelectionScreen } from '../screens/StashSelectionScreen';
import { StashSuccessScreen } from '../screens/StashSuccessScreen';
import { StashWithdrawAmountScreen } from '../screens/StashWithdrawAmountScreen';
import { StashWithdrawOutcomeScreen } from '../screens/StashWithdrawOutcomeScreen';

const Stack = createStackNavigator<StashStackParamList>();

export const StashNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="StashIntroduction" screenOptions={noHeader}>
      <Stack.Screen name="StashIntroduction" component={StashIntroductionScreen} />
      <Stack.Screen name="StashDashboard" component={StashDashboardScreen} />
      <Stack.Screen name="StashIndividual" component={StashIndividualScreen} />
      <Stack.Screen name="StashName" component={StashNameScreen} />
      <Stack.Screen name="StashGoal" component={StashGoalScreen} />
      <Stack.Screen name="StashImage" component={StashImageScreen} />
      <Stack.Screen name="StashConfirmation" component={StashConfirmationScreen} />
      <Stack.Screen name="StashSuccess" component={StashSuccessScreen} />
      <Stack.Screen name="StashError" component={StashErrorScreen} />
      <Stack.Screen name="StashSelection" component={StashSelectionScreen} />
      <Stack.Screen name="StashDepositCash" component={StashDepositCashScreen} />
      <Stack.Screen name="StashDepositSuccess" component={StashDepositSuccessScreen} />
      <Stack.Screen name="StashFailed" component={StashFailedScreen} />
      <Stack.Screen name="StashWithdrawAmount" component={StashWithdrawAmountScreen} />
      <Stack.Screen name="StashWithdrawOutcome" component={StashWithdrawOutcomeScreen} />
    </Stack.Navigator>
  );
};
