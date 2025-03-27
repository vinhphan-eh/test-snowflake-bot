import React from 'react';
import { Typography, useTheme } from '@hero-design/rn';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import { useSubmitSuperContributionStore } from '../../store/useSubmitSuperContributionStore';

export const SubmitContributionSuccessScreen = () => {
  const { space } = useTheme();
  const { orgNames } = useSubmitSuperContributionStore();

  return (
    <OutcomeTemplate
      title={`Nice! Your contribution request has been sent to ${orgNames}`}
      content={
        <>
          <Typography.Body
            variant="regular"
            typeface="playful"
            intent="subdued"
            style={{ textAlign: 'center', marginTop: space.medium, marginBottom: space.medium }}
            testID="submit-contribution-success-message-id"
          >
            Your employer will now review the request and can either approve or reject it. Please allow up to 7 days for
            your employer to notify you of the outcome.
          </Typography.Body>
          <Typography.Body
            variant="regular"
            typeface="playful"
            intent="subdued"
            style={{ textAlign: 'center', marginBottom: space.medium }}
          >
            If you have any questions in the meantime, please contact your employer.
          </Typography.Body>
        </>
      }
      actions={[
        {
          buttonTitle: 'Done',
          onNext: () => navigateToTopTabs('super-tab'),
        },
      ]}
      imageName="jetpack-man-money"
    />
  );
};
