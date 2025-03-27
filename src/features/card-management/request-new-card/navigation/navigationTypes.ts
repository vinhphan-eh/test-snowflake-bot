import type { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { PinSetupParamList } from '../../../../common/screens/pin-setup/navigation/navigationType';
import type { RootStackParamList } from '../../../../navigation/navigationTypes';

export type RequestNewCardStackParamList = {
  ReportCard: undefined;
  ConfirmMailingAddress: undefined;
  PinSetupStack: NavigatorScreenParams<PinSetupParamList>;
  SetPinError: undefined;
  RequestNewCardSuccess: undefined;
  RequestNewCardError: undefined;
};

export type RequestNewCardScreenNavigationProp<T extends keyof RequestNewCardStackParamList> = CompositeNavigationProp<
  StackNavigationProp<RequestNewCardStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type ReportCardScreenRouteProp<T extends keyof RequestNewCardStackParamList> = RouteProp<
  RequestNewCardStackParamList,
  T
>;
