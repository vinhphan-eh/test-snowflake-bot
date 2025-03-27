import React from 'react';
import { Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { getDefaultCurrency } from '../../../../common/utils/currency';
import { createCurrencyFormatter } from '../../../../common/utils/numbers';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { Region } from '../../../../providers/LocalisationProvider/constants';
import { InstaPayIntroSource } from '../../instapay/navigation/navigationTypes';
import { ChooseBankAccountsForSchedulingSection } from '../components/ChooseBankAccountsForSchedulingSection';
import { useInstaPaySchedulingEventTracking } from '../hooks/useInstaPaySchedulingEventTracking';
import type { InstaPaySchedulingScreenNavigationProp } from '../navigation/navigationTypes';
import { useInstaPaySchedulingStore } from '../stores/useInstaPaySchedulingStore';
import { isAnyBalanceOption } from '../utils/recurring-by-day';

export const InstaPaySchedulingBankAccountSelectionScreen = () => {
  const { formatMessage } = useIntl();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { space } = useTheme();
  const navigation = useNavigation<InstaPaySchedulingScreenNavigationProp<'InstaPaySchedulingBankAccountSelection'>>();

  const amount = useInstaPaySchedulingStore(state => state.amount);
  const maxAmount = useInstaPaySchedulingStore(state => state.maxAmount);
  const selectedAmount = amount ?? maxAmount;

  const payDay = useInstaPaySchedulingStore(state => state.payDay);
  const selectedBankAccount = useInstaPaySchedulingStore(state => state.bankAccount);
  const hasVerifiedBankAccount = useInstaPaySchedulingStore(state => state.hasVerifiedBankAccount);
  const membership = useInstaPaySchedulingStore(state => state.membership);
  const memberWorkCountry = membership?.member?.work_country;
  const isUK = memberWorkCountry === Region.gb;
  const currency = getDefaultCurrency(memberWorkCountry as never);
  const formatCurrency = createCurrencyFormatter();
  const isPayByDay = Boolean(payDay);

  const { trackUserClickedOnNextFromRecurringBankSelectionScreen } = useInstaPaySchedulingEventTracking();

  const onNext = () => {
    trackUserClickedOnNextFromRecurringBankSelectionScreen({
      amount: selectedAmount ?? 0,
      recurringType: isPayByDay ? 'by_day' : 'by_amount',
    });

    if (isUK && !hasVerifiedBankAccount) {
      navigation.navigate('IncomeStack', { screen: 'InstaPayConsent', params: { feature: 'Recurring' } });
      return;
    }

    navigation.navigate('InstaPaySchedulingStack', {
      screen: 'InstaPaySchedulingConfirmation',
    });
  };

  const onNavigatingBack = () => {
    navigation.goBack();
  };

  const onIntroPressed = () => {
    navigation.navigate('IncomeStack', {
      screen: 'InstaPayIntroV2',
      params: {
        source: InstaPayIntroSource.WITHDRAW_RECURRING,
      },
    });
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar
        title={formatMessage({ id: 'instapay.scheduling.screensHeaderTitle' })}
        iconRight="circle-question-outlined"
        onRightPress={onIntroPressed}
        onBack={onNavigatingBack}
      />
      <Page style={{ paddingBottom: bottomInset }} showsVerticalScrollIndicator={false}>
        <Page.Title>
          <Typography.Title typeface="playful" level="h3" style={{ paddingVertical: space.large }}>
            {formatMessage(
              {
                id: isPayByDay
                  ? 'instapay.scheduling.modificationScreen.byDay.title'
                  : 'instapay.scheduling.modificationScreen.byAmountTitle',
              },
              {
                amount: !isAnyBalanceOption(selectedAmount) ? (
                  <Typography.Title typeface="playful" level="h2">
                    {formatCurrency(selectedAmount ?? 0, { currency, precision: 2 })}
                  </Typography.Title>
                ) : (
                  formatMessage({ id: 'instapay.scheduling.modificationScreen.byDay.availableBalanceOption' })
                ),
              }
            )}
          </Typography.Title>
        </Page.Title>
        <Page.Body>
          <ChooseBankAccountsForSchedulingSection selectedSchedulingAmount={selectedAmount ?? 0} />
        </Page.Body>
        <Page.Footer>
          <Button
            disabled={!selectedBankAccount || (!selectedAmount && !isPayByDay)}
            style={{ marginTop: space.medium }}
            onPress={onNext}
            text={formatMessage({ id: 'common.next' })}
            accessibilityLabel="Next"
          />
        </Page.Footer>
      </Page>
    </>
  );
};
