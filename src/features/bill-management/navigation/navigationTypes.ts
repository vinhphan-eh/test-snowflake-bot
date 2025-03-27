import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/navigationTypes';
import type { Subscription } from '../../../new-graphql/generated';
import type { BillCardProps } from '../components/BillCard';

export type SubscriptionDetail = BillCardProps & { billType: string };

export type BillManagementMoneyParamList = {
  BillingActivity: {
    subscription: Subscription;
  };
};

export type BillManagementMoneyNavigationProp<T extends keyof BillManagementMoneyParamList> = CompositeNavigationProp<
  StackNavigationProp<BillManagementMoneyParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type BillManagementMoneyRouteProp<T extends keyof BillManagementMoneyParamList> = RouteProp<
  BillManagementMoneyParamList,
  T
>;
