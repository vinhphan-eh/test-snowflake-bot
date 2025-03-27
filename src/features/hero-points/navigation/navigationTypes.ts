import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/navigationTypes';
import type { HeroPointsTransactionItem } from '../../../new-graphql/generated';

export type HeroPointsStackParamsList = {
  'heroPoints/transactionDetail': {
    transactionData: HeroPointsTransactionItem;
  };
  'heroPoints/redeemHPWithSwagIntroduction': {
    onBack: () => void;
    isHeroPointsDashboard: boolean;
  };
};

export type HeroPointsScreenNavigationProp<T extends keyof HeroPointsStackParamsList> = CompositeNavigationProp<
  StackNavigationProp<HeroPointsStackParamsList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type HeroPointsScreenRouteProp<T extends keyof HeroPointsStackParamsList> = RouteProp<
  HeroPointsStackParamsList,
  T
>;
