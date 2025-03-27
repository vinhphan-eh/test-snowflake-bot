import React from 'react';
import { mockedEventTracking } from '../../../../../../../../test-setup/after-env/mixpanel.setup';
import { render, waitFor } from '../../../../../../../common/utils/testing';
import { InstapayErrorCode } from '../../../../../../../new-graphql/generated';
import { mockedSharedIPSchedulingEventProperties } from '../../../../hooks/useInstaPaySchedulingEventTracking';
import { VIEWED_ERROR_ON_RECURRING_TAB } from '../../../../mixpanelEvents';
import { RecurringSectionErrorMessage } from '../RecurringSectionErrorMessage';
import type { RecurringByAmountEligibilyDetails } from '../../../../stores/useInstaPaySchedulingStore';

const mockedInvalidEligibilityDetails = (violation: InstapayErrorCode): RecurringByAmountEligibilyDetails => ({
  orgId: '234',
  isEligible: false,
  errorCode: violation,
});

describe('RecurringSectionErrorMessage', () => {
  it('should render properly for Timesheets Not Approved error', async () => {
    const mockedEligibilityDetails = mockedInvalidEligibilityDetails(InstapayErrorCode.ApprovedTimesheetNotFound);
    const { getByTestId, getByText } = render(
      <RecurringSectionErrorMessage eligibilityDetails={mockedEligibilityDetails} />
    );

    await waitFor(() => {
      expect(getByText('Recurring withdrawal is currently unavailable.')).toBeTruthy();
      expect(
        getByText('This is because your timesheets are currently awaiting approval. Please try again later.')
      ).toBeTruthy();
      expect(getByTestId('recurring-section-error-icon')).toBeTruthy();

      // Verify event tracking
      expect(mockedEventTracking).toHaveBeenCalledWith({
        ...mockedSharedIPSchedulingEventProperties({
          errorCode: InstapayErrorCode.ApprovedTimesheetNotFound,
        }),
        event: VIEWED_ERROR_ON_RECURRING_TAB,
      });
    });
  });

  it('should render properly for already having effective Daily subscription error', async () => {
    const mockedEligibilityDetails = mockedInvalidEligibilityDetails(
      InstapayErrorCode.RecurringByAmountHavingEffectiveDailySub
    );
    const { getByTestId, getByText } = render(
      <RecurringSectionErrorMessage eligibilityDetails={mockedEligibilityDetails} />
    );

    await waitFor(() => {
      expect(getByText('Recurring withdrawal is currently unavailable.')).toBeTruthy();
      expect(getByText('This is because you already have an active daily subscription.')).toBeTruthy();
      expect(getByTestId('recurring-section-error-icon')).toBeTruthy();

      // Verify event tracking
      expect(mockedEventTracking).toHaveBeenCalledWith({
        ...mockedSharedIPSchedulingEventProperties({
          errorCode: InstapayErrorCode.RecurringByAmountHavingEffectiveDailySub,
        }),
        event: VIEWED_ERROR_ON_RECURRING_TAB,
      });
    });
  });

  it('should render properly for all remaining error', async () => {
    const mockedEligibilityDetails = mockedInvalidEligibilityDetails(
      InstapayErrorCode.RecurringByAmountCountryNotSupported
    );
    const { getByTestId, getByText } = render(
      <RecurringSectionErrorMessage eligibilityDetails={mockedEligibilityDetails} />
    );

    await waitFor(() => {
      expect(getByText('Recurring withdrawal is currently unavailable.')).toBeTruthy();
      expect(getByText('This could be for the following reasons:')).toBeTruthy();
      expect(getByText('You haven’t worked 3 consecutive pay periods.')).toBeTruthy();
      expect(getByText('You do not meet the minimum age requirement of 16 years and older.')).toBeTruthy();
      expect(getByTestId('recurring-section-error-icon')).toBeTruthy();

      // Verify event tracking
      expect(mockedEventTracking).toHaveBeenCalledWith({
        ...mockedSharedIPSchedulingEventProperties({
          errorCode: InstapayErrorCode.RecurringByAmountCountryNotSupported,
        }),
        event: VIEWED_ERROR_ON_RECURRING_TAB,
      });
    });
  });
});
