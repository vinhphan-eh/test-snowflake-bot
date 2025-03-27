import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { SwagStoreStackParamList } from './navigationTypes';
import { noHeader } from '../../../../common/navigation/navigationPresets';
import { GiftCardsSearchScreen } from '../screens/GiftCardsSearchScreen';

const Stack = createStackNavigator<SwagStoreStackParamList>();

export const SwagStoreStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen name="GiftCardsSearchScreen" component={GiftCardsSearchScreen} />
    </Stack.Navigator>
  );
};
