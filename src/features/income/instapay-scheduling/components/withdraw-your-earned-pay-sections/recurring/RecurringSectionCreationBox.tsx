import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import {
  createCurrencyFormatter,
  getCurrencySymbol,
  type SupportedCurrency,
} from '../../../../../../common/utils/numbers';
import type { RootStackNavigationProp } from '../../../../../../navigation/navigationTypes';
import { useIntl } from '../../../../../../providers/LocalisationProvider';
import { Region } from '../../../../../../providers/LocalisationProvider/constants';
import type { InstaPayOrg } from '../../../../instapay/hooks/useInstaPayAvailableBalances';
import {
  DEFAULT_SCHEDULING_AMOUNT,
  DEFAULT_SCHEDULING_AMOUNT_UK,
  MAX_SCHEDULING_AMOUNT,
  MAX_SCHEDULING_AMOUNT_UK,
  MIN_SCHEDULING_AMOUNT,
  MIN_SCHEDULING_AMOUNT_UK,
  OTHER_OPTION_CHIP_LABEL,
} from '../../../constants';
import { useInstaPaySchedulingEventTracking } from '../../../hooks/useInstaPaySchedulingEventTracking';
import { useInstaPaySchedulingStore } from '../../../stores/useInstaPaySchedulingStore';
import { CustomChip, type CustomChipHandler } from '../../CustomChip';

const PRE_DEFINED_AMOUNTS = [500, DEFAULT_SCHEDULING_AMOUNT, 100];
const PRE_DEFINED_AMOUNTS_UK = [500, DEFAULT_SCHEDULING_AMOUNT_UK, 50];

const getPreDefinedAmounts = (isUK: boolean, currency: SupportedCurrency): string[] => {
  const preDefinedAmounts = isUK ? PRE_DEFINED_AMOUNTS_UK : PRE_DEFINED_AMOUNTS;
  const transformed = preDefinedAmounts.map(amount => `${getCurrencySymbol(currency)}${amount}`);
  transformed.push(OTHER_OPTION_CHIP_LABEL);
  return transformed;
};

type RecurringSectionCreationBoxProps = {
  openHowItWorks: () => void;
  currency: SupportedCurrency;
  membership?: InstaPayOrg;
};

export const RecurringSectionCreationBox = ({
  currency,
  membership,
  openHowItWorks,
}: RecurringSectionCreationBoxProps) => {
  const { formatMessage } = useIntl();
  const formatCurrency = createCurrencyFormatter();
  const { amount: storedAmount, setAmount } = useInstaPaySchedulingStore();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { trackUserClickedOnWithdrawEveryEarnedAmountOnRecurringTab } = useInstaPaySchedulingEventTracking();
  const isUK = membership?.member?.work_country === Region.gb;
  const defaultScheduledAmount = isUK ? DEFAULT_SCHEDULING_AMOUNT_UK : DEFAULT_SCHEDULING_AMOUNT;
  const [selectedAmount, setSelectedAmount] = useState(defaultScheduledAmount);
  const defaultSelectedAmount = formatCurrency(defaultScheduledAmount, { currency, precision: 0 });

  const customChipRef = useRef<CustomChipHandler>(null);
  const defaultMinAmount = isUK ? MIN_SCHEDULING_AMOUNT_UK : MIN_SCHEDULING_AMOUNT;
  const maxAmount = isUK ? MAX_SCHEDULING_AMOUNT_UK : MAX_SCHEDULING_AMOUNT;
  const minAmount = membership?.limit.schedulingMin || defaultMinAmount;

  useEffect(() => {
    if (!storedAmount && storedAmount !== 0) {
      customChipRef.current?.onReset(defaultSelectedAmount);
    }
  }, [storedAmount]);

  useEffect(() => {
    if (membership) {
      customChipRef.current?.onReset(defaultSelectedAmount);
    }
  }, [membership]);

  const onConfirm = () => {
    if (!selectedAmount) {
      return;
    }

    trackUserClickedOnWithdrawEveryEarnedAmountOnRecurringTab({ amount: selectedAmount });

    // Set selected amount to store
    setAmount(selectedAmount);

    navigation.navigate('InstaPaySchedulingStack', { screen: 'InstaPaySchedulingBankAccountSelection' });
  };

  return (
    <Box testID="instapay-recurring-creation-box" style={{ width: '100%' }}>
      <Box flexDirection="row" justifyContent="space-between">
        <Typography.Body variant="small-bold">
          {formatMessage({ id: 'instapay.scheduling.options.byAmount.creationBox.amount.caption' })}
        </Typography.Body>
        <Typography.Body
          testID="recurring-section-creation-box-how-it-works"
          onPress={() => {
            openHowItWorks();
          }}
          variant="small"
          intent="info"
          style={{ textDecorationLine: 'underline' }}
        >
          {formatMessage({ id: 'common.howItWorks' })}
        </Typography.Body>
      </Box>
      <Box flexDirection="row" marginTop="medium">
        <CustomChip
          currency={currency}
          labels={getPreDefinedAmounts(isUK, currency)}
          confirmText={
            selectedAmount
              ? formatMessage(
                  { id: 'instapay.scheduling.options.byAmount.creationBox.ctas.withdrawEveryAmountEarned' },
                  {
                    amount: `${getCurrencySymbol(currency)}${selectedAmount}`,
                  }
                )
              : formatMessage({ id: 'instapay.scheduling.options.byAmount.creationBox.ctas.unselectedAmount' })
          }
          confirmAction={onConfirm}
          onChange={value => setSelectedAmount(value ?? 0)}
          helperText={formatMessage(
            {
              id: 'instapay.scheduling.options.byAmount.creationBox.amount.limitHelperText',
            },
            {
              maxAmount: formatCurrency(maxAmount, { currency, precision: 0 }),
              minAmount: formatCurrency(minAmount, { currency, precision: 0 }),
            }
          )}
          maxLimitCheck={{
            value: maxAmount,
            errorMessage: formatMessage({
              id: 'instapay.scheduling.options.byAmount.errors.inputValidation.maxAmountError',
            }),
          }}
          minLimitCheck={{
            value: minAmount,
            errorMessage: formatMessage({ id: 'instapay.amountEntryScreen.minAmountError' }),
          }}
          defaultSelectedChip={defaultSelectedAmount}
          ref={customChipRef}
        />
      </Box>
    </Box>
  );
};
