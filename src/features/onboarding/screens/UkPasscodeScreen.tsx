import React, { useEffect, useRef, useState } from 'react';
import { InteractionManager, Keyboard } from 'react-native';
import { Box, PinInput, Typography } from '@hero-design/rn';
import type { PinInputHandler } from '@hero-design/rn/types/components/PinInput';
import { useNavigation } from '@react-navigation/native';
import { checkDeviceIsEnrolled, weavrSecureLogin } from '@weavr-io/secure-components-react-native';
import { Page } from '../../../common/components/layout/page';
import { OverlayLoadingScreen } from '../../../common/components/spinner';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { usePasscodeStore } from '../../../common/screens/passcode';
import { useSessionStore } from '../../../common/stores/useSessionStore';
import { useCreateUkPasscodeMutation, useGetCurrentUserQuery } from '../../../new-graphql/generated';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';

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

export const UkPasscodeScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'UkPasscode'>>();
  const [errorMessage, setErrorMessage] = useState('');
  const passcodeValidate = usePasscodeStore(state => state.passcodeValidate);
  const pinInputRef = useRef<PinInputHandler>(null);
  const superAppLogout = useSessionStore(state => state.superAppLogout);
  const currentUser = useSessionStore(state => state.currentUser);
  const { data: ebenUserData } = useGetCurrentUserQuery();
  const countRetryAttempt = useRef(1);
  const [pin, setPin] = useState('');
  const logoutTimeoutRef = useRef<NodeJS.Timeout | undefined>();
  const submittedPasscodeRef = useRef<string>('');

  const setUkPasscode = useCreateUkPasscodeMutation({
    onError: () => {
      navigation.navigate('GeneralError');
    },
    onSuccess: async (_, { input }) => {
      const deviceEnrolled = await checkDeviceIsEnrolled();
      const biometricsEnrolled = deviceEnrolled?.result?.isEnrolled;
      if (biometricsEnrolled) {
        await weavrSecureLogin(ebenUserData?.me?.details?.email ?? '', input.passcode);
      }

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'UkVerifyMobileNumber',
          },
        ],
      });
    },
  });

  const onDismiss = () => {
    Keyboard.dismiss();
    pinInputRef.current?.blur();
  };

  const onSuccess = (finalPin: string) => {
    onDismiss();

    if (finalPin !== submittedPasscodeRef.current) {
      setUkPasscode.mutate({ input: { passcode: finalPin } });
      submittedPasscodeRef.current = finalPin;
    }
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
      onSucceededPasscode: () => onSuccess(finalPin),
      onFailedPasscode: onFailed,
    });
  };

  useEffect(() => {
    const promise = InteractionManager.runAfterInteractions(() => {
      pinInputRef.current?.focus();
    });

    return () => {
      promise.cancel();
      if (logoutTimeoutRef?.current) {
        clearTimeout(logoutTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <Page keyboardShouldPersistTaps="always">
        <CustomStatusBar />
        <Page.TopBar rightIconIntent="text" hideRight hideLeft title="Account set-up" />
        <Box marginHorizontal="medium">
          <Typography.Title level="h3" style={{ textAlign: 'center' }}>
            Please enter your passcode
          </Typography.Title>
          <Box marginTop="xxxlarge" alignContent="center" alignItems="center">
            <PinInput
              ref={pinInputRef}
              value={pin}
              onChangeText={setPin}
              onFulfill={onSubmit}
              error={errorMessage}
              length={6}
              style={{ alignItems: 'center' }}
              testID="onboarding_pin_input"
            />
          </Box>
        </Box>
      </Page>
      {setUkPasscode.isLoading && <OverlayLoadingScreen />}
    </>
  );
};
