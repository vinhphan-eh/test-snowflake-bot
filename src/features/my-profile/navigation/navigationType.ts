import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/navigationTypes';
import type { EditFormsStackParamList } from '../../edit-forms/navigation/navigationType';
import type { ResidentialAddress } from '../../onboarding/stores/useOnboardingStore';

export type MoneyProfileStackParamList = {
  SomethingWentWrong: {
    onBack: (navigation?: MoneyProfileNavigationProp<'SomethingWentWrong'>) => void;
  };
  PhoneNumberDuplicated: {
    onBack: (navigation?: MoneyProfileNavigationProp<'PhoneNumberDuplicated'>) => void;
  };
  Waiting: {
    isNameChanged?: boolean;
    onBack: (navigation: MoneyProfileNavigationProp<'Waiting'>) => void;
  };
  ResidentialAddress: {
    residentialAddress?: ResidentialAddress;
    updateCallback: (payload: ResidentialAddress) => Promise<void>;
    onBack: () => void;
  };
} & EditFormsStackParamList;

export type MoneyProfileNavigationProp<T extends keyof MoneyProfileStackParamList> = CompositeNavigationProp<
  StackNavigationProp<MoneyProfileStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type MoneyProfileScreenRouteProp<T extends keyof MoneyProfileStackParamList> = RouteProp<
  MoneyProfileStackParamList,
  T
>;
