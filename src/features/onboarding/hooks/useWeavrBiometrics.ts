import { useState } from 'react';
import { Platform } from 'react-native';
import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import {
  checkDeviceIsEnrolled,
  initiateBiometric,
  resetAssociation,
  setUserToken,
  startChallenge,
  startEnrollment,
  updateFCMToken,
  checkIsReadyForEnrollment,
} from '@weavr-io/secure-components-react-native';
import { useIsAccountUK } from '../../../common/hooks/useIsAccountUK';
import { logException } from '../../../common/utils/sentry';
import { useGetUkTokenQuery, useGetWalletStatusQuery, WalletSetupStatus } from '../../../new-graphql/generated';

export const useWeavrBiometrics = () => {
  const [weavrUserToken, setWeavrUserToken] = useState('');
  const isUkCitizen = useIsAccountUK();
  const { data: userData } = useGetWalletStatusQuery();
  const hasWalletStatus = !!(
    userData?.me?.wallet?.details.setupStatus?.status &&
    userData?.me?.wallet?.details.setupStatus?.status !== WalletSetupStatus.None
  );
  const { refetch } = useGetUkTokenQuery(undefined, {
    enabled: !weavrUserToken && isUkCitizen && hasWalletStatus,
    onSuccess: res => {
      const userToken = res.me?.wallet?.UKToken?.userToken ?? '';
      setUserToken(userToken);
      setWeavrUserToken(userToken);
    },
  });

  const weavrBeginEnrollment = async (token: string) => {
    if (!token) {
      throw new Error('Weavr token is required');
    }

    let firebaseToken = '';

    try {
      firebaseToken = await messaging().getToken();
    } catch (error) {
      logException(error, { module: 'EBenFirebaseToken' });
      throw new Error(`Firebase token error:  ${JSON.stringify(error)}`);
    }

    try {
      if (Platform.OS === 'ios') {
        await updateFCMToken(firebaseToken);

        if (!(await checkIsReadyForEnrollment())) {
          throw new Error('Weavr is not ready for enrollment');
        }
      }

      await setUserToken(token);
      await startEnrollment(firebaseToken, token);
    } catch (error) {
      logException(error, { module: 'EBenWeavrEnrollment' });
      throw new Error(`Weavr enrollment error: ${JSON.stringify(error)}`);
    }
  };

  const weavrInitiateBiometric = async () => {
    const biometricResponse = await initiateBiometric();
    return biometricResponse;
  };

  const weavrCleanup = async () => {
    await resetAssociation();
  };

  const checkpointDeviceEnrolled = async () => {
    const isDeviceEnrolled = await checkDeviceIsEnrolled();
    return isDeviceEnrolled?.result?.isEnrolled;
  };

  const getUKToken = async () => {
    if (!weavrUserToken) {
      const ukTokenRes = await refetch();
      return ukTokenRes.data?.me?.wallet?.UKToken?.userToken ?? '';
    }
    return weavrUserToken;
  };

  const issueChallenge = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    const fcmToken = await messaging().getToken();
    startChallenge(remoteMessage, fcmToken)
      .then(res => {
        // FIXME: need to delete this console log
        // eslint-disable-next-line no-console
        console.log('>>>>>>>>>>>>>>>>>>>', 'Weavr challenge success', res);
      })
      .catch(e => {
        // FIXME: need to delete this console log
        // eslint-disable-next-line no-console
        console.error('>>>>>>>>>>>>>>>>>>>', 'Weavr challenge error', JSON.stringify(e));
      });
  };

  return {
    checkpointDeviceEnrolled,
    getUKToken,
    weavrBeginEnrollment,
    weavrCleanup,
    weavrInitiateBiometric,
    issueChallenge,
  };
};
