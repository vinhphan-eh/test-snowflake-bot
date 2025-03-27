import React, { useState } from 'react';
import type { DimensionValue, GestureResponderEvent } from 'react-native';
import { Typography } from '@hero-design/rn';
import type { BodyProps } from '@hero-design/rn/types/components/Typography/Body';

type InlineTextLinkProps = {
  disabled?: boolean;
  style?: {
    // Add your custom styles here
    // It should follow Hero Design Snowflakes Ruleset https://docs.google.com/spreadsheets/d/1Dj8vqLdFaf-CSaSVoYqyYZIkGqF6OoyP7K4G1_9L62U
    marginBottom?: DimensionValue | undefined;
  };
} & Omit<BodyProps, 'style'>;

export const InlineTextLink = ({ children, disabled = false, onPress, style, ...props }: InlineTextLinkProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const onTextPressed = (e: GestureResponderEvent) => {
    if (disabled || !onPress) {
      return;
    }

    onPress(e);
  };

  const getColorIntent = (): BodyProps['intent'] => {
    if (disabled) {
      return 'disabled';
    }

    return isPressed ? 'secondary' : 'primary';
  };

  return (
    <Typography.Body
      variant="regular-bold"
      onPressIn={() => !disabled && setIsPressed(true)}
      onPress={onTextPressed}
      onPressOut={() => !disabled && setIsPressed(false)}
      suppressHighlighting
      intent={getColorIntent()}
      style={{
        textDecorationLine: 'underline',
        ...(typeof style === 'object' ? style : {}),
      }}
      {...props}
    >
      {children}
    </Typography.Body>
  );
};
