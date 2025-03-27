import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { PinSetupParamList } from './navigationType';
import { ChoosePinScreen } from '../screens/ChoosePinScreen';
import { RepeatedPinScreen } from '../screens/RepeatedPinScreen';

const Stack = createStackNavigator<PinSetupParamList>();

const PinSetupStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ChoosePin" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChoosePin" component={ChoosePinScreen} />
      <Stack.Screen name="RepeatedPin" component={RepeatedPinScreen} />
    </Stack.Navigator>
  );
};

export default PinSetupStackNavigator;
