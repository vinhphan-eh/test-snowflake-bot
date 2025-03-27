import React from 'react';
import { Pressable } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';

type SectionHeaderProps = {
  title: string;
  onIconPress?: () => void;
  isShowingIcon?: boolean;
};

export const SectionHeader = ({ isShowingIcon = true, onIconPress, title }: SectionHeaderProps) => {
  const { space } = useTheme();

  return (
    <Box
      paddingLeft="medium"
      paddingVertical="small"
      backgroundColor="highlightedSurface"
      flexDirection="row"
      justifyContent="space-between"
    >
      <Typography.Caption>{title}</Typography.Caption>
      {isShowingIcon && (
        <Pressable
          style={{ paddingRight: space.medium }}
          accessibilityLabel={`${title} info icon`}
          onPress={onIconPress}
          hitSlop={{
            top: 10,
            bottom: 10,
            right: 10,
            left: 10,
          }}
        >
          <Icon icon="circle-question-outlined" size="xsmall" intent="primary" />
        </Pressable>
      )}
    </Box>
  );
};
