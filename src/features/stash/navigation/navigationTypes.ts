import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/navigationTypes';
import type { StashDetails } from '../hooks/useGetStashDetails';

export type StashStackParamList = {
  StashIntroduction: undefined;
  StashDashboard: undefined;
  StashIndividual: StashIndividualRouteProp;
  StashName: undefined;
  StashGoal: undefined;
  StashImage: undefined;
  StashConfirmation: undefined;
  StashSuccess: undefined;
  StashError: undefined;
  StashSelection: undefined;
  StashDepositCash: StashDepositCashParam;
  StashDepositSuccess: StashDepositSuccessParam;
  StashFailed: undefined;
  StashWithdrawAmount: StashWithdrawAmountParam;
  StashWithdrawOutcome: StashWithdrawOutcomeRouteProp;
};

export type StashNavigationProp<T extends keyof StashStackParamList> = CompositeNavigationProp<
  StackNavigationProp<StashStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type StashRouteProp<T extends keyof StashStackParamList> = RouteProp<StashStackParamList, T>;

type StashIndividualRouteProp = {
  id: string;
};

interface StashDepositCashParam {
  stash: StashDetails;
}

interface StashDepositSuccessParam {
  id: string;
  name: string;
  amount?: number;
}

interface StashWithdrawAmountParam {
  id: string;
  name: string;
  balance: number;
}

type StashWithdrawOutcomeRouteProp = {
  id: string;
  name: string;
  amount?: string;
  isClosed: boolean;
  isError: boolean;
};
