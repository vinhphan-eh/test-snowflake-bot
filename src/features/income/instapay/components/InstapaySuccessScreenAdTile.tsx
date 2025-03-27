import React, { type ReactElement } from 'react';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import type { ButtonProps } from '@hero-design/rn/types/components/Button/Button';

type InstaPaySuccessScreenAdTileProps = {
  caption: string;
  content: string | ReactElement;
  navigationButtonText: string;
  navigationButtonProps?: Partial<ButtonProps>;
  onPressed: () => void;
  testID?: string;
};

export const InstaPaySuccessScreenAdTile = ({
  caption,
  content,
  navigationButtonProps,
  navigationButtonText,
  onPressed,
  testID,
}: InstaPaySuccessScreenAdTileProps) => {
  const { space } = useTheme();

  return (
    <Box
      borderRadius="xxlarge"
      paddingHorizontal="medium"
      paddingVertical="large"
      backgroundColor="defaultGlobalSurface"
      testID={testID}
    >
      <Typography.Title
        style={{
          marginBottom: space.medium,
          fontSize: 22,
        }}
        typeface="playful"
        level="h4"
      >
        {caption}
      </Typography.Title>
      {React.isValidElement(content) ? (
        content
      ) : (
        <Typography.Body
          style={{
            marginBottom: space.medium,
          }}
        >
          {content}
        </Typography.Body>
      )}
      <Button
        testID="success-screen-ad-tile-action-button"
        onPress={onPressed}
        text={navigationButtonText ?? ''}
        {...navigationButtonProps}
      />
    </Box>
  );
};
