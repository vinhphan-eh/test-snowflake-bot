import type { ReactNode } from 'react';
import React from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import type { IconButtonProps } from '@hero-design/rn/types/components/Button/IconButton';

type PageTopBarBaseProps = {
  /**
   * children prop to replace tiele
   */
  children?: ReactNode;
  /**
   * hide left actions
   */
  hideLeft?: boolean;
  /**
   * hide right actions
   */
  hideRight?: boolean;
  /**
   * custom component displayed at left side
   */
  customLeft?: () => ReactNode;
  /**
   * custom component displayed at right side
   */
  customRight?: () => ReactNode;
  /**
   * nav bar title
   */
  title?: string;
  /**
   * title style
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * container style
   */
  style?: StyleProp<ViewStyle>;
  /**
   * press action for back icon
   */
  onBack?: () => void;
  /**
   * press action for right icon
   */
  onRightPress?: () => void;
};

export type PageTopBarProps = PageTopBarBaseProps &
  React.ComponentProps<typeof Box> & {
    /**
     * custom Icon displayed at left side
     */
    iconLeft?: IconButtonProps['icon'];
    /**
     * custom Icon displayed at left side
     */
    iconRight?: IconButtonProps['icon'];
    /**
     * color for default back icon
     */
    backIconIntent?: IconButtonProps['intent'];
    /**
     * color for default right icon
     */
    rightIconIntent?: IconButtonProps['intent'];
    rightIconSize?: IconButtonProps['size'];
    rightIconStyle?: StyleProp<ViewStyle>;
  };

/**
 * @description Top bar for Page, for (gradual) design migration from PageTopBar
 * @extends Container
 * @extends Typography.Body from @hero-design/rn
 * @usage place above Page, use directly PageTopBar or Page.TopBar (preferred)
 */
const PageTopBar = ({
  backIconIntent = 'primary',
  children,
  customLeft,
  customRight,
  hideLeft = false,
  hideRight = false,
  iconLeft = 'single-left-arrow',
  iconRight = 'cancel',
  onBack,
  onRightPress,
  rightIconIntent = 'primary',
  rightIconSize = 'small',
  rightIconStyle = {},
  style,
  title = '',
  titleStyle,
  ...boxProps
}: PageTopBarProps) => {
  const { sizes } = useTheme();

  const renderBack = () => (
    <Button.Icon testID="topbar-back-icon" size="small" intent={backIconIntent} onPress={onBack} icon={iconLeft} />
  );

  const renderRightIcon = () => (
    <Button.Icon
      style={rightIconStyle}
      hitSlop={{ bottom: 12, left: 12, right: 12, top: 12 }}
      testID="topbar-right-icon"
      size={rightIconSize}
      intent={rightIconIntent}
      onPress={onRightPress}
      icon={iconRight}
    />
  );

  const renderLeft = () => <Box flex={1}>{hideLeft ? null : customLeft?.() ?? renderBack()}</Box>;

  const renderRight = () => (
    <Box alignItems="flex-end" flex={1}>
      {hideRight ? null : customRight?.() ?? renderRightIcon()}
    </Box>
  );

  const renderTitle = () => (
    <Typography.Body
      variant="small"
      accessibilityRole="text"
      accessibilityLabel="title"
      style={titleStyle}
      numberOfLines={1}
    >
      {title}
    </Typography.Body>
  );

  const flattenStyle = StyleSheet.flatten(style);

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      backgroundColor="defaultGlobalSurface"
      paddingHorizontal="medium"
      {...boxProps}
      style={{
        minHeight: sizes.xxxlarge,
        ...flattenStyle,
      }}
    >
      {renderLeft()}
      {children ?? renderTitle()}
      {renderRight()}
    </Box>
  );
};

export default PageTopBar;
