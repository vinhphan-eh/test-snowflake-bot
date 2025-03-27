import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../navigation/navigationTypes';
import type { BmOffer } from '../../../../new-graphql/generated';
import type { BenefitsStackParamList } from '../../common/navigation/navigationTypes';

export type BillStreamParamList = {
  BillOfferDetailScreen: BillOfferDetailParam;
  BillSignUpWebView: { url: string; onBackToBill: () => void; headers?: object; title?: string };
  BillOfferSearchScreen?: {
    query?: string;
    defaultCategory?: {
      code: string;
      name: string;
    };
  };
};

type BillOfferDetailParam = {
  offerId?: string;
  data?: BmOffer;
  onBackToBill: () => void;
};

export type BillWaitlistSuccessParam = {
  description?: string;
};

export type BillStreamNavigationProp<T extends keyof BillStreamParamList> = CompositeNavigationProp<
  StackNavigationProp<BillStreamParamList, T>,
  CompositeNavigationProp<StackNavigationProp<BenefitsStackParamList>, StackNavigationProp<RootStackParamList>>
>;

export type BillStreamRouteProp<T extends keyof BillStreamParamList> = RouteProp<BillStreamParamList, T>;

export type BillStreamWaitlistParamList = {
  BillStreamWaitlistIntro: undefined;
  BillStreamWaitlistSignup: undefined;
  BillStreamWaitlistSuccessScreen?: BillWaitlistSuccessParam;
  BillStreamWaitlistFailedScreen: undefined;
  HealthInsuranceJoinWaitlistScreen: undefined;
};

export type BillStreamWaitlistNavigationProp<T extends keyof BillStreamWaitlistParamList> = CompositeNavigationProp<
  StackNavigationProp<BillStreamWaitlistParamList, T>,
  CompositeNavigationProp<StackNavigationProp<BenefitsStackParamList>, StackNavigationProp<RootStackParamList>>
>;

export type BillStreamWaitlistRouteProp<T extends keyof BillStreamWaitlistParamList> = RouteProp<
  BillStreamWaitlistParamList,
  T
>;
