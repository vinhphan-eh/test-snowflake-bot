import React, { useState } from 'react';
import { Typography, useTheme, Alert } from '@hero-design/rn';
import { InlineTextLink } from '../../../../common/components/inline-text-link';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { calculateDifferentDayFromNow } from '../../../../common/utils/date';
import { useGetSubscriptionsQuery } from '../../../../new-graphql/generated';
import { CONTACT_SE_LINK } from '../../../bill-management/constant';

export const SubscriptionAlert = () => {
  const { space } = useTheme();
  const { openUrl } = useInAppBrowser();
  const [showAlert, setShowAlert] = useState(true);

  const { data, isLoading } = useGetSubscriptionsQuery({
    input: {
      first: 20,
    },
  });
  const listData = data?.me?.billManagement?.subscriptions?.edges ?? [];
  const filterSubmitted = listData.filter(e => e.node.status === 'SUBMITTED');

  const showSubscriptionAlert =
    showAlert && filterSubmitted.some(submitted => calculateDifferentDayFromNow(submitted.node.createdAt) > 5);

  if (!showSubscriptionAlert || isLoading) {
    return null;
  }

  return (
    <Alert
      testID="subscription-alert"
      onClose={() => setShowAlert(false)}
      style={{ marginBottom: space.medium }}
      intent="warning"
      content={
        <Typography.Body variant="small">
          Your Simply Energy account might be associated with a different email. Please{' '}
          <InlineTextLink variant="small" testID="inline-link-text" onPress={() => openUrl(CONTACT_SE_LINK)}>
            contact Simply Energy
          </InlineTextLink>{' '}
          for further assistance
        </Typography.Body>
      }
    />
  );
};
