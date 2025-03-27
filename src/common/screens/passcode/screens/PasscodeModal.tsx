import React from 'react';
import Modal from 'react-native-modal';
import { PasscodeScreen } from './PasscodeScreen';
import ThemeSwitcher from '../../../utils/ThemeSwitcher';
import { usePasscodeStore } from '../stores/usePasscodeStore';

export const PasscodeModal = () => {
  const requirePasscode = usePasscodeStore(state => state.requirePasscode);

  return (
    <Modal testID="passcode_modal" isVisible={requirePasscode} style={{ flex: 1, margin: 0 }}>
      <ThemeSwitcher>
        <PasscodeScreen />
      </ThemeSwitcher>
    </Modal>
  );
};
