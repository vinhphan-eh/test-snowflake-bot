import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../navigation/navigationTypes';

export type PinSetupParamList = {
  ChoosePin: ChoosePinParams;
  RepeatedPin: RepeatedPinParams;
};

export type PinSetupScreenNavigationProp<T extends keyof PinSetupParamList> = CompositeNavigationProp<
  StackNavigationProp<PinSetupParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type PinSetupScreenRouteProp<T extends keyof PinSetupParamList> = RouteProp<PinSetupParamList, T>;

type ChoosePinParams = {
  title: string;
  header: string;
  repeatedPinScreen: RepeatedPinParams;
};

type RepeatedPinParams = {
  title: string;
  header: string;
  /**
   * when passed repeated pin
   */
  onPinVerifiedSuccess: (pin: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
};
