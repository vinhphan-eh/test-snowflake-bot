import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { CardSetupStackParamList } from './navigationTypes';
import PinSetupStackNavigator from '../../../../common/screens/pin-setup/navigation';
import { CardSetupCompleteScreen } from '../screens/CardSetupCompleteScreen';
import { ConfirmationScreen } from '../screens/ConfirmationScreen';
import { ErrorScreen } from '../screens/ErrorScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
import { MailingAddressEditScreen } from '../screens/MailingAddressEditScreen';
import { SuccessScreen } from '../screens/SuccessScreen';
import { UkBillingAddressEditScreen } from '../screens/UkBillingAddressEditScreen';
import { UkBillingAddressScreen } from '../screens/UkBillingAddressScreen';

const Stack = createStackNavigator<CardSetupStackParamList>();

const CardSetupNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="PinSetupStack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      <Stack.Screen name="MailingAddressEdit" component={MailingAddressEditScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen name="Error" component={ErrorScreen} />
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="CardSetupComplete" component={CardSetupCompleteScreen} />
      <Stack.Screen name="PinSetupStack" component={PinSetupStackNavigator} />
      <Stack.Screen name="UkBillingAddress" component={UkBillingAddressScreen} />
      <Stack.Screen name="UkBillingAddressEdit" component={UkBillingAddressEditScreen} />
    </Stack.Navigator>
  );
};

export default CardSetupNavigator;
