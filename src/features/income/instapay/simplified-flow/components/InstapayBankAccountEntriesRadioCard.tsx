import React from 'react';
import { Pressable } from 'react-native';
import { Box, Typography } from '@hero-design/rn';
import type { RadioCardProps } from '../../../../../common/components/radio-card-group/RadioCard';
import { CheckedRadio, UnCheckedRadio } from '../../../../../common/components/radio-card-group/StyledRadio';

export const InstapayBankAccountEntriesRadioCard = ({
  accessibilityLabel,
  checked = false,
  content,
  onPress,
  style,
  subtitle,
  testID,
  title,
}: RadioCardProps) => {
  return (
    <Pressable onPress={onPress} testID={testID}>
      <Box
        style={style}
        accessibilityLabel={accessibilityLabel}
        padding="medium"
        borderRadius="large"
        borderColor="darkGlobalSurface"
        borderWidth="base"
        backgroundColor="defaultGlobalSurface"
        flexDirection="row"
        alignItems="center"
      >
        <Box flex={2}>
          {title ? (
            <Box marginBottom="small">
              <Typography.Body variant="regular-bold">{title}</Typography.Body>
            </Box>
          ) : null}
          {subtitle ? (
            <Box>
              <Typography.Caption intent="subdued">{subtitle}</Typography.Caption>
            </Box>
          ) : null}
        </Box>
        <Box flex={2}>{content}</Box>
        <Box padding="small">{checked ? <CheckedRadio testID={`${testID}-checked`} /> : <UnCheckedRadio />}</Box>
      </Box>
    </Pressable>
  );
};
