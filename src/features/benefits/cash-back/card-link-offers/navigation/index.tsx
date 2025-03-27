import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { CardLinkOffersStackParamList } from './navigationType';
import { noHeader } from '../../../../../common/navigation/navigationPresets';
import { SupportRequestScreen } from '../../../../support/screens/SupportRequestScreen';
import { AddCardCashbackDashboardScreen } from '../screens/AddCardCashbackDashboardScreen';
import { CashbackIntroductionScreen } from '../screens/CashbackIntroductionScreen';
import { CashbackOverviewScreen } from '../screens/CashbackOverviewScreen/CashbackOverviewScreen';
import { EnrolCardDetailsScreen } from '../screens/EnrolCardDetailsScreen';

const Stack = createStackNavigator<CardLinkOffersStackParamList>();

export const CardLinkOffersNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CashbackIntroduction" screenOptions={noHeader}>
      <Stack.Screen name="AddCardCashbackDashboard" component={AddCardCashbackDashboardScreen} />
      <Stack.Screen name="CashbackIntroduction" component={CashbackIntroductionScreen} />
      <Stack.Screen name="EnrolCardDetails" component={EnrolCardDetailsScreen} />
      <Stack.Screen name="ManageCashbackDashboard" component={CashbackOverviewScreen} />
      <Stack.Screen name="ContactForm" component={SupportRequestScreen} />
    </Stack.Navigator>
  );
};
