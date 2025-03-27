import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../navigation/navigationTypes';

export type DigitalWalletStackParamList = {
  DigitalWalletSetup: { isOnboarding: boolean };
  DigitalWalletOutcome: { isOnboarding: boolean; outcome: 'success' | 'failure' };
};

export type DigitalWalletScreenNavigationProp<T extends keyof DigitalWalletStackParamList> = CompositeNavigationProp<
  StackNavigationProp<DigitalWalletStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type DigitalWalletScreenRouteProp<T extends keyof DigitalWalletStackParamList> = RouteProp<
  DigitalWalletStackParamList,
  T
>;
