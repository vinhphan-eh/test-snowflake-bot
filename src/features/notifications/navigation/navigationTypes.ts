import type { CompositeNavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import type { RootStackParamList } from '../../../navigation/navigationTypes';

export type NotificationStackParamList = {
  TransactWithIncentive: undefined;
};

export type NotificationScreenNavigationProp<T extends keyof NotificationStackParamList> = CompositeNavigationProp<
  StackNavigationProp<NotificationStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;
