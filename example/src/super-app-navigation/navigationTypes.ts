import type { NavigatorScreenParams } from '@react-navigation/native';

export type MainStackParamList = {
  Tab: NavigatorScreenParams<MainTabParamList>;
};

export type MainTabParamList = {
  Home: undefined;
  Settings: undefined;
};
export type TopTabParamList = {
  Work: undefined;
  Personal: undefined;
};
