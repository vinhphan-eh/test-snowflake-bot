import type { ReactNode } from 'react';
import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import type { TitleProps } from '@hero-design/rn/types/components/Typography/Title';

type PageTitleProps = {
  /**
   * text content, support string or ReactNode (nested texts)
   */
  children: string | ReactNode;
  /**
   * custom style to override default style
   */
  style?: StyleProp<TextStyle>;
  /**
   * Container Style for PageTitle
   */
  containerTitleStyle?: React.ComponentProps<typeof Box>;
} & TitleProps;

/**
 * @description Title of Page,  for (gradual) design migration from PageTitle
 * @extends Typography.Title from @hero-design/rn
 * @usage use directly PageTitle or Page.Title (preferred)
 * @children accept string or ReactNode - support combine text
 */
const PageTitle = ({ children, containerTitleStyle, ...textProps }: PageTitleProps) => {
  const { space } = useTheme();

  return (
    <Box {...containerTitleStyle}>
      <Typography.Title typeface="playful" level="h3" style={{ paddingVertical: space.large }} {...textProps}>
        {children}
      </Typography.Title>
    </Box>
  );
};

export default PageTitle;
