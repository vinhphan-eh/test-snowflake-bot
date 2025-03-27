import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../navigation/navigationTypes';

export type SwagStoreStackParamList = {
  GiftCardsSearchScreen?: {
    query?: string;
  };
};

export type SwagStoreNavigationProp<T extends keyof SwagStoreStackParamList> = CompositeNavigationProp<
  StackNavigationProp<SwagStoreStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type SwagStoreRouteProp<T extends keyof SwagStoreStackParamList> = RouteProp<SwagStoreStackParamList, T>;
