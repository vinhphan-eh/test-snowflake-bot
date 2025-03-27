import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../navigation/navigationTypes';
import type { TCustomGroupDetail } from '../hooks/useGroupsData';

export type GroupStackParamList = {
  GroupDetailScreen: GroupDetailParam;
  JoinWaitListIntroScreen: {
    onJoinWaitListSuccess?: () => void;
  };
  JoinGroupSuccessScreen: undefined;
  JoinGroupFailedScreen: { errorMessage: string };
  Error: undefined;
};

type GroupDetailParam = {
  group: TCustomGroupDetail;
};

export type GroupNavigationProp<T extends keyof GroupStackParamList> = CompositeNavigationProp<
  StackNavigationProp<GroupStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type GroupRouteProp<T extends keyof GroupStackParamList> = RouteProp<GroupStackParamList, T>;
