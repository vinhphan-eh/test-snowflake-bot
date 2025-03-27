import React, { useEffect, useState } from 'react';
import { Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DataCard } from '../../../../common/components/data-card';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { convertAmountToMoney } from '../../../../common/utils/currency';
import { generateUUID, createCurrencyFormatter } from '../../../../common/utils/numbers';
import {
  CurrencyType,
  UkTransactionState,
  useGetUkTransactionStateQuery,
  useSendUkFundMutation,
} from '../../../../new-graphql/generated';
import type { PayAnyoneScreenNavigationProp } from '../navigation/navigationTypes';
import { useUkPayAnyoneStore } from '../stores/useUkPayAnyoneStore';

const WAITING_TIMEOUT = 2000;
const MAX_FAILED_COUNT = 5;

const UkPaymentConfirmationScreen = () => {
  const navigation = useNavigation<PayAnyoneScreenNavigationProp<'UkPaymentConfirmation'>>();
  const { payeeDetails, paymentDetails } = useUkPayAnyoneStore();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { space } = useTheme();
  const formatCurrency = createCurrencyFormatter();
  const [isLoading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState<string>('');
  const [refetchCount, setRefetchCount] = useState<number>(0);

  const { data: transactionData } = useGetUkTransactionStateQuery(
    { externalTransactionId: transactionId },
    {
      refetchInterval: () => (refetchCount > MAX_FAILED_COUNT ? false : WAITING_TIMEOUT),
      onSuccess: () => {
        setRefetchCount(refetchCount + 1);
      },
      onError: () => {
        setLoading(false);
        navigation.navigate('Error');
      },
      enabled: !!transactionId,
      cacheTime: 0,
    }
  );

  const transactionState = transactionData?.me?.wallet?.ukTransactionState?.state;

  const completeFetchingTransactionState = () => {
    setLoading(false);
    setTransactionId('');
  };

  const processTransferResult = (externalTransactionId: string, state: UkTransactionState | undefined) => {
    switch (state) {
      case UkTransactionState.Approved:
        completeFetchingTransactionState();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Success' }],
        });
        break;
      case UkTransactionState.Pending:
        if (transactionId !== externalTransactionId) {
          setTransactionId(externalTransactionId);
        }
        if (refetchCount > MAX_FAILED_COUNT) {
          completeFetchingTransactionState();
          navigation.navigate('Error');
        }
        break;
      default:
        completeFetchingTransactionState();
        navigation.navigate('Error');
        break;
    }
  };

  useEffect(() => {
    if (transactionState && !!transactionId) {
      processTransferResult(transactionId, transactionData.me?.wallet?.ukTransactionState?.state);
    }
  }, [transactionId, transactionState]);

  const sendUkFund = useSendUkFundMutation({
    onSuccess: data => {
      processTransferResult(data.sendUkFund.externalTransactionId, data.sendUkFund?.state);
    },
    onError: () => {
      navigation.navigate('Error');
    },
  });

  const paymentDataCard = [
    {
      label: "You're sending",
      content: `${formatCurrency(Number(paymentDetails.amount), { currency: 'GBP', precision: 2 })}`,
    },
    { label: 'Description', content: paymentDetails.description },
  ];
  const payeeDataCard = [
    { label: 'To this account', content: payeeDetails.accountName },
    { content: `${payeeDetails.sortCode} ${payeeDetails.accountNumber}` },
  ];

  const goBack = () => {
    navigation.goBack();
  };

  const sendFund = () => {
    const { subUnits, units } = convertAmountToMoney(paymentDetails.amount);

    sendUkFund.mutate({
      input: {
        amount: {
          type: CurrencyType.CurrencyTypeGbp,
          subUnits,
          units,
        },
        recipient: {
          name: payeeDetails.accountName,
          sortCode: payeeDetails.sortCode,
          accountNumber: payeeDetails.accountNumber,
        },
        description: paymentDetails.description,
        idempotencyKey: generateUUID(),
      },
    });
  };

  const onConfirm = () => {
    setLoading(true);
    sendFund();
  };

  return (
    <TouchOutsideDismissKeyboard>
      <KeyboardAvoidingViewContainer>
        <CustomStatusBar />
        <Page.TopBar onBack={goBack} hideRight title="Pay" />
        <Page
          keyboardShouldPersistTaps="handled"
          style={{ paddingBottom: bottomInset }}
          testID="ukPaymentConfirmationPage"
        >
          <Page.Title>Please confirm your payment</Page.Title>
          <Page.Body marginBottom="xxxlarge">
            <DataCard data={paymentDataCard} hideIcon disabled />
            <DataCard data={payeeDataCard} style={{ marginTop: space.medium }} hideIcon disabled />
          </Page.Body>
          <Page.Footer>
            <Typography.Body variant="small" style={{ marginBottom: space.medium }}>
              {`Account names aren't used for payments, so check that the sort code and account number are correct. If the money is paid to the wrong account, you may not get it back.`}
            </Typography.Body>
            <Button text="Confirm" accessibilityLabel="Confirm" onPress={onConfirm} loading={isLoading} />
          </Page.Footer>
        </Page>
      </KeyboardAvoidingViewContainer>
    </TouchOutsideDismissKeyboard>
  );
};

export { UkPaymentConfirmationScreen };
