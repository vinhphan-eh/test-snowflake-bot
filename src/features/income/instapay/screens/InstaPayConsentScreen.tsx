import React, { useState } from 'react';
import { Button, Checkbox, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { useRegionLocalisation } from '../../../../providers/LocalisationProvider';
import type { InstaPayRouteProp, InstaPayScreenNavigationProp } from '../navigation/navigationTypes';

export const InstaPayConsentScreen = () => {
  const navigation = useNavigation<InstaPayScreenNavigationProp<'InstaPayConsent'>>();
  const {
    params: { feature },
  } = useRoute<InstaPayRouteProp<'InstaPayConsent'>>();

  const { formatMessage } = useRegionLocalisation();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const [checkConsentBox, setCheckConsentBox] = useState<boolean>(false);
  const { space } = useTheme();

  const onNextPressed = () => {
    navigation.navigate('InstaPayWaiting', { flow: 'AddBeneficiary', feature });
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar title={formatMessage({ id: 'instapay.pageTitle' })} onBack={navigation.goBack} hideRight />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>{formatMessage({ id: 'instapay.consent.page_title' })}</Page.Title>
        <Page.Body marginVertical="xxsmall" />
        <Page.Footer>
          <Checkbox
            testID="instapay-consent-checkbox"
            checked={checkConsentBox}
            onPress={() => setCheckConsentBox(!checkConsentBox)}
            style={{ marginVertical: space.medium }}
            description={formatMessage({ id: 'instapay.consent.verification_term.checkbox_title' })}
          />
          <Button
            testID="instapay-bank-account-select"
            accessibilityLabel="Next"
            disabled={!checkConsentBox}
            onPress={onNextPressed}
            text="Next"
          />
        </Page.Footer>
      </Page>
    </>
  );
};
