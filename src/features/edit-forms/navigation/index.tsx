import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { EditFormsStackParamList } from './navigationType';
import { noHeader } from '../../../common/navigation/navigationPresets';
import { EditDoBScreen } from '../screens/EditDoBScreen';
import { EditNameScreen } from '../screens/EditNameScreen';
import { EditPhoneNumberScreen } from '../screens/EditPhoneNumberScreen';
import { EditResidentialAddressManualScreen } from '../screens/EditResidentialAddressManualScreen';

const Stack = createStackNavigator<EditFormsStackParamList>();

export const defineEditScreens = () => {
  return (
    <>
      <Stack.Screen name="EditName" component={EditNameScreen} options={noHeader} />
      <Stack.Screen name="EditPhoneNumber" component={EditPhoneNumberScreen} options={noHeader} />
      <Stack.Screen
        name="EditResidentialAddressManual"
        component={EditResidentialAddressManualScreen}
        options={noHeader}
      />
      <Stack.Screen name="EditDoB" component={EditDoBScreen} options={noHeader} />
    </>
  );
};
