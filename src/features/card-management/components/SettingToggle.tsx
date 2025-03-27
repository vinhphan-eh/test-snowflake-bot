import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Button, Typography } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';
import type { BodyProps } from '@hero-design/rn/types/components/Typography/Body';
import Toggle from '../../../common/components/toggle';
import { useGetToggleThemedStyles } from '../hooks/useGetToggleThemedStyles';
import type { IconButtonProps } from '@hero-design/rn/types/components/Button/IconButton';

type SettingToggleProps = {
  label: string;
  value: boolean;
  style?: StyleProp<ViewStyle>;
  variant?: BodyProps['variant'];
  onChange: (isOn: boolean) => void;
  hyperlink?: {
    icon: IconButtonProps['icon'];
    action?: () => void;
  };
} & BoxProps;

export const SettingToggle = ({
  hyperlink,
  label,
  onChange,
  style,
  value,
  variant = 'small',
  ...boxProps
}: SettingToggleProps) => {
  const themedStyles = useGetToggleThemedStyles();

  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center" {...boxProps} style={style}>
      <Typography.Body style={{ flex: 1 }} accessibilityLabel={label} variant={variant}>
        {label}
        {hyperlink && (
          <Box paddingLeft="xsmall">
            <Button.Icon
              testID="setting_toggle_icon"
              icon={hyperlink.icon}
              size="xsmall"
              intent="primary"
              onPress={() => hyperlink.action?.()}
            />
          </Box>
        )}
      </Typography.Body>
      <Toggle
        marginLeft="smallMedium"
        testID="setting_toggle"
        accessibilityLabel={`${label} toggle`}
        onChange={onChange}
        value={value}
        {...themedStyles}
      />
    </Box>
  );
};
