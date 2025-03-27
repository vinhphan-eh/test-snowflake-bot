import React, { useState } from 'react';
import Braze from '@braze/react-native-sdk';
import { BottomSheet, Box, Button, Typography, List } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { HistoryManagement } from './HistoryManagement';
import { queryClient } from '../../../../../../common/libs/queryClient';
import { getDefaultCurrency, getFloatAmountFromMoneyV2 } from '../../../../../../common/utils/currency';
import { createCurrencyFormatter } from '../../../../../../common/utils/numbers';
import {
  useCancelRecurringByDayMutation,
  useCancelSchedulingSubscriptionMutation,
  useGetAllInstapayRecurringByDaySubscriptionQuery,
  useGetRecurringByAmountEligibilityQuery,
  useGetSchedulingSubscriptionsQuery,
  type MoneyV2,
  type SchedulingSubscriptionResult,
} from '../../../../../../new-graphql/generated';
import { useIntl } from '../../../../../../providers/LocalisationProvider';
import type { SupportedRegionCode } from '../../../../../../providers/LocalisationProvider/constants';
import { isInstapayError } from '../../../../instapay/utils/graphql-processor';
import { useInstaPaySchedulingEventTracking } from '../../../hooks/useInstaPaySchedulingEventTracking';
import type { InstaPaySchedulingScreenNavigationProp } from '../../../navigation/navigationTypes';
import { useInstaPaySchedulingStore } from '../../../stores/useInstaPaySchedulingStore';

interface RecurringManagementProps {
  open: boolean;
  onCloseBts: () => void;
}

export const RecurringManagement = (props: RecurringManagementProps) => {
  const { onCloseBts, open } = props;

  const { trackUserClickedOnCancelFromRecurringModification, trackUserConfirmedRecurringWithdrawalCancellation } =
    useInstaPaySchedulingEventTracking();

  const { mutateAsync: cancelRecurringByDay } = useCancelRecurringByDayMutation();
  const navigation = useNavigation<InstaPaySchedulingScreenNavigationProp<'InstaPaySchedulingModification'>>();
  const { formatMessage } = useIntl();
  const [showCancelBts, setShowCancelBts] = useState(false);
  const formatCurrency = createCurrencyFormatter();
  const { currentByDaySubscription, currentSubscription, membership, resetStore } = useInstaPaySchedulingStore();

  const onPressCancel = () => {
    let amount = 0;
    if (currentSubscription?.amount) {
      amount = getFloatAmountFromMoneyV2(currentSubscription.amount);
    } else if (currentByDaySubscription?.maximumPayAmount) {
      amount = getFloatAmountFromMoneyV2(currentByDaySubscription.maximumPayAmount);
    }

    trackUserClickedOnCancelFromRecurringModification({ amount });
    setShowCancelBts(true);
  };

  const onClose = () => {
    setShowCancelBts(false);
    onCloseBts();
  };

  const navigateToErrorScreen = () => {
    navigation.navigate('InstaPaySchedulingStack', { screen: 'InstaPaySchedulingError' });
  };

  const currency = getDefaultCurrency(membership?.member?.work_country as SupportedRegionCode);

  const cancelScheduling = useCancelSchedulingSubscriptionMutation({
    onError: navigateToErrorScreen,
  });

  const onConfirm = async () => {
    try {
      let cancelResult;
      if (currentSubscription) {
        const response = await cancelScheduling.mutateAsync({
          input: {
            id: currentSubscription?.id as string,
            orgId: membership?.getId() ?? '',
          },
        });
        cancelResult = response?.instapay?.cancelSchedulingSubscription;
      } else if (currentByDaySubscription) {
        const response = await cancelRecurringByDay({
          input: {
            orgId: membership?.getId() ?? '',
          },
        });
        cancelResult = response?.recurringByDay?.cancelRecurringByDay;
      }
      if (isInstapayError(cancelResult) || !(cancelResult as SchedulingSubscriptionResult)?.success) {
        navigateToErrorScreen();
        return;
      }

      const formattedAmount = currentSubscription
        ? formatCurrency(getFloatAmountFromMoneyV2(currentSubscription?.amount as MoneyV2), {
            currency,
            precision: 2,
          })
        : '';

      Braze.setCustomUserAttribute('user_instapay_scheduling_type', 'next_pay_day');

      onClose();

      resetStore();
      navigation.navigate('InstaPaySchedulingStack', {
        screen: 'InstaPaySchedulingSuccess',
        params: {
          formattedAmount,
          action: 'cancellation',
        },
      });
    } catch (err) {
      navigateToErrorScreen();
    } finally {
      const queryKey = currentSubscription
        ? useGetSchedulingSubscriptionsQuery.getKey()
        : useGetAllInstapayRecurringByDaySubscriptionQuery.getKey();
      queryClient.invalidateQueries(queryKey);
      queryClient.invalidateQueries(useGetRecurringByAmountEligibilityQuery.getKey());
    }
  };

  const showManageBts = open && !showCancelBts;
  const showCancelRecurringBts = open && showCancelBts;

  return (
    <>
      {/* this is to workaround having multiple bottom sheets */}
      {showManageBts && (
        <BottomSheet open onRequestClose={onClose} header={formatMessage({ id: 'instapay.manage.title' })}>
          <HistoryManagement onCloseBts={onCloseBts} />
          <List.Item
            title={
              <Typography.Body>
                {formatMessage({ id: 'instapay.pushNotification.management.listItem' })}
              </Typography.Body>
            }
            onPress={() => {
              onCloseBts();
              navigation.navigate('IncomeStack', { screen: 'EWAPushNotificationManagement', params: {} });
            }}
          />
          <List.Item
            title={
              <Typography.Body intent="danger">
                {formatMessage({ id: 'instapay.manage.scheduling.heading' })}
              </Typography.Body>
            }
            onPress={onPressCancel}
          />
        </BottomSheet>
      )}

      <BottomSheet
        open={showCancelRecurringBts}
        onRequestClose={onClose}
        header={formatMessage({ id: 'common.confirmation' })}
        footer={
          <Box flexDirection="row" alignItems="flex-end">
            <Button
              variant="text"
              testID="scheduling-cancellation-confirmation-no"
              text={formatMessage({ id: 'common.no' })}
              onPress={onClose}
            />
            <Button
              variant="text"
              intent="danger"
              testID="scheduling-cancellation-confirmation-yes"
              text={formatMessage({ id: 'instapay.manage.yesCancel' })}
              onPress={() => {
                onClose();
                trackUserConfirmedRecurringWithdrawalCancellation();
                onConfirm();
              }}
            />
          </Box>
        }
      >
        <Box paddingHorizontal="medium" paddingVertical="smallMedium">
          <Typography.Body>
            {formatMessage({ id: 'instapay.manage.scheduling.confirmation.statement' })}
          </Typography.Body>
        </Box>
      </BottomSheet>
    </>
  );
};
