import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { OnBoardingStackParamList } from './navigationTypes';
import { defineEditScreens } from '../../edit-forms/navigation';
import { AgeNotQualifiedScreen } from '../screens/AgeNotQualifiedScreen';
import { CheckingDetailsScreen } from '../screens/CheckingDetailsScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { DeclineScreen } from '../screens/DeclineScreen';
import { DriversLicenceScreen } from '../screens/DriversLicenceScreen';
import { GeneralErrorScreen } from '../screens/GeneralErrorScreen';
import { IdentityVerificationTermsScreen } from '../screens/IdentityVerificationTermsScreen';
import { IdSelectionScreen } from '../screens/IdSelectionScreen';
import { LegalAgreementTermScreen } from '../screens/LegalAgreementTermScreen';
import { PassportScreen } from '../screens/PassportScreen';
import { ProfileDetailsScreen } from '../screens/ProfileDetailsScreen';
import { ProfileDoBScreen } from '../screens/ProfileDoBScreen';
import { ProfileNameScreen } from '../screens/ProfileNameScreen';
import { ProfilePhoneNumberScreen } from '../screens/ProfilePhoneNumberScreen';
import { ProfileResidentialAddressManualScreen } from '../screens/ProfileResidentialAddressManualScreen';
import { ProfileResidentialAddressScreen } from '../screens/ProfileResidentialAddressScreen';
import { SuccessScreen } from '../screens/SuccessScreen';
import { TaxObligationsEntryScreen } from '../screens/TaxObligationsEntryScreen';
import { TaxObligationsScreen } from '../screens/TaxObligationsScreen';
import { UkBiometricReEnrollmentScreen } from '../screens/UkBiometricReEnrollmentScreen';
import { UkBiometricsScreen } from '../screens/UkBiometricsScreen';
import { UkPasscodeScreen } from '../screens/UkPasscodeScreen';
import { UkSubmitMobileOTPScreen } from '../screens/UkSubmitMobileOTPScreen';
import { UkVerifyIdentityDocumentInfoScreen } from '../screens/UkVerifyIdentityDocumentScreen';
import { UkVerifyMobileNumberScreen } from '../screens/UKVerifyMobileNumberScreen';
import { VerifyIdentityDocumentInfoScreen } from '../screens/VerifyIdentityDocumentInfoScreen';
import { WaitingScreen } from '../screens/WaitingScreen';

const Stack = createStackNavigator<OnBoardingStackParamList>();

const OnBoardingNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="LegalAgreementTerm" component={LegalAgreementTermScreen} />
      <Stack.Screen name="IdentityVerificationTerm" component={IdentityVerificationTermsScreen} />
      <Stack.Screen name="VerifyIdentityDocumentInfo" component={VerifyIdentityDocumentInfoScreen} />
      <Stack.Screen name="TaxObligations" component={TaxObligationsScreen} />
      <Stack.Screen name="IdSelection" component={IdSelectionScreen} />
      <Stack.Screen name="Passport" component={PassportScreen} />
      <Stack.Screen name="TaxObligationsEntry" component={TaxObligationsEntryScreen} />
      <Stack.Screen name="DriversLicence" component={DriversLicenceScreen} />
      <Stack.Screen name="ProfileName" component={ProfileNameScreen} />
      <Stack.Screen name="ProfilePhoneNumber" component={ProfilePhoneNumberScreen} />
      <Stack.Screen name="ProfileResidentialAddress" component={ProfileResidentialAddressScreen} />
      <Stack.Screen name="ProfileResidentialAddressManual" component={ProfileResidentialAddressManualScreen} />
      <Stack.Screen name="PersonalDetails" component={ProfileDetailsScreen} />
      <Stack.Screen name="UkBiometrics" component={UkBiometricsScreen} />
      <Stack.Screen name="ProfileDoB" component={ProfileDoBScreen} />
      <Stack.Screen name="AgeNotQualified" component={AgeNotQualifiedScreen} />
      <Stack.Screen name="GeneralError" component={GeneralErrorScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen name="Decline" component={DeclineScreen} />
      <Stack.Screen name="CheckingDetails" component={CheckingDetailsScreen} />
      <Stack.Screen name="Waiting" component={WaitingScreen} />
      <Stack.Screen name="UkVerifyIdentityDocumentInfo" component={UkVerifyIdentityDocumentInfoScreen} />
      <Stack.Screen name="UkPasscode" component={UkPasscodeScreen} />
      <Stack.Screen name="UkVerifyMobileNumber" component={UkVerifyMobileNumberScreen} />
      <Stack.Screen name="UkSubmitMobileOTP" component={UkSubmitMobileOTPScreen} />
      <Stack.Screen name="UkBiometricReEnrollment" component={UkBiometricReEnrollmentScreen} />
      {defineEditScreens()}
    </Stack.Navigator>
  );
};

export default OnBoardingNavigator;
