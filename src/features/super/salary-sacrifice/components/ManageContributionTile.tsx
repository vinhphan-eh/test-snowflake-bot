import React from 'react';
import { Pressable } from 'react-native';
import { Typography, useTheme } from '@hero-design/rn';
import { useSalarySacrificeNavigation } from '../../hooks/useSalarySacrificeNavigation';
import type { TrackingAttributes } from '../../navigation/navigationTypes';
import { SALARY_SACRIFICE_TITLE } from '../constants';

const ManageContributionTile = ({
  disabled = false,
  trackingAttributes,
}: {
  disabled?: boolean;
  trackingAttributes?: TrackingAttributes;
}) => {
  const { colors, radii, space } = useTheme();
  const { navigateToManageContributions } = useSalarySacrificeNavigation(trackingAttributes);

  return (
    <Pressable
      testID="manage-contributions-pressable"
      style={{
        flex: 1,
        backgroundColor: colors.defaultGlobalSurface,
        borderRadius: radii.large,
        marginLeft: space.medium,
        padding: space.medium,
      }}
      disabled={disabled}
      onPress={navigateToManageContributions}
    >
      <Typography.Body
        variant="small-bold"
        intent={disabled ? 'disabled' : 'body'}
        style={{ marginBottom: space.large }}
      >
        {SALARY_SACRIFICE_TITLE}
      </Typography.Body>
      <Typography.Caption intent={disabled ? 'disabled' : 'body'}>Manage your contributions</Typography.Caption>
    </Pressable>
  );
};

export default ManageContributionTile;
