import { useState } from 'react';
import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import {
  startChallenge,
  startBiometricLogin as weavrStartBiometricLogin,
} from '@weavr-io/secure-components-react-native';
import { logException } from '../../../common/utils/sentry';
import { UkStepupResultState, useGetUkLatestStepUpResultQuery } from '../../../new-graphql/generated';
import { useWeavrTokenStore } from '../stores/useWeaverTokenStore';

const MAX_FAILED_COUNT = 6;
const WAITING_TIMEOUT = 2000;

export const useGetWeavrAccessToken = () => {
  const accessToken = useWeavrTokenStore(state => state.token);
  const setAccessToken = useWeavrTokenStore(state => state.setToken);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [biometricComplete, setBiometricCompletion] = useState<boolean>(false);
  const [refetchCount, setRefetchCount] = useState<number>(0);

  useGetUkLatestStepUpResultQuery(undefined, {
    enabled: biometricComplete,
    cacheTime: 0,
    refetchInterval: () => (refetchCount > MAX_FAILED_COUNT ? false : WAITING_TIMEOUT),
    onError: err => {
      setLoading(false);
      setError(JSON.stringify(err));
      logException(err, { module: 'EBenWeavrBiometricsLogin' });
    },
    onSuccess: data => {
      const tokenState = data?.me?.wallet?.latestUkStepUpResult?.state;
      if (tokenState === UkStepupResultState.Passed) {
        const token = data?.me?.wallet?.latestUkStepUpResult?.accessToken ?? '';
        setAccessToken(token);
        setLoading(false);
        setBiometricCompletion(false);
      } else if (tokenState === UkStepupResultState.Failed) {
        setLoading(false);
        setError('Biometric login failed.');
        logException('Biometric login failed.', { module: 'EBenWeavrBiometricsLogin' });
      } else if (data.me?.wallet?.latestUkStepUpResult === null) {
        setRefetchCount(refetchCount + 1);
        if (refetchCount >= MAX_FAILED_COUNT) {
          setLoading(false);
          setError('An error occurred during biometric authentication. Please try again.');
          logException('An error occurred during biometric authentication. Please try again.', {
            module: 'EBenWeavrBiometricsLogin',
          });
        }
      }
    },
  });

  const startBiometricLogin = async () => {
    try {
      setLoading(true);
      setError('');
      setAccessToken('');
      await weavrStartBiometricLogin();
      setBiometricCompletion(true);
    } catch (err) {
      setLoading(false);
      setError(JSON.stringify(err));
      logException(err, { module: 'EBenWeavrBiometricsLogin' });
    }
  };

  const issueChallenge = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    try {
      const fcmToken = await messaging().getToken();
      await startChallenge(remoteMessage, fcmToken);
      setBiometricCompletion(true);
    } catch (err) {
      setLoading(false);
      setError(JSON.stringify(err));
      logException(err, { module: 'EBenWeavrBiometricsLogin' });
    }
  };

  return {
    startBiometricLogin,
    issueChallenge,
    isLoading,
    error,
    accessToken,
    setAccessToken,
  };
};
