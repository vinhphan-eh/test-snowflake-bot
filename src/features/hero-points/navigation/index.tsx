import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { HeroPointsStackParamsList } from './navigationTypes';
import { noHeader } from '../../../common/navigation/navigationPresets';
import { RedeemHPWithSwagCardIntroductionScreen } from '../../card-management/screens/RedeemHPWithSwagCardIntroductionScreen';
import { TransactionDetailsScreen } from '../screens/TransactionDetailsScreen';

const Stack = createStackNavigator<HeroPointsStackParamsList>();

export const HeroPointsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen name="heroPoints/transactionDetail" component={TransactionDetailsScreen} />
      <Stack.Screen name="heroPoints/redeemHPWithSwagIntroduction" component={RedeemHPWithSwagCardIntroductionScreen} />
    </Stack.Navigator>
  );
};
