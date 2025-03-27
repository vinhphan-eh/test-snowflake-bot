import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { InstaPayStackParamList } from './navigationTypes';
import { noHeader } from '../../../../common/navigation/navigationPresets';
import { InstaPayConfirmScreen } from '../screens/InstaPayConfirmScreen';
import { InstaPayConsentScreen } from '../screens/InstaPayConsentScreen';
import { InstaPayDrawdownErrorScreen } from '../screens/InstaPayDrawdownErrorScreen';
import { InstaPayDrawdownSurveyScreen } from '../screens/InstaPayDrawdownSurveyScreen';
import { InstaPayIntroV2Screen } from '../screens/InstaPayIntroV2Screen';
import { InstaPayNowMaintenanceScreen } from '../screens/InstaPayNowMaintenanceScreen';
import { InstaPayNowReceivingAccountScreen } from '../screens/InstaPayNowReceivingAccountScreen';
import { InstaPayTrustedBeneficiaryErrorScreen } from '../screens/InstaPayTrustedBeneficiaryErrorScreen';
import { InstaPayWaitingScreen } from '../screens/InstaPayWaitingScreen';
import { InstaPayNowSimplifiedFlowDrawdownSuccessScreen } from '../simplified-flow/screens/InstaPayNowSimplifiedFlowDrawdownSuccessScreen';
import { EWAPushNotificationManagementScreen } from '../push-notification/screens/EWAPushNotificationManagementScreen';

const Stack = createStackNavigator<InstaPayStackParamList>();

export const IncomeStack = () => {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen name="InstaPayIntroV2" component={InstaPayIntroV2Screen} />
      <Stack.Screen name="InstaPayDrawdownSurvey" component={InstaPayDrawdownSurveyScreen} />
      <Stack.Screen name="InstaPayConfirm" component={InstaPayConfirmScreen} />
      <Stack.Screen name="InstaPayDrawdownError" component={InstaPayDrawdownErrorScreen} />
      <Stack.Screen name="InstaPayConsent" component={InstaPayConsentScreen} />
      <Stack.Screen name="InstaPayWaiting" component={InstaPayWaitingScreen} />
      <Stack.Screen name="InstaPayNowMaintenance" component={InstaPayNowMaintenanceScreen} />
      <Stack.Screen
        name="InstaPaySimplifiedFlowDrawdownSuccess"
        component={InstaPayNowSimplifiedFlowDrawdownSuccessScreen}
      />
      <Stack.Screen name="InstaPayNowReceivingAccount" component={InstaPayNowReceivingAccountScreen} />
      <Stack.Screen name="InstaPayTrustedBeneficiaryError" component={InstaPayTrustedBeneficiaryErrorScreen} />
      <Stack.Screen name="EWAPushNotificationManagement" component={EWAPushNotificationManagementScreen} />
    </Stack.Navigator>
  );
};
