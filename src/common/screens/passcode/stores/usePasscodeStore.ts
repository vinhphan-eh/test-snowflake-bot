import { create } from 'zustand';

export type PasscodeValidateParams = {
  inputPasscode: string;
  onSucceededPasscode: () => void;
  onFailedPasscode: () => void;
  onSucceededBiometric?: () => void;
  onFailedBiometric?: () => void;
};

type PasscodeStore = {
  passcodeValidate?: (params: PasscodeValidateParams) => void;
  requirePasscode?: boolean;
  setRequirePasscode: (visible: boolean, onSuccess?: () => void, onDismiss?: () => void) => void;
  successCallback?: () => void;
  dismissCallback?: () => void;
};

export const usePasscodeStore = create<PasscodeStore>()(set => ({
  setRequirePasscode: (visible, onSuccess, onDismiss) => {
    set({
      requirePasscode: visible,
      successCallback: onSuccess,
      dismissCallback: onDismiss,
    });
  },
}));

export const openEbenPasscode = usePasscodeStore.getState().setRequirePasscode;
