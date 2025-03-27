import type { ReactElement } from 'react';
import React, { isValidElement } from 'react';
import { Box, Typography, useTheme } from '@hero-design/rn';
import type { BodyProps } from '@hero-design/rn/types/components/Typography/Body';
import type { SystemPalette } from '@hero-design/rn/types/theme/global';

export interface BulletLineProps {
  content: string | ReactElement;
  color?: keyof SystemPalette;
  variant?: BodyProps['variant'];
  intent?: BodyProps['intent'];
  typeface?: BodyProps['typeface'];
}

/**
 * TODO: move this component to a common place
 * Render a text line with bullet symbol on the left
 * @param props
 * @constructor
 */
export const BulletLine = ({ color, content, intent, typeface, variant = 'small' }: BulletLineProps) => {
  const { colors, space } = useTheme();

  const textColor = color ? colors[color] : colors.primaryOutline;
  const bulletProps: Omit<BodyProps, 'children'> = {
    intent,
    typeface,
    style: {
      fontSize: 4,
      paddingHorizontal: space.small,
      ...(!intent ? { color: textColor } : {}),
    },
  };
  const contentProps: Omit<BodyProps, 'children'> = {
    intent,
    variant,
    typeface,
    style: {
      flex: 1,
      ...(!intent ? { color: textColor } : {}),
    },
  };

  return (
    <Box alignItems="flex-start" flexDirection="row">
      <Typography.Body variant="small" {...bulletProps}>
        {'\u2B24'}
      </Typography.Body>
      {isValidElement(content) ? (
        content
      ) : (
        <Typography.Body variant="small" {...contentProps}>
          {content}
        </Typography.Body>
      )}
    </Box>
  );
};
