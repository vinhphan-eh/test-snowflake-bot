import React, { useMemo, useState } from 'react';
import { useIntl } from '../../../../../../providers/LocalisationProvider';
import { EwaPushNotificationFeature } from '../../../../../../new-graphql/generated';
import { Box, Divider, Spinner } from '@hero-design/rn';
import { SectionHeader } from '../../../../../card-management/components/SectionHeader';
import { useInstaPaySchedulingStore } from '../../../../instapay-scheduling/stores/useInstaPaySchedulingStore';
import {
  RecurringPushNotificationBottomSheet,
  type RecurringPushNotificationDetails,
} from '../../components/RecurringPushNotificationBottomSheet';
import { useGetEwaPushNotificationStatus } from '../../hooks/useGetEwaPushNotificationStatus';
import { useRoute } from '@react-navigation/native';
import type { InstaPayRouteProp } from '../../../navigation/navigationTypes';
import { EWARecurringPushNotificationMasterToggle } from './EWARecurringPushNotificationMasterToggle';
import { EWARecurringPushNotificationSettingToggleByType } from './EWARecurringPushNotificationSettingToggleByType';
import { mappedPushNotificationTypeDetails } from '../helper';

export const EWARecurringPushNotificationManagement = () => {
  const { formatMessage } = useIntl();
  const { currentSubscription: recurringByAmountSubscription, membership } = useInstaPaySchedulingStore();
  const currentRecurringFeature = recurringByAmountSubscription
    ? EwaPushNotificationFeature.EwaRecurringByAmount
    : EwaPushNotificationFeature.EwaRecurringByDay;
  const route = useRoute<InstaPayRouteProp<'EWAPushNotificationManagement'>>();
  const orgId = route.params?.orgId ?? membership?.getId() ?? '';

  const { featureLevelOptedIn, isLoading, shouldRenderSection, statusesByType } = useGetEwaPushNotificationStatus({
    orgId,
    feature: currentRecurringFeature,
  });

  const [isOpeningBottomSheet, setIsOpeningBottomSheet] = useState<boolean>(false);
  const [bottomSheetProps, setBottomSheetProps] = useState<RecurringPushNotificationDetails | undefined>();

  const SectionBody = useMemo(() => {
    if (isLoading) {
      return (
        <Box style={{ minHeight: 50 }} flex={1}>
          <Spinner testID="ewa-recurring-push-notification-loading-spinner" size="small" />
        </Box>
      );
    }

    return (
      <Box flexDirection="column" paddingHorizontal="medium" paddingTop="large">
        <EWARecurringPushNotificationMasterToggle
          isOptedIn={featureLevelOptedIn ?? false}
          currentRecurringFeature={currentRecurringFeature}
          orgId={orgId}
        />
        <Divider />

        <Box>
          {statusesByType?.map(status => (
            <EWARecurringPushNotificationSettingToggleByType
              key={`setting_toggle_by_type_${status.type}`}
              optedIn={status.optedIn}
              type={status.type}
              orgId={orgId}
              btsAction={() => {
                if (status.type) {
                  setBottomSheetProps(mappedPushNotificationTypeDetails[status.type].btsDetails);
                  setIsOpeningBottomSheet(true);
                }
              }}
              recurringFeature={currentRecurringFeature}
            />
          ))}
        </Box>
      </Box>
    );
  }, [isLoading, statusesByType]);

  if (!shouldRenderSection) {
    return null;
  }

  return (
    <Box testID="ewa-recurring-push-notification-management">
      <SectionHeader
        isShowingIcon={false}
        title={formatMessage({ id: 'instapay.pushNotification.recurring.sectionTitle' })}
      />
      {SectionBody}

      {!!bottomSheetProps && (
        <RecurringPushNotificationBottomSheet
          isOpening={isOpeningBottomSheet}
          setIsOpening={setIsOpeningBottomSheet}
          contentKey={bottomSheetProps.contentKey}
          captionKey={bottomSheetProps.captionKey}
          image={bottomSheetProps.image}
        />
      )}
    </Box>
  );
};
