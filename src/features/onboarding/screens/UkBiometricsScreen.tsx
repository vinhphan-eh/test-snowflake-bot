import React, { useState } from 'react';
import { Box, Button, Typography } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../common/components/layout/page';
import { OverlayLoadingScreen } from '../../../common/components/spinner';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { useToast } from '../../../common/shared-hooks/useToast';
import { logException } from '../../../common/utils/sentry';
import { useWeavrBiometrics } from '../hooks/useWeavrBiometrics';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';

export const UkBiometricsScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'UkBiometrics'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const Toast = useToast();
  const { getUKToken, weavrBeginEnrollment } = useWeavrBiometrics();

  const onBack = () => {
    navigation.goBack();
  };

  const onNext = async () => {
    setIsLoading(true);
    try {
      const weavrUserToken = await getUKToken();
      await weavrBeginEnrollment(weavrUserToken);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'UkVerifyIdentityDocumentInfo',
            params: { userToken: weavrUserToken },
          },
        ],
      });
    } catch (e) {
      logException(e, { module: 'EBenUKBiometricsScreen' });
      Toast.show({ content: `Sorry, we could not process your request. Try again later.` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar title="Biometrics" hideRight onBack={onBack} />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>Please confirm your fingerprint / Face ID.</Page.Title>
        <Page.Body>
          <Typography.Body variant="small">
            For your security, we need to confirm your fingerprint/Face ID before verifying your identity. This will
            ensure that only you can access any ID documents you upload.
          </Typography.Body>
        </Page.Body>
        <Page.Footer justifyContent="flex-end" flex={1}>
          <Box marginTop="medium">
            <Button
              text="Next"
              testID="uk-biometrics-next-btn"
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
