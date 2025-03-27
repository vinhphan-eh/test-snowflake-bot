import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { GroupStackParamList } from './navigationType';
import { noHeader } from '../../../../common/navigation/navigationPresets';
import { ErrorScreen } from '../screens/ErrorScreen';
import { GroupDetailScreen } from '../screens/GroupDetailScreen';
import { JoinGroupFailedScreen } from '../screens/JoinGroupFailedScreen';
import { JoinGroupSuccessScreen } from '../screens/JoinGroupSuccessScreen';
import JoinWaitListIntroScreen from '../screens/JoinWaitListIntroScreen';

const Stack = createStackNavigator<GroupStackParamList>();

export const GroupNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="JoinWaitListIntroScreen" screenOptions={noHeader}>
      <Stack.Screen name="JoinWaitListIntroScreen" component={JoinWaitListIntroScreen} />
      <Stack.Screen name="GroupDetailScreen" component={GroupDetailScreen} />
      <Stack.Screen name="JoinGroupSuccessScreen" component={JoinGroupSuccessScreen} />
      <Stack.Screen name="JoinGroupFailedScreen" component={JoinGroupFailedScreen} />
      <Stack.Screen name="Error" component={ErrorScreen} />
    </Stack.Navigator>
  );
};
