import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Divider, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useForm, type RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CurrencyInput } from '../../../../common/components/currency-input';
import { Field } from '../../../../common/components/form';
import { InlineTextLink } from '../../../../common/components/inline-text-link';
import { Page } from '../../../../common/components/layout/page';
import { OverlayLoadingScreen } from '../../../../common/components/spinner';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { queryClient } from '../../../../common/libs/queryClient';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { convertAmountToMoney, getDefaultCurrency, getFloatAmountFromMoneyV2 } from '../../../../common/utils/currency';
import { createCurrencyFormatter, getCurrencySymbol } from '../../../../common/utils/numbers';
import { nonNegativeNumberRegex } from '../../../../common/validations';
import {
  CurrencyType,
  SchedulingSubscriptionPlan,
  Sign,
  useCancelSchedulingSubscriptionMutation,
  useGetSchedulingSubscriptionsQuery,
  useUpdateSchedulingSubscriptionMutation,
  type SchedulingSubscriptionResult,
} from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { Region } from '../../../../providers/LocalisationProvider/constants';
import { RecurringHowItWorksBottomSheet } from '../../components/bottom-sheets/RecurringHowItWorksBottomSheet';
import type { FormattedInstapayBankAccount } from '../../instapay/hooks/useInstapayBankOptions';
import { useInstaPayDrawdownStore } from '../../instapay/stores/useInstaPayDrawdownStore';
import { isInstapayError } from '../../instapay/utils/graphql-processor';
import { ChooseBankAccountsForSchedulingSection } from '../components/ChooseBankAccountsForSchedulingSection';
import { INSTAPAY_WITHDRAW_BY_AMOUNT_TNC_URL, MAX_SCHEDULING_AMOUNT, MAX_SCHEDULING_AMOUNT_UK } from '../constants';
import { useInstaPaySchedulingEventTracking } from '../hooks/useInstaPaySchedulingEventTracking';
import type { InstaPaySchedulingScreenNavigationProp } from '../navigation/navigationTypes';
import { useInstaPaySchedulingStore } from '../stores/useInstaPaySchedulingStore';

interface FormInput {
  amount: string;
}

export const InstaPaySchedulingModificationScreen = () => {
  const navigation = useNavigation<InstaPaySchedulingScreenNavigationProp<'InstaPaySchedulingModification'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { space } = useTheme();
  const { formatMessage } = useIntl();
  const { openUrl } = useInAppBrowser();

  const memberWorkCountry = useInstaPayDrawdownStore(state => state.workCountry);
  const { bankAccount, currentSubscription, membership, setAmount, setSubscriptionId } = useInstaPaySchedulingStore();
  const formatCurrency = createCurrencyFormatter();
  const currency = getDefaultCurrency(memberWorkCountry);
  const hasVerifiedBankAccount = useInstaPaySchedulingStore(state => state.hasVerifiedBankAccount);

  const navigateToErrorScreen = () => {
    navigation.navigate('InstaPaySchedulingError');
  };

  const { trackUserClickedOnUpdateFromRecurringModification } = useInstaPaySchedulingEventTracking();

  const updateScheduling = useUpdateSchedulingSubscriptionMutation({
    onError: navigateToErrorScreen,
  });
  const cancelScheduling = useCancelSchedulingSubscriptionMutation({
    onError: navigateToErrorScreen,
  });

  const [isLoadingBankAccounts, setIsLoadingBankAccounts] = useState<boolean>(false);
  const [bankAccounts, setBankAccounts] = useState<FormattedInstapayBankAccount[]>([]);
  const isLoading = updateScheduling.isLoading || cancelScheduling.isLoading;
  const isUK = memberWorkCountry === Region.gb;
  const maxAmount = isUK ? MAX_SCHEDULING_AMOUNT_UK : MAX_SCHEDULING_AMOUNT;

  const onOpenTnC = () => {
    openUrl(INSTAPAY_WITHDRAW_BY_AMOUNT_TNC_URL);
  };

  useEffect(() => {
    if (!currentSubscription || !membership) {
      navigateToErrorScreen();
    }
  }, [currentSubscription, membership]);

  const minAmount = membership?.limit.schedulingMin as number;
  const amountRule: RegisterOptions = {
    pattern: {
      value: nonNegativeNumberRegex,
      message: formatMessage({ id: 'instapay.amountEntryScreen.fieldCannotContainWords' }),
    },
    min: {
      value: minAmount,
      message: formatMessage({ id: 'instapay.amountEntryScreen.minAmountError' }),
    },
    max: {
      value: maxAmount,
      message: formatMessage({ id: 'instapay.scheduling.options.byAmount.errors.inputValidation.maxAmountError' }),
    },
  };

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
    trigger,
    watch,
  } = useForm<FormInput>({ mode: 'onChange', reValidateMode: 'onChange' });

  const watchAmount = watch('amount');
  const formattedWatchAmount = useMemo(() => {
    const numericWatchedAmount = +watchAmount;
    return Number.isNaN(numericWatchedAmount) ? 0 : numericWatchedAmount;
  }, [watchAmount]);

  const subscriptionAmount = currentSubscription?.amount && getFloatAmountFromMoneyV2(currentSubscription.amount);

  useEffect(() => {
    if (subscriptionAmount) {
      setValue('amount', subscriptionAmount.toString());
      trigger('amount');
    }
    if (currentSubscription?.id) {
      setSubscriptionId(currentSubscription.id);
    }
  }, [currentSubscription]);

  const onUpdate = async (input: FormInput) => {
    const amount = +input.amount;

    trackUserClickedOnUpdateFromRecurringModification({ amount });

    const { subUnits, units } = convertAmountToMoney(input.amount);

    // FIXME: need to remove this UK check later on
    // AU & UK need to be the same flow that needs to be navigated to confirmation screen
    if (isUK) {
      setAmount(amount);
      if (!hasVerifiedBankAccount) {
        navigation.navigate('IncomeStack', { screen: 'InstaPayConsent', params: { feature: 'Recurring' } });
        return;
      }

      navigation.navigate('InstaPaySchedulingStack', {
        screen: 'InstaPaySchedulingConfirmation',
      });
      return;
    }

    try {
      const response = await updateScheduling.mutateAsync({
        input: {
          id: currentSubscription?.id as string,
          amount: {
            type: CurrencyType.CurrencyTypeAud,
            units,
            subUnits,
            sign: Sign.Positive,
          },
          orgId: membership?.getId() ?? '',
          bankAccountExternalId: bankAccount?.externalId || '',
          // FIXME: need to check later on
          plan: SchedulingSubscriptionPlan.Frequently,
        },
      });
      const updateResult = response?.instapay?.updateSchedulingSubscription;

      if (isInstapayError(updateResult) || !(updateResult as SchedulingSubscriptionResult)?.success) {
        navigateToErrorScreen();
        return;
      }

      navigation.navigate('InstaPaySchedulingSuccess', {
        formattedAmount: formatCurrency(amount, { currency, precision: 2 }),
        action: 'byAmountModification',
      });
    } catch (err) {
      navigateToErrorScreen();
    } finally {
      queryClient.invalidateQueries(useGetSchedulingSubscriptionsQuery.getKey());
    }
  };

  const [showHowItWorksBts, setShowHowItWorksBts] = useState<boolean>(false);

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar
        title={formatMessage({ id: 'instapay.scheduling.screensHeaderTitle' })}
        hideRight
        onBack={navigation.goBack}
      />
      <Page showsVerticalScrollIndicator={false} style={{ paddingBottom: bottomInset }}>
        <Page.Title>
          <Typography.Title typeface="playful" level="h3" style={{ paddingVertical: space.large }}>
            {formatMessage(
              {
                id: 'instapay.scheduling.modificationScreen.byAmountTitle',
              },
              {
                amount: (
                  <Typography.Title typeface="playful" level="h2">
                    {formatCurrency(formattedWatchAmount, { currency, precision: 2 })}
                  </Typography.Title>
                ),
              }
            )}
          </Typography.Title>
        </Page.Title>
        <Page.Body>
          <Box marginTop="xsmall" flexDirection="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography.Body variant="small-bold">
                {formatMessage({ id: 'instapay.scheduling.options.byAmount.creationBox.amount.caption' })}
              </Typography.Body>
            </Box>
            <Box>
              <Typography.Body
                onPress={() => setShowHowItWorksBts(true)}
                variant="small"
                intent="info"
                style={{ textDecorationLine: 'underline' }}
              >
                {formatMessage({ id: 'common.howItWorks' })}
              </Typography.Body>
            </Box>
          </Box>

          <Box marginBottom="medium">
            <Field control={control} name="amount" isRequired rules={amountRule}>
              {({ field, fieldState: { error } }) => {
                return (
                  <CurrencyInput
                    {...field}
                    testID="input-scheduling-amount"
                    prefix="dollar-sign"
                    helpText={formatMessage(
                      {
                        id: 'instapay.scheduling.options.byAmount.creationBox.amount.limitHelperText',
                      },
                      {
                        maxAmount: formatCurrency(maxAmount, { currency, precision: 0 }),
                        minAmount: formatCurrency(minAmount, { currency, precision: 0 }),
                      }
                    )}
                    error={error?.message}
                    keyboardType="numeric"
                    defaultValue={subscriptionAmount?.toString()}
                    currencySymbol={<Typography.Body variant="small">{getCurrencySymbol(currency)}</Typography.Body>}
                  />
                );
              }}
            </Field>
          </Box>

          <Divider
            style={{
              marginBottom: space.medium,
            }}
          />

          <ChooseBankAccountsForSchedulingSection
            defaultBankAccountId={currentSubscription?.bankAccountExternalId}
            selectedSchedulingAmount={+watchAmount}
            setIsLoading={setIsLoadingBankAccounts}
            setBankAccounts={setBankAccounts}
          />
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
                organisation: membership?.name,
              }
            )}
          </Typography.Body>
          <Button
            testID="instapay-scheduling-update"
            onPress={handleSubmit(onUpdate)}
            style={{ marginTop: space.medium }}
            text={formatMessage({ id: 'common.update' })}
            disabled={!isValid || isLoadingBankAccounts || !bankAccounts?.length}
          />
        </Page.Footer>
      </Page>

      {isLoading && <OverlayLoadingScreen />}

      <RecurringHowItWorksBottomSheet
        isOpening={showHowItWorksBts}
        setIsOpening={setShowHowItWorksBts}
        isExtendedVersion={false}
        isUK={isUK}
      />
    </>
  );
};
