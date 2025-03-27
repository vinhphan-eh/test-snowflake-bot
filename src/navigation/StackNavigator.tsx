import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import type { RootStackParamList } from './navigationTypes';
import { withHDTheme } from '../common/hoc/withHDTheme';
import { noHeader } from '../common/navigation/navigationPresets';
import { BillStreamWaitlistNavigator } from '../features/benefits/bill-streaming/navigation';
import { BenefitsNavigator } from '../features/benefits/common/navigation';
import { BillManagementMoneyNavigator } from '../features/bill-management/navigation';
import { DigitalWalletNavigator } from '../features/card-management/digital-wallet/navigation';
import { CardManagementNavigator } from '../features/card-management/navigation';
import { RequestNewCardNavigator } from '../features/card-management/request-new-card/navigation';
import { HeroPointsNavigator } from '../features/hero-points/navigation';
import { IncomeStack } from '../features/income/instapay/navigation';
import { InstaPaySchedulingStack } from '../features/income/instapay-scheduling/navigation';
import PaySplitNavigator from '../features/income/pay-split/navigation';
import { MoneyProfileNavigator } from '../features/my-profile/navigation';
import NotificationNavigator from '../features/notifications/navigation';
import OnBoardingNavigator from '../features/onboarding/navigation';
import { PayAnyoneNavigator } from '../features/spend-account/pay-anyone/navigation';
import SSOStackNavigator from '../features/sso/navigation';
import { StashNavigator } from '../features/stash/navigation';
import { SuperNavigator } from '../features/super/navigation';
import { SupportNavigator } from '../features/support/navigation';
import { InstapayIntroductionStackNavigator } from '../features/swag-dashboard/instapay-introduction/navigation';
import { SwagPayslipsExperimentStack } from '../features/swag-payslips/navigation';
import CardSetupNavigator from '../features/wallet/card-setup/navigation';

const RootStack = createStackNavigator<RootStackParamList>();

export const defineWalletAppScreens = () => (
  <>
    <RootStack.Screen name="OnboardingStack" options={noHeader}>
      {withHDTheme(OnBoardingNavigator)}
    </RootStack.Screen>
    <RootStack.Screen name="PaySplitStack" options={noHeader}>
      {withHDTheme(PaySplitNavigator)}
    </RootStack.Screen>
    <RootStack.Screen name="PayAnyoneStack" options={noHeader}>
      {withHDTheme(PayAnyoneNavigator)}
    </RootStack.Screen>
    <RootStack.Screen name="IncomeStack" options={noHeader}>
      {withHDTheme(IncomeStack)}
    </RootStack.Screen>
    <RootStack.Screen name="CardSetupStack" options={noHeader}>
      {withHDTheme(CardSetupNavigator)}
    </RootStack.Screen>
    <RootStack.Screen name="CardManagementStack" options={noHeader}>
      {withHDTheme(CardManagementNavigator)}
    </RootStack.Screen>
    <RootStack.Screen name="RequestNewCardStack" options={noHeader}>
      {withHDTheme(RequestNewCardNavigator)}
    </RootStack.Screen>
    <RootStack.Screen name="DigitalWalletStack" options={noHeader}>
      {withHDTheme(DigitalWalletNavigator)}
    </RootStack.Screen>
    <RootStack.Screen name="NotificationStack" options={{ ...noHeader, ...TransitionPresets.ModalSlideFromBottomIOS }}>
      {withHDTheme(NotificationNavigator)}
    </RootStack.Screen>
    <RootStack.Screen name="SupportStack" options={noHeader}>
      {withHDTheme(SupportNavigator)}
    </RootStack.Screen>
    <RootStack.Screen name="BenefitsStack" options={noHeader}>
      {withHDTheme(BenefitsNavigator, 'eBens')}
    </RootStack.Screen>
    <RootStack.Screen name="HeroPointsStack" options={noHeader}>
      {withHDTheme(HeroPointsNavigator)}
    </RootStack.Screen>
    <RootStack.Screen name="MoneyProfileStack" options={noHeader}>
      {withHDTheme(MoneyProfileNavigator, 'swag')}
    </RootStack.Screen>
    <RootStack.Screen name="SuperStack" options={noHeader}>
      {withHDTheme(SuperNavigator)}
    </RootStack.Screen>
    <RootStack.Screen name="StashStack" options={noHeader}>
      {withHDTheme(StashNavigator)}
    </RootStack.Screen>
    <RootStack.Screen name="BillStreamWaitlist" options={{ ...noHeader, ...TransitionPresets.ModalSlideFromBottomIOS }}>
      {withHDTheme(BillStreamWaitlistNavigator, 'eBens')}
    </RootStack.Screen>
    <RootStack.Screen name="BillManagementMoney" options={noHeader}>
      {withHDTheme(BillManagementMoneyNavigator)}
    </RootStack.Screen>
    <RootStack.Screen name="SwagPayslipsExperimentStack" options={noHeader}>
      {withHDTheme(SwagPayslipsExperimentStack, 'work')}
    </RootStack.Screen>
    <RootStack.Screen name="InstapayIntroductionStack" options={noHeader}>
      {withHDTheme(InstapayIntroductionStackNavigator, 'wallet')}
    </RootStack.Screen>
    <RootStack.Screen name="InstaPaySchedulingStack" options={noHeader}>
      {withHDTheme(InstaPaySchedulingStack, 'wallet')}
    </RootStack.Screen>
    <RootStack.Screen name="SSOStack" options={noHeader}>
      {withHDTheme(SSOStackNavigator, 'wallet')}
    </RootStack.Screen>
  </>
);
