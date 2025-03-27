import type { NavigationHelpers, NavigatorScreenParams } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { CORE_SETTINGS_STACK } from './rootNavigation';
import type { CORE_DASH_BOARD, CORE_WORKZONE } from './utils';
import type { BillStreamWaitlistParamList } from '../features/benefits/bill-streaming/navigation/navigationTypes';
import type { BenefitsStackParamList } from '../features/benefits/common/navigation/navigationTypes';
import type { BillManagementMoneyParamList } from '../features/bill-management/navigation/navigationTypes';
import type { DigitalWalletStackParamList } from '../features/card-management/digital-wallet/navigation/navigationTypes';
import type { CardManagementStackParamList } from '../features/card-management/navigation/navigationType';
import type { RequestNewCardStackParamList } from '../features/card-management/request-new-card/navigation/navigationTypes';
import type { HeroPointsStackParamsList } from '../features/hero-points/navigation/navigationTypes';
import type { InstaPayStackParamList } from '../features/income/instapay/navigation/navigationTypes';
import type { InstaPaySchedulingStackParamList } from '../features/income/instapay-scheduling/navigation/navigationTypes';
import type { PaySplitStackParamList } from '../features/income/pay-split/navigation/navigationTypes';
import type { MoneyProfileStackParamList } from '../features/my-profile/navigation/navigationType';
import type { NotificationStackParamList } from '../features/notifications/navigation/navigationTypes';
import type { OnBoardingStackParamList } from '../features/onboarding/navigation/navigationTypes';
import type { PayAnyoneStackParamList } from '../features/spend-account/pay-anyone/navigation/navigationTypes';
import type { SSOStackParamList } from '../features/sso/navigation/navigationTypes';
import type { StashStackParamList } from '../features/stash/navigation/navigationTypes';
import type { SuperStackParamList } from '../features/super/navigation/navigationTypes';
import type { SupportStackParamList } from '../features/support/navigation/navigationTypes';
import type { InstapayIntroductionParamList } from '../features/swag-dashboard/instapay-introduction/navigation/navigationTypes';
import type { SwagPayslipsExperimentStackParamsList } from '../features/swag-payslips/navigation/navigationTypes';
import type { CardSetupStackParamList } from '../features/wallet/card-setup/navigation/navigationTypes';

export type RootStackParamList = {
  // Root screen of pillar switch on super app
  [CORE_DASH_BOARD]: undefined;
  [CORE_WORKZONE]: undefined;
  [CORE_SETTINGS_STACK]: undefined;
  OnboardingStack: NavigatorScreenParams<OnBoardingStackParamList>;
  CardSetupStack: NavigatorScreenParams<CardSetupStackParamList>;
  PaySplitStack: NavigatorScreenParams<PaySplitStackParamList>;
  PayAnyoneStack: NavigatorScreenParams<PayAnyoneStackParamList>;
  IncomeStack: NavigatorScreenParams<InstaPayStackParamList>;
  CardManagementStack: NavigatorScreenParams<CardManagementStackParamList>;
  DigitalWalletStack: NavigatorScreenParams<DigitalWalletStackParamList>;
  RequestNewCardStack: NavigatorScreenParams<RequestNewCardStackParamList>;
  NotificationStack: NavigatorScreenParams<NotificationStackParamList>;
  SupportStack: NavigatorScreenParams<SupportStackParamList>;
  BenefitsStack: NavigatorScreenParams<BenefitsStackParamList>;
  HeroPointsStack: NavigatorScreenParams<HeroPointsStackParamsList>;
  SuperStack: NavigatorScreenParams<SuperStackParamList>;
  MoneyProfileStack: NavigatorScreenParams<MoneyProfileStackParamList>;
  StashStack: NavigatorScreenParams<StashStackParamList>;
  BillStreamWaitlist: NavigatorScreenParams<BillStreamWaitlistParamList>;
  BillManagementMoney: NavigatorScreenParams<BillManagementMoneyParamList>;
  SwagPayslipsExperimentStack: NavigatorScreenParams<SwagPayslipsExperimentStackParamsList>;
  InstapayIntroductionStack: NavigatorScreenParams<InstapayIntroductionParamList>;
  InstaPaySchedulingStack: NavigatorScreenParams<InstaPaySchedulingStackParamList>;
  SSOStack: NavigatorScreenParams<SSOStackParamList>;
};

export type RootStackNavigationProp<T extends keyof RootStackParamList> = StackNavigationProp<RootStackParamList, T>;

export type ScreenLocator =
  | {
      stack: 'OnboardingStack';
      screen: NavigatorScreenParams<OnBoardingStackParamList>;
    }
  | {
      stack: 'CardSetupStack';
      screen: NavigatorScreenParams<CardSetupStackParamList>;
    }
  | {
      stack: 'DigitalWalletStack';
      screen: NavigatorScreenParams<DigitalWalletStackParamList>;
    }
  | {
      stack: 'PaySplitStack';
      screen: NavigatorScreenParams<PaySplitStackParamList>;
    }
  | {
      stack: 'MoneyProfileStack';
      screen: NavigatorScreenParams<MoneyProfileStackParamList>;
    };

export type RootNavigate = NavigationHelpers<RootStackParamList>['navigate'];

export type NavigateFromRootParams<RouteName extends keyof RootStackParamList> =
  // this first condition allows us to iterate over a union type
  // This is to avoid getting a union of all the params from `ParamList[RouteName]`,
  // which will get our types all mixed up if a union RouteName is passed in.
  RouteName extends unknown
    ? // This condition checks if the params are optional,
      // which means it's either undefined or a union with undefined
      undefined extends RootStackParamList[RouteName]
      ?
          | [screen: RouteName] // if the params are optional, we don't have to provide it
          | [screen: RouteName, params: RootStackParamList[RouteName]]
      : [screen: RouteName, params: RootStackParamList[RouteName]]
    : never;
