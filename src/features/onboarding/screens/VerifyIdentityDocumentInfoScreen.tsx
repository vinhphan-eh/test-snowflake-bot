import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@hero-design/rn';
import {
  Onfido,
  OnfidoCaptureType,
  OnfidoCountryCode,
  OnfidoDocumentType,
  OnfidoTheme,
} from '@onfido/react-native-sdk';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BulletLine from '../../../common/components/bullet-line';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { filterDialCodeFromMobileCountryCode } from '../../../common/constants/countries';
import { useMixpanel } from '../../../common/hooks/useMixpanel';
import { queryClient } from '../../../common/libs/queryClient';
import { getEnvConfig } from '../../../common/utils/env';
import {
  CountryOfOrigin,
  IdentityDocumentType,
  useGetCurrentCardMetaQuery,
  useGetCurrentUserQuery,
  useGetEWalletAuAccountDetailsQuery,
  useGetIdvProfileV2Query,
  useGetWalletStatusQuery,
  useSaveWalletSetupMutation,
  type SaveAuWalletSetupInput,
} from '../../../new-graphql/generated';
import {
  MONEY_MODULE_NAME,
  MONEY_OPEN_SSA_DETAILS_SUBMITTED_AND_VERIFIED,
  MONEY_OPEN_SSA_REQUEST_KYC_PROCESS,
} from '../constants/trackingEvents';
import type { OnboardingScreenNavigationProp, OnboardingScreenRouteProp } from '../navigation/navigationTypes';
import { useOnboardingStore } from '../stores/useOnboardingStore';

const ONFIDO_USER_CANCELED_ERROR_MESSAGE = 'User canceled flow.';

const renderListItem = (content: string) => {
  return <BulletLine content={content} />;
};

const VerifyIdentityDocumentInfoScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'VerifyIdentityDocumentInfo'>>();
  const route = useRoute<OnboardingScreenRouteProp<'VerifyIdentityDocumentInfo'>>();
  const onfidoToken = route.params?.onfidoToken;
  const { eventTracking } = useMixpanel();

  const { bottom: bottomInset } = useSafeAreaInsets();
  const personalDetails = useOnboardingStore(state => state.personalDetails);
  const identityDocumentType = useOnboardingStore(state => state.personalDetails.identityDocumentType);
  const isDriversLicence = identityDocumentType === IdentityDocumentType.DrivingLicense;
  const saveWalletSetupDetailsMutation = useSaveWalletSetupMutation();
  const [sdkToken, setSdkToken] = useState('');

  useEffect(() => {
    if (onfidoToken) {
      setSdkToken(onfidoToken);
    } else {
      const saveWalletSetupDetails = async () => {
        const setupDetails: SaveAuWalletSetupInput = {
          dateOfBirth: personalDetails.dateOfBirth,
          firstName: personalDetails.firstName,
          hasConsentedPrivacyPolicy: true,
          hasConsentedIdentityVerificationTerms: true,
          hasConsentedTermsConditions: true,
          lastName: personalDetails.lastName,
          middleName: personalDetails.middleName,
          mailingAddress: {
            longForm: personalDetails.residentialAddress.longForm,
            country: personalDetails.residentialAddress.country ?? 'AUS',
            postcode: personalDetails.residentialAddress.postcode,
            region: personalDetails.residentialAddress.region,
            townOrCity: personalDetails.residentialAddress.townOrCity,
          },
          phoneNumber: {
            countryCode: filterDialCodeFromMobileCountryCode(personalDetails.phoneNumber.countryCode),
            number: personalDetails.phoneNumber.number,
          },
          residentialAddress: {
            country: personalDetails.residentialAddress.country ?? 'AUS',
            postcode: personalDetails.residentialAddress.postcode,
            region: personalDetails.residentialAddress.region,
            townOrCity: personalDetails.residentialAddress.townOrCity,
            streetName: personalDetails.residentialAddress.streetName,
            streetNumber: personalDetails.residentialAddress.streetNumber,
            streetType: personalDetails.residentialAddress.streetType,
            unitNumber: personalDetails.residentialAddress.unitNumber,
            longForm: personalDetails.residentialAddress.longForm,
          },
          identityDocumentNumber: personalDetails.identityDocumentNumber,
          identityDocumentType: personalDetails.identityDocumentType,
          identityDocumentIssuingState: personalDetails.identityIssuingState,
          identityCardNumber: personalDetails.identityCardNumber,
        };

        const response = await saveWalletSetupDetailsMutation.mutateAsync({ setupDetails });

        const idvtoken = response.saveAUWalletSetup.idvToken;

        if (idvtoken) {
          setSdkToken(idvtoken);
        }
        if (getEnvConfig().IS_E2E === 'true' && personalDetails.middleName?.toLowerCase() === 'passall') {
          navigation.navigate('Waiting');
        }
      };

      saveWalletSetupDetails()
        .then(async () => {
          await Promise.all([
            queryClient.invalidateQueries(useGetCurrentUserQuery.getKey()),
            queryClient.invalidateQueries(
              useGetIdvProfileV2Query.getKey({
                country: CountryOfOrigin.Au,
              })
            ),
            queryClient.invalidateQueries(useGetWalletStatusQuery.getKey()),
          ]);
        })
        .catch(() => navigation.navigate('GeneralError'));
    }
  }, []);

  const onScanMyId = async () => {
    try {
      eventTracking({
        event: MONEY_OPEN_SSA_REQUEST_KYC_PROCESS,
        categoryName: 'user action',
        metaData: {
          module: MONEY_MODULE_NAME,
        },
      });

      const onfidoCapture = await Onfido.start({
        sdkToken,
        theme: OnfidoTheme.LIGHT,
        flowSteps: {
          welcome: false,
          captureDocument: {
            docType: isDriversLicence ? OnfidoDocumentType.DRIVING_LICENCE : OnfidoDocumentType.PASSPORT,
            countryCode: OnfidoCountryCode.AUS,
          },
          captureFace: {
            type: OnfidoCaptureType.PHOTO,
          },
        },
      });

      if (onfidoCapture) {
        eventTracking({
          event: MONEY_OPEN_SSA_DETAILS_SUBMITTED_AND_VERIFIED,
          categoryName: 'user action',
          metaData: {
            module: MONEY_MODULE_NAME,
          },
        });
        navigation.navigate('CheckingDetails', { statusIsInprogress: false });
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === ONFIDO_USER_CANCELED_ERROR_MESSAGE) {
          return;
        }
        navigation.navigate('GeneralError');
      }
    }
  };

  const onBack = () => {
    queryClient.invalidateQueries(useGetCurrentCardMetaQuery.getKey());
    queryClient.invalidateQueries(useGetIdvProfileV2Query.getKey({ country: CountryOfOrigin.Au }));
    queryClient.invalidateQueries(useGetEWalletAuAccountDetailsQuery.getKey());
    queryClient.invalidateQueries(useGetWalletStatusQuery.getKey());
    navigation.goBack();
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar title="Identity" hideRight onBack={onBack} />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>{`Last step! Now we need to verify your ${
          isDriversLicence ? `driver's licence` : 'passport'
        }.`}</Page.Title>
        <Page.Body>
          <Typography.Body variant="small">Please have your document ready and enable camera access.</Typography.Body>
          <Box marginTop="xlarge" marginBottom="small">
            <Typography.Body variant="small">Here is a few handy tips:</Typography.Body>
          </Box>
          {renderListItem('Lay your ID flat with the photo facing upwards.')}
          {renderListItem('Make sure the surface is dark, non-reflective, stable and free from clutter.')}
          {renderListItem('Align your ID so it fits within the screen constraints.')}
          {renderListItem('Ensure the phone is directly above the ID (not at an angle).')}
        </Page.Body>
        <Page.Footer justifyContent="flex-end" flex={1}>
          <Box marginTop="medium">
            <Button
              text="Scan my ID"
              testID="scan-my-id-btn"
              accessibilityLabel="Scan my ID"
              loading={saveWalletSetupDetailsMutation.isLoading}
              onPress={onScanMyId}
            />
          </Box>
        </Page.Footer>
      </Page>
    </>
  );
};

export { VerifyIdentityDocumentInfoScreen };
