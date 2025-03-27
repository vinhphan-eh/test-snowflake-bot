import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SwagStack } from './SwagStack';

const Stack = createStackNavigator();

export const CoreAppMainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="mainScreen">
      <Stack.Screen
        name="mainScreen"
        component={SwagStack}
        options={{
          animationEnabled: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
