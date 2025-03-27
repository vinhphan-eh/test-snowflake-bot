import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { BottomSheet, Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { Page } from '../../../../common/components/layout/page';
import type { RadioCardOption } from '../../../../common/components/radio-card-group';
import { OverlayLoadingScreen } from '../../../../common/components/spinner';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { getDefaultCurrency } from '../../../../common/utils/currency';
import { createCurrencyFormatter, formatToBSBValue, formatToSortCodeValue } from '../../../../common/utils/numbers';
import { PayCycle } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { Region } from '../../../../providers/LocalisationProvider/constants';
import { useInstaPaySchedulingEventTracking } from '../../instapay-scheduling/hooks/useInstaPaySchedulingEventTracking';
import { HowItWorkBottomSheet } from '../components/HowItWorkBottomSheet';
import { IPPayRunInstructionContent } from '../components/IPPayRunInstructionContent';
import { useInstapayBankOptions, type FormattedInstapayBankAccount } from '../hooks/useInstapayBankOptions';
import { InstaPayIntroSource, type InstaPayScreenNavigationProp } from '../navigation/navigationTypes';
import { InstapayBankAccountEntriesRadioCardGroup } from '../simplified-flow/components/InstapayBankAccountEntriesRadioCardGroup';
import { SimplifiedInstaPayNowFee } from '../simplified-flow/components/SimplifiedInstaPayNowFee';
import { useInstaPayDrawdownStore } from '../stores/useInstaPayDrawdownStore';
import { useInstapayNowSimplifiedFlowStore } from '../stores/useInstapayNowSimplifiedFlowStore';

const generateInstapayBankAccountOption = ({
  amount,
  bankAccount,
  isUK = false,
  skipFreeFee = false,
}: {
  bankAccount: FormattedInstapayBankAccount;
  amount: number;
  skipFreeFee?: boolean;
  isUK?: boolean;
}): RadioCardOption<string> => {
  return {
    title: bankAccount.accountName ?? '',
    subtitle: `${
      isUK ? formatToSortCodeValue(bankAccount.sortCode ?? '') : formatToBSBValue(bankAccount.bsb ?? '')
    } | ${bankAccount.accountNumber}`,
    content: <SimplifiedInstaPayNowFee skipFreeFee={skipFreeFee} bankAccount={bankAccount} amount={amount} />,
    value: bankAccount.externalId ?? '',
    key: bankAccount.externalId ?? '',
  };
};

export const InstaPayNowReceivingAccountScreen = () => {
  const { formatMessage } = useIntl();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { space } = useTheme();
  const navigation = useNavigation<InstaPayScreenNavigationProp<'InstaPayNowReceivingAccount'>>();

  const bsHowItWorkRef = useRef<BottomSheetRef>(null);

  const formatCurrency = createCurrencyFormatter();

  const [showPayCycleInstruction, setShowPayCycleInstruction] = useState<boolean>(false);
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string>('');

  const selectedOrg = useInstaPayDrawdownStore(state => state.membership);
  const drawDownAmount = useInstaPayDrawdownStore(state => state.amount) ?? 0;
  const { max: withdrawalMaxLimit, min: withdrawalMinLimit } = selectedOrg?.limit || {
    withdrawalMaxLimit: 0,
    withdrawalMinLimit: 0,
  };

  const memberWorkCountry = useInstaPayDrawdownStore(state => state.workCountry);
  const currency = getDefaultCurrency(memberWorkCountry);
  const formattedBalance = formatCurrency(drawDownAmount || 0, { currency });

  const setBankAccountToStore = useInstaPayDrawdownStore(state => state.setBankAccount);
  const { workCountry } = useInstaPayDrawdownStore(state => ({
    workCountry: state.workCountry,
  }));
  const { setShouldShowSSAAdTile } = useInstapayNowSimplifiedFlowStore();

  const { accounts: bankAccounts, isLoading: isLoadingBankAccountEntry } = useInstapayBankOptions();

  const bankAccountEntryOptions = useMemo(() => {
    return bankAccounts.map(bankAccount =>
      generateInstapayBankAccountOption({ bankAccount, amount: drawDownAmount, isUK: workCountry === Region.gb })
    );
  }, [bankAccounts]);

  const { trackUserClickedNextFromBankSelectionDuringNowFlow } = useInstaPaySchedulingEventTracking();

  const onNext = () => {
    const account = bankAccounts.find(d => d.externalId === selectedBankAccountId);
    if (!account) {
      return;
    }

    trackUserClickedNextFromBankSelectionDuringNowFlow();

    setBankAccountToStore(account);
    setShouldShowSSAAdTile(!bankAccounts.some(bankAccount => bankAccount.isSSA));

    if (workCountry === Region.gb && !account.beneficiaryId) {
      navigation.navigate('InstaPayConsent', { feature: 'Now' });
      return;
    }

    navigation.navigate('InstaPayConfirm');
  };

  useEffect(() => {
    if (bankAccountEntryOptions?.at(0)) {
      /**
       * Select the first option by default if there are many
       */
      setSelectedBankAccountId(bankAccountEntryOptions[0].value);
    }
  }, [bankAccountEntryOptions]);

  const onNavigatingBack = () => {
    navigation.goBack();
  };

  const onIntroPressed = () => {
    navigation.replace('InstaPayIntroV2', {
      source: InstaPayIntroSource.WITHDRAW_NOW,
    });
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar
        title={formatMessage({ id: 'instapay.pageTitle' })}
        onBack={onNavigatingBack}
        iconRight="circle-question-outlined"
        onRightPress={onIntroPressed}
      />
      <Page
        accessibilityLabel="instapay-now-simplified-flow-details"
        style={{ paddingBottom: bottomInset }}
        showsVerticalScrollIndicator={false}
      >
        <Page.Title style={{ paddingTop: space.large, paddingBottom: space.small }}>
          {formatMessage(
            {
              id: 'instapay.instapayNow.InstaPayNowReceivingAccount.title',
            },
            {
              amount: formattedBalance,
            }
          )}
        </Page.Title>
        <Page.Body alignItems="flex-start">
          <Typography.Body variant="small" intent="subdued" style={{ marginBottom: space.smallMedium }}>
            {formatMessage(
              { id: 'instapay.instapayNow.InstaPayNowReceivingAccount.accessUpToStatement' },
              { maximumAmount: formatCurrency(withdrawalMaxLimit || 0, { currency }) }
            )}{' '}
            <Typography.Body
              onPress={() => {
                bsHowItWorkRef.current?.open();
              }}
              variant="small"
              intent="info"
              style={{ textDecorationLine: 'underline' }}
            >
              {formatMessage({ id: 'common.howItWorks' })}
            </Typography.Body>
          </Typography.Body>

          <Typography.Title level="h4">
            {formatMessage({ id: 'instapay.simplifiedFlowExperiment.detailsScreen.bankAccountEntryQuestion' })}
          </Typography.Title>

          <View style={{ marginTop: space.medium, width: '100%' }}>
            <InstapayBankAccountEntriesRadioCardGroup
              options={bankAccountEntryOptions}
              value={selectedBankAccountId}
              onChange={setSelectedBankAccountId}
              testID="select-bank-account-entries"
            />
            <Typography.Label intent="subdued" style={{ marginTop: space.smallMedium }}>
              {formatMessage({ id: 'instapay.instapayNow.InstaPayNowReceivingAccount.transactionFeeReminder' })}
            </Typography.Label>
          </View>
        </Page.Body>
        <Page.Footer>
          <Button
            disabled={selectedBankAccountId === ''}
            style={{ marginTop: space.medium }}
            onPress={onNext}
            text={formatMessage({ id: 'common.next' })}
            accessibilityLabel="Next"
          />
        </Page.Footer>
      </Page>

      {isLoadingBankAccountEntry && <OverlayLoadingScreen />}

      <BottomSheet
        open={showPayCycleInstruction}
        onRequestClose={() => setShowPayCycleInstruction(false)}
        header={formatMessage({ id: 'instapay.simplifiedFlowExperiment.payCycleHeader' })}
        footer={
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Button variant="text" text="Done" onPress={() => setShowPayCycleInstruction(false)} />
          </View>
        }
      >
        <BottomSheet.ScrollView contentContainerStyle={{ padding: space.medium }}>
          <IPPayRunInstructionContent payCycle={PayCycle.Unknown} />
        </BottomSheet.ScrollView>
      </BottomSheet>

      <HowItWorkBottomSheet
        withdrawalMinLimit={withdrawalMinLimit ?? 0}
        withdrawalMaxLimit={withdrawalMaxLimit ?? 0}
        ref={bsHowItWorkRef}
      />
    </>
  );
};
