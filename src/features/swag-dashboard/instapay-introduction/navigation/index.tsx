import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { InstapayIntroductionParamList } from './navigationTypes';
import { noHeader } from '../../../../common/navigation/navigationPresets';
import { ChooseInstapayMethodScreen } from '../screens/ChooseInstapayMethodScreen';
import { ChoosePayMethodScreen } from '../screens/ChoosePayMethodScreen';
import { InstapayNowIntroCarouselScreen } from '../screens/InstapayNowIntroCarousel/InstapayNowIntroCarouselScreen';

const Stack = createStackNavigator<InstapayIntroductionParamList>();

export const InstapayIntroductionStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen name="ChoosePayMethodScreen" component={ChoosePayMethodScreen} />
      <Stack.Screen name="ChooseInstapayMethodScreen" component={ChooseInstapayMethodScreen} />
      <Stack.Screen name="InstapayNowIntroCarouselScreen" component={InstapayNowIntroCarouselScreen} />
    </Stack.Navigator>
  );
};
