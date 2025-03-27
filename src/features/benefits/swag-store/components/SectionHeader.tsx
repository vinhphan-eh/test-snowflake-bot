import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Typography, Button, useTheme } from '@hero-design/rn';

type SectionHeaderProps = {
  title: string;
  actionText?: string;
  onActionPressed?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const SectionHeader = ({ actionText, onActionPressed = () => {}, style, title }: SectionHeaderProps) => {
  const theme = useTheme();
  return (
    <Box alignItems="center" justifyContent="space-between" flexDirection="row" style={style}>
      <Typography.Body variant="small">{title}</Typography.Body>
      {actionText ? (
        <Button
          style={{ marginHorizontal: -theme.space.smallMedium }}
          text={
            <Typography.Body variant="regular-bold" intent="primary">
              {actionText}
            </Typography.Body>
          }
          variant="text"
          intent="primary"
          onPress={onActionPressed}
        />
      ) : null}
    </Box>
  );
};
