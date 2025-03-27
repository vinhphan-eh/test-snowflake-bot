import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { SSOStackParamList } from './navigationTypes';
import { SSOErrorScreen } from '../screens/SSOErrorScreen';

const Stack = createStackNavigator<SSOStackParamList>();

const SSOStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SSOError" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SSOError" component={SSOErrorScreen} />
    </Stack.Navigator>
  );
};

export default SSOStackNavigator;
