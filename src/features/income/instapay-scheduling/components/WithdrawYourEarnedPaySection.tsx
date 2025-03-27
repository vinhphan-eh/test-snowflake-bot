import React, { useEffect, useMemo } from 'react';
import { Box, Skeleton, Typography, useTheme } from '@hero-design/rn';
import { CustomTabs, type CustomTabItem } from './CustomTabs';
import { WithdrawYourEarnedPayManagement } from './withdraw-your-earned-pay-sections/manage/WithdrawYourEarnedPayManagement';
import { NowSection } from './withdraw-your-earned-pay-sections/NowSection';
import { RecurringSection } from './withdraw-your-earned-pay-sections/RecurringSection';
import { getDefaultCurrency } from '../../../../common/utils/currency';
import { createCurrencyFormatter } from '../../../../common/utils/numbers';
import { useGetRecurringByAmountEligibilityQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useSeenRecurringHowItWorksBts } from '../../instapay/hooks/useSeenRecurringHowItWorksBts';
import { useInstaPayDrawdownStore } from '../../instapay/stores/useInstaPayDrawdownStore';
import type {
  ByDaySubscriptionWithOrgDetails,
  SchedulingSubscriptionWithOrgDetails,
} from '../hooks/useCheckInstapaySchedulingPermission';
import { useInstaPaySchedulingEventTracking } from '../hooks/useInstaPaySchedulingEventTracking';
import { useInstaPaySchedulingStore } from '../stores/useInstaPaySchedulingStore';
import {
  WithdrawYourEarnedPaySectionKey,
  useWithdrawYourEarnedPaySectionStore,
} from '../stores/useWithdrawYourEarnedPaySectionStore';

type WithdrawYourEarnedPaySectionProps = {
  activeSchedulingSubscriptions?: SchedulingSubscriptionWithOrgDetails[];
  byDaySubscriptions?: ByDaySubscriptionWithOrgDetails[];
  isRecurringByAmountVisible?: boolean;
  shouldShowRecurringTab?: boolean;
  shouldShowNowTab?: boolean;
  availableBalance: number;
  isLoadingSchedulingPermission: boolean;
  openHowItWorksForByAmount: (isExtended: boolean) => void;
};

export const WithdrawYourEarnedPaySection = ({
  activeSchedulingSubscriptions,
  availableBalance,
  byDaySubscriptions,
  isLoadingSchedulingPermission,
  isRecurringByAmountVisible,
  openHowItWorksForByAmount,
  shouldShowNowTab,
  shouldShowRecurringTab,
}: WithdrawYourEarnedPaySectionProps) => {
  const { space } = useTheme();

  const selectedTabKey = useWithdrawYourEarnedPaySectionStore(state => state.selectedTabKey);
  const setSelectedTabKey = useWithdrawYourEarnedPaySectionStore(state => state.setSelectedTabKey);

  const { setEligibilityDetails } = useInstaPaySchedulingStore();

  useGetRecurringByAmountEligibilityQuery(
    {},
    {
      enabled: isRecurringByAmountVisible,
      onSuccess: data => {
        const eligibilityDetails = data?.me?.orgs?.map(org => ({
          orgId: org.uuid || `${org.kpBusinessId}`,
          isEligible: org.instapay?.recurringByAmountEligibility?.isEligible ?? false,
          errorCode: org.instapay?.recurringByAmountEligibility?.errorCode ?? undefined,
        }));

        setEligibilityDetails(eligibilityDetails ?? []);
      },
      onError: () => {
        setEligibilityDetails([]);
      },
    }
  );

  const formatCurrency = createCurrencyFormatter();
  const memberWorkCountry = useInstaPayDrawdownStore(state => state.workCountry);
  const { setShouldShowCTA } = useInstaPaySchedulingStore();
  const currency = getDefaultCurrency(memberWorkCountry);
  const { formatMessage } = useIntl();
  const { trackUserSwitchedToNowTab, trackUserSwitchedToRecurringTab } = useInstaPaySchedulingEventTracking();
  const { hasHydrate, isSeen: seenRecurringHowItWorksBts } = useSeenRecurringHowItWorksBts();

  useEffect(() => {
    setShouldShowCTA(!!isRecurringByAmountVisible && !activeSchedulingSubscriptions?.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecurringByAmountVisible, activeSchedulingSubscriptions?.length]);

  const customTabs: CustomTabItem[] = useMemo(
    () => [
      ...(shouldShowNowTab
        ? [
            {
              key: WithdrawYourEarnedPaySectionKey.NOW,
              name: formatMessage({ id: 'instapay.scheduling.options.now.caption' }),
              body: <NowSection permittedForRecurring={!!isRecurringByAmountVisible} />,
              onPressed: () => {
                trackUserSwitchedToNowTab();
              },
            },
          ]
        : []),
      ...(shouldShowRecurringTab
        ? [
            {
              key: WithdrawYourEarnedPaySectionKey.RECURRING,
              name: formatMessage({ id: 'instapay.scheduling.options.byAmount.caption' }),
              body: (
                <RecurringSection
                  openHowItWorks={() => openHowItWorksForByAmount(false)}
                  activeSchedulingSubscriptions={activeSchedulingSubscriptions}
                  byDaySubscriptions={byDaySubscriptions}
                  isLoading={isLoadingSchedulingPermission}
                  isRecurringByAmountVisible={!!isRecurringByAmountVisible}
                />
              ),
              onPressed: () => {
                trackUserSwitchedToRecurringTab();

                // Show the How it works Bottom sheet if not previously seen
                if (!seenRecurringHowItWorksBts && hasHydrate) {
                  openHowItWorksForByAmount(true);
                }
              },
            },
          ]
        : []),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      isRecurringByAmountVisible,
      shouldShowRecurringTab,
      activeSchedulingSubscriptions,
      byDaySubscriptions,
      isLoadingSchedulingPermission,
    ]
  );

  const renderAvailableBalance = () => {
    let component = <Skeleton style={{ width: 100, height: 28 }} variant="rectangular" />;

    if (typeof availableBalance !== 'undefined') {
      component = (
        <Typography.Caption fontWeight="semi-bold">{formatCurrency(availableBalance, { currency })}</Typography.Caption>
      );
    }

    return component;
  };

  const shouldRenderAvailableBalance = selectedTabKey !== WithdrawYourEarnedPaySectionKey.DAILY;

  useEffect(() => {
    /**
     * Select the first tab by default if the list of tabs were updated and user has not manually switched tabs
     * This is to help when the second tab's visibility is loaded faster than the first tab, we should still switch
     * to the first tab after the list was updated
     */
    const validSelectedTab = !!customTabs.find(tab => tab.key === selectedTabKey);
    if (customTabs && !validSelectedTab) {
      setSelectedTabKey(customTabs?.[0]?.key as WithdrawYourEarnedPaySectionKey);
    }
  }, [customTabs, selectedTabKey]);

  if (!customTabs.length || !selectedTabKey) {
    return null;
  }

  return (
    <>
      <Box
        backgroundColor="defaultGlobalSurface"
        paddingHorizontal="smallMedium"
        paddingVertical="smallMedium"
        borderRadius="large"
        marginBottom="large"
        marginTop="medium"
        flex={1}
        testID="instapay-recurring-withdrawals-section"
      >
        <Typography.Body
          variant="regular-bold"
          style={{
            marginBottom: space.small,
          }}
        >
          {formatMessage({ id: 'instapay.scheduling.dashboardBox.caption' })}
        </Typography.Body>

        <Box flexDirection="row-reverse" justifyContent="space-between">
          <WithdrawYourEarnedPayManagement />

          {shouldRenderAvailableBalance && (
            <Box flexDirection="row" alignItems="center">
              <Typography.Body variant="small">
                {formatMessage({ id: 'instapay.scheduling.dashboardBox.subtitle' })}
              </Typography.Body>
              <Box padding="xsmall" borderRadius="large" backgroundColor="highlightedSurface" marginLeft="small">
                {renderAvailableBalance()}
              </Box>
            </Box>
          )}
        </Box>

        <Box flex={1} marginTop="small">
          {customTabs?.length > 0 && (
            <CustomTabs
              setSelectedTabKey={(index: string) => {
                setSelectedTabKey(index as WithdrawYourEarnedPaySectionKey);
              }}
              selectedTabKey={selectedTabKey}
              tabs={customTabs}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
