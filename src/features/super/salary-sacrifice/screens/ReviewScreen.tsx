import React, { useMemo } from 'react';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { DataCardItem } from '../../../../common/components/data-card';
import { DataCard } from '../../../../common/components/data-card';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { DISPLAY_FORMAT } from '../../../../common/constants/date';
import { useMixpanel } from '../../../../common/hooks/useMixpanel';
import { queryClient } from '../../../../common/libs/queryClient';
import { createCurrencyFormatter, userInputToMachineNumber } from '../../../../common/utils/numbers';
import type { SuperContributionType } from '../../../../new-graphql/generated';
import {
  useGetSuperContributionsQuery,
  useGetSwagSuperfundAndSuperContributionQuery,
  useSubmitSuperContributionMutation,
} from '../../../../new-graphql/generated';
import { CLICK_SUBMIT_REQUEST_SALARY_SACRIFICE, SALARY_SACRIFICE_MOBULE_NAME } from '../../constants/trackingEvents';
import { useContributionTabs } from '../../hooks/useContributionTabs';
import { useSubmitSuperContributionStore } from '../../store/useSubmitSuperContributionStore';
import { formatContributionAmount } from '../../utils/formatContributionAmount';
import type { SacrificeScreenNavigationProp, SalarySacrificeScreenRouteProp } from '../navigation/navigationTypes';

export const formatDate = (date: string) => {
  try {
    return dayjs(new Date(date)).format(DISPLAY_FORMAT);
  } catch {
    return '';
  }
};

export const ReviewScreen = () => {
  const { space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { eventTracking } = useMixpanel();

  const navigation = useNavigation<SacrificeScreenNavigationProp<'Review'>>();
  const route = useRoute<SalarySacrificeScreenRouteProp<'Review'>>();
  const screenTitle = route?.params.title;
  const trackingAttributes = route?.params.trackingAttributes;

  const { markToggleSeenPendingTab } = useContributionTabs();
  const { setCreatedOrUpdatedContribution } = useSubmitSuperContributionStore();

  const {
    acknowledgedNoContributionTracking,
    contributionType,
    contributionValue,
    endDate,
    membershipUuid,
    orgNames,
    preserveAmount,
    resetData,
    startDate,
  } = useSubmitSuperContributionStore();

  const contributionValueNumber = Number(userInputToMachineNumber({ inputValue: contributionValue }));
  const preserveAmountNumber = Number(userInputToMachineNumber({ inputValue: preserveAmount }));

  const { isLoading: isSubmitting, mutateAsync: submitSuperContribution } = useSubmitSuperContributionMutation();

  const formatCurrency = createCurrencyFormatter();

  const contributionDataCard: DataCardItem[] = useMemo(() => {
    return [
      {
        label: 'Contribution amount',
        content: formatContributionAmount(contributionType, contributionValue),
      },
      {
        label: 'Preserved pay amount',
        content: formatCurrency(preserveAmountNumber),
      },
      {
        label: 'Start my contributions on this date',
        content: formatDate(startDate),
      },
      {
        label: 'Stop my contributions on this date',
        content: endDate ? formatDate(endDate) : 'Never',
      },
    ];
  }, [startDate, endDate, contributionValue, contributionType, preserveAmount]);

  const employerDataCard: DataCardItem[] = [
    {
      label: `When you're paid by`,
      content: orgNames,
    },
  ];

  const onPressEdit = () => navigation.navigate('EditSuperContribution', { title: 'Edit', trackingAttributes });

  const onConfirm = async () => {
    try {
      const payload = {
        membershipId: membershipUuid,
        contributionType: contributionType as SuperContributionType,
        contributionValue: contributionValueNumber * 100,
        preserveAmount: preserveAmountNumber * 100,
        acknowledgedNoContributionTracking,
        startDate,
      };

      const withEndDatePayload = { ...payload, endDate };
      const input = endDate ? withEndDatePayload : payload;

      await submitSuperContribution({ input });

      eventTracking({
        event: CLICK_SUBMIT_REQUEST_SALARY_SACRIFICE,
        categoryName: 'user action',
        metaData: {
          module: SALARY_SACRIFICE_MOBULE_NAME,
          trackingAttributes,
          ...input,
        },
      });

      queryClient.invalidateQueries(useGetSwagSuperfundAndSuperContributionQuery.getKey());
      queryClient.invalidateQueries(useGetSuperContributionsQuery.getKey());
      navigation.navigate('SubmitContributionSuccess', { trackingAttributes });

      // Logic for showing badge status in Manage Contributions pending tab
      setCreatedOrUpdatedContribution(true);
      markToggleSeenPendingTab(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        navigation.navigate('SubmitContributionFailed', {
          errorMessage: error.message || 'failed to create super contribution',
          trackingAttributes,
        });
      }
    } finally {
      resetData();
    }
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar hideRight onBack={navigation.goBack} title={screenTitle} />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>Please confirm these details are correct</Page.Title>

        <Page.Body>
          <Typography.Body variant="regular" style={{ marginBottom: space.medium }}>
            {`Once you confirm, we'll send this request to your employer.`}
          </Typography.Body>

          <DataCard
            testID="salary-sacrifice-contribution-data-card"
            data={contributionDataCard}
            onPress={onPressEdit}
          />

          <DataCard
            style={{ marginTop: space.large }}
            testID="salary-sacrifice-employer-data-card"
            data={employerDataCard}
            hideIcon
          />
        </Page.Body>

        <Page.Footer>
          <Box marginTop="medium">
            <Button
              loading={isSubmitting}
              onPress={onConfirm}
              text="Confirm"
              intent="primary"
              accessibilityLabel="Confirm"
            />
          </Box>
        </Page.Footer>
      </Page>
    </>
  );
};
