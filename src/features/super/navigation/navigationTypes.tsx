import type { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/navigationTypes';
import type { LifecycleEvent, SwagSuperfund } from '../../../new-graphql/generated';
import type { ConsolidationStackParamList } from '../consolidation/navigation/navigationTypes';
import type { ActiveMembership } from '../hooks/useActiveSuperfundMemberships';
import type { SalarySacrificeStackParamList } from '../salary-sacrifice/navigation/navigationTypes';

export type TrackingAttributes = Record<string, string | number | boolean>;

export type SuperStackParamList = {
  SuperIntro: undefined;
  ActiveMembership: { title: string; resync?: boolean };
  SuperDetailConfirm: {
    title: string;
    membership: ActiveMembership;
    trackingAttributes?: TrackingAttributes;
    resync?: boolean;
  };
  SuperComplete: { resync?: boolean; trackingAttributes?: TrackingAttributes };
  SuperConfirmFailed: { errorMessage: string; resync?: boolean; trackingAttributes?: TrackingAttributes };
  SalarySacrificeStack: NavigatorScreenParams<SalarySacrificeStackParamList>;
  SuperfundDetails: { title: string; swagSuperfund: SwagSuperfund; trackingAttributes?: TrackingAttributes };
  ConsolidationStack: NavigatorScreenParams<ConsolidationStackParamList>;
  EventDetails: { title: string; eventDetails: LifecycleEvent };
};

export type SuperScreenNavigationProp<T extends keyof SuperStackParamList> = CompositeNavigationProp<
  StackNavigationProp<SuperStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type SuperScreenRouteProp<T extends keyof SuperStackParamList> = RouteProp<SuperStackParamList, T>;
