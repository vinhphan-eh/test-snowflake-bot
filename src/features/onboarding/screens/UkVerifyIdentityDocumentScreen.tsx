import React, { useState } from 'react';
import { Box, Button, Typography } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  KYCSDKStatus,
  isAssociated,
  setUserToken,
  startKyc as weavrStartKyc,
} from '@weavr-io/secure-components-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation } from 'react-query';
import BulletLine from '../../../common/components/bullet-line';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { queryClient } from '../../../common/libs/queryClient';
import { navigateToTopTabs } from '../../../navigation/rootNavigation';
import {
  IdvProfileStatus,
  useGetCurrentUserQuery,
  useGetIdvProfileV2Query,
  useGetUkTokenQuery,
  useStartUkKycMutation,
  type CountryOfOrigin,
  type GetIdvProfileV2Query,
} from '../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';
import { useWeavrKYCTheme } from '../hooks/useWeavrKYCTheme';
import type { OnboardingScreenNavigationProp, OnboardingScreenRouteProp } from '../navigation/navigationTypes';
import { useOnboardingReferenceIdStore } from '../stores/useOnboardingReferenceIdStore';
import type { WeavrKYCTheme } from '../types';

const renderListItem = (content: string) => {
  return <BulletLine content={content} />;
};

enum UkKycRejectStatus {
  Terminated = 'TERMINATED',
  Failed = 'FAILED',
  PendingReview = 'PENDING_REVIEW',
}

export const initiateUkKycComponent = (referenceId: string, theme: WeavrKYCTheme): Promise<string> => {
  return new Promise((resolve, reject) => {
    weavrStartKyc(
      referenceId,
      {
        onKycSuccess: res => {
          resolve(res.toString());
        },
        onKycFailure: () => {
          reject(new Error(UkKycRejectStatus.Failed));
        },
      },
      {
        onStatusChange: (status: KYCSDKStatus) => {
          if (status === KYCSDKStatus.Pending) {
            reject(new Error(UkKycRejectStatus.PendingReview));
          }
        },
        onKycSdkTerminate: () => {
          reject(new Error(UkKycRejectStatus.Terminated));
        },
      },
      theme
    );
  });
};

export const UkVerifyIdentityDocumentInfoScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'UkVerifyIdentityDocumentInfo'>>();
  const route = useRoute<OnboardingScreenRouteProp<'UkVerifyIdentityDocumentInfo'>>();
  const defaultUserToken = route.params?.userToken;
  const { referenceId: referenceIdStore, setReferenceId } = useOnboardingReferenceIdStore();
  const [weavrUserToken, setWeavrUserToken] = useState(defaultUserToken);
  const theme = useWeavrKYCTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();

  const startUkKycMutation = useStartUkKycMutation();

  const { isLoading: loadingWeavrUserToken } = useGetUkTokenQuery(undefined, {
    enabled: !weavrUserToken,
    onSuccess: res => setWeavrUserToken(res.me?.wallet?.UKToken?.userToken ?? ''),
  });

  const { currentRegion } = useRegionLocalisation();
  const GET_IDV_PROFILE_V2_KEY = useGetIdvProfileV2Query.getKey({ country: currentRegion as CountryOfOrigin });

  const onReturnToDashboard = () => {
    navigateToTopTabs('spend-tab');
  };

  const reloadStatus = async () => {
    await Promise.all([
      queryClient.invalidateQueries(GET_IDV_PROFILE_V2_KEY),
      queryClient.invalidateQueries(useGetCurrentUserQuery.getKey()),
    ]);
  };

  const onRetryKyc = async () => {
    if (!defaultUserToken) {
      await reloadStatus();
      onReturnToDashboard();
    } else {
      navigation.navigate('UkVerifyIdentityDocumentInfo', { userToken: defaultUserToken });
    }
  };

  const startKyc = async () => {
    await setUserToken(weavrUserToken);

    const isWeavrModuleAssociated = await isAssociated();

    if (isWeavrModuleAssociated) {
      let referenceId = referenceIdStore;
      if (!referenceId) {
        const startUkKycResponse = await startUkKycMutation.mutateAsync({});
        referenceId = startUkKycResponse.startUKKYC?.reference as string;
        setReferenceId(referenceId);
      }

      if (referenceId) {
        await initiateUkKycComponent(referenceId, theme);
      } else {
        throw new Error('No Reference ID');
      }
    } else {
      throw new Error('User is not associated.');
    }
  };

  const startKycMutation = useMutation(startKyc, {
    onError: async e => {
      const errorMessage = (e as unknown as Error)?.message ?? '';
      await reloadStatus();

      switch (errorMessage) {
        case UkKycRejectStatus.PendingReview: {
          await queryClient.cancelQueries(GET_IDV_PROFILE_V2_KEY);
          queryClient.setQueryData(
            GET_IDV_PROFILE_V2_KEY,
            (old: GetIdvProfileV2Query | undefined): GetIdvProfileV2Query => ({
              ...old,
              me: {
                wallet: {
                  IDVProfile: {
                    ...old?.me?.wallet?.IDVProfile,
                    status: IdvProfileStatus.Unchecked,
                  },
                },
              },
            })
          );
          navigation.navigate('CheckingDetails', { statusIsInprogress: true });
          break;
        }
        case UkKycRejectStatus.Terminated: {
          onReturnToDashboard();
          break;
        }
        default:
          navigation.navigate('GeneralError', {
            closeCallback: onRetryKyc,
            ctaText: 'Try again',
            secondaryCtaText: 'Close',
            secondaryCtaCallback: onReturnToDashboard,
          });
          break;
      }
    },
    onSuccess: async () => {
      navigation.navigate('CheckingDetails', { statusIsInprogress: true });
      await reloadStatus();
    },
  });

  const isLoading = loadingWeavrUserToken || startKycMutation.isLoading;

  const onScanMyId = () => {
    startKycMutation.mutate();
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar title="Identity" hideRight onBack={onBack} />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>Last step! Now we need to verify your ID.</Page.Title>
        <Page.Body>
          <Typography.Body variant="small">Please have your document ready and enable camera access.</Typography.Body>
          <Box marginTop="large" marginBottom="small">
            <Typography.Body variant="small">Here is a few handy tips:</Typography.Body>
          </Box>
          {renderListItem('Lay your ID flat with the photo facing upwards.')}
          {renderListItem('Make sure the surface is dark, non-reflective, stable and free from clutter.')}
          {renderListItem(
            'Align your ID so it fits within the screen constraints. Ensure that the 4 corners of the document are captured and visible.'
          )}
          {renderListItem('Avoid shadows and glare on your ID.')}
          {renderListItem('Ensure the phone is directly above the ID (not at an angle).')}
          {renderListItem('Ensure the ID document used is valid and not expired.')}
          {renderListItem(`Note that a driver's licence is accepted as a valid proof of identity.`)}
        </Page.Body>
        <Page.Footer justifyContent="flex-end" flex={1}>
          <Box marginTop="medium">
            <Button
              text="Scan my ID"
              testID="scan-my-id-btn"
              accessibilityLabel="Scan my ID"
              loading={isLoading}
              onPress={onScanMyId}
            />
          </Box>
        </Page.Footer>
      </Page>
    </>
  );
};
