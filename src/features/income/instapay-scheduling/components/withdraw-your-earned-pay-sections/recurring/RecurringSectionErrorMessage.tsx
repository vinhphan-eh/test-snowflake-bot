import React, { isValidElement, useMemo } from 'react';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import BulletLine from '../../../../../../common/components/bullet-line';
import { InstapayErrorCode } from '../../../../../../new-graphql/generated';
import { useIntl } from '../../../../../../providers/LocalisationProvider';
import { useInstaPaySchedulingEventTracking } from '../../../hooks/useInstaPaySchedulingEventTracking';
import type { RecurringByAmountEligibilyDetails } from '../../../stores/useInstaPaySchedulingStore';

type RecurringSectionErrorMessageProps = {
  eligibilityDetails?: RecurringByAmountEligibilyDetails;
};

export const RecurringSectionErrorMessage = ({ eligibilityDetails }: RecurringSectionErrorMessageProps) => {
  const { formatMessage } = useIntl();
  const { space } = useTheme();
  const { trackUserViewedErrorsOnRecurringTab } = useInstaPaySchedulingEventTracking();

  const errorCode = eligibilityDetails?.errorCode;

  const errorContent = useMemo(() => {
    if (errorCode) {
      trackUserViewedErrorsOnRecurringTab({
        errorCode,
      });
    }

    switch (errorCode) {
      case InstapayErrorCode.ApprovedTimesheetNotFound:
        return formatMessage({ id: 'instapay.scheduling.options.byAmount.errors.timesheetUnapproved' });
      case InstapayErrorCode.RecurringByAmountHavingEffectiveDailySub:
        return formatMessage({ id: 'instapay.scheduling.options.byAmount.errors.alreadyHaveDailySubscription' });
      default:
        return (
          <Box flex={1}>
            <Typography.Body variant="small" style={{ marginTop: space.small }} intent="subdued">
              {formatMessage({ id: 'instapay.scheduling.options.byAmount.errors.general.caption' })}
            </Typography.Body>
            <BulletLine
              intent="subdued"
              content={formatMessage({
                id: 'instapay.scheduling.options.byAmount.errors.general.haveNotWorked3ConsecutivePayPeriods',
              })}
            />
            <BulletLine
              intent="subdued"
              content={formatMessage({ id: 'instapay.scheduling.options.byAmount.errors.general.ageMinimumViolated' })}
            />
          </Box>
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorCode]);

  return (
    <Box style={{ width: '100%' }}>
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <Box flex={1}>
          <Typography.Body variant="small">
            {formatMessage({ id: 'instapay.scheduling.options.byAmount.errors.unavailableStatement' })}
          </Typography.Body>
        </Box>
        <Icon testID="recurring-section-error-icon" icon="circle-info-outlined" size="small" intent="danger" />
      </Box>
      <Box>
        {isValidElement(errorContent) ? (
          errorContent
        ) : (
          <Typography.Body variant="small" intent="subdued">
            {errorContent}
          </Typography.Body>
        )}
      </Box>
    </Box>
  );
};
