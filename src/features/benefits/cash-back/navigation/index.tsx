import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { CashbackStackParamList } from './navigationTypes';
import { noHeader } from '../../../../common/navigation/navigationPresets';
import { InStoreCashbackSearchScreen } from '../instore-offer/screens/InStoreCashbackSearchScreen';
import { InStoreOfferDetailV2Screen } from '../instore-offer/screens/InstoreOfferDetailV2Screen';
import { OnlineOfferDetailV2Screen } from '../online-offer/screens/OnlineOfferDetailV2Screen';
import { CashbackSearchScreen } from '../screens/CashbackSearchScreen';
import { CashbackSearchScreenV2 } from '../screens/CashbackSearchScreenV2';
import { FailedScreen } from '../screens/FailedScreen';
import { FeaturedOffersSearchScreen } from '../screens/FeaturedOffersSearchScreen';

const Stack = createStackNavigator<CashbackStackParamList>();

export const CashbackStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen name="CashbackSearch" component={CashbackSearchScreen} />
      <Stack.Screen name="FailedScreen" component={FailedScreen} />
      <Stack.Screen name="OnlineOfferDetail" component={OnlineOfferDetailV2Screen} />
      <Stack.Screen name="InstoreOfferDetailV2" component={InStoreOfferDetailV2Screen} />
      <Stack.Screen name="FeaturedOffersSearchScreen" component={FeaturedOffersSearchScreen} />
      <Stack.Screen name="CashbackSearchScreenV2" component={CashbackSearchScreenV2} />
      <Stack.Screen name="InStoreCashbackSearchScreen" component={InStoreCashbackSearchScreen} />
    </Stack.Navigator>
  );
};
