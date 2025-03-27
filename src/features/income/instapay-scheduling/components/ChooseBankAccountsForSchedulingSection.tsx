import React, { useEffect, useMemo, useState } from 'react';
import { Box, Spinner, Typography, useTheme } from '@hero-design/rn';
import type { RadioCardOption } from '../../../../common/components/radio-card-group';
import { formatToBSBValue, formatToSortCodeValue } from '../../../../common/utils/numbers';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { Region } from '../../../../providers/LocalisationProvider/constants';
import { useInstapayBankOptions, type FormattedInstapayBankAccount } from '../../instapay/hooks/useInstapayBankOptions';
import { InstapayBankAccountEntriesRadioCardGroup } from '../../instapay/simplified-flow/components/InstapayBankAccountEntriesRadioCardGroup';
import { SimplifiedInstaPayNowFee } from '../../instapay/simplified-flow/components/SimplifiedInstaPayNowFee';
import { useInstaPaySchedulingStore } from '../stores/useInstaPaySchedulingStore';
import { isAnyBalanceOption } from '../utils/recurring-by-day';

const generateInstapayBankAccountOption = ({
  amount,
  bankAccount,
  isUK = false,
  skipFreeFee = false,
}: {
  bankAccount: FormattedInstapayBankAccount;
  amount: number;
  skipFreeFee?: boolean;
  schedulingPromotionApplicable?: boolean;
  isUK?: boolean;
}): RadioCardOption<string> => {
  return {
    title: bankAccount.accountName ?? '',
    subtitle: `${
      isUK ? formatToSortCodeValue(bankAccount.sortCode ?? '') : formatToBSBValue(bankAccount.bsb ?? '')
    } | ${bankAccount.accountNumber}`,
    content: (
      <SimplifiedInstaPayNowFee
        skipFreeFee={skipFreeFee}
        bankAccount={bankAccount}
        amount={amount}
        showAbsoluteFee={!isAnyBalanceOption(amount)}
      />
    ),
    value: bankAccount.externalId ?? '',
    key: bankAccount.externalId ?? '',
  };
};

type ChooseBankAccountsForSchedulingSectionProps = {
  selectedSchedulingAmount: number;
  defaultBankAccountId?: string;
  setIsLoading?: (isLoading: boolean) => void;
  setBankAccounts?: (bankAccounts: FormattedInstapayBankAccount[]) => void;
};

export const ChooseBankAccountsForSchedulingSection = ({
  defaultBankAccountId,
  selectedSchedulingAmount,
  setBankAccounts,
  setIsLoading,
}: ChooseBankAccountsForSchedulingSectionProps) => {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string>(defaultBankAccountId ?? '');
  const { space } = useTheme();
  const { formatMessage } = useIntl();
  const setSelectedBankAccount = useInstaPaySchedulingStore(state => state.setBankAccount);
  const setHasVerifiedBankAccount = useInstaPaySchedulingStore(state => state.setHasVerifiedBankAccount);

  const selectedMembership = useInstaPaySchedulingStore(state => state.membership);
  const { accounts: bankAccounts, isLoading: isLoadingBankAccountEntry } = useInstapayBankOptions(
    selectedMembership?.getId()
  );
  const isUK = selectedMembership?.member?.work_country === Region.gb;

  const bankAccountEntryOptions = useMemo(() => {
    return bankAccounts.map(bankAccount =>
      generateInstapayBankAccountOption({
        bankAccount,
        amount: selectedSchedulingAmount,
        skipFreeFee: true,
        isUK,
      })
    );
  }, [bankAccounts, selectedSchedulingAmount]);

  useEffect(() => {
    if (bankAccountEntryOptions?.length && bankAccountEntryOptions?.[0] && !selectedBankAccountId) {
      /**
       * Select the first option by default if there are many
       */
      setSelectedBankAccountId(bankAccountEntryOptions[0].value);
    }
  }, [bankAccountEntryOptions]);

  useEffect(() => {
    const selectedBankAccount = bankAccounts?.find(bankAccount => bankAccount.externalId === selectedBankAccountId);

    if (selectedBankAccount) {
      setSelectedBankAccount(selectedBankAccount);

      if (isUK) {
        if (!selectedBankAccount.beneficiaryId) {
          setHasVerifiedBankAccount(false);
        } else {
          setHasVerifiedBankAccount(true);
        }
      }
    }
  }, [selectedBankAccountId, bankAccounts]);

  useEffect(() => {
    setIsLoading?.(isLoadingBankAccountEntry);
  }, [isLoadingBankAccountEntry, setIsLoading]);

  useEffect(() => {
    setBankAccounts?.(bankAccounts);
  }, [bankAccounts, setBankAccounts]);

  return (
    <Box>
      <Typography.Body
        style={{
          marginTop: space.xsmall,
          marginBottom: space.small,
        }}
        variant="small-bold"
      >
        {formatMessage({ id: 'instapay.scheduling.options.byAmount.creationBox.bankAccount.caption' })}
      </Typography.Body>

      {isLoadingBankAccountEntry ? (
        <Box
          style={{
            height: 30,
          }}
          marginTop="smallMedium"
        >
          <Spinner testID="instapay-scheduling-bank-account-spinner" size="small" />
        </Box>
      ) : (
        <Box>
          <InstapayBankAccountEntriesRadioCardGroup
            style={{
              marginTop: space.small,
            }}
            options={bankAccountEntryOptions}
            value={selectedBankAccountId}
            onChange={setSelectedBankAccountId}
            testID="instapay-scheduling-select-bank-account"
          />

          <Typography.Caption
            intent="subdued"
            style={{
              marginTop: space.smallMedium,
            }}
          >
            {formatMessage({
              id: 'instapay.scheduling.options.byAmount.creationBox.bankAccount.transactionFeeReminder',
            })}
          </Typography.Caption>
        </Box>
      )}
    </Box>
  );
};
