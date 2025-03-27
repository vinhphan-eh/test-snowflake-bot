import React from 'react';
import { Pressable } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';

const CategoryChip = ({ label, onPress, selected }: { label: string; selected: boolean; onPress: () => void }) => {
  const { space } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <Box
        flexDirection="row"
        alignItems="center"
        borderWidth="base"
        borderColor="darkGlobalSurface"
        borderRadius="rounded"
        paddingVertical="small"
        paddingHorizontal="smallMedium"
        backgroundColor={selected ? 'darkGlobalSurface' : 'highlightedSurface'}
        marginTop="medium"
        marginRight="small"
      >
        {selected && (
          <Icon
            testID="checkmark-icon"
            icon="checkmark"
            size="xsmall"
            intent="text-inverted"
            style={{ marginRight: space.small }}
          />
        )}
        <Typography.Caption intent={selected ? 'inverted' : undefined}>{label}</Typography.Caption>
      </Box>
    </Pressable>
  );
};

export default CategoryChip;
