import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../navigation/navigationTypes';

export type InstapayIntroductionParamList = {
  ChoosePayMethodScreen: undefined;
  ChooseInstapayMethodScreen: undefined;
  InstapayNowIntroCarouselScreen: undefined;
};
export type InstapayIntroductionNavigationProp<T extends keyof InstapayIntroductionParamList> = CompositeNavigationProp<
  StackNavigationProp<InstapayIntroductionParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type InstapayIntroductionRouteProp<T extends keyof InstapayIntroductionParamList> = RouteProp<
  InstapayIntroductionParamList,
  T
>;
