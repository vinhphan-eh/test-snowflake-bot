import React, { useEffect, useState } from 'react';
import {
  useOptInEwaPushNotificationByTypeMutation,
  useOptOutEwaPushNotificationByTypeMutation,
  type EwaPushNotificationFeature,
  type EwaPushNotificationType,
  type OptInEwaPushNotificationByTypeMutation,
  type OptOutEwaPushNotificationByTypeMutation,
} from '../../../../../../new-graphql/generated';
import { useIntl } from '../../../../../../providers/LocalisationProvider';
import { useToast } from '../../../../../../common/shared-hooks/useToast';
import { mappedPushNotificationTypeDetails, optimalUpdateEWARecurringPushNotificationOptInStatus } from '../helper';
import { SettingToggle } from '../../../../../card-management/components/SettingToggle';
import { isInstapayError } from '../../../utils/graphql-processor';

type EWARecurringPushNotificationSettingToggleByTypeProps = {
  optedIn: boolean;
  type?: EwaPushNotificationType | null;
  orgId: string;
  btsAction?: () => void;
  recurringFeature: EwaPushNotificationFeature;
};

export const EWARecurringPushNotificationSettingToggleByType = ({
  btsAction,
  optedIn,
  orgId,
  recurringFeature,
  type,
}: EWARecurringPushNotificationSettingToggleByTypeProps) => {
  const { mutateAsync: optIn } = useOptInEwaPushNotificationByTypeMutation();
  const { mutateAsync: optOut } = useOptOutEwaPushNotificationByTypeMutation();
  const { formatMessage } = useIntl();

  const [isOn, setIsOn] = useState(optedIn);
  const Toast = useToast();

  useEffect(() => {
    setIsOn(optedIn);
  }, [optedIn]);

  if (!type || !orgId) {
    return null;
  }

  const pushNotificationTypeDetail = mappedPushNotificationTypeDetails[type];

  const optimalUpdateOptInStatus = async (targetStatus: boolean) => {
    await optimalUpdateEWARecurringPushNotificationOptInStatus({
      recurringFeature,
      typeLevelUpdate: {
        type,
        optedIn: targetStatus,
      },
      orgId,
    });
  };

  const onUpdateOptInStatus = async (oldStatus: boolean, newStatus: boolean) => {
    const action = newStatus ? optIn : optOut;

    const onError = async () => {
      Toast.show({
        content: formatMessage({
          id: 'instapay.pushNotification.error.toastCaption',
        }),
      });
      await optimalUpdateOptInStatus(oldStatus);
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
      const [_optimalUpdateResult, actionResult] = await Promise.all([
        optimalUpdateOptInStatus(newStatus),
        action({
          input: {
            type,
            orgId,
          },
        }),
      ]);

      const apiResult = newStatus
        ? (actionResult as OptInEwaPushNotificationByTypeMutation)?.ewaPushNotification?.optInByType
        : (actionResult as OptOutEwaPushNotificationByTypeMutation)?.ewaPushNotification?.optOutByType;
      if (isInstapayError(apiResult) || !apiResult?.success) {
        await onError();
      }
    } catch (error) {
      await onError();
    }
  };

  const onChanged = async (isSwitchingOn: boolean) => {
    setIsOn(isSwitchingOn);
    await onUpdateOptInStatus(isOn, isSwitchingOn);
  };

  return (
    <SettingToggle
      testID="ewa_recurring_push_notification_setting_toggle"
      borderTopWidth="base"
      borderColor="defaultSurface"
      paddingTop="medium"
      paddingBottom="smallMedium"
      onChange={onChanged}
      label={formatMessage({ id: pushNotificationTypeDetail.translationKey })}
      value={isOn}
      hyperlink={
        pushNotificationTypeDetail.isHavingHelperBts
          ? {
              icon: 'circle-question-outlined',
              action: btsAction,
            }
          : undefined
      }
    />
  );
};
