import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { OutcomeTemplateHDProps } from '../../../common/components/outcome-template/OutcomeTemplate';
import type { RootStackParamList } from '../../../navigation/navigationTypes';
import type { SupportedComplaintFeature } from '../screens/SupportRequestScreen';

export type SupportRequestType = 'Complaint';

export type SupportPillar = 'Money' | 'Benefits';

export type RequestFormProps = {
  pillar: SupportPillar;
  subject: string;
  type: SupportRequestType;
  feature: SupportedComplaintFeature;
};

export type RequestOutcomeProps = {
  message: string;
  description: string;
  image: OutcomeTemplateHDProps['imageName'];
};

export type SupportStackParamList = {
  Request: RequestFormProps;
  RequestOutcome: RequestOutcomeProps;
  GeneralError: undefined;
  InstaPayHistory: undefined;
  FinancialWellness: undefined;
};

export type SupportStackNavigationProp<T extends keyof SupportStackParamList> = CompositeNavigationProp<
  StackNavigationProp<SupportStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type FormScreenRouteProp<T extends keyof SupportStackParamList> = RouteProp<SupportStackParamList, T>;

export type RequestOutcomeScreenRouteProp<T extends keyof SupportStackParamList> = RouteProp<SupportStackParamList, T>;
