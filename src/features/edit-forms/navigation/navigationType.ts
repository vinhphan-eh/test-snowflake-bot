import type { CompositeNavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/navigationTypes';
import type { PersonalName, ResidentialAddress } from '../../onboarding/stores/useOnboardingStore';

type PhoneNumber = {
  countryCode: string;
  number: string;
};

export type NameEditRouteProps = {
  name: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };
  navigationTo?: {
    screen: string;
    params?: Record<string, unknown>;
  };
  pageTitle?: string;
  topBarTitle?: string;

  updateCallback: (data: PersonalName) => void;
};

export type DoBEditRouteProps = {
  dateOfBirth: string;
  navigationTo?: {
    screen: string;
    params?: Record<string, unknown>;
  };
  pageTitle?: string;
  topBarTitle?: string;
  updateCallback: (dateOfBirth: string) => void;
};

export type PhoneNumberRouteProps = {
  phoneNumber: PhoneNumber | null;
  pageTitle?: string;
  updateCallback: (phoneNumber: PhoneNumber, navigation: EditFormsNavigationProp<'EditPhoneNumber'>) => void;
  goBack: (navigation: EditFormsNavigationProp<'EditPhoneNumber'>) => void;
};

export type ResidentialAddressManualRouteProps = {
  residentialAddress?: ResidentialAddress;
  pageTitle?: string;
  updateCallback: (residentialAddress: ResidentialAddress) => Promise<void>;
  goBack: (navigation: EditFormsNavigationProp<'EditResidentialAddressManual'>) => void;
};

export type EditFormsStackParamList = {
  EditName: NameEditRouteProps;
  EditPhoneNumber: PhoneNumberRouteProps;
  EditResidentialAddressManual: ResidentialAddressManualRouteProps;
  EditDoB: DoBEditRouteProps;
};

export type EditFormsNavigationProp<T extends keyof EditFormsStackParamList> = CompositeNavigationProp<
  StackNavigationProp<EditFormsStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;
