import images from '../../../../../common/assets/images';
import { queryClient } from '../../../../../common/libs/queryClient';
import {
  useGetEwaPushNotificationOptInStatusByFeatureQuery,
  type EwaPushNotificationFeature,
  type EwaPushNotificationOptInStatusByFeature,
  type EwaPushNotificationOptInStatusForSingleType,
  type EwaPushNotificationType,
  type GetEwaPushNotificationOptInStatusByFeatureQuery,
} from '../../../../../new-graphql/generated';
import type { LocaleMessageID } from '../../../../../providers/LocalisationProvider/constants';
import type { RecurringPushNotificationDetails } from '../components/RecurringPushNotificationBottomSheet';

type PushNotificationTypeDetail = {
  translationKey: LocaleMessageID;
  isHavingHelperBts: boolean;
  btsDetails?: RecurringPushNotificationDetails;
};

export type OptimalUpdatePushNotificationFeatureOptInStatusProps = {
  recurringFeature: EwaPushNotificationFeature;
  featureLevelUpdate?: {
    optedIn: boolean;
  };
  typeLevelUpdate?: {
    type: EwaPushNotificationType;
    optedIn: boolean;
  };
  orgId: string;
  setOldState?: (oldState: GetEwaPushNotificationOptInStatusByFeatureQuery | undefined) => void;
};

export const mappedPushNotificationTypeDetails: Record<`${EwaPushNotificationType}`, PushNotificationTypeDetail> = {
  RECURRING_BY_AMOUNT_SUCCESSFUL_PAYMENT: {
    translationKey: 'instapay.pushNotification.types.rbaSuccessfulPayment.caption',
    isHavingHelperBts: true,
    btsDetails: {
      captionKey: 'instapay.pushNotification.bottomSheet.successfulPayment.caption',
      contentKey: 'instapay.pushNotification.bottomSheet.successfulPayment.content',
      image: {
        source: {
          AU: images.ewaRecurringPushNotificationSuccessfulPaymentAU,
          GB: images.ewaRecurringPushNotificationSuccessfulPaymentUK,
        },
        rawHeight: 136,
        rawWidth: 358,
      },
    },
  },
  RECURRING_BY_DAY_INSUFFICIENT_BALANCE: {
    translationKey: 'instapay.pushNotification.types.rbdInsufficientBalance.caption',
    isHavingHelperBts: true,
    btsDetails: {
      captionKey: 'instapay.pushNotification.bottomSheet.insufficientBalance.caption',
      contentKey: 'instapay.pushNotification.bottomSheet.insufficientBalance.content',
      image: {
        source: {
          AU: images.ewaRecurringPushNotificationInsufficientBalance,
          GB: images.ewaRecurringPushNotificationInsufficientBalance,
        },
        rawHeight: 136,
        rawWidth: 358,
      },
    },
  },
  RECURRING_BY_DAY_SUCCESSFUL_PAYMENT: {
    translationKey: 'instapay.pushNotification.types.rbdSuccessfulPayment.caption',
    isHavingHelperBts: true,
    btsDetails: {
      captionKey: 'instapay.pushNotification.bottomSheet.successfulPayment.caption',
      contentKey: 'instapay.pushNotification.bottomSheet.successfulPayment.content',
      image: {
        source: {
          AU: images.ewaRecurringPushNotificationSuccessfulPaymentAU,
          GB: images.ewaRecurringPushNotificationSuccessfulPaymentUK,
        },
        rawHeight: 136,
        rawWidth: 358,
      },
    },
  },
};

/**
 * To avoid reloading the opt-in status for each feature on every update (even at the feature or type level)
 * and to reduce the loading time for the opt-in/out action to be processed successfully, this will temporarily
 * modify the query data to allow the requested new status to be updated immediately after the action is triggered.
 * If the action fails for any reason, the system will revert to the previous state.
 * (Note: This flow follows the same logic as Card Management tab's setting toggles)
 */
export const optimalUpdateEWARecurringPushNotificationOptInStatus = async ({
  featureLevelUpdate,
  orgId,
  recurringFeature,
  setOldState,
  typeLevelUpdate,
}: OptimalUpdatePushNotificationFeatureOptInStatusProps) => {
  if (!featureLevelUpdate && !typeLevelUpdate) {
    return;
  }

  const QUERY_KEY = useGetEwaPushNotificationOptInStatusByFeatureQuery.getKey({
    feature: recurringFeature,
    orgId,
  });

  await queryClient.cancelQueries(QUERY_KEY);

  queryClient.setQueryData(
    QUERY_KEY,
    (
      old: GetEwaPushNotificationOptInStatusByFeatureQuery | undefined
    ): GetEwaPushNotificationOptInStatusByFeatureQuery => {
      const organisation = old?.me?.org;

      if (!organisation) {
        queryClient.invalidateQueries(QUERY_KEY);
        return { ...old };
      }

      if (setOldState) {
        setOldState({ ...old });
      }

      const oldStatuses = (
        organisation?.ewaPushNotification?.optInStatusByFeature as EwaPushNotificationOptInStatusByFeature
      )?.statuses;
      let newStatuses = [] as EwaPushNotificationOptInStatusForSingleType[];
      let isFeatureLevelOptedIn = false;

      if (featureLevelUpdate) {
        newStatuses = oldStatuses.map(status => ({ ...status, optedIn: featureLevelUpdate.optedIn }));
        isFeatureLevelOptedIn = featureLevelUpdate.optedIn;
      } else if (typeLevelUpdate) {
        newStatuses = oldStatuses.map(status =>
          status.type === typeLevelUpdate.type ? { ...status, optedIn: typeLevelUpdate.optedIn } : status
        );
        isFeatureLevelOptedIn = newStatuses.some(status => status.optedIn);
      }

      return {
        ...old,
        me: {
          org: {
            ewaPushNotification: {
              optInStatusByFeature: {
                featureLevelOptedIn: isFeatureLevelOptedIn,
                statuses: newStatuses,
              },
            },
          },
        },
      };
    }
  );
};
