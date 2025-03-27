import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../navigation/navigationTypes';

export type InstaPayStackParamList = {
  InstaPayIntroV2: InstaPayIntroV2Props;
  InstaPayDrawdownSurvey: undefined;
  InstaPayConfirm: undefined;
  InstaPayDrawdownError: InstaPayDrawdownErrorProp;
  InstaPayConsent: InstaPayConsentProp;
  InstaPayWaiting: InstaPayWaitingProp;
  InstaPayNowMaintenance: undefined;
  InstaPaySimplifiedFlowDrawdownSuccess: InstaPayDrawdownSucceedProp;
  InstaPayNowReceivingAccount: undefined;
  InstaPayTrustedBeneficiaryError: undefined;
  EWAPushNotificationManagement: EWAPushNotificationManagementProp;
};

export enum InstaPayDrawdownErrorCode {
  RefusedMaxBalanceExceeded = 'REFUSED_MAX_BALANCE_EXCEEDED',
  GeneralError = 'GENERAL_ERROR',
  UnderMaintenance = 'system_error:under_maintenance',
}

export type InstaPayScreenNavigationProp<T extends keyof InstaPayStackParamList> = CompositeNavigationProp<
  StackNavigationProp<InstaPayStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type InstaPayRouteProp<T extends keyof InstaPayStackParamList> = RouteProp<InstaPayStackParamList, T>;

type InstaPayDrawdownErrorProp = {
  errorCode?: InstaPayDrawdownErrorCode;
};

type InstaPayDrawdownSucceedProp = {
  version: number;
};

type IPFeature = 'Now' | 'Recurring';

type InstaPayWaitingProp = {
  flow: 'AddBeneficiary';
  feature: IPFeature;
};

type InstaPayConsentProp = {
  feature: IPFeature;
};

export enum InstaPayIntroSource {
  WITHDRAW_NOW = 'Withdraw Now',
  WITHDRAW_RECURRING = 'Withdraw Recurring',
}

type InstaPayIntroV2Props = {
  source: InstaPayIntroSource;
};

type EWAPushNotificationManagementProp = {
  orgId?: string;
};
