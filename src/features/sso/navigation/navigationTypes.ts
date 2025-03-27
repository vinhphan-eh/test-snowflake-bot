import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { PillarIds } from '../../../common/stores/useSessionStore';
import type { RootStackParamList } from '../../../navigation/navigationTypes';

export type SSOStackParamList = {
  SSOError: SSOErrorRouteProps;
};

type SSOErrorRouteProps = {
  pillar: PillarIds;
};

export type SSOScreenNavigationProp<T extends keyof SSOStackParamList> = CompositeNavigationProp<
  StackNavigationProp<SSOStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type SSOScreenRouteProp<T extends keyof SSOStackParamList> = RouteProp<SSOStackParamList, T>;
