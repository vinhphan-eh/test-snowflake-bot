import React, { useEffect, useRef, useState } from 'react';
import { InteractionManager, Keyboard, Platform } from 'react-native';
import { Box, PinInput, Typography, useTheme } from '@hero-design/rn';
import type { PinInputHandler } from '@hero-design/rn/types/components/PinInput';
import { Page } from '../../../components/layout/page';
import { CustomStatusBar } from '../../../components/status-bar/CustomStatusBar';
import { useSessionStore } from '../../../stores/useSessionStore';
import { usePasscodeStore } from '../stores/usePasscodeStore';

const getErrorMsgByRetryAttempt = (retryNum: number) => {
  switch (retryNum) {
    case 1:
      return 'Incorrect passcode. Please try again.';
    case 2:
      return 'Incorrect passcode. You have 1 more attempt before you are automatically logged out of the app.';
    case 3:
      return 'Incorrect passcode. You will be logged out.';
    default:
      return '';
  }
};

const DELAY_LOGOUT_DURATION = 2000;

export const PasscodeScreen = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const setRequirePasscode = usePasscodeStore(state => state.setRequirePasscode);
  const successCallback = usePasscodeStore(state => state.successCallback);
  const passcodeValidate = usePasscodeStore(state => state.passcodeValidate);
  const dismissCallback = usePasscodeStore(state => state.dismissCallback);
  const pinInputRef = useRef<PinInputHandler>(null);
  const superAppLogout = useSessionStore(state => state.superAppLogout);
  const currentUser = useSessionStore(state => state.currentUser);
  const { colors } = useTheme();
  const countRetryAttempt = useRef(1);
  const [pin, setPin] = useState('');
  const keyboardTimeoutRef = useRef<NodeJS.Timeout | undefined>();
  const logoutTimeoutRef = useRef<NodeJS.Timeout | undefined>();

  const retriggerAndroidKeyboard = () => {
    if (Platform.OS === 'android') {
      // trick to open keyboard after loosing focus to screen
      keyboardTimeoutRef.current = setTimeout(() => {
        pinInputRef.current?.blur();
        pinInputRef.current?.focus();
      }, 50);
    }
  };

  const onDismiss = () => {
    Keyboard.dismiss();
    setRequirePasscode(false);
  };

  const onClose = () => {
    dismissCallback?.();
    onDismiss();
  };

  const onSuccess = () => {
    onDismiss();
    successCallback?.();
  };

  const onFailed = () => {
    if (countRetryAttempt.current === 3) {
      logoutTimeoutRef.current = setTimeout(() => {
        onDismiss();
        superAppLogout?.({
          loginProvider: currentUser?.loginProvider ?? 'eh',
          userId: currentUser?.userID ?? '0',
        });
      }, DELAY_LOGOUT_DURATION);
    }
    const errorMsg = getErrorMsgByRetryAttempt(countRetryAttempt.current);
    countRetryAttempt.current += 1;
    setErrorMessage(errorMsg);
    setPin('');
  };

  const onSubmit = (finalPin: string) => {
    passcodeValidate?.({
      inputPasscode: finalPin,
      onSucceededPasscode: onSuccess,
      onFailedPasscode: onFailed,
    });
  };

  const checkBiometrics = () => {
    passcodeValidate?.({
      inputPasscode: '',
      onSucceededPasscode: () => {},
      onSucceededBiometric: () => {
        onSuccess();
      },
      onFailedPasscode: () => {},
      onFailedBiometric: retriggerAndroidKeyboard,
    });
  };

  useEffect(() => {
    const promise = InteractionManager.runAfterInteractions(() => {
      pinInputRef.current?.focus();
    });

    // biometrics
    checkBiometrics();

    return () => {
      promise.cancel();
      if (logoutTimeoutRef?.current) {
        clearTimeout(logoutTimeoutRef.current);
      }
      if (keyboardTimeoutRef?.current) {
        clearTimeout(keyboardTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Page keyboardShouldPersistTaps="always">
      <CustomStatusBar backgroundColor={colors.neutralGlobalSurface} />
      <Page.TopBar rightIconIntent="text" hideLeft onRightPress={onClose} title="" />
      <Box marginHorizontal="medium">
        <Typography.Body variant="small-bold" style={{ textAlign: 'center', fontSize: 28, lineHeight: 36 }}>
          Enter Passcode
        </Typography.Body>
        <Box marginTop="xxxlarge" alignContent="center" alignItems="center">
          <PinInput
            ref={pinInputRef}
            value={pin}
            onChangeText={setPin}
            onFulfill={onSubmit}
            error={errorMessage}
            length={6}
            style={{ alignItems: 'center' }}
            testID="pin_input"
          />
        </Box>
      </Box>
    </Page>
  );
};
