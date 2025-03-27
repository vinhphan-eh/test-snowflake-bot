import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { BenefitsStackParamList } from './navigationTypes';
import { noHeader } from '../../../../common/navigation/navigationPresets';
import { SupportNavigator } from '../../../support/navigation';
import { BillStreamNavigator } from '../../bill-streaming/navigation';
import { CardLinkOffersNavigator } from '../../cash-back/card-link-offers/navigation';
import { CashbackStackNavigator } from '../../cash-back/navigation';
import { GroupNavigator } from '../../group/navigation';
import { SwagStoreStackNavigator } from '../../swag-store/navigation';
import { OrderHistoryNavigator } from '../../swag-store/order-history/navigation';
import { DiscountShopNavigator } from '../../swag-store/shop/navigation';
import { GeneralSearchScreen } from '../screens/search/GeneralSearchScreen';

const Stack = createStackNavigator<BenefitsStackParamList>();

export const BenefitsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen name="OrderHistoryStack" component={OrderHistoryNavigator} />
      <Stack.Screen name="CardLinkOffersStack" component={CardLinkOffersNavigator} />
      <Stack.Screen name="SupportStack" component={SupportNavigator} />
      <Stack.Screen name="DiscountShopStack" component={DiscountShopNavigator} />
      <Stack.Screen name="BillStreamStack" component={BillStreamNavigator} />
      <Stack.Screen name="GroupStack" component={GroupNavigator} />
      <Stack.Screen name="CashbackStack" component={CashbackStackNavigator} />
      <Stack.Screen name="GeneralSearchScreen" component={GeneralSearchScreen} />
      <Stack.Screen name="SwagStoreStack" component={SwagStoreStackNavigator} />
    </Stack.Navigator>
  );
};
