import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../navigation/navigationTypes';

export type InstaPaySchedulingStackParamList = {
  InstaPaySchedulingConfirmation: undefined;
  InstaPaySchedulingError: undefined;
  InstaPaySchedulingSuccess: InstaPaySchedulingSuccessProps;
  InstaPaySchedulingOptOutSurvey: undefined;
  InstaPaySchedulingModification: undefined;
  InstaPaySchedulingBankAccountSelection: undefined;
  InstaPayRecurringByDay: InstaPayRecurringByDayProps;
};

export type InstaPaySchedulingScreenNavigationProp<T extends keyof InstaPaySchedulingStackParamList> =
  CompositeNavigationProp<
    StackNavigationProp<InstaPaySchedulingStackParamList, T>,
    StackNavigationProp<RootStackParamList>
  >;

export type InstaPaySchedulingRouteProp<T extends keyof InstaPaySchedulingStackParamList> = RouteProp<
  InstaPaySchedulingStackParamList,
  T
>;

export type InstaPaySchedulingSuccessScreenAction =
  | 'creation'
  | 'byAmountModification'
  | 'byDayModification'
  | 'byDayCreation'
  | 'cancellation';

type InstaPaySchedulingSuccessProps = {
  formattedAmount: string;
  payDay?: string;
  orgId?: string;
  action: InstaPaySchedulingSuccessScreenAction;
};

type InstaPayRecurringByDayProps = {
  action: 'creation' | 'modification';
};
