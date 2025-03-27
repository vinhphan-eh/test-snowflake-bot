import React, { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import Braze from '@braze/react-native-sdk';
import { Box, Spinner, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingViewContainer } from '../../../common/components/layout';
import { OverlayLoadingScreen } from '../../../common/components/spinner';
import { useIncomeVisibility } from '../../../common/hooks/useIncomeVisibility';
import { useShowAppSwitcherOnFocus } from '../../../common/shared-hooks/useShowAppSwitcherOnFocus';
import type { RootStackNavigationProp } from '../../../navigation/navigationTypes';
import { Region } from '../../../providers/LocalisationProvider/constants';
import { EstimatedIncomeTileBottomSheet } from '../components/bottom-sheets/EstimatedIncomeTileBottomSheet';
import { RecurringHowItWorksBottomSheet } from '../components/bottom-sheets/RecurringHowItWorksBottomSheet';
import { EstimatedIncomeCard } from '../instapay/components/EstimatedIncomeCard';
import { useInstaPayAvailableBalances } from '../instapay/hooks/useInstaPayAvailableBalances';
import { useSeenEstimatedIncomeHowItWorksBts } from '../instapay/hooks/useSeenEstimatedIncomeHowItWorksBts';
import { useInstaPayDrawdownStore } from '../instapay/stores/useInstaPayDrawdownStore';
import { RecurringByDay } from '../instapay-scheduling/components/RecurringByDay';
import { WithdrawYourEarnedPaySection } from '../instapay-scheduling/components/WithdrawYourEarnedPaySection';
import { useCheckInstapaySchedulingPermission } from '../instapay-scheduling/hooks/useCheckInstapaySchedulingPermission';
import { useInstaPaySchedulingStore } from '../instapay-scheduling/stores/useInstaPaySchedulingStore';
import {
  WithdrawYourEarnedPaySectionKey,
  useWithdrawYourEarnedPaySectionStore,
} from '../instapay-scheduling/stores/useWithdrawYourEarnedPaySectionStore';

export const IncomeDashboardScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  useShowAppSwitcherOnFocus(navigation);
  const { instaPayScheduling, isLoading, showInstapay, showInstapayEstimatedIncome } = useIncomeVisibility({
    staleTime: 0, // This is used in critical flow. We don't want to use cached data.
  });

  const {
    country: workCountry,
    isError: balanceError,
    isLoading: balanceLoading,
    sumAvailableBalance,
  } = useInstaPayAvailableBalances({ enabled: showInstapay, location: 'IncomeDashboardScreen' });

  const setMemberWorkCountry = useInstaPayDrawdownStore(state => state.setWorkCountry);
  const memberWorkCountry = useInstaPayDrawdownStore(state => state.workCountry);
  const isUK = memberWorkCountry === Region.gb;

  const resetSchedulingStore = useInstaPaySchedulingStore(state => state.resetStore);
  const resetDrawdownStore = useInstaPayDrawdownStore(state => state.resetStoreButWorkCountry);
  const storedMembership = useInstaPayDrawdownStore(state => state.membership);

  const { bottom: bottomInset } = useSafeAreaInsets();
  const { space } = useTheme();

  const { hasHydrate, isSeen: seenEstimatedIncomeBts } = useSeenEstimatedIncomeHowItWorksBts();

  // Set work country in store
  // So that other subsequence screens/components can use it
  useEffect(() => {
    const updateWorkCountry = () => {
      const country = storedMembership?.member?.work_country ?? workCountry;
      setMemberWorkCountry(country as Region);
    };

    updateWorkCountry();
  }, [setMemberWorkCountry, workCountry, storedMembership]);

  useEffect(() => {
    // Reset store for different EWA modes on fresh rendering of the dashboard
    resetSchedulingStore();
    resetDrawdownStore();
  }, []);

  const [recurringHowItWorksBtsAttributes, setRecurringHowItWorksBtsAttributes] = useState<{
    isShowing: boolean;
    isExtended: boolean;
  }>({ isShowing: false, isExtended: false });
  const [showEstimatedIncomeBts, setShowEstimatedIncomeBts] = useState<boolean>(false);
  const {
    activeSchedulingSubscriptions,
    byDaySubscriptions,
    isLoading: isLoadingSchedulingPermission,
    isRecurringByAmountVisible,
    shouldShowRecurringTab,
    showRecurringByDayOnboarding,
  } = useCheckInstapaySchedulingPermission({
    isLoadingOrgs: balanceLoading,
    isErrorOrgs: balanceError,
    visibilityCheckDetails: instaPayScheduling,
  });

  if (shouldShowRecurringTab) {
    Braze.setCustomUserAttribute('user_instapay_recurring_eligible', true);
  }

  useEffect(() => {
    if (showInstapayEstimatedIncome && !seenEstimatedIncomeBts && hasHydrate) {
      // Add a slight delay to prevent screen splashing
      setTimeout(() => {
        setShowEstimatedIncomeBts(true);
      }, 500);
    }
  }, [showInstapayEstimatedIncome, seenEstimatedIncomeBts, hasHydrate]);

  // Support scrolling to recurring withdrawal section on requested
  const navigatedFromSchedulingCTA = useInstaPaySchedulingStore(state => state.navigatedFromCTA);
  const setNavigatedFromSchedulingCTA = useInstaPaySchedulingStore(state => state.setNavigatedFromCTA);
  const screenScrollViewRef = useRef<ScrollView>(null);
  const setWithdrawYourEarnedPaySelectedTab = useWithdrawYourEarnedPaySectionStore(state => state.setSelectedTabKey);

  useEffect(() => {
    if (navigatedFromSchedulingCTA && screenScrollViewRef?.current) {
      setNavigatedFromSchedulingCTA(false);
      setWithdrawYourEarnedPaySelectedTab(WithdrawYourEarnedPaySectionKey.RECURRING);
      screenScrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, [navigatedFromSchedulingCTA]);

  const renderWithdrawYourEarnedPaySection = () => {
    // Conditions check for tabs visibility of recurring withdraw section
    const shouldRenderWithdrawSection = showInstapay || (shouldShowRecurringTab && !isLoadingSchedulingPermission);

    if (!shouldRenderWithdrawSection) {
      return (
        <Box flex={1} marginVertical="medium">
          <Spinner testID="withdraw-your-earned-pay-section-spinner" size="small" />
        </Box>
      );
    }

    return (
      <WithdrawYourEarnedPaySection
        isRecurringByAmountVisible={isRecurringByAmountVisible}
        shouldShowRecurringTab={shouldShowRecurringTab}
        isLoadingSchedulingPermission={isLoadingSchedulingPermission}
        shouldShowNowTab={showInstapay}
        openHowItWorksForByAmount={(isExtended: boolean) =>
          setRecurringHowItWorksBtsAttributes({
            isShowing: true,
            isExtended,
          })
        }
        availableBalance={sumAvailableBalance}
        activeSchedulingSubscriptions={activeSchedulingSubscriptions}
        byDaySubscriptions={byDaySubscriptions}
      />
    );
  };

  const renderEstimatedIncomeCard = () => {
    if (!showInstapayEstimatedIncome) {
      return null;
    }

    return <EstimatedIncomeCard country={memberWorkCountry} openDescription={() => setShowEstimatedIncomeBts(true)} />;
  };

  const renderRecurringHowItWorksBts = () => {
    return (
      <RecurringHowItWorksBottomSheet
        isOpening={recurringHowItWorksBtsAttributes.isShowing}
        setIsOpening={(isShowing: boolean) =>
          setRecurringHowItWorksBtsAttributes({
            ...recurringHowItWorksBtsAttributes,
            isShowing,
          })
        }
        isUK={isUK}
        isExtendedVersion={recurringHowItWorksBtsAttributes.isExtended}
      />
    );
  };

  const renderEstimatedIncomeBts = () => {
    return (
      <EstimatedIncomeTileBottomSheet
        isOpening={showEstimatedIncomeBts}
        setIsOpening={setShowEstimatedIncomeBts}
        isUK={isUK}
      />
    );
  };

  return (
    <>
      <KeyboardAvoidingViewContainer>
        <ScrollView ref={screenScrollViewRef} showsVerticalScrollIndicator={false} testID="income-dashboard-v2">
          {renderEstimatedIncomeCard()}
          <Box paddingHorizontal="medium" style={{ marginTop: space.medium }} alignContent="center">
            {showRecurringByDayOnboarding && <RecurringByDay />}
          </Box>

          <Box paddingHorizontal="medium" style={{ marginBottom: bottomInset + space.medium }}>
            {renderWithdrawYourEarnedPaySection()}
          </Box>
        </ScrollView>
      </KeyboardAvoidingViewContainer>
      {isLoading && <OverlayLoadingScreen />}

      {renderRecurringHowItWorksBts()}
      {renderEstimatedIncomeBts()}
    </>
  );
};
