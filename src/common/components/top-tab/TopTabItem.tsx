import React from 'react';
import { Typography, Box, useTheme, Icon } from '@hero-design/rn';
import type { IconProps } from '@hero-design/rn/types/components/Icon';
import type { CaptionProps } from '@hero-design/rn/types/components/Typography/Caption';
import type { SystemPalette } from '@hero-design/rn/types/theme/global';

const Status = {
  NONE: '',
  NEW: 'NEW',
} as const;

type TabStatus = (typeof Status)[keyof typeof Status];

type TopTabItemProps = {
  icon?: IconProps['icon'];
  isActive?: boolean;
  title: string;
  testID?: string;
  status?: TabStatus;
};

const getStatusColor = (
  status: TabStatus
): { background: keyof SystemPalette; colorIntent: CaptionProps['intent'] } | undefined => {
  switch (status) {
    case Status.NEW:
      return { background: 'decorativePrimarySurface', colorIntent: 'primary' };
    default:
      return undefined;
  }
};

export const TopTabItem = ({ icon, isActive = false, status = '', testID, title }: TopTabItemProps) => {
  const { space } = useTheme();
  const renderStatus = () => {
    const statusColor = getStatusColor(status);
    if (status) {
      return (
        <Box
          accessibilityLabel={`${status} status`}
          borderRadius="base"
          paddingVertical="xxsmall"
          paddingHorizontal="xsmall"
          marginLeft="xsmall"
          backgroundColor={statusColor?.background}
        >
          <Typography.Caption intent={statusColor?.colorIntent} fontWeight="semi-bold">
            {status}
          </Typography.Caption>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box testID={testID} alignItems="center" flexDirection="row">
      {icon ? <Icon icon={icon} size="small" style={{ marginEnd: space.small }} /> : null}

      <Typography.Body
        variant={isActive ? 'small-bold' : 'small'}
        accessibilityLabel={`${title} tab`}
        numberOfLines={1}
      >
        {title}
      </Typography.Body>
      {renderStatus()}
    </Box>
  );
};
