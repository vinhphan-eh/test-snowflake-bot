import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { SuperStackParamList } from './navigationTypes';
import { noHeader } from '../../../common/navigation/navigationPresets';
import { ConsolidationNavigator } from '../consolidation/navigation';
import { SalarySacrificeNavigator } from '../salary-sacrifice/navigation';
import { ActiveMembershipScreen } from '../screens/ActiveMembershipScreen';
import { LifecycleEventDetailsScreen } from '../screens/LifecycleEventDetailsScreen';
import { SuperCompleteScreen } from '../screens/SuperCompleteScreen';
import { SuperConfirmFailedScreen } from '../screens/SuperConfirmFailedScreen';
import { SuperDetailConfirmScreen } from '../screens/SuperDetailConfirmScreen';
import { SuperfundDetailsScreen } from '../screens/SuperfundDetailsScreen';
import { SuperIntroScreen } from '../screens/SuperIntroScreen';

const Stack = createStackNavigator<SuperStackParamList>();

export const SuperNavigator = () => {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen name="SuperIntro" component={SuperIntroScreen} />
      <Stack.Screen name="ActiveMembership" component={ActiveMembershipScreen} />
      <Stack.Screen name="SuperDetailConfirm" component={SuperDetailConfirmScreen} />
      <Stack.Screen name="SuperComplete" component={SuperCompleteScreen} />
      <Stack.Screen name="SuperConfirmFailed" component={SuperConfirmFailedScreen} />
      <Stack.Screen name="SalarySacrificeStack" component={SalarySacrificeNavigator} />
      <Stack.Screen name="SuperfundDetails" component={SuperfundDetailsScreen} />
      <Stack.Screen name="ConsolidationStack" component={ConsolidationNavigator} />
      <Stack.Screen name="EventDetails" component={LifecycleEventDetailsScreen} />
    </Stack.Navigator>
  );
};
