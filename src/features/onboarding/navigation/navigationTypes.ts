import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/navigationTypes';
import type { EditFormsStackParamList } from '../../edit-forms/navigation/navigationType';

export type OnBoardingStackParamList = {
  Dashboard: undefined;
  LegalAgreementTerm: undefined;
  IdentityVerificationTerm: undefined;
  VerifyIdentityDocumentInfo: VerifyIDentityDocumentRouteProp | undefined;
  TaxObligations: undefined;
  DriversLicence: undefined;
  PersonalDetails: undefined;
  ProfileName: undefined;
  ProfilePhoneNumber: undefined;
  ProfileResidentialAddress: undefined;
  ProfileResidentialAddressManual: undefined;
  ProfileDoB: undefined;
  IdSelection: undefined;
  Passport: undefined;
  TaxObligationsEntry: undefined;
  AgeNotQualified: undefined;
  GeneralError: GeneralErrorRouteProps | undefined;
  Success: undefined;
  Decline: undefined;
  CheckingDetails: CheckingDetailsRouteProps;
  Waiting: undefined;
  UkBiometrics: undefined;
  UkVerifyIdentityDocumentInfo: UkVerifyIDentityDocumentRouteProp;
  UkPasscode: undefined;
  UkVerifyMobileNumber: undefined;
  UkSubmitMobileOTP: undefined;
  UkBiometricReEnrollment: undefined;
} & EditFormsStackParamList;

export type OnboardingScreenNavigationProp<T extends keyof OnBoardingStackParamList> = CompositeNavigationProp<
  StackNavigationProp<OnBoardingStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type OnboardingScreenRouteProp<T extends keyof OnBoardingStackParamList> = RouteProp<
  OnBoardingStackParamList,
  T
>;

type CheckingDetailsRouteProps = {
  statusIsInprogress?: boolean;
};

type VerifyIDentityDocumentRouteProp = {
  onfidoToken?: string;
};

type UkVerifyIDentityDocumentRouteProp = {
  userToken: string;
};

type GeneralErrorRouteProps = {
  closeCallback?: () => void;
  ctaText?: string;
  secondaryCtaText?: string;
  secondaryCtaCallback?: () => void;
};
