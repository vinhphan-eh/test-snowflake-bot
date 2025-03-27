import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { MoneyProfileStackParamList } from './navigationType';
import { noHeader } from '../../../common/navigation/navigationPresets';
import { defineEditScreens } from '../../edit-forms/navigation';
import { PhoneNumberDuplicatedScreen } from '../screens/PhoneNumberDuplicatedScreen';
import { ResidentialAddressScreen } from '../screens/ResidentialAddressScreen';
import { SomethingWentWrongScreen } from '../screens/SomethingWentWrongScreen';
import { WaitingScreen } from '../screens/WaitingScreen';

const Stack = createStackNavigator<MoneyProfileStackParamList>();

export const MoneyProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SomethingWentWrong" screenOptions={noHeader}>
      <Stack.Screen name="SomethingWentWrong" component={SomethingWentWrongScreen} />
      <Stack.Screen name="PhoneNumberDuplicated" component={PhoneNumberDuplicatedScreen} />
      <Stack.Screen name="ResidentialAddress" component={ResidentialAddressScreen} />
      <Stack.Screen name="Waiting" component={WaitingScreen} />
      {defineEditScreens()}
    </Stack.Navigator>
  );
};

export const defineMoneyProfileScreens = () => {
  return (
    <>
      <Stack.Screen name="SomethingWentWrong" component={SomethingWentWrongScreen} options={noHeader} />
      <Stack.Screen name="PhoneNumberDuplicated" component={PhoneNumberDuplicatedScreen} options={noHeader} />
      <Stack.Screen name="ResidentialAddress" component={ResidentialAddressScreen} options={noHeader} />
      <Stack.Screen name="Waiting" component={WaitingScreen} options={noHeader} />
      {defineEditScreens()}
    </>
  );
};
