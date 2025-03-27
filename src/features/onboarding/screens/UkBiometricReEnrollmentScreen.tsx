import React, { useState } from 'react';
import { Box, Button, Typography } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../common/components/layout/page';
import { OverlayLoadingScreen } from '../../../common/components/spinner';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { useToast } from '../../../common/shared-hooks/useToast';
import { logException } from '../../../common/utils/sentry';
import { useIntl } from '../../../providers/LocalisationProvider';
import { useGetWeavrAccessToken } from '../hooks/useGetWeavrAccessToken';
import { useWeavrBiometrics } from '../hooks/useWeavrBiometrics';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';

export const UkBiometricReEnrollmentScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'UkBiometricReEnrollment'>>();

  const { bottom: bottomInset } = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const Toast = useToast();
  const { getUKToken, weavrBeginEnrollment } = useWeavrBiometrics();
  const Intl = useIntl();
  const { setAccessToken } = useGetWeavrAccessToken();

  const onNext = async () => {
    setIsLoading(true);
    try {
      const weavrUserToken = await getUKToken();
      await weavrBeginEnrollment(weavrUserToken);
      setAccessToken(''); // Reset access token from old session
      navigation.goBack();
    } catch (e) {
      logException(e, { module: 'EbenUkBiometricsReEnrollmentScreen' });
      Toast.show({ content: Intl.formatMessage({ id: 'wallet.onboarding.biometric.re-enroll.error' }) });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar title="Biometrics" hideRight hideLeft />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>{Intl.formatMessage({ id: 'wallet.onboarding.biometric.re-enroll.title' })}</Page.Title>
        <Page.Body>
          <Typography.Body variant="small">
            {Intl.formatMessage({ id: 'wallet.onboarding.biometric.re-enroll.description' })}
          </Typography.Body>
        </Page.Body>
        <Page.Footer justifyContent="flex-end" flex={1}>
          <Box marginTop="medium">
            <Button
              text="Next"
              testID="uk-re-enroll-biometrics-next-btn"
              accessibilityLabel="Next"
              onPress={onNext}
              disabled={isLoading}
            />
          </Box>
        </Page.Footer>
      </Page>
      {isLoading && <OverlayLoadingScreen />}
    </>
  );
};
