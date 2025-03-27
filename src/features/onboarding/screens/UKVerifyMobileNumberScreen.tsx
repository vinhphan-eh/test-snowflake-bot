import React from 'react';
import { Box, Button, Typography } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { useStartValidateUkPhoneNumberMutation } from '../../../new-graphql/generated';
import { useIntl } from '../../../providers/LocalisationProvider';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';

export const UkVerifyMobileNumberScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'UkVerifyMobileNumber'>>();
  const Intl = useIntl();
  const { bottom: bottomInset } = useSafeAreaInsets();

  const startValidateUkPhoneNumber = useStartValidateUkPhoneNumberMutation({
    onError: () => {
      navigation.navigate('GeneralError');
    },
    onSuccess: () => {
      navigation.navigate('UkSubmitMobileOTP');
    },
  });

  const onBack = () => {
    navigation.goBack();
  };

  const onNext = () => {
    startValidateUkPhoneNumber.mutate({});
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar
        title={Intl.formatMessage({ id: 'spend-account.onboarding.mobile-verification.title' })}
        hideRight
        onBack={onBack}
      />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>{Intl.formatMessage({ id: 'spend-account.onboarding.mobile-verification.heading' })}</Page.Title>
        <Page.Body>
          <Typography.Body variant="small">
            {Intl.formatMessage({ id: 'spend-account.onboarding.mobile-verification.description' })}
          </Typography.Body>
        </Page.Body>
        <Page.Footer justifyContent="flex-end" flex={1}>
          <Box marginTop="medium">
            <Button
              text={Intl.formatMessage({ id: 'common.next' })}
              testID="uk-mobile-next-btn"
              accessibilityLabel="Next"
              onPress={onNext}
              loading={startValidateUkPhoneNumber.isLoading}
            />
          </Box>
        </Page.Footer>
      </Page>
    </>
  );
};
