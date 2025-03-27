import type { ReactElement } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { UnCheckedRadio, CheckedRadio } from './StyledRadio';

export type RadioCardProps = {
  /**
   * Header text of the card.
   */
  title?: string;
  /**
   * Subtitle for the header.
   */
  subtitle?: string;
  /**
   * Card content.
   */
  content: string | ReactElement;
  /**
   * Press event handler.
   */
  onPress: () => void;
  /**
   * Whether the radio is checked.
   */
  checked: boolean;
  /**
   * Additional style.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Testing id of the component.
   */
  testID?: string;
  /**
   * A label in a localized string that identifies the accessibility element
   */
  accessibilityLabel?: string;
};

export const RadioCard = ({
  accessibilityLabel,
  checked = false,
  content,
  onPress,
  style,
  subtitle,
  testID,
  title,
}: RadioCardProps) => {
  const { shadows } = useTheme();
  return (
    <Pressable onPress={onPress} testID={testID}>
      <Box
        style={[shadows.default, style]}
        accessibilityLabel={accessibilityLabel}
        padding="medium"
        borderRadius="large"
        backgroundColor="defaultGlobalSurface"
        flexDirection="row"
        alignItems="center"
      >
        <Box flex={1} paddingEnd="medium">
          {title ? (
            <Box marginBottom="small">
              <Typography.Body variant="regular-bold">{title}</Typography.Body>
            </Box>
          ) : null}
          {subtitle ? (
            <Box marginBottom="small">
              <Typography.Caption intent="subdued">{subtitle}</Typography.Caption>
            </Box>
          ) : null}
          <Typography.Caption fontWeight="semi-bold" intent="subdued">
            {content}
          </Typography.Caption>
        </Box>
        <Box padding="small">{checked ? <CheckedRadio testID={`${content}-checked`} /> : <UnCheckedRadio />}</Box>
      </Box>
    </Pressable>
  );
};
