import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { BillStreamParamList, BillStreamWaitlistParamList } from './navigationTypes';
import { noHeader } from '../../../../common/navigation/navigationPresets';

import { BillOfferDetailScreen } from '../screens/BillOfferDetailScreen';
import { BillOfferSearchScreen } from '../screens/BillOfferSearchScreen';
import { BillSignUpWebViewScreen } from '../screens/BillSignUpWebViewScreen';
import { BillStreamWaitlistFailedScreen } from '../screens/BillStreamWaitlistFailedScreen';
import { BillStreamWaitlistIntroScreen } from '../screens/BillStreamWaitlistIntroScreen';
import { BillStreamWaitlistSignupScreen } from '../screens/BillStreamWaitlistSignupScreen';
import { BillStreamWaitlistSuccessScreen } from '../screens/BillStreamWaitlistSuccessScreen';
import { HealthInsuranceJoinWaitlistScreen } from '../screens/HealthInsuranceJoinWaitlistScreen';

const Stack = createStackNavigator<BillStreamParamList>();

const WaitlistStack = createStackNavigator<BillStreamWaitlistParamList>();

export const BillStreamNavigator = () => {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen name="BillOfferDetailScreen" component={BillOfferDetailScreen} />
      <Stack.Screen name="BillSignUpWebView" component={BillSignUpWebViewScreen} />
      <Stack.Screen name="BillOfferSearchScreen" component={BillOfferSearchScreen} />
    </Stack.Navigator>
  );
};

export const BillStreamWaitlistNavigator = () => {
  return (
    <WaitlistStack.Navigator initialRouteName="BillStreamWaitlistIntro" screenOptions={noHeader}>
      <WaitlistStack.Screen name="BillStreamWaitlistIntro" component={BillStreamWaitlistIntroScreen} />
      <WaitlistStack.Screen name="BillStreamWaitlistSignup" component={BillStreamWaitlistSignupScreen} />
      <WaitlistStack.Screen name="BillStreamWaitlistSuccessScreen" component={BillStreamWaitlistSuccessScreen} />
      <WaitlistStack.Screen name="BillStreamWaitlistFailedScreen" component={BillStreamWaitlistFailedScreen} />
      <WaitlistStack.Screen name="HealthInsuranceJoinWaitlistScreen" component={HealthInsuranceJoinWaitlistScreen} />
    </WaitlistStack.Navigator>
  );
};
