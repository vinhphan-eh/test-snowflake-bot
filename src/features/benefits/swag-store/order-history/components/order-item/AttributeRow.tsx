import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Typography, useTheme, Box, Button } from '@hero-design/rn';
import type { IconButtonProps } from '@hero-design/rn/types/components/Button/IconButton';

type AttributeRowProps = {
  label: string;
  content?: string | React.ReactNode;
  actionIcon?: IconButtonProps['icon'];
  onActionPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export const AttributeRow = ({
  accessibilityLabel,
  actionIcon,
  content,
  label,
  onActionPress = () => {},
  style,
}: AttributeRowProps) => {
  const { space } = useTheme();
  if (content) {
    return (
      <Box
        style={style}
        accessibilityLabel={accessibilityLabel}
        flexDirection="row"
        testID="attribute_row"
        alignItems="center"
      >
        <Typography.Body variant="small" accessibilityLabel={label} style={{ width: '40%', opacity: 0.8 }}>
          {label}
        </Typography.Body>
        <Box flexDirection="row" flex={1} alignItems="center" justifyContent="flex-end">
          <Typography.Body
            variant="regular"
            style={{ textAlign: 'right' }}
            accessibilityLabel={typeof content === 'string' ? content : 'status-tag'}
            numberOfLines={3}
          >
            {content}
          </Typography.Body>

          {actionIcon && (
            <Button.Icon
              intent="primary"
              testID={`${label}_action`}
              onPress={onActionPress}
              style={{ marginLeft: space.small }}
              icon={actionIcon}
            />
          )}
        </Box>
      </Box>
    );
  }

  return null;
};
