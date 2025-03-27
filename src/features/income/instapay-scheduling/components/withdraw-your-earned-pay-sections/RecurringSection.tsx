import React, { useEffect, useMemo } from 'react';
import { Box, Icon, Skeleton, Typography } from '@hero-design/rn';
import { RecurringByDaySubscriptionDetails } from './recurring/RecurringByDaySubscriptionDetails';
import { RecurringSectionCreationBox } from './recurring/RecurringSectionCreationBox';
import { RecurringSectionErrorMessage } from './recurring/RecurringSectionErrorMessage';
import { RecurringSectionSubscriptionDetails } from './recurring/RecurringSectionSubscriptionDetails';
import { useIncomeVisibility } from '../../../../../common/hooks/useIncomeVisibility';
import { getDefaultCurrency } from '../../../../../common/utils/currency';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { useInstaPayAvailableBalances } from '../../../instapay/hooks/useInstaPayAvailableBalances';
import { useInstaPayDrawdownStore } from '../../../instapay/stores/useInstaPayDrawdownStore';
import {
  type ByDaySubscriptionWithOrgDetails,
  type SchedulingSubscriptionWithOrgDetails,
} from '../../hooks/useCheckInstapaySchedulingPermission';
import { useInstaPaySchedulingStore } from '../../stores/useInstaPaySchedulingStore';
import { ChoosingEmployerBox } from '../ChoosingEmployerBox';
import { useCheckRecurringByAmountEligibility } from '../../hooks/useCheckRecurringByAmountEligibility';
import { WithdrawYourEarnedPaySectionKey } from '../../stores/useWithdrawYourEarnedPaySectionStore';

type RecurringSectionProps = {
  activeSchedulingSubscriptions?: SchedulingSubscriptionWithOrgDetails[];
  byDaySubscriptions?: ByDaySubscriptionWithOrgDetails[];
  openHowItWorks: () => void;
  isLoading: boolean;
  isRecurringByAmountVisible: boolean;
};

export const RecurringSection = ({
  activeSchedulingSubscriptions,
  byDaySubscriptions,
  isLoading,
  isRecurringByAmountVisible,
  openHowItWorks,
}: RecurringSectionProps) => {
  const memberWorkCountry = useInstaPayDrawdownStore(state => state.workCountry);
  const currency = getDefaultCurrency(memberWorkCountry);

  const { instapayNowUnderMaintenance: underMaintenance } = useIncomeVisibility();
  const { formatMessage } = useIntl();

  const { orgs } = useInstaPayAvailableBalances({ enabled: true, location: 'RecurringSection' });
  const {
    membership: storedMembership,
    setCurrentByDaySubscription,
    setCurrentSubscription,
    setMembership,
  } = useInstaPaySchedulingStore();
  const isMultiOrgUser = orgs?.length > 1;
  const selectedOrgId = storedMembership?.getId();

  const { getOrgRecurringByAmountEligibility, isLoaded: isEligibilityLoaded } = useCheckRecurringByAmountEligibility();

  const setDefaultMembership = () => {
    const eligibleOrgs = orgs?.filter(
      org => isEligibilityLoaded && getOrgRecurringByAmountEligibility(org.getId())?.isEligible
    );

    // If there are eligible organisations, set the first of them by default
    // Otherwise, set the first organisation
    const membershipToStore = eligibleOrgs?.length ? eligibleOrgs[0] : orgs[0];
    setMembership(membershipToStore);
  };

  const onChangeChosenEmployer = (value: string | null) => {
    if (value) {
      const membershipToStore = orgs.find(org => org.getId() === value);

      if (membershipToStore) {
        setMembership(membershipToStore);
      }
    }
  };

  const currentOrganisationSubscription = useMemo(() => {
    return activeSchedulingSubscriptions?.find(
      subscription => subscription.organisationId === storedMembership?.getId()
    );
  }, [activeSchedulingSubscriptions, storedMembership]);

  const byDaySubscription = byDaySubscriptions?.find(v => v.organisationId === selectedOrgId);

  useEffect(() => {
    setCurrentByDaySubscription(byDaySubscription);
    setCurrentSubscription(currentOrganisationSubscription);
  }, [currentOrganisationSubscription, byDaySubscription]);

  useEffect(() => {
    if (orgs.length && !storedMembership) {
      setDefaultMembership();
    }
  }, [orgs]);

  const renderSectionBody = () => {
    if (byDaySubscription) {
      return <RecurringByDaySubscriptionDetails currency={currency} subscription={byDaySubscription} />;
    }

    if (currentOrganisationSubscription) {
      return <RecurringSectionSubscriptionDetails currency={currency} subscription={currentOrganisationSubscription} />;
    }

    const currentOrgEligibility = getOrgRecurringByAmountEligibility(storedMembership?.getId());
    const shouldShowError = !isRecurringByAmountVisible || !currentOrgEligibility?.isEligible;

    // If current selected membership is not eligible for Recurring, show the error
    if (shouldShowError) {
      return <RecurringSectionErrorMessage eligibilityDetails={currentOrgEligibility} />;
    }

    // Otherwise, show the creation box
    return (
      <RecurringSectionCreationBox membership={storedMembership} openHowItWorks={openHowItWorks} currency={currency} />
    );
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

  if (isLoading || !storedMembership || !isEligibilityLoaded) {
    return (
      <Box testID="withdraw-your-earned-pay-recurring-section">
        <Skeleton testID="recurring-section-loading-skeleton" style={{ width: '100%', height: 88 }} />
      </Box>
    );
  }

  return (
    <Box testID="withdraw-your-earned-pay-recurring-section">
      {isMultiOrgUser && (
        <ChoosingEmployerBox
          currentMembership={storedMembership}
          ewaMode={WithdrawYourEarnedPaySectionKey.RECURRING}
          onChange={onChangeChosenEmployer}
          organisations={orgs}
        />
      )}

      {renderSectionBody()}
    </Box>
  );
};
