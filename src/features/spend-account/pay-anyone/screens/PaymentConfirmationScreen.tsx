import React from 'react';
import { Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DataCard } from '../../../../common/components/data-card';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { DISPLAY_FORMAT } from '../../../../common/constants/date';
import { queryClient } from '../../../../common/libs/queryClient';
import { usePasscodeStore } from '../../../../common/screens/passcode';
import { convertAmountToMoney, getMoneyV2FromFloatAmount } from '../../../../common/utils/currency';
import { formatNumberValue, generateUUID } from '../../../../common/utils/numbers';
import {
  CurrencyType,
  ScheduledPaymentFrequency,
  ScheduledPaymentSaveOutcomeType,
  ScheduledPaymentType,
  TransactionOutcome,
  useCreateScheduledPaymentMutation,
  useGetEWalletAuAccountDetailsQuery,
  useSavePayeeAddressMutation,
  useTransferAuWalletFundsMutation,
  type CreateScheduledPaymentInput,
} from '../../../../new-graphql/generated';
import type { PayAnyoneScreenNavigationProp } from '../navigation/navigationTypes';
import type { FrequencyType } from '../stores/usePayAnyoneStore';
import { usePayAnyoneStore } from '../stores/usePayAnyoneStore';
import { useIntl } from '../../../../providers/LocalisationProvider';

const transformFrequency = (frequency: `${FrequencyType}` | undefined): ScheduledPaymentFrequency | undefined => {
  switch (frequency) {
    case 'Weekly':
      return ScheduledPaymentFrequency.Weekly;
    case 'Fortnightly':
      return ScheduledPaymentFrequency.Fortnightly;
    case 'Monthly':
      return ScheduledPaymentFrequency.Monthly;
    case 'Quarterly':
      return ScheduledPaymentFrequency.Quarterly;

    default:
      return undefined;
  }
};

const AMOUNT_TO_REQUIRE_PASSCODE = 100;

const PaymentConfirmationScreen = () => {
  const navigation = useNavigation<PayAnyoneScreenNavigationProp<'PaymentConfirmation'>>();
  const { payeeDetails, paymentDetails, paymentLater, paymentRecurring, paymentType, savingPayeeDetails } =
    usePayAnyoneStore();
  const sendMoney = useTransferAuWalletFundsMutation();
  const createScheduledPayment = useCreateScheduledPaymentMutation();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { space } = useTheme();
  const setRequirePasscode = usePasscodeStore(state => state.setRequirePasscode);
  const { formatMessage } = useIntl();

  const savePayeeAddress = useSavePayeeAddressMutation();

  const paymentDataCard = [
    {
      label: "You're sending",
      content: `$${formatNumberValue({ rawValue: paymentDetails.amount, delimiter: ',', precision: 2 })}`,
    },
    { label: 'Description', content: paymentDetails.description },
  ];
  const payeeDataCard = [
    { label: 'To this account', content: payeeDetails.accountName },
    { content: `${payeeDetails.bsb} ${payeeDetails.accountNumber}` },
  ];
  const scheduledPaymentDataCard = [];

  if (paymentType === 'RECURRING' && paymentRecurring?.frequency) {
    scheduledPaymentDataCard.push(
      {
        label: 'Frequency',
        content: paymentRecurring.frequency,
      },
      {
        label: 'Start date',
        content: dayjs(new Date(paymentRecurring.startDate)).format(DISPLAY_FORMAT),
      }
    );
    if (paymentRecurring.endType === 'endBy' && paymentRecurring.endDate) {
      scheduledPaymentDataCard.push({
        label: 'End date',
        content: dayjs(new Date(paymentRecurring.endDate)).format(DISPLAY_FORMAT),
      });
    }
    if (paymentRecurring.endType === 'numberOfPayments') {
      scheduledPaymentDataCard.push({
        label: 'Number of payments',
        content: paymentRecurring.numberOfPayments || 0,
      });
    }
    if (paymentRecurring.endType === 'noEnd') {
      scheduledPaymentDataCard.push({
        label: 'End date',
        content: 'No end',
      });
    }
  }

  if (paymentType === 'LATER' && paymentLater?.startDate) {
    scheduledPaymentDataCard.push({
      label: 'Scheduled date',
      content: dayjs(new Date(paymentLater?.startDate)).format(DISPLAY_FORMAT),
    });
  }

  if (paymentDetails.reference) {
    paymentDataCard.push({ label: 'Reference', content: paymentDetails.reference });
  }

  const goBack = () => {
    navigation.goBack();
  };

  const processSavePayeeAddress = () => {
    if (!savingPayeeDetails) {
      return;
    }

    const { accountName, accountNumber, bsb, friendlyName } = payeeDetails;

    savePayeeAddress.mutate({
      input: {
        address: {
          accountName,
          bsb: bsb.replace('-', ''),
          accountNumber,
          friendlyName: friendlyName || accountName,
        },
      },
    });
  };

  const onConfirm = async () => {
    try {
      if (paymentType === 'NOW') {
        const amount = (+paymentDetails.amount).toFixed(2);
        await sendMoney
          .mutateAsync({
            transferDetails: {
              accountName: payeeDetails.accountName,
              accountNumber: payeeDetails.accountNumber,
              bsb: payeeDetails.bsb.replace('-', ''),
              amount: getMoneyV2FromFloatAmount(+amount),
              description: paymentDetails.description,
              reference: paymentDetails.reference,
              idempotencyKey: generateUUID(),
            },
          })
          .then(result => {
            const { outcome } = result.transferAUWalletFunds ?? {};
            if (outcome === TransactionOutcome.Accepted) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Success' }],
              });
            } else if (outcome === TransactionOutcome.RefusedDailyTransfersOutLimitBreached) {
              navigation.navigate('DailyLimitError');
            } else {
              navigation.navigate('Error');
            }
          });
      } else {
        const isRecurringPayment = paymentType === 'RECURRING';

        const payload: CreateScheduledPaymentInput = {
          accountName: payeeDetails.accountName,
          accountNumber: payeeDetails.accountNumber,
          bsb: payeeDetails.bsb.replace('-', ''),
          amount: {
            type: CurrencyType.CurrencyTypeAud,
            ...convertAmountToMoney(paymentDetails.amount),
          },
          description: paymentDetails.description,
          reference: paymentDetails.reference,
          startDate: (isRecurringPayment ? paymentRecurring?.startDate : paymentLater?.startDate) ?? '',
          type: isRecurringPayment ? ScheduledPaymentType.Recurring : ScheduledPaymentType.OneTime,
        };

        if (isRecurringPayment) {
          payload.frequency = transformFrequency(paymentRecurring?.frequency ?? undefined);

          if (paymentRecurring?.endType === 'endBy') {
            payload.endDate = paymentRecurring.endDate;
          }
          if (paymentRecurring?.endType === 'numberOfPayments') {
            payload.numberOfPayments = paymentRecurring.numberOfPayments;
          }
        }

        await createScheduledPayment.mutateAsync({ input: payload }).then(result => {
          if (result.createScheduledPayment?.outcome === ScheduledPaymentSaveOutcomeType.Created) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'ScheduledPaymentSuccess' }],
            });
          } else {
            navigation.navigate('Error');
          }
        });
      }
    } catch (error) {
      navigation.navigate('Error');
    } finally {
      processSavePayeeAddress();
      queryClient.invalidateQueries(useGetEWalletAuAccountDetailsQuery.getKey());
    }
  };

  const onConfirmWithPasscode = () => {
    if (Number(paymentDetails.amount) > AMOUNT_TO_REQUIRE_PASSCODE) {
      setRequirePasscode(true, onConfirm);
    } else {
      onConfirm();
    }
  };

  const isLoading = sendMoney.isLoading || createScheduledPayment.isLoading;

  return (
    <TouchOutsideDismissKeyboard>
      <KeyboardAvoidingViewContainer>
        <CustomStatusBar />
        <Page.TopBar onBack={goBack} hideRight title="Pay" />
        <Page
          keyboardShouldPersistTaps="handled"
          style={{ paddingBottom: bottomInset }}
          testID="paymentConfirmationPage"
          showsVerticalScrollIndicator={false}
        >
          <Page.Title>Please confirm your payment</Page.Title>
          <Page.Body marginBottom="xxxlarge">
            <DataCard data={paymentDataCard} hideIcon disabled />
            <DataCard data={payeeDataCard} style={{ marginTop: space.medium }} hideIcon disabled />
            {paymentType !== 'NOW' && (
              <DataCard data={scheduledPaymentDataCard} style={{ marginTop: space.medium }} hideIcon disabled />
            )}
            <Typography.Body variant="small" intent="subdued" style={{ marginTop: space.medium }}>
              {formatMessage({ id: 'spend-account.pay-anyone.confirmationScreen.dailyLimit.title' })}
            </Typography.Body>
          </Page.Body>
          <Page.Footer>
            <Typography.Body variant="small" intent="subdued" style={{ marginBottom: space.medium }}>
              {formatMessage({ id: 'spend-account.pay-anyone.confirmationScreen.accountNameWarning.title' })}
            </Typography.Body>
            <Button text="Confirm" accessibilityLabel="Confirm" onPress={onConfirmWithPasscode} loading={isLoading} />
          </Page.Footer>
        </Page>
      </KeyboardAvoidingViewContainer>
    </TouchOutsideDismissKeyboard>
  );
};

export { PaymentConfirmationScreen };
