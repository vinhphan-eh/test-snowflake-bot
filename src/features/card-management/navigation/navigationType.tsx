import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/navigationTypes';

export type CardManagementStackParamList = {
  CardManagementDashboard: undefined;
  RedeemHPWithSwagCardIntro: { isSeenIntro?: boolean } | undefined;
  RedeemHPWithSwagCardSetting: { viaDeepLink?: boolean } | undefined;
};

export type CardManagementScreenNavigationProp<T extends keyof CardManagementStackParamList> = CompositeNavigationProp<
  StackNavigationProp<CardManagementStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type CardManagementScreenRouteProp<T extends keyof CardManagementStackParamList> = RouteProp<
  CardManagementStackParamList,
  T
>;
