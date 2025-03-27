import React from 'react';
import type { ComponentProps } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Icon, Tag, Typography, useTheme } from '@hero-design/rn';
import type { IconProps } from '@hero-design/rn/types/components/Icon';
import { capitalize } from '../../../../common/utils/string';
import type { SubscriptionType, SubscriptionStatus } from '../../../../new-graphql/generated';

type SubscriptionStatusRowProps = {
  type: `${SubscriptionType}`;
  status: `${SubscriptionStatus}`;
  style?: StyleProp<ViewStyle>;
};

const mapStatusString = (status: `${SubscriptionStatus}`) => {
  switch (status) {
    case 'SUBMITTED':
    case 'PENDING':
      return 'PENDING APPROVAL';
    default:
      return '';
  }
};

const mapTypeIcon = (status: `${SubscriptionType}`): IconProps['icon'] => {
  switch (status) {
    case 'ELECTRICITY':
      return 'bolt-outlined';
    case 'GAS':
      return 'propane-tank-outlined';
    default:
      return 'loading';
  }
};

export const SubscriptionStatusRow = ({ status, style, type }: SubscriptionStatusRowProps) => {
  const { space } = useTheme();
  const mapStatusColor = (
    subStatus: `${SubscriptionStatus}`
  ): {
    intent?: ComponentProps<typeof Tag>['intent'];
  } => {
    switch (subStatus) {
      case 'SUBMITTED':
      case 'PENDING':
        return {
          intent: 'warning',
        };
      default:
        return { intent: undefined };
    }
  };

  const { intent } = mapStatusColor(status);
  const icon = mapTypeIcon(type);
  const subscriptionStatus = mapStatusString(status);
  const subscriptionType = capitalize(type);

  return (
    <Box alignItems="center" flexDirection="row" style={style}>
      <Box alignItems="center" flexDirection="row" flexGrow={1}>
        <Icon style={{ marginRight: space.small }} size="xsmall" accessibilityLabel={icon} icon={icon} />
        <Typography.Body accessibilityLabel={subscriptionType} variant="small">
          {subscriptionType}
        </Typography.Body>
      </Box>
      <Tag content={subscriptionStatus} intent={intent} />
    </Box>
  );
};
