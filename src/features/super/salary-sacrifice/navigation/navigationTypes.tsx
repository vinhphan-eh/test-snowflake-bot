import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../navigation/navigationTypes';
import type { TrackingAttributes } from '../../navigation/navigationTypes';

export type SalarySacrificeStackParamList = {
  SalarySacrificeIntro: { trackingAttributes?: TrackingAttributes };
  ActiveEmployer: { title: string; trackingAttributes?: TrackingAttributes };
  ContributedOption: { title: string; trackingAttributes?: TrackingAttributes };
  InputDollarAmount: { title: string; trackingAttributes?: TrackingAttributes };
  InputPercentageAmount: { title: string; trackingAttributes?: TrackingAttributes };
  PreservedEarning: { title: string; trackingAttributes?: TrackingAttributes };
  StartAndStopContribution: { title: string; trackingAttributes?: TrackingAttributes };
  Review: { title: string; trackingAttributes?: TrackingAttributes };
  SubmitContributionFailed: { errorMessage: string; trackingAttributes?: TrackingAttributes };
  SubmitContributionSuccess: { trackingAttributes?: TrackingAttributes };
  ManageContributions: { title: string; trackingAttributes?: TrackingAttributes };
  EditSuperContribution: { title: string; trackingAttributes?: TrackingAttributes };
};

export type SacrificeScreenNavigationProp<T extends keyof SalarySacrificeStackParamList> = CompositeNavigationProp<
  StackNavigationProp<SalarySacrificeStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type SalarySacrificeScreenRouteProp<T extends keyof SalarySacrificeStackParamList> = RouteProp<
  SalarySacrificeStackParamList,
  T
>;
