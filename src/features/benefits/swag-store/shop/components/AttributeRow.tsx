import type { ComponentProps, ReactElement } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { List, Typography } from '@hero-design/rn';
import type { ListItemProps } from '@hero-design/rn/types/components/List/ListItem';

type AttributeRowProps = {
  label: string;
  content: string | ReactElement;
  style?: StyleProp<ViewStyle>;
  variant?: ListItemProps['variant'];
  labelStyle?: Omit<ComponentProps<typeof Typography.Caption>, 'children'>;
};

export const AttributeRow = ({ content, label, labelStyle = {}, style, variant = 'full-width' }: AttributeRowProps) => {
  return (
    <List.Item
      disabled
      variant={variant}
      style={[{ shadowOpacity: 0 }, style]}
      title={
        <Typography.Body variant="small" accessibilityLabel={label} intent="subdued" {...labelStyle}>
          {label}
        </Typography.Body>
      }
      suffix={
        typeof content === 'string' ? (
          <Typography.Body variant="regular-bold" accessibilityLabel={content}>
            {content}
          </Typography.Body>
        ) : (
          content
        )
      }
    />
  );
};
