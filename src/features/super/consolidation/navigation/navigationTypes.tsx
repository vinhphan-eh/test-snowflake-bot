import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../navigation/navigationTypes';
import type { SuperConsolidation, SwagSuperfund } from '../../../../new-graphql/generated';
import type { TrackingAttributes } from '../../navigation/navigationTypes';

export type ConsolidationStackParamList = {
  SuperConsolidationIntro: { swagSuperfund: SwagSuperfund; trackingAttributes?: TrackingAttributes };
  FindYourLostSuper: {
    title: string;
    fundUrl?: string;
    superConsolidation: Partial<SuperConsolidation>;
    trackingAttributes?: TrackingAttributes;
  };
  LegalAgreement: { title: string; swagSuperfund: SwagSuperfund; trackingAttributes?: TrackingAttributes };
  CreateSuperConsolidationFailed: { errorMessage: string; trackingAttributes?: TrackingAttributes };
  CreateSuperConsolidationSupportRequestSuccessScreen: { fundName: string; trackingAttributes?: TrackingAttributes };
};

export type ConsolidationScreenNavigationProp<T extends keyof ConsolidationStackParamList> = CompositeNavigationProp<
  StackNavigationProp<ConsolidationStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type ConsolidationScreenRouteProp<T extends keyof ConsolidationStackParamList> = RouteProp<
  ConsolidationStackParamList,
  T
>;
