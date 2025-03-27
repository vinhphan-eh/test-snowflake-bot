import {
  useGetEwaPushNotificationOptInStatusByFeatureQuery,
  useOptInEwaPushNotificationByFeatureMutation,
  useOptOutEwaPushNotificationByFeatureMutation,
  type EwaPushNotificationFeature,
  type GetEwaPushNotificationOptInStatusByFeatureQuery,
  type OptInEwaPushNotificationByFeatureMutation,
  type OptOutEwaPushNotificationByFeatureMutation,
} from '../../../../../../new-graphql/generated';
import React, { useEffect, useState } from 'react';
import { useIntl } from '../../../../../../providers/LocalisationProvider';
import { queryClient } from '../../../../../../common/libs/queryClient';
import { useToast } from '../../../../../../common/shared-hooks/useToast';
import { optimalUpdateEWARecurringPushNotificationOptInStatus } from '../helper';
import { SettingToggle } from '../../../../../card-management/components/SettingToggle';
import { isInstapayError } from '../../../utils/graphql-processor';

type EWARecurringPushNotificationMasterToggleProps = {
  isOptedIn: boolean;
  currentRecurringFeature: EwaPushNotificationFeature;
  orgId: string;
};

export const EWARecurringPushNotificationMasterToggle = ({
  currentRecurringFeature,
  isOptedIn,
  orgId,
}: EWARecurringPushNotificationMasterToggleProps) => {
  const { mutateAsync: optIn } = useOptInEwaPushNotificationByFeatureMutation();
  const { mutateAsync: optOut } = useOptOutEwaPushNotificationByFeatureMutation();
  const Toast = useToast();
  const [isOn, setIsOn] = useState(isOptedIn);
  const { formatMessage } = useIntl();
  const [oldFeatureOptedInStatus, setOldFeatureOptedInStatus] = useState<
    GetEwaPushNotificationOptInStatusByFeatureQuery | undefined
  >();
  const QUERY_KEY = useGetEwaPushNotificationOptInStatusByFeatureQuery.getKey({
    feature: currentRecurringFeature,
    orgId,
  });

  useEffect(() => {
    setIsOn(isOptedIn);
  }, [isOptedIn]);

  const revertOldFeatureOptedInStatus = async () => {
    await queryClient.cancelQueries(QUERY_KEY);

    // Updated value
    if (oldFeatureOptedInStatus) {
      queryClient.setQueryData(QUERY_KEY, () => ({
        ...oldFeatureOptedInStatus,
      }));

      setOldFeatureOptedInStatus(undefined);
    } else {
      queryClient.invalidateQueries(QUERY_KEY);
    }
  };

  const onMasterToggleChanged = async (isSwitchingOn: boolean) => {
    const action = isSwitchingOn ? optIn : optOut;

    const onError = async () => {
      Toast.show({
        content: formatMessage({
          id: 'instapay.pushNotification.error.toastCaption',
        }),
      });
      await revertOldFeatureOptedInStatus();
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
      const [_optimalUpdateResult, actionResult] = await Promise.all([
        optimalUpdateEWARecurringPushNotificationOptInStatus({
          recurringFeature: currentRecurringFeature,
          featureLevelUpdate: {
            optedIn: isSwitchingOn,
          },
          orgId,
          setOldState: setOldFeatureOptedInStatus,
        }),
        action({
          input: {
            feature: currentRecurringFeature,
            orgId,
          },
        }),
      ]);

      const apiResult = isSwitchingOn
        ? (actionResult as OptInEwaPushNotificationByFeatureMutation)?.ewaPushNotification?.optInByFeature
        : (actionResult as OptOutEwaPushNotificationByFeatureMutation)?.ewaPushNotification?.optOutByFeature;
      if (isInstapayError(apiResult) || !apiResult?.success) {
        await onError();
      }
    } catch (error) {
      await onError();
    }
  };

  return (
    <SettingToggle
      marginBottom="medium"
      variant="regular-bold"
      onChange={onMasterToggleChanged}
      label={formatMessage({ id: 'instapay.pushNotification.masterSwitch' })}
      value={isOn}
      testID="ewa-recurring-push-notification-master-toggle"
    />
  );
};
