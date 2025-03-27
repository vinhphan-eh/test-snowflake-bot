import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { DigitalWalletStackParamList } from './navigationTypes';
import { DigitalWalletOutcomeScreen } from '../screens/DigitalWalletOutcomeScreen';
import { DigitalWalletSetupScreen } from '../screens/DigitalWalletSetupScreen';

const Stack = createStackNavigator<DigitalWalletStackParamList>();

export const DigitalWalletNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="DigitalWalletSetup" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DigitalWalletSetup" component={DigitalWalletSetupScreen} />
      <Stack.Screen name="DigitalWalletOutcome" component={DigitalWalletOutcomeScreen} />
    </Stack.Navigator>
  );
};
