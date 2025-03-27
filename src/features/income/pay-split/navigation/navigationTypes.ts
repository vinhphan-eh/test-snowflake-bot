import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../navigation/navigationTypes';

export type PaySplitStackParamList = {
  PaySplitIntro: PaySplitIntroRouteProp;
  PaySplitOrgList?: PaySplitOrgListRouteProp;
  PaySplitSelectAllocation: undefined;
  PaySplitDollarAllocation: undefined;
  PaySplitPercentageAllocation: undefined;
  PaySplitPercentageInput: undefined;
  PaySplitOutcome: undefined;
  PaySplitError: undefined;
};

export enum PaySplitIntroEntryPoint {
  OrgListSCreenInfoBtn = 'OrgListSCreenInfoBtn',
  OnboardingSuccessNextBtn = 'OnboardingSuccessNextBtn',
}

export type PaySplitScreenNavigationProp<T extends keyof PaySplitStackParamList> = CompositeNavigationProp<
  StackNavigationProp<PaySplitStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type PaySplitRouteProp<T extends keyof PaySplitStackParamList> = RouteProp<PaySplitStackParamList, T>;

type PaySplitIntroRouteProp = {
  entryPoint?: PaySplitIntroEntryPoint;
};

type PaySplitOrgListRouteProp = {
  isOnboarding: boolean;
};
