import React, { isValidElement, useEffect, useRef, useState, type ReactElement } from 'react';
import { View } from 'react-native';
import { BottomSheet, Box, Button, Icon, Skeleton, Tag, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import BulletLine from '../../../../../common/components/bullet-line';
import {
  INSTAPAY_TIMESHEET_POLICY_WARNING,
  INSTAPAY_TRANSACTION_BLOCKED_MESSAGE,
} from '../../../../../common/constants/instapay';
import { useIncomeVisibility } from '../../../../../common/hooks/useIncomeVisibility';
import { useIsAccountUK } from '../../../../../common/hooks/useIsAccountUK';
import { getDefaultCurrency } from '../../../../../common/utils/currency';
import { getCurrencySymbol } from '../../../../../common/utils/numbers';
import type { RootStackNavigationProp } from '../../../../../navigation/navigationTypes';
import { InstapayErrorCode } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { IPPayRunInstructionContent } from '../../../instapay/components/IPPayRunInstructionContent';
import { useGetFreeTransactionProgress } from '../../../instapay/hooks/useGetFreeTransactionProgress';
import { useInstaPayAvailableBalances, type InstaPayOrg } from '../../../instapay/hooks/useInstaPayAvailableBalances';
import { useInstaPayDrawdownStore } from '../../../instapay/stores/useInstaPayDrawdownStore';
import { isInstapayError } from '../../../instapay/utils/graphql-processor';
import { OTHER_OPTION_CHIP_LABEL } from '../../constants';
import { useCheckRecurringByAmountEligibility } from '../../hooks/useCheckRecurringByAmountEligibility';
import { useInstaPaySchedulingEventTracking } from '../../hooks/useInstaPaySchedulingEventTracking';
import { useInstaPaySchedulingStore } from '../../stores/useInstaPaySchedulingStore';
import {
  WithdrawYourEarnedPaySectionKey,
  useWithdrawYourEarnedPaySectionStore,
} from '../../stores/useWithdrawYourEarnedPaySectionStore';
import { ChoosingEmployerBox } from '../ChoosingEmployerBox';
import { CustomChip, type CustomChipHandler } from '../CustomChip';

export const getErrorCode = (data: InstaPayOrg['instapay']) => {
  const potentiallyViolated = data?.balance;
  if (!isInstapayError(potentiallyViolated)) {
    return null;
  }
  return potentiallyViolated.code;
};

const DEFAULT_INSTAPAY_NOW_MINIMUM = 0.01;
const PRE_DEFINED_AMOUNTS = [500, 150];
const PRE_DEFINED_AMOUNTS_UK = [250, 75];

type NowSectionProps = {
  permittedForRecurring: boolean;
};

const NowSection = ({ permittedForRecurring }: NowSectionProps) => {
  const [showPayCycleInstruction, setShowPayCycleInstruction] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const memberWorkCountry = useInstaPayDrawdownStore(state => state.workCountry);
  const currency = getDefaultCurrency(memberWorkCountry);
  const { formatMessage } = useIntl();
  const setAmountToStore = useInstaPayDrawdownStore(state => state.setAmount);
  const setMembershipToStore = useInstaPayDrawdownStore(state => state.setMembership);
  const storedMembership = useInstaPayDrawdownStore(state => state.membership);
  const isUK = useIsAccountUK();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const {
    instapayNowUnderMaintenance: underMaintenance,
    showInstapay,
    showInstapayNowUsageIncentiveV2,
  } = useIncomeVisibility({
    staleTime: 0, // This is used in critical flow. We don't want to use cached data.
  });
  const {
    isError: balanceError,
    isLoading: balanceLoading,
    orgs,
    payCycle,
    sumAvailableBalance,
    sumReachedMinimumBalances,
  } = useInstaPayAvailableBalances({ enabled: showInstapay, location: 'ByNowCreationTab' });
  const { remainingProgress, showFreeProgress } = useGetFreeTransactionProgress();
  const { space } = useTheme();
  const {
    trackUserClickedOnTryRecurringWithdrawalCTA,
    trackUserClickedOnWithdrawAmountNowButton,
    trackUserViewedErrorsOnNowTab,
  } = useInstaPaySchedulingEventTracking();
  const currencySymbol = getCurrencySymbol(currency);

  const balanceBelowMinimum = sumReachedMinimumBalances === undefined || sumReachedMinimumBalances <= 0;

  let tagText = formatMessage({ id: 'common.mostPopular' });

  const hasValidIncentive = showInstapayNowUsageIncentiveV2 && showFreeProgress;
  if (hasValidIncentive) {
    if (remainingProgress) {
      tagText = formatMessage(
        { id: 'instapay.usage.incentiveV2.tile.subTitle.notReady' },
        { remaining: remainingProgress }
      ).toUpperCase();
    } else {
      tagText = formatMessage({ id: 'instapay.usage.incentiveV2.tile.tag.ready' });
    }
  }

  const getPreDefinedAmounts = (maxBalance: number): string[] => {
    const preDefinedAmounts = isUK ? PRE_DEFINED_AMOUNTS_UK : PRE_DEFINED_AMOUNTS;
    const filteredAmount = preDefinedAmounts.filter(amount => amount < maxBalance);
    filteredAmount.unshift(maxBalance);
    const transformed = filteredAmount.map(amount => `${currencySymbol}${amount}`);
    transformed.push(OTHER_OPTION_CHIP_LABEL);
    return transformed;
  };

  const customChipRef = useRef<CustomChipHandler>(null);

  const storedAmount = useInstaPayDrawdownStore(state => state.amount);

  useEffect(() => {
    if (!storedAmount && storedAmount !== 0) {
      customChipRef.current?.onReset();
    }
  }, [storedAmount]);

  /**
   * Multi-org support
   */
  const isMultiOrgUser = orgs?.length > 1;
  const [errorCode, setErrorCode] = useState<InstapayErrorCode | null>(null);
  const onlyOneOrg = orgs.length === 1;
  const firstOrgViolatePolicy = !!orgs[0]?.violation; // && firstOrgBalance.code === 'VIOLATE_POLICY';
  const userBlocked = orgs.some(org => org.violation === InstapayErrorCode.TransactionBlocked);
  const [showWarnings, setShowWarnings] = useState<boolean>(
    (onlyOneOrg && firstOrgViolatePolicy) || userBlocked || underMaintenance
  );

  /**
   * We only show this error message if all the orgs are not encountering any error, just do not have available balances
   * on the first day of the pay cycle
   */
  const shouldShowNoAvailableBalanceError =
    isMultiOrgUser && orgs.every(org => !org.violation) && sumAvailableBalance <= 0;

  const setDefaultMembership = () => {
    const validOrgs = orgs.filter(org => !org.violation);

    // If there are valid organisations, set the first of them by default
    // Otherwise, set the first organisation
    const membershipToStore = validOrgs?.length ? validOrgs[0] : orgs[0];
    setMembershipToStore(membershipToStore);
  };

  useEffect(() => {
    if (orgs.length && !storedMembership) {
      setDefaultMembership();
    }
  }, [orgs]);

  useEffect(() => {
    if (sumAvailableBalance && storedMembership) {
      // This is to force stored membership (if available) being reset with newest balance
      // in case the accumulated balance of all organisations is updated and observing that change through
      // dependency on the whole orgs object is a bit heavy to process
      const refetchedMembershipDetail = orgs?.find(org => org.getId() === storedMembership.getId());

      // If can find the previously selected membership from the refetched orgs list
      // re-store the membership updated details
      if (refetchedMembershipDetail) {
        setMembershipToStore(refetchedMembershipDetail);
        return;
      }

      // Otherwise, store the default membership to store
      setDefaultMembership();
    }
  }, [sumAvailableBalance]);

  useEffect(() => {
    if (storedMembership) {
      // Reset the custom chip to select the maximum value on changed
      customChipRef.current?.onReset();
      setErrorCode(getErrorCode(storedMembership.instapay));
      setShowWarnings(!!storedMembership.violation);
    }
  }, [storedMembership]);

  /**
   * Mixpanel events tracking
   */
  useEffect(() => {
    if (errorCode) {
      trackUserViewedErrorsOnNowTab({ errorCode });
    } else if (balanceBelowMinimum) {
      trackUserViewedErrorsOnNowTab({ errorCode: 'Balance is below minimum amount' });
    }
  }, [errorCode, balanceBelowMinimum]);

  useEffect(() => {
    if (shouldShowNoAvailableBalanceError) {
      trackUserViewedErrorsOnNowTab({ errorCode: 'All organisations are having no available balances' });
    }
  }, [shouldShowNoAvailableBalanceError]);

  /**
   * Handlings for Try recurring withdrawal CTA
   */
  const { getOrgRecurringByAmountEligibility, isLoaded } = useCheckRecurringByAmountEligibility();
  const isCurrentOrgEligibleForRecurring =
    isLoaded && getOrgRecurringByAmountEligibility(storedMembership?.getId())?.isEligible;
  const { setSelectedTabKey } = useWithdrawYourEarnedPaySectionStore();
  const { setMembership: setMembershipForRecurring } = useInstaPaySchedulingStore();
  const navigateToRecurringTab = () => {
    if (storedMembership) {
      // Select the current membership for Recurring
      setMembershipForRecurring(storedMembership);

      // Then navigate to recurring tab
      setSelectedTabKey(WithdrawYourEarnedPaySectionKey.RECURRING);
    }
  };

  const renderWarning = (content: string | ReactElement): ReactElement => {
    return (
      <Box style={{ width: '100%' }}>
        <Box flexDirection="row" justifyContent="space-between">
          <Typography.Body variant="small">
            {formatMessage({ id: 'instapay.scheduling.options.now.unavailale' })}
          </Typography.Body>
          <Icon icon="circle-info-outlined" size="small" intent="danger" />
        </Box>
        <Box>
          {isValidElement(content) ? (
            content
          ) : (
            <Typography.Body variant="small" intent="subdued">
              {content}
            </Typography.Body>
          )}
        </Box>
      </Box>
    );
  };

  const renderInstapayNowSection = () => {
    // Fallback error if failed to load organisation list for whatever reason
    if ((!balanceLoading && !orgs.length) || balanceError) {
      return renderWarning(formatMessage({ id: 'instapay.errors.unspecified' }));
    }

    if (balanceLoading || !storedMembership) {
      return <Skeleton style={{ width: '100%', height: 88 }} />;
    }

    if (balanceBelowMinimum) {
      return (
        <Box style={{ width: '100%' }}>
          <Typography.Title level="h5">
            {formatMessage({ id: 'incomeDashboard.instapayNow.balanceBelowMinimum' })}
          </Typography.Title>
          {isCurrentOrgEligibleForRecurring && permittedForRecurring && (
            <Button
              style={{ width: '100%', marginTop: space.medium }}
              variant="outlined"
              text={formatMessage({ id: 'instapay.scheduling.options.now.ctas.creation.recurringWithdrawal' })}
              onPress={() => {
                trackUserClickedOnTryRecurringWithdrawalCTA();
                navigateToRecurringTab();
              }}
            />
          )}
        </Box>
      );
    }

    return (
      <Box style={{ width: '100%' }}>
        <Box flexDirection="row" justifyContent="space-between">
          <Typography.Body variant="small-bold">
            {formatMessage({ id: 'instapay.scheduling.options.now.chooseYourAmount' })}
          </Typography.Body>
          <Tag content={tagText} intent="success" />
        </Box>
        <Box flexDirection="row" marginTop="medium">
          <CustomChip
            currency={currency}
            labels={getPreDefinedAmounts(storedMembership.balance)}
            confirmText={
              selectedAmount
                ? formatMessage(
                    { id: 'instapay.scheduling.options.now.ctas.creation.caption' },
                    { amount: `${currencySymbol}${selectedAmount}` }
                  )
                : formatMessage({ id: 'instapay.scheduling.options.now.ctas.creation.unselectedAmount' })
            }
            confirmAction={() => {
              setAmountToStore(selectedAmount);
              trackUserClickedOnWithdrawAmountNowButton({
                amount: selectedAmount,
              });
              navigation.navigate('IncomeStack', { screen: 'InstaPayNowReceivingAccount' });
            }}
            onChange={value => {
              setSelectedAmount(value ?? 0);
            }}
            helperText={formatMessage(
              { id: 'instapay.scheduling.options.now.ctas.creation.helperText' },
              { balance: `${currencySymbol}${storedMembership.balance}` }
            )}
            maxLimitCheck={{
              value: storedMembership.balance,
              errorMessage: formatMessage({ id: 'instapay.amountEntryScreen.maxAmountError' }),
            }}
            minLimitCheck={{
              value: orgs?.[0]?.limit?.min
                ? Math.max(orgs?.[0]?.limit?.min, DEFAULT_INSTAPAY_NOW_MINIMUM)
                : DEFAULT_INSTAPAY_NOW_MINIMUM,
              errorMessage: formatMessage({ id: 'instapay.amountEntryScreen.minAmountError' }),
            }}
            ref={customChipRef}
          />
        </Box>
      </Box>
    );
  };

  const renderPayCycleWarning = (): ReactElement => {
    return (
      <Box>
        <Typography.Body variant="small" style={{ marginTop: space.small }} intent="subdued">
          {formatMessage({ id: 'instapay.menuScreen.payCycleInfo' })}
        </Typography.Body>
        <Typography.Body variant="small" intent="subdued">
          <Typography.Body
            variant="small-bold"
            testID="instapay-pay-cycle-learn-more"
            onPress={() => setShowPayCycleInstruction(true)}
            intent="primary"
          >
            {formatMessage({ id: 'instapay.menuScreen.learnMore' })}
          </Typography.Body>{' '}
          {formatMessage({ id: 'instapay.menuScreen.learnMoreContinue' })}
        </Typography.Body>
        {isCurrentOrgEligibleForRecurring && permittedForRecurring && (
          <Box justifyContent="center" style={{ width: '100%' }}>
            <Button
              style={{ marginTop: space.medium }}
              variant="outlined"
              text={formatMessage({ id: 'instapay.scheduling.options.now.ctas.creation.recurringWithdrawal' })}
              onPress={() => {
                trackUserClickedOnTryRecurringWithdrawalCTA();
                navigateToRecurringTab();
              }}
            />
          </Box>
        )}
      </Box>
    );
  };

  const renderWarnings = () => {
    switch (errorCode) {
      case null:
        return null;
      case InstapayErrorCode.ApprovedTimesheetNotFound:
        return renderWarning(INSTAPAY_TIMESHEET_POLICY_WARNING);
      case InstapayErrorCode.PaymentDateRestricted:
      case InstapayErrorCode.HistoricalOpenPayrunRestricted:
      case InstapayErrorCode.InstapayOnlyAvailableNextPayPeriod:
      case InstapayErrorCode.AfterPaymentDateRestricted:
        return renderWarning(renderPayCycleWarning());
      case InstapayErrorCode.TransactionBlocked:
        return renderWarning(INSTAPAY_TRANSACTION_BLOCKED_MESSAGE);
      default:
        return (
          <Box marginBottom="medium" style={{ width: '100%' }}>
            <Box flexDirection="row" justifyContent="space-between">
              <Typography.Body variant="small">
                {formatMessage({ id: 'instapay.scheduling.options.now.unavailale' })}
              </Typography.Body>
              <Icon icon="circle-info-outlined" size="small" intent="danger" />
            </Box>
            <Typography.Body variant="small" style={{ marginTop: space.small }} intent="subdued">
              {formatMessage({ id: 'instapay.scheduling.options.now.errorCaption' })}
            </Typography.Body>
            <BulletLine intent="subdued" content={formatMessage({ id: 'instapay.menuScreen.unavailableReason_1' })} />
            <BulletLine intent="subdued" content={formatMessage({ id: 'instapay.menuScreen.unavailableReason_2' })} />
            <BulletLine intent="subdued" content={formatMessage({ id: 'instapay.menuScreen.unavailableReason_3' })} />
          </Box>
        );
    }
  };

  const { setMembership } = useInstaPayDrawdownStore();
  const onChangeChosenEmployer = (value: string | null) => {
    if (value) {
      const membershipToStore = orgs.find(org => org.getId() === value);

      if (membershipToStore) {
        setMembership(membershipToStore);
      }
    }
  };

  if (underMaintenance) {
    return (
      <Box style={{ width: '100%' }}>
        <Box flexDirection="row" justifyContent="space-between">
          <Box flex={1} paddingRight="smallMedium">
            <Typography.Body variant="small" intent="subdued">
              {formatMessage({
                id: 'instapay.scheduling.options.now.underMaintenance',
              })}
            </Typography.Body>
          </Box>
          <Icon icon="circle-info-outlined" size="small" intent="danger" />
        </Box>
      </Box>
    );
  }

  if (shouldShowNoAvailableBalanceError) {
    return (
      <Box style={{ width: '100%' }}>
        <Box flexDirection="row" justifyContent="space-between">
          <Box flex={1} paddingRight="smallMedium">
            <Typography.Body variant="small" intent="subdued">
              {formatMessage({
                id: 'instapay.withdrawEarnedPayBox.now.multipleOrgs.errors.noOrgsHaveAvailableBalance',
              })}
            </Typography.Body>
          </Box>
          <Icon icon="circle-info-outlined" size="small" intent="danger" />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {isMultiOrgUser && (
        <ChoosingEmployerBox
          currentMembership={storedMembership}
          ewaMode={WithdrawYourEarnedPaySectionKey.NOW}
          onChange={onChangeChosenEmployer}
          organisations={orgs}
        />
      )}

      <Box flexDirection="row" justifyContent="space-between">
        {showWarnings ? renderWarnings() : renderInstapayNowSection()}
      </Box>

      <BottomSheet
        open={showPayCycleInstruction}
        onRequestClose={() => setShowPayCycleInstruction(false)}
        header={formatMessage({ id: 'instapay.menuScreen.payCycleIssueTitle' })}
        footer={
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Button
              variant="text"
              text={formatMessage({ id: 'instapay.menuScreen.done' })}
              onPress={() => setShowPayCycleInstruction(false)}
            />
          </View>
        }
      >
        <BottomSheet.ScrollView contentContainerStyle={{ padding: space.medium }}>
          <IPPayRunInstructionContent payCycle={payCycle} />
        </BottomSheet.ScrollView>
      </BottomSheet>
    </Box>
  );
};

export { NowSection };
