import React from 'react';
import { useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { queryClient } from '../../../common/libs/queryClient';
import { useToast } from '../../../common/shared-hooks/useToast';
import { useAcceptEventMutation } from '../../../new-graphql/generated';
import OffboardingDetails from '../lifecycle/components/OffboardingDetails';
import { LIFECYCLE_ACCEPTED_SOURCE, LIFECYCLE_TRACKING_EVENT_NAMES } from '../lifecycle/constants';
import { useLifecycleTracking } from '../lifecycle/hooks/useLifecycleTracking';
import type { SuperScreenNavigationProp, SuperScreenRouteProp } from '../navigation/navigationTypes';

export const LifecycleEventDetailsScreen = () => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const navigation = useNavigation<SuperScreenNavigationProp<'EventDetails'>>();
  const route = useRoute<SuperScreenRouteProp<'EventDetails'>>();
  const Toast = useToast();
  const { track } = useLifecycleTracking();

  const { colors } = useTheme();
  const screenTitle = route?.params.title;

  const eventDetails = route?.params.eventDetails;

  const { mutateAsync } = useAcceptEventMutation({
    onError: () => {
      Toast.show({
        content: 'Failed to accept event',
      });
    },
  });

  const onBack = () => {
    navigation.goBack();
  };

  const onAcceptNotify = async () => {
    const res = await mutateAsync({
      input: {
        id: eventDetails?.id ?? '',
        accepted: true,
        accepted_from: LIFECYCLE_ACCEPTED_SOURCE.EMPLOYEE_FILES_MODAL,
      },
    });
    track({
      event_id: eventDetails?.id,
      name: LIFECYCLE_TRACKING_EVENT_NAMES.NOTIFY_FUND_ACCEPTED,
      data: {
        event: 'offboarding',
      },
    });
    const success = res.lifecycle?.event?.accept?.success;
    const message = res.lifecycle?.event?.accept?.message;

    if (message) {
      Toast.show({
        content: message,
      });
    }

    if (success) {
      navigation.goBack();
      queryClient.invalidateQueries('GetEventsPaginated');
    }
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar hideRight onBack={onBack} title={screenTitle} />
      <Page
        keyboardShouldPersistTaps="handled"
        style={{ paddingBottom: bottomInset, backgroundColor: colors.defaultGlobalSurface }}
      >
        <OffboardingDetails event={eventDetails} onBack={onBack} onAcceptNotify={onAcceptNotify} />
      </Page>
    </>
  );
};
