import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { RequestNewCardStackParamList } from './navigationTypes';
import PinSetupStackNavigator from '../../../../common/screens/pin-setup/navigation';
import { ConfirmMailingAddressScreen } from '../screens/ConfirmMailingAddressScreen';
import { ReportCardScreen } from '../screens/ReportCardScreen';
import { RequestNewCardErrorScreen } from '../screens/RequestNewCardErrorScreen';
import { RequestNewCardSuccessScreen } from '../screens/RequestNewCardSuccessScreen';
import { SetPinErrorScreen } from '../screens/SetPinErrorScreen';

const Stack = createStackNavigator<RequestNewCardStackParamList>();

export const RequestNewCardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ReportCard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReportCard" component={ReportCardScreen} />
      <Stack.Screen name="ConfirmMailingAddress" component={ConfirmMailingAddressScreen} />
      <Stack.Screen name="PinSetupStack" component={PinSetupStackNavigator} />
      <Stack.Screen name="SetPinError" component={SetPinErrorScreen} />
      <Stack.Screen name="RequestNewCardSuccess" component={RequestNewCardSuccessScreen} />
      <Stack.Screen name="RequestNewCardError" component={RequestNewCardErrorScreen} />
    </Stack.Navigator>
  );
};
