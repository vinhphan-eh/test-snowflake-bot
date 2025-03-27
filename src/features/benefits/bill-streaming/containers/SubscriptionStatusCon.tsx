import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, useTheme } from '@hero-design/rn';
import { useGetSubscriptionsQuery } from '../../../../new-graphql/generated';
import { SubscriptionStatusRow } from '../components/SubscriptionStatusRow';

type SubscriptionStatusConProps = {
  style?: StyleProp<ViewStyle>;
};

export const SubscriptionStatusCon = ({ style }: SubscriptionStatusConProps) => {
  const { space } = useTheme();
  const { data, isError, isLoading } = useGetSubscriptionsQuery({
    input: {
      first: 20,
    },
  });
  const listData = data?.me?.billManagement?.subscriptions?.edges ?? [];
  const filteredSubmittedPending = listData.filter(e => e.node.status === 'SUBMITTED' || e.node.status === 'PENDING');

  const renderStatuses = () => {
    return filteredSubmittedPending.map((element, index) => {
      const { id, status, subscriptionType } = element.node;
      return (
        <SubscriptionStatusRow
          style={{ marginBottom: index === filteredSubmittedPending.length - 1 ? 0 : space.medium }}
          key={id}
          type={subscriptionType}
          status={status}
        />
      );
    });
  };

  if (isLoading || isError) {
    return null;
  }

  return <Box style={style}>{renderStatuses()}</Box>;
};
