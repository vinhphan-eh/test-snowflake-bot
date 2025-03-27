import React, { useEffect, useMemo } from 'react';
import { Button } from '@hero-design/rn';

import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { OverlayLoadingScreen } from '../../../../common/components/spinner';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { getDefaultCurrency, getFloatAmountFromMoneyV2 } from '../../../../common/utils/currency';
import { createCurrencyFormatter } from '../../../../common/utils/numbers';
import {
  PayCycle,
  RecurringByDayPayCycle,
  useGetInstaPayRecurringByDayPreviewQuery,
  Weekday,
} from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import type { SupportedRegionCode } from '../../../../providers/LocalisationProvider/constants';
import { useInstaPayAvailableBalances } from '../../instapay/hooks/useInstaPayAvailableBalances';
import { useInstapayTracking } from '../../instapay/hooks/useInstapayTracking';
import { isInstapayError } from '../../instapay/utils/graphql-processor';
import AmountSelection from '../components/recurring-by-day-screen/AmountSelection';
import DaySelection, { type DayOption } from '../components/recurring-by-day-screen/DaySelection';
import OrgSelection from '../components/recurring-by-day-screen/OrgSelection';
import PayCycleSelection from '../components/recurring-by-day-screen/PayCycleSelection';
import StartingDateSelection from '../components/recurring-by-day-screen/StartingDateSelection';
import { MAX_RECURRING_BY_DAY_AMOUNT } from '../constants';
import { useGetCreatableOrgs } from '../hooks/useGetCreatableOrgs';
import type {
  InstaPaySchedulingRouteProp,
  InstaPaySchedulingScreenNavigationProp,
} from '../navigation/navigationTypes';
import { useInstaPaySchedulingStore } from '../stores/useInstaPaySchedulingStore';

const SATURDAY = 6;
const SUNDAY = 0;

export const InstaPayRecurringByDayScreen = () => {
  const {
    maxAmount,
    membership: selectedOrg,
    minAmount,
    payDay = Weekday.Monday,
    firstPaymentDate,
    payCycle,
    currentByDaySubscription,
    resetScheduleByDay,
    setMaxAmount,
    setMembership,
    setMinAmount,
    setPayDay,
    setFirstPaymentDate,
    setPayCycle,
  } = useInstaPaySchedulingStore();
  const membership = useInstaPaySchedulingStore(state => state.membership);

  const formatCurrency = createCurrencyFormatter();

  const { bottom: bottomInset } = useSafeAreaInsets();
  const route = useRoute<InstaPaySchedulingRouteProp<'InstaPaySchedulingSuccess'>>() || {};
  const { action } = route.params;
  const isCreation = action === 'creation';

  const navigation = useNavigation<InstaPaySchedulingScreenNavigationProp<'InstaPayRecurringByDay'>>();
  const { trackPressConfirmRecurringByDay, trackSelectAmountRecurringByDay, trackSelectDayRecurringByDay } =
    useInstapayTracking();

  const { formatMessage } = useIntl();
  const amount = minAmount ? `${minAmount}-${maxAmount}` : '';

  const navigateToErrorScreen = () => {
    navigation.navigate('InstaPaySchedulingError');
  };

  const onNavigatingBack = () => {
    resetScheduleByDay();
    navigation.goBack();
  };

  const { creatableOrgIds, isLoading: mutateRecurringLoading } = useGetCreatableOrgs({
    onError: navigateToErrorScreen,
  });

  const { isLoading: balanceLoading, orgs } = useInstaPayAvailableBalances({
    enabled: true,
    location: 'ScheduleByDayScreen',
    options: { onError: navigateToErrorScreen },
  });
  const isMultiOrgUser = orgs?.length > 1;

  const { data: preview, isLoading: previewLoading } = useGetInstaPayRecurringByDayPreviewQuery(
    { orgID: selectedOrg?.getId() || '' },
    { enabled: Boolean(selectedOrg), onError: navigateToErrorScreen }
  );

  const paymentDate = !isInstapayError(preview?.me?.org?.recurringByDay?.preview)
    ? preview?.me?.org?.recurringByDay?.preview?.payPeriod?.paymentDate
    : undefined;
  const paymentDateOfTheWeek = paymentDate ? (dayjs(paymentDate).format('dddd').toUpperCase() as Weekday) : undefined;

  const estimatedBalances = !isInstapayError(preview?.me?.org?.recurringByDay?.preview)
    ? preview?.me?.org?.recurringByDay?.preview?.estimatedBalances?.map(v => ({
        weekday: v && (dayjs(v.date).format('dddd').toUpperCase() as Weekday),
        amount: v && getFloatAmountFromMoneyV2(v.amount),
      }))
    : undefined;

  const memberPayCycle = !isInstapayError(preview?.me?.org?.recurringByDay?.preview)
    ? preview?.me?.org?.recurringByDay?.preview?.memberPayCycleV2
    : undefined;

  const supportedPayCycles = !isInstapayError(preview?.me?.org?.recurringByDay?.preview)
    ? preview?.me?.org?.recurringByDay?.preview?.supportedPayCycles
    : undefined;

  const isMonthlyUser = memberPayCycle === PayCycle.Monthly;
  const memberWorkCountry = (membership?.member?.work_country ?? 'AU') as SupportedRegionCode;

  const getAmountOptionText = (min: number, max: number) => {
    const formattedMax = formatCurrency(Number(max), {
      currency: getDefaultCurrency(memberWorkCountry),
      precision: 0,
    });
    const formattedMin = formatCurrency(Number(min), {
      currency: getDefaultCurrency(memberWorkCountry),
      precision: 0,
    });

    return max === MAX_RECURRING_BY_DAY_AMOUNT
      ? formatMessage({ id: 'instapay.scheduling.byDaySubscription.amountOption.anyBalances' })
      : `${formattedMin}-${formattedMax}`;
  };

  const getBalanceText = (balance?: number | null) => {
    if (!balance) {
      return '';
    }

    return formatCurrency(Number(balance), {
      currency: getDefaultCurrency(memberWorkCountry),
      precision: 0,
    });
  };

  const isSelectWeekend = [SATURDAY, SUNDAY].includes(dayjs(firstPaymentDate).day());
  const isError = isSelectWeekend;

  const amountOptions = useMemo(() => {
    return [
      { min: 0, max: MAX_RECURRING_BY_DAY_AMOUNT },
      { min: 50, max: 100 },
      { min: 100, max: 150 },
      { min: 150, max: 200 },
      { min: 200, max: 250 },
      { min: 250, max: 300 },
    ].map(({ max, min }) => {
      return {
        max,
        min,
        value: `${min}-${max}`,
        text: getAmountOptionText(min, max),
      };
    });
  }, [memberWorkCountry]);

  const dayOptions = useMemo(
    () => [
      {
        text: formatMessage({ id: 'common.monday' }),
        value: {
          value: Weekday.Monday,
          estimatedBalances: getBalanceText(estimatedBalances?.find(v => v.weekday === Weekday.Monday)?.amount),
          isRecommended: paymentDateOfTheWeek === Weekday.Monday,
        },
      },
      {
        text: formatMessage({ id: 'common.tuesday' }),
        value: {
          value: Weekday.Tuesday,
          estimatedBalances: getBalanceText(estimatedBalances?.find(v => v.weekday === Weekday.Tuesday)?.amount),
          isRecommended: paymentDateOfTheWeek === Weekday.Tuesday,
        },
      },
      {
        text: formatMessage({ id: 'common.wednesday' }),
        value: {
          value: Weekday.Wednesday,
          estimatedBalances: getBalanceText(estimatedBalances?.find(v => v.weekday === Weekday.Wednesday)?.amount),
          isRecommended: paymentDateOfTheWeek === Weekday.Wednesday,
        },
      },
      {
        text: formatMessage({ id: 'common.thursday' }),
        value: {
          value: Weekday.Thursday,
          estimatedBalances: getBalanceText(estimatedBalances?.find(v => v.weekday === Weekday.Thursday)?.amount),
          isRecommended: paymentDateOfTheWeek === Weekday.Thursday,
        },
      },
      {
        text: formatMessage({ id: 'common.friday' }),
        value: {
          value: Weekday.Friday,
          estimatedBalances: getBalanceText(estimatedBalances?.find(v => v.weekday === Weekday.Friday)?.amount),
          isRecommended: paymentDateOfTheWeek === Weekday.Friday,
        },
      },
    ],
    [estimatedBalances, paymentDateOfTheWeek]
  );

  const orgOptions = orgs.map(org => ({
    text: org.name,
    value: org.getId(),
    disabled: isCreation
      ? !creatableOrgIds?.includes(org.getId())
      : currentByDaySubscription?.organisationId !== org.getId(),
  }));

  const payCycleTextMapping = {
    [RecurringByDayPayCycle.RecurringByDayWeekly]: formatMessage({ id: 'instapay.now.payCycle.weekly' }),
    [RecurringByDayPayCycle.RecurringByDayFortnightly]: formatMessage({ id: 'instapay.now.payCycle.fortnightly' }),
  };

  const payCycleOption = supportedPayCycles
    ?.filter(v => v !== null)
    ?.map(v => {
      return {
        text: v ? payCycleTextMapping[v] : '',
        value: v,
      };
    }) as { text: string; value: RecurringByDayPayCycle }[] | undefined;

  useEffect(() => {
    let membershipToStore;
    if (isCreation) {
      // on create flow, set default as first creatable org
      membershipToStore = creatableOrgIds ? orgs.find(o => o.getId() === creatableOrgIds[0]) : undefined;
    } else {
      // on update flow, set default as current subscription org
      membershipToStore = orgs.find(o => o.getId() === currentByDaySubscription?.organisationId);
    }

    if (membershipToStore) {
      setMembership(membershipToStore);
    }
  }, [creatableOrgIds?.length]);

  useEffect(() => {
    const amountOption =
      (currentByDaySubscription
        ? amountOptions.find(
            option =>
              option.min === getFloatAmountFromMoneyV2(currentByDaySubscription.minimumPayAmount) &&
              option.max === getFloatAmountFromMoneyV2(currentByDaySubscription.maximumPayAmount)
          )
        : amountOptions[0]) ?? amountOptions[0];
    setMaxAmount(amountOption.max);
    setMinAmount(amountOption.min);

    if (!isMonthlyUser) {
      // set default payday
      const currentPayDay =
        currentByDaySubscription &&
        dayOptions.find(d => d.value.value === currentByDaySubscription.payDay)?.value.value;
      const defaultDay = currentPayDay ?? dayOptions[0]?.value.value;
      setPayDay(defaultDay);
    }

    const currentFirstPaymentDate = currentByDaySubscription?.firstPaymentDate;
    if (isMonthlyUser) {
      const nextDay = dayjs().add(1, 'day');
      const defaultFistPaymentDate = currentFirstPaymentDate ? dayjs(currentFirstPaymentDate) : nextDay;
      setFirstPaymentDate(defaultFistPaymentDate.toDate());
      setPayDay(defaultFistPaymentDate.format('dddd').toUpperCase() as Weekday);
    }

    const defaultPayCycle = currentByDaySubscription?.payCycle ?? RecurringByDayPayCycle.RecurringByDayWeekly;

    setPayCycle(defaultPayCycle);
  }, [currentByDaySubscription, isMonthlyUser]);

  const oneSelectAmount = (value: string) => {
    const [min, max] = value.split('-');
    setMinAmount(+min);
    setMaxAmount(+max);
    trackSelectAmountRecurringByDay(+max, +min);
  };

  const oneSelectDay = (value: DayOption) => {
    setPayDay(value.value);
    trackSelectDayRecurringByDay(value.value);
  };

  const onSelectFirstPaymentDate = (date: Date) => {
    setFirstPaymentDate(date);
    setPayDay(dayjs(date).format('dddd').toUpperCase() as Weekday);
  };

  const onSelectPayCycle = (value: RecurringByDayPayCycle) => {
    setPayCycle(value);
  };

  const handleSubmit = () => {
    if (maxAmount && minAmount && payDay) {
      trackPressConfirmRecurringByDay(maxAmount, minAmount, payDay);
    }

    navigation.navigate('InstaPaySchedulingStack', { screen: 'InstaPaySchedulingBankAccountSelection' });
  };

  const onChangeChosenOrg = (value: string | null) => {
    if (!value) {
      return;
    }

    const org = orgs.find(o => o.getId() === value);

    if (org) {
      setMembership(org);
    }
  };

  if (balanceLoading || previewLoading || mutateRecurringLoading) {
    return <OverlayLoadingScreen />;
  }

  return (
    <KeyboardAvoidingViewContainer>
      <CustomStatusBar />
      <Page.TopBar
        title={formatMessage({ id: 'instapay.scheduling.byDaySubscription.pageTitle' })}
        onBack={onNavigatingBack}
        hideRight
      />
      <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }}>
        <Page.Body marginBottom="xlarge">
          {isMultiOrgUser && (
            <OrgSelection options={orgOptions} onSelect={onChangeChosenOrg} selectedValue={selectedOrg?.getId()} />
          )}
          {!isMonthlyUser && (
            <DaySelection
              selectedValue={dayOptions.find(d => d.value.value === payDay)?.value ?? dayOptions[0].value}
              onSelect={oneSelectDay}
              options={dayOptions}
            />
          )}

          {isMonthlyUser && (
            <>
              <PayCycleSelection selectedValue={payCycle} onSelect={onSelectPayCycle} options={payCycleOption} />
              <StartingDateSelection
                recommendedDay={paymentDateOfTheWeek}
                selectedValue={firstPaymentDate}
                onSelect={onSelectFirstPaymentDate}
                errorText={
                  isSelectWeekend
                    ? formatMessage({
                        id: 'instapay.scheduling.byDaySubscription.startingDateOption.notAllowWeekendError',
                      })
                    : ''
                }
              />
            </>
          )}
          <AmountSelection selectedValue={amount} onSelect={oneSelectAmount} options={amountOptions} />
        </Page.Body>

        <Page.Footer>
          <Button
            accessibilityLabel="Next"
            disabled={isError}
            onPress={handleSubmit}
            text={formatMessage({ id: 'common.confirm' })}
          />
        </Page.Footer>
      </Page>
    </KeyboardAvoidingViewContainer>
  );
};
