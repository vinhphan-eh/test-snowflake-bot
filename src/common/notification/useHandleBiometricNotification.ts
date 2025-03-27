import { useEffect } from 'react';
import { NotificationEvent } from '@ehrocks/react-native-superapp-communication';
import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { useGetWeavrAccessToken } from '../../features/onboarding/hooks/useGetWeavrAccessToken';

export const useHandleBiometricNotification = () => {
  const { issueChallenge } = useGetWeavrAccessToken();

  useEffect(() => {
    NotificationEvent.addOpenNotificationListener(async notification => {
      if (notification.type === 'biometricChallenge') {
        const payload = notification.rawData as FirebaseMessagingTypes.RemoteMessage;
        await issueChallenge(payload);
      }
    });
  }, []);
};
