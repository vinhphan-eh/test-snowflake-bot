import type { CompositeNavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/navigationTypes';

export type SwagPayslipsExperimentStackParamsList = {
  BudgetingIntroScreen: undefined;
};

export type SwagPayslipsExperimentNavigationProp<T extends keyof SwagPayslipsExperimentStackParamsList> =
  CompositeNavigationProp<
    StackNavigationProp<SwagPayslipsExperimentStackParamsList, T>,
    StackNavigationProp<RootStackParamList>
  >;
