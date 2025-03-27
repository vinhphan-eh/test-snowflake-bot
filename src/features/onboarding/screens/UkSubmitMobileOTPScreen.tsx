import React, { useEffect, useRef, useState } from 'react';
import { InteractionManager, Keyboard } from 'react-native';
import { Box, PinInput, Typography } from '@hero-design/rn';
import type { PinInputHandler } from '@hero-design/rn/types/components/PinInput';
import { useNavigation } from '@react-navigation/native';
import { Page } from '../../../common/components/layout/page';
import { OverlayLoadingScreen } from '../../../common/components/spinner';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { queryClient } from '../../../common/libs/queryClient';
import { useVerifyUkMobileEnrollmentMutation } from '../../../new-graphql/generated';
import { useIntl } from '../../../providers/LocalisationProvider';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';

const getErrorMsgByRetryAttempt = (retryNum: number) => {
  switch (retryNum) {
    case 1:
      return 'Incorrect code. Please try again.';
    case 2:
      return 'Incorrect code. You have 1 more attempt.';
    case 3:
      return 'Incorrect code.';
    default:
      return '';
  }
};

export const UkSubmitMobileOTPScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'UkSubmitMobileOTP'>>();
  const Intl = useIntl();
  const [errorMessage, setErrorMessage] = useState('');
  const pinInputRef = useRef<PinInputHandler>(null);
  const countRetryAttempt = useRef(1);
  const [pin, setPin] = useState('');
  const submittedPinRef = useRef<string>('');

  const onDismiss = () => {
    Keyboard.dismiss();
    pinInputRef.current?.blur();
  };

  const verifyUkMobileEnrollment = useVerifyUkMobileEnrollmentMutation({
    onError: () => {
      if (countRetryAttempt.current === 3) {
        onDismiss();
        navigation.navigate('GeneralError');
      }
      const errorMsg = getErrorMsgByRetryAttempt(countRetryAttempt.current);
      countRetryAttempt.current += 1;
      setErrorMessage(errorMsg);
      setPin('');
      submittedPinRef.current = '';
      pinInputRef.current?.focus();
    },
    onSuccess: () => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'UkBiometrics',
          },
        ],
      });
      queryClient.invalidateQueries(['GetUkAuthFactors']);
    },
  });

  const onSubmit = (finalPin: string) => {
    if (finalPin !== submittedPinRef.current) {
      onDismiss();
      verifyUkMobileEnrollment.mutate({ input: { code: finalPin } });
      submittedPinRef.current = finalPin;
    }
  };

  useEffect(() => {
    const promise = InteractionManager.runAfterInteractions(() => {
      pinInputRef.current?.focus();
    });

    return () => {
      promise.cancel();
    };
  }, []);

  return (
    <>
      <Page keyboardShouldPersistTaps="always">
        <CustomStatusBar />
        <Page.TopBar
          rightIconIntent="text"
          hideRight
          hideLeft
          title={Intl.formatMessage({ id: 'spend-account.onboarding.mobile-verification.title' })}
        />
        <Box marginHorizontal="medium">
          <Typography.Title level="h3" style={{ textAlign: 'center' }}>
            {Intl.formatMessage({ id: 'spend-account.onboarding.mobile-otp.title' })}
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
      {verifyUkMobileEnrollment.isLoading && <OverlayLoadingScreen />}
    </>
  );
};
