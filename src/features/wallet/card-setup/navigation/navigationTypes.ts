import type { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { PinSetupParamList } from '../../../../common/screens/pin-setup/navigation/navigationType';
import type { RootStackParamList } from '../../../../navigation/navigationTypes';
import type { UniversalAddressInput } from '../../../../new-graphql/generated';
import type { ResidentialAddress } from '../../../onboarding/stores/useOnboardingStore';

export type CardSetupStackParamList = {
  Confirmation: { pin: string; isInOnboardingFlow?: boolean };
  Success: ResetProgressRouteProps;
  MailingAddressEdit: MailingAddressEditRouteProps;
  Error: ResetProgressRouteProps;
  Loading: { pin: string };
  CardSetupComplete: undefined;
  PinSetupStack: NavigatorScreenParams<PinSetupParamList>;
  UkBillingAddress: undefined;
  UkBillingAddressEdit: BillingAddressEditRouteProps;
};

export type CardSetupScreenNavigationProp<T extends keyof CardSetupStackParamList> = CompositeNavigationProp<
  StackNavigationProp<CardSetupStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type CardSetupScreenRouteProp<T extends keyof CardSetupStackParamList> = RouteProp<CardSetupStackParamList, T>;

type ResetProgressRouteProps = {
  resetCardPin?: boolean;
  pin?: string;
};

type MailingAddress = Pick<ResidentialAddress, 'longForm' | 'townOrCity' | 'region' | 'postcode'>;

type MailingAddressEditRouteProps = {
  mailingAddress: Partial<MailingAddress>;
  updateCallback: (data: Partial<MailingAddress>) => void;
};

type BillingAddressEditRouteProps = {
  address: Partial<UniversalAddressInput>;
  updateCallback: (data: Partial<UniversalAddressInput>) => void;
};
