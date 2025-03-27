import React from 'react';
import Braze from '@braze/react-native-sdk';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetSuperAppToken } from '../../../../common/auth/store/useSuperAppTokenStore';
import { DataCard } from '../../../../common/components/data-card';
import { InlineTextLink } from '../../../../common/components/inline-text-link';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { queryClient } from '../../../../common/libs/queryClient';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { convertAmountToMoney, getDefaultCurrency } from '../../../../common/utils/currency';
import { createCurrencyFormatter, formatToBSBValue, formatToSortCodeValue } from '../../../../common/utils/numbers';
import { capitalize } from '../../../../common/utils/string';
import {
  CurrencyType,
  SchedulingSubscriptionPlan,
  Sign,
  useCreateSchedulingSubscriptionMutation,
  useGetAllInstapayRecurringByDaySubscriptionQuery,
  useGetSchedulingSubscriptionsQuery,
  useSubscribeRecurringByDayMutation,
  useUpdateRecurringByDayMutation,
  useUpdateSchedulingSubscriptionMutation,
  type SchedulingSubscriptionResult,
} from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { Region } from '../../../../providers/LocalisationProvider/constants';
import { useInstaPayDrawdownStore } from '../../instapay/stores/useInstaPayDrawdownStore';
import { calculateFeeByPercentage, getFeePercentage } from '../../instapay/utils/calculate-fee-by-percentage';
import { isInstapayError } from '../../instapay/utils/graphql-processor';
import { INSTAPAY_WITHDRAW_BY_AMOUNT_TNC_URL, MAX_RECURRING_BY_DAY_AMOUNT } from '../constants';
import { useInstaPaySchedulingEventTracking } from '../hooks/useInstaPaySchedulingEventTracking';
import type {
  InstaPaySchedulingScreenNavigationProp,
  InstaPaySchedulingSuccessScreenAction,
} from '../navigation/navigationTypes';
import { useInstaPaySchedulingStore } from '../stores/useInstaPaySchedulingStore';
import { isAnyBalanceOption } from '../utils/recurring-by-day';

export const InstaPaySchedulingConfirmationScreen = () => {
  const navigation = useNavigation<InstaPaySchedulingScreenNavigationProp<'InstaPaySchedulingConfirmation'>>();
  const { openUrl } = useInAppBrowser();
  const { token } = useGetSuperAppToken('InstaPaySchedulingConfirmationScreen');

  const { bottom: bottomInset } = useSafeAreaInsets();
  const { space } = useTheme();
  const { formatMessage } = useIntl();
  const { trackUserClickedOnConfirmScheduleCreation } = useInstaPaySchedulingEventTracking();

  const memberWorkCountry = useInstaPayDrawdownStore(state => state.workCountry);
  const formatCurrency = createCurrencyFormatter();
  const currency = getDefaultCurrency(memberWorkCountry);
  const isUK = memberWorkCountry === Region.gb;

  const {
    amount,
    bankAccount,
    currentByDaySubscription,
    firstPaymentDate,
    maxAmount,
    membership,
    minAmount,
    payCycle,
    payDay,
    resetAmount,
    subscriptionId,
  } = useInstaPaySchedulingStore();
  const { accountName, accountNumber, bsb, sortCode } = bankAccount || {};
  const selectedAmount = (amount ?? maxAmount) || 0;
  const formattedAmount =
    selectedAmount === MAX_RECURRING_BY_DAY_AMOUNT
      ? formatMessage({ id: 'instapay.scheduling.byDaySubscription.amountOption.anyBalances' })
      : formatCurrency(selectedAmount, { currency, precision: !payDay ? 2 : 0 });
  const formattedBankDetails = `${accountName}\n${
    isUK ? formatToSortCodeValue(sortCode ?? '') : formatToBSBValue(bsb ?? '')
  } ${accountNumber}`;
  const instaPayFee = bankAccount ? calculateFeeByPercentage(selectedAmount, bankAccount) : null;
  const feePercentage = bankAccount ? getFeePercentage(bankAccount) : null;
  const formattedFee = typeof instaPayFee === 'number' ? formatCurrency(instaPayFee, { currency }) : '';
  const totalAmount = new BigNumber(selectedAmount).plus(instaPayFee ?? 0).toNumber();
  const formattedTotalAmount = formatCurrency(totalAmount, { currency });
  const orgName = membership?.name;
  const onNavigatingBack = () => {
    navigation.goBack();
  };

  const onOpenTnC = () => {
    openUrl(INSTAPAY_WITHDRAW_BY_AMOUNT_TNC_URL);
  };

  const navigateToSuccessScreen = () => {
    let action: InstaPaySchedulingSuccessScreenAction;
    if (subscriptionId) {
      action = 'byAmountModification';
    } else if (currentByDaySubscription) {
      action = 'byDayModification';
    } else {
      action = payDay ? 'byDayCreation' : 'creation';
    }

    navigation.navigate('InstaPaySchedulingSuccess', {
      formattedAmount,
      action,
      payDay: capitalize(payDay || ''),
      orgId: membership?.getId(),
    });
    resetAmount();
  };

  const navigateToErrorScreen = () => {
    resetAmount();
    navigation.navigate('InstaPaySchedulingError');
  };

  const { isLoading: isCreating, mutateAsync: createSubscription } = useCreateSchedulingSubscriptionMutation({
    onError: () => {
      navigateToErrorScreen();
    },
  });
  const { isLoading: isUpdating, mutateAsync: updateSubscription } = useUpdateSchedulingSubscriptionMutation({
    onError: navigateToErrorScreen,
  });

  const { isLoading: isSubscribing, mutateAsync: subscribeRecurringByDay } = useSubscribeRecurringByDayMutation({
    onError: navigateToErrorScreen,
  });

  const { isLoading: isUpdatingRecurringByDay, mutateAsync: updateRecurringByDay } = useUpdateRecurringByDayMutation({
    onError: navigateToErrorScreen,
  });

  const isLoading = isCreating || isUpdating || isSubscribing || isUpdatingRecurringByDay;

  const handleRecurringByAmount = async () => {
    const { subUnits, units } = convertAmountToMoney(selectedAmount.toString());
    const commonPayload = {
      amount: {
        type: isUK ? CurrencyType.CurrencyTypeGbp : CurrencyType.CurrencyTypeAud,
        units,
        subUnits,
        sign: Sign.Positive,
      },
      orgId: membership?.getId() ?? '',
      bankAccountExternalId: bankAccount?.externalId || '',
      plan: SchedulingSubscriptionPlan.Frequently,
    };
    if (subscriptionId) {
      const response = await updateSubscription({
        input: {
          ...commonPayload,
          id: subscriptionId as string,
        },
      });
      return response?.instapay?.updateSchedulingSubscription ?? null;
    }

    const response = await createSubscription({ input: commonPayload });
    return response?.instapay?.createSchedulingSubscription ?? null;
  };

  const handleRecurringByDay = async () => {
    const { subUnits: minSubUnits, units: minUnits } = convertAmountToMoney(String(minAmount || 0));
    const { subUnits: maxSubUnits, units: maxUnits } = convertAmountToMoney(String(maxAmount || 0));
    const currencyType = isUK ? CurrencyType.CurrencyTypeGbp : CurrencyType.CurrencyTypeAud;

    if (!payDay) {
      return null;
    }

    const input = {
      orgId: membership?.getId() || '',
      payDay,
      minimumPayAmount: {
        type: currencyType,
        units: minUnits,
        subUnits: minSubUnits,
        sign: Sign.Positive,
      },
      maximumPayAmount: {
        type: currencyType,
        units: maxUnits,
        subUnits: maxSubUnits,
        sign: Sign.Positive,
      },
      bankAccountExternalId: bankAccount?.externalId || '',
      firstPaymentDate: firstPaymentDate?.toISOString(),
      payCycle,
    };

    if (currentByDaySubscription) {
      const response = await updateRecurringByDay({ input });
      return response?.recurringByDay?.updateRecurringByDay;
    }

    const response = await subscribeRecurringByDay({ input });
    return response?.recurringByDay?.subscribeRecurringByDay;
  };

  const onConfirm = async () => {
    if (!token) {
      return;
    }

    trackUserClickedOnConfirmScheduleCreation({
      amount: selectedAmount,
      recurringType: payDay ? 'by_day' : 'by_amount',
    });

    try {
      const result = payDay ? await handleRecurringByDay() : await handleRecurringByAmount();

      if (isInstapayError(result) || !(result as SchedulingSubscriptionResult)?.success) {
        navigateToErrorScreen();
        return;
      }

      queryClient.invalidateQueries(useGetSchedulingSubscriptionsQuery.getKey());
      queryClient.invalidateQueries(useGetAllInstapayRecurringByDaySubscriptionQuery.getKey());

      Braze.setCustomUserAttribute('user_instapay_scheduling_type', !payDay ? 'recurring' : 'recurring_by_day');
      Braze.setCustomUserAttribute('user_instapay_recurring_amount', selectedAmount);
      Braze.setCustomUserAttribute('user_last_used_instapay_recurring', new Date());

      navigateToSuccessScreen();
    } catch {
      navigateToErrorScreen();
    }
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar
        title={formatMessage({ id: 'instapay.scheduling.screensHeaderTitle' })}
        hideRight
        onBack={onNavigatingBack}
      />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>
          {formatMessage({
            id: 'instapay.scheduling.confirmation.caption',
          })}
        </Page.Title>
        <Page.Body>
          <DataCard
            data={[
              {
                label: formatMessage({ id: 'instapay.scheduling.confirmation.amountInfo.youWillReceive' }),
                content: formattedAmount,
                bottomLabel: (
                  <Box>
                    <Typography.Caption style={{ marginTop: space.small }}>
                      {formatMessage(
                        {
                          id: payDay
                            ? 'instapay.scheduling.confirmation.amountInfo.payByDayTime'
                            : 'instapay.scheduling.confirmation.amountInfo.wheneverItsReady',
                        },
                        {
                          day: capitalize(payDay || ''),
                        }
                      )}{' '}
                      {firstPaymentDate &&
                        formatMessage(
                          {
                            id: 'instapay.scheduling.confirmation.amountInfo.firstPaymentDate',
                          },
                          {
                            date: dayjs(firstPaymentDate).format('DD/MM/YYYY'),
                          }
                        )}
                    </Typography.Caption>
                  </Box>
                ),
              },
            ]}
            hideIcon
          />
          <DataCard
            data={[
              {
                label: formatMessage({ id: 'instapay.scheduling.confirmation.bankAccountInfo.intoThisAccount' }),
                content: formattedBankDetails,
              },
            ]}
            style={{ marginTop: space.medium }}
            hideIcon
          />
          <Typography.Body variant="small" intent="subdued" style={{ marginTop: space.medium }}>
            {!isAnyBalanceOption(selectedAmount)
              ? formatMessage(
                  { id: 'instapay.scheduling.confirmation.amountAndFeeSummary' },
                  {
                    fee: formattedFee,
                    deductionAmount: formattedTotalAmount,
                  }
                )
              : formatMessage(
                  { id: 'instapay.scheduling.confirmation.feeSummary' },
                  {
                    fee: feePercentage,
                  }
                )}
          </Typography.Body>
        </Page.Body>
        <Page.Footer marginTop="xlarge">
          <Typography.Body variant="small">
            {formatMessage({ id: 'instapay.scheduling.confirmation.paySlipDeductionSummary.byConfirmingStatement' })}
            <InlineTextLink
              variant="small"
              accessibilityRole="link"
              accessibilityLabel="Perks and Earned Wage Access Terms and Conditions"
              testID="instapay-withdraw-by-amount-tnc"
              onPress={onOpenTnC}
            >
              {formatMessage({ id: 'instapay.scheduling.confirmation.paySlipDeductionSummary.tncName' })}
            </InlineTextLink>
            {formatMessage(
              { id: 'instapay.scheduling.confirmation.paySlipDeductionSummary.deductionStatement' },
              {
                organisation: orgName,
              }
            )}
          </Typography.Body>
          <Button
            testID="instapay-scheduling-confirm"
            onPress={onConfirm}
            style={{ marginTop: space.medium }}
            loading={isLoading}
            text={formatMessage({ id: 'common.confirm' })}
          />
        </Page.Footer>
      </Page>
    </>
  );
};
