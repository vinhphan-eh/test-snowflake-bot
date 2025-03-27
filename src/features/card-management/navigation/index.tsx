import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { CardManagementStackParamList } from './navigationType';
import { CardManagementDashboardScreen } from '../screens/CardManagementDashboardScreen';
import { RedeemHPWithSwagCardIntroductionScreen } from '../screens/RedeemHPWithSwagCardIntroductionScreen';
import { RedeemHPWithSwagCardSettingScreen } from '../screens/RedeemHPWithSwagCardSettingScreen';

const Stack = createStackNavigator<CardManagementStackParamList>();

export const CardManagementNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CardManagementDashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CardManagementDashboard" component={CardManagementDashboardScreen} />
      <Stack.Screen name="RedeemHPWithSwagCardIntro" component={RedeemHPWithSwagCardIntroductionScreen} />
      <Stack.Screen name="RedeemHPWithSwagCardSetting" component={RedeemHPWithSwagCardSettingScreen} />
    </Stack.Navigator>
  );
};
