import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { PayAnyoneStackParamList } from './navigationTypes';
import { DailyLimitErrorScreen } from '../screens/DailyLimitErrorScreen';
import { ErrorScreen } from '../screens/ErrorScreen';
import { NewPayeeScreen } from '../screens/NewPayeeScreen';
import { PayeeAddressBookScreen } from '../screens/PayeeAddressBookScreen';
import { PayeeDetailsScreen } from '../screens/PayeeDetailsScreen';
import { PayeeFriendlyNameScreen } from '../screens/PayeeFriendlyNameScreen';
import { PaymentConfirmationScreen } from '../screens/PaymentConfirmationScreen';
import { PaymentDetailsScreen } from '../screens/PaymentDetailsScreen';
import { PaymentLaterScreen } from '../screens/PaymentLaterScreen';
import { PaymentRecurringScreen } from '../screens/PaymentRecurringScreen';
import { PaymentTypeScreen } from '../screens/PaymentTypeScreen';
import { ScheduledPaymentDashboardScreen } from '../screens/ScheduledPaymentDashboardScreen';
import { ScheduledPaymentSuccessScreen } from '../screens/ScheduledPaymentSuccessScreen';
import { SuccessScreen } from '../screens/SuccessScreen';
import { TransactionDetailsScreen } from '../screens/TransactionDetailsScreen';
import { UkPayeeDetailsScreen } from '../screens/UkPayeeDetailsScreen';
import { UkPaymentConfirmationScreen } from '../screens/UkPaymentConfirmationScreen';
import { UkPaymentDetailsScreen } from '../screens/UkPaymentDetailsScreen';

const Stack = createStackNavigator<PayAnyoneStackParamList>();

export const PayAnyoneNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="NewPayee" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PayeeAddressBook" component={PayeeAddressBookScreen} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} />
      <Stack.Screen name="PaymentType" component={PaymentTypeScreen} />
      <Stack.Screen name="PaymentLater" component={PaymentLaterScreen} />
      <Stack.Screen name="PaymentRecurring" component={PaymentRecurringScreen} />
      <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen name="ScheduledPaymentSuccess" component={ScheduledPaymentSuccessScreen} />
      <Stack.Screen name="Error" component={ErrorScreen} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
      <Stack.Screen name="UkPayeeDetails" component={UkPayeeDetailsScreen} />
      <Stack.Screen name="UkPaymentDetails" component={UkPaymentDetailsScreen} />
      <Stack.Screen name="UkPaymentConfirmation" component={UkPaymentConfirmationScreen} />
      <Stack.Screen name="ScheduledPaymentDashboard" component={ScheduledPaymentDashboardScreen} />
      <Stack.Screen name="NewPayee" component={NewPayeeScreen} />
      <Stack.Screen name="PayeeFriendlyName" component={PayeeFriendlyNameScreen} />
      <Stack.Screen name="PayeeDetails" component={PayeeDetailsScreen} />
      <Stack.Screen name="DailyLimitError" component={DailyLimitErrorScreen} />
    </Stack.Navigator>
  );
};
