import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { SalarySacrificeStackParamList } from './navigationTypes';
import { noHeader } from '../../../../common/navigation/navigationPresets';
import { ActiveEmployerScreen } from '../screens/ActiveEmployerScreen';
import { ContributedOptionScreen } from '../screens/ContributedOptionScreen';
import { EditSuperContributionScreen } from '../screens/EditSuperContributionScreen';
import { InputDollarAmountScreen } from '../screens/InputDollarAmountScreen';
import { InputPercentageAmountScreen } from '../screens/InputPercentageAmountScreen';
import { ManageContributionsScreen } from '../screens/ManageContributionsScreen';
import { PreservedEarningScreen } from '../screens/PreservedEarningScreen';
import { ReviewScreen } from '../screens/ReviewScreen';
import { SalarySacrificeIntroScreen } from '../screens/SalarySacrificeIntroScreen';
import { StartAndStopContributionScreen } from '../screens/StartAndStopContributionScreen';
import { SubmitContributionFailedScreen } from '../screens/SubmitContributionFailedScreen';
import { SubmitContributionSuccessScreen } from '../screens/SubmitContributionSuccessScreen';

const Stack = createStackNavigator<SalarySacrificeStackParamList>();

export const SalarySacrificeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen name="SalarySacrificeIntro" component={SalarySacrificeIntroScreen} />
      <Stack.Screen name="ActiveEmployer" component={ActiveEmployerScreen} />
      <Stack.Screen name="ContributedOption" component={ContributedOptionScreen} />
      <Stack.Screen name="InputDollarAmount" component={InputDollarAmountScreen} />
      <Stack.Screen name="InputPercentageAmount" component={InputPercentageAmountScreen} />
      <Stack.Screen name="PreservedEarning" component={PreservedEarningScreen} />
      <Stack.Screen name="StartAndStopContribution" component={StartAndStopContributionScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="SubmitContributionSuccess" component={SubmitContributionSuccessScreen} />
      <Stack.Screen name="SubmitContributionFailed" component={SubmitContributionFailedScreen} />
      <Stack.Screen name="ManageContributions" component={ManageContributionsScreen} />
      <Stack.Screen name="EditSuperContribution" component={EditSuperContributionScreen} />
    </Stack.Navigator>
  );
};
