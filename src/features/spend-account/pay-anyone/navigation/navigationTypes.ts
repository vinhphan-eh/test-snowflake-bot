import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../navigation/navigationTypes';
import type { FinancialTransaction } from '../../../../new-graphql/generated';

export type PayAnyoneStackParamList = {
  PayeeAddressBook: undefined;
  PaymentType: undefined;
  PaymentDetails: undefined;
  PaymentLater: undefined;
  PaymentRecurring: undefined;
  TransactionDetails: {
    transaction: FinancialTransaction;
  };
  PaymentConfirmation: undefined;
  ScheduledPaymentSuccess: undefined;
  Success: undefined;
  Error: undefined;
  UkPayeeDetails: undefined;
  UkPaymentDetails: undefined;
  UkPaymentConfirmation: undefined;
  UkSuccess: undefined;
  ScheduledPaymentDashboard: undefined;
  NewPayee: undefined;
  PayeeFriendlyName: undefined;
  PayeeDetails: undefined;
  DailyLimitError: undefined;
};

export type PayAnyoneScreenNavigationProp<T extends keyof PayAnyoneStackParamList> = CompositeNavigationProp<
  StackNavigationProp<PayAnyoneStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type PayAnyoneScreenRouteProp<T extends keyof PayAnyoneStackParamList> = RouteProp<PayAnyoneStackParamList, T>;
