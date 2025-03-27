import React from 'react';
import { Pressable } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';

type FundDetailsTileProps = {
  onPress: () => void;
};

export const FundDetailsTile = ({ onPress }: FundDetailsTileProps) => {
  const { colors, radii, space } = useTheme();
  return (
    <Pressable
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        padding: space.medium,
        backgroundColor: colors.defaultGlobalSurface,
        borderRadius: radii.large,
      }}
      onPress={onPress}
    >
      <Box>
        <Typography.Body variant="small-bold">Fund details</Typography.Body>
      </Box>
      <Box flex={1} alignItems="flex-end" justifyContent="flex-end">
        <Icon intent="primary" icon="arrow-right" accessibilityLabel="fund details icon" />
      </Box>
    </Pressable>
  );
};
