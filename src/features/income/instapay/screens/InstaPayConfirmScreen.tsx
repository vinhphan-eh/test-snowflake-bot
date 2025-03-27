import React, { useEffect } from 'react';
import { Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import BigNumber from 'bignumber.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetSuperAppToken } from '../../../../common/auth/store/useSuperAppTokenStore';
import { DataCard } from '../../../../common/components/data-card';
import { InlineTextLink } from '../../../../common/components/inline-text-link';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { useIsAccountUK } from '../../../../common/hooks/useIsAccountUK';
import { queryClient } from '../../../../common/libs/queryClient';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { convertAmountToMoney, getDefaultCurrency } from '../../../../common/utils/currency';
import { createCurrencyFormatter, formatToBSBValue, formatToSortCodeValue } from '../../../../common/utils/numbers';
import { logException } from '../../../../common/utils/sentry';
import { type MoneyV2 } from '../../../../new-graphql/generated';
import {
  CurrencyType,
  useDrawdownInstapayMutation,
  useGetAllInstapayAvailableBalancesQuery,
  useGetAvailableIncentivesQuery,
  useGetInstapayVisibilityQuery,
} from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useInstaPaySchedulingEventTracking } from '../../instapay-scheduling/hooks/useInstaPaySchedulingEventTracking';
import { INSTAPAY_TERM_AND_CONDITIONS_LINK } from '../constants/links';
import { useGetFreeTransactionProgress } from '../hooks/useGetFreeTransactionProgress';
import type { FormattedInstapayBankAccount } from '../hooks/useInstapayBankOptions';
import type { InstaPayScreenNavigationProp } from '../navigation/navigationTypes';
import { InstaPayDrawdownErrorCode } from '../navigation/navigationTypes';
import { useInstaPayDrawdownStore } from '../stores/useInstaPayDrawdownStore';
import { calculateFeeByPercentage, calculateFeeByPercentageWithFreeAmount } from '../utils/calculate-fee-by-percentage';
import { isInstapayError } from '../utils/graphql-processor';

const calculateInstaPayFee = ({
  amount,
  applyFreeFee,
  bankAccount,
  maxTransactionThreshold,
}: {
  amount: number;
  bankAccount: FormattedInstapayBankAccount | null;
  applyFreeFee: boolean;
  maxTransactionThreshold?: MoneyV2;
}): number | null => {
  if (bankAccount) {
    if (applyFreeFee && maxTransactionThreshold) {
      return calculateFeeByPercentageWithFreeAmount({
        amount,
        bankAccount,
        maxTransactionThreshold,
      }).finalFee;
    }

    return calculateFeeByPercentage(amount, bankAccount);
  }

  return null;
};

export const InstaPayConfirmScreen = () => {
  const navigation = useNavigation<InstaPayScreenNavigationProp<'InstaPayConfirm'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { space } = useTheme();
  const { isError, isLoading, mutateAsync } = useDrawdownInstapayMutation();
  const memberWorkCountry = useInstaPayDrawdownStore(state => state.workCountry);
  const { formatMessage } = useIntl();
  const isUK = useIsAccountUK();

  // When coming to this screen, assumption is all InstaPay drawdown data is fulfilled
  const drawdownData = useInstaPayDrawdownStore();
  const amount = drawdownData.amount || 0;
  const { bankAccount, membership } = drawdownData;
  const { accountName, accountNumber, bsb = '', sortCode } = bankAccount || {};
  const { openUrl } = useInAppBrowser();
  const { token } = useGetSuperAppToken('InstaPayConfirmScreen');
  const formatCurrency = createCurrencyFormatter();
  const currency = getDefaultCurrency(memberWorkCountry);
  const { applyFreeFee, maxTransactionThreshold } = useGetFreeTransactionProgress();

  const formattedAmount = formatCurrency(amount, { currency });
  const formattedBankDetails = `${accountName}\n${
    isUK ? formatToSortCodeValue(sortCode ?? '') : formatToBSBValue(bsb ?? '')
  } ${accountNumber}`;
  const instaPayFee = calculateInstaPayFee({ amount, applyFreeFee, bankAccount, maxTransactionThreshold });
  const formattedFee = typeof instaPayFee === 'number' ? formatCurrency(instaPayFee, { currency }) : '';
  const totalAmount = new BigNumber(amount).plus(instaPayFee ?? 0).toNumber();
  const formattedTotalAmount = formatCurrency(totalAmount, { currency });
  const balanceObj = !isInstapayError(membership?.instapay?.balance) ? membership?.instapay?.balance : undefined;
  const orgName = membership?.name;

  const { trackUserConfirmedWithdrawNowDrawdown } = useInstaPaySchedulingEventTracking();

  // To support with resetting selected / inputted amount from Dashboard after confirming
  const resetDrawdownAmount = useInstaPayDrawdownStore(state => state.resetAmount);

  const onConfirm = async () => {
    if (!token) {
      return;
    }

    trackUserConfirmedWithdrawNowDrawdown();

    try {
      const { subUnits, units } = convertAmountToMoney(amount.toString());

      const { instapay } = await mutateAsync({
        input: {
          amount: {
            type: isUK ? CurrencyType.CurrencyTypeGbp : CurrencyType.CurrencyTypeAud,
            units,
            subUnits,
          },
          balanceId: balanceObj?.id || '',
          bankAccountId: bankAccount?.externalId || '',
          ehMemberId: membership?.member?.ehMemberUuid,
          kpBusinessId: membership?.kpBusinessId,
          kpEmployeeId: membership?.member?.kpEmployeeId,
        },
      });

      const drawdownRes = instapay?.drawdown;
      if (!drawdownRes?.success) {
        throw new Error(drawdownRes?.messageCode || '');
      }

      queryClient.invalidateQueries(['GetAllInstapayAvailableBalances']);
      queryClient.invalidateQueries(['GetInstapayTransactions']);
      queryClient.invalidateQueries(useGetAvailableIncentivesQuery.getKey());
      queryClient.invalidateQueries(['GetEstimatedIncome']);
      resetDrawdownAmount();
      navigation.navigate('InstaPaySimplifiedFlowDrawdownSuccess', {
        version: drawdownRes?.version || 1,
      });
    } catch (error) {
      logException(error, { module: 'InstaPayConfirmScreen' });
      const knownErrorCodes = Object.values(InstaPayDrawdownErrorCode);
      let errorCode: InstaPayDrawdownErrorCode;
      // Check error message if it's known error code
      // Otherwise, treat it as general error
      if (error instanceof Error && knownErrorCodes.includes(error.message as InstaPayDrawdownErrorCode)) {
        errorCode = error.message as InstaPayDrawdownErrorCode;
      } else {
        errorCode = InstaPayDrawdownErrorCode.GeneralError;
      }

      if (errorCode === InstaPayDrawdownErrorCode.UnderMaintenance) {
        // Invalidate InstaPay available balances and InstaPay visibility queries
        // To ensure they reflex maintenance mode
        queryClient.invalidateQueries(useGetAllInstapayAvailableBalancesQuery.getKey());
        queryClient.invalidateQueries(useGetInstapayVisibilityQuery.getKey());
      }

      resetDrawdownAmount();
      navigation.navigate('InstaPayDrawdownError', { errorCode });
    }
  };

  useEffect(() => {
    if (isError) {
      navigation.navigate('InstaPayDrawdownError', { errorCode: InstaPayDrawdownErrorCode.GeneralError });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const onOpenTermAndCond = () => {
    openUrl(INSTAPAY_TERM_AND_CONDITIONS_LINK);
  };

  const onNavigatingBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar title={formatMessage({ id: 'instapay.pageTitle' })} hideRight onBack={onNavigatingBack} />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>{formatMessage({ id: 'instapay.confirmationScreen.title' })}</Page.Title>
        <Page.Body>
          <DataCard
            data={[
              {
                label: formatMessage({ id: 'instapay.confirmationScreen.receiveCaption' }),
                content: formattedAmount,
              },
            ]}
            hideIcon
          />
          <DataCard
            data={[
              {
                label: formatMessage({ id: 'instapay.confirmationScreen.bankAccountCaption' }),
                content: formattedBankDetails,
              },
            ]}
            style={{ marginTop: space.medium }}
            hideIcon
          />
          <Typography.Body variant="small" intent="subdued" style={{ marginTop: space.medium }}>
            {formatMessage(
              { id: 'instapay.confirmationScreen.feeAndDeductedMessage.fragment_1' },
              {
                fee: formattedFee,
              }
            )}
          </Typography.Body>
          <Typography.Body variant="small" intent="subdued" style={{ marginTop: space.medium }}>
            {formatMessage(
              { id: 'instapay.confirmationScreen.feeAndDeductedMessage.fragment_2' },
              {
                totalDeductedAmount: formattedTotalAmount,
              }
            )}
          </Typography.Body>
        </Page.Body>
        <Page.Footer>
          <Typography.Body variant="small">
            {formatMessage({ id: 'instapay.confirmationScreen.footer.byConfirmingStatement' })}
            <InlineTextLink
              variant="small"
              accessibilityRole="link"
              accessibilityLabel="InstaPay Now term and conditions"
              testID="instapay-term-conditions"
              onPress={onOpenTermAndCond}
            >
              {formatMessage({ id: 'instapay.confirmationScreen.footer.tncName' })}
            </InlineTextLink>
            {formatMessage({ id: 'instapay.confirmationScreen.footer.deductionStatement' }, { organisation: orgName })}
          </Typography.Body>
          <Button
            testID="instapay-details-confirm"
            onPress={onConfirm}
            style={{ marginTop: space.medium }}
            loading={isLoading}
            accessibilityLabel="Confirm"
            text={formatMessage({ id: 'instapay.confirmationScreen.confirm' })}
          />
        </Page.Footer>
      </Page>
    </>
  );
};
