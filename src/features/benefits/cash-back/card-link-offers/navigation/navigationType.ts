import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../../navigation/navigationTypes';
import type { RequestFormProps } from '../../../../support/navigation/navigationTypes';
import type { BenefitsStackParamList } from '../../../common/navigation/navigationTypes';

export type IntroductionContent = {
  heading: string;
  verbiage: string;
};

export type CashbackIntroductionContent = {
  step1: IntroductionContent;
  step2: IntroductionContent;
  step3: IntroductionContent;
};

export type CardLinkOffersStackParamList = {
  AddCardCashbackDashboard: undefined;
  CashbackIntroduction: CashbackIntroductionRouteProp;
  EnrolCardDetails: EnrolCardDetailsRouteProp;
  ManageCashbackDashboard: { transactionId?: string } | undefined;
  ContactForm: RequestFormProps;
  TermsAndConditions: undefined;
};

export type CardLinkOffersNavigationProp<T extends keyof CardLinkOffersStackParamList> = CompositeNavigationProp<
  StackNavigationProp<CardLinkOffersStackParamList, T>,
  CompositeNavigationProp<StackNavigationProp<BenefitsStackParamList>, StackNavigationProp<RootStackParamList>>
>;

export type CardLinkOffersRouteProp<T extends keyof CardLinkOffersStackParamList> = RouteProp<
  CardLinkOffersStackParamList,
  T
>;

type CashbackIntroductionRouteProp = {
  introduction?: CashbackIntroductionContent;
  tncParams?: {
    onDismiss: () => void;
    onSuccess: () => void;
    shouldTriggerAfterCarousel: boolean;
  };
  onPressNotReady?: () => void;
};

type EnrolCardDetailsRouteProp = {
  haveHeroWallet: boolean;
};
