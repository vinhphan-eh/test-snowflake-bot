import React, { useCallback, useState } from 'react';
import type {
  FlexStyle,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  ViewStyle,
} from 'react-native';
import { Pressable, TextInput } from 'react-native';
import { Box, Icon, useTheme } from '@hero-design/rn';
import type { ThemeScale } from '@hero-design/rn/types/components/Box/types';
import type { IconProps } from '@hero-design/rn/types/components/Icon';

/**
 * A text field is an input that allows a user to write or edit text.
 */
export type SearchBarProps = {
  /**
   * Sets the field as to appear disabled, users will not be able to interact with the text field.
   */
  isDisabled?: boolean;
  /**
   * If true, prevents the value of the input from being edited.
   */
  isReadOnly?: boolean;
  /**
   * Element after input in text field.
   */
  iconAfter?: IconProps['icon'];
  /**
   * Sets maximum width of input.
   */
  width?: FlexStyle['width'];
  /**
   * Placeholder text to display in the text field whenever it is empty.
   */
  placeholder?: string;
  /**
   * A succinct label in a localized string that identifies the accessibility element.
   */
  accessibilityLabel?: string;
  /**
   * A testId prop is provided for specified elements, which is a unique string that appears as a data attribute testID in the rendered code, serving as a hook for automated tests.
   */
  testId?: string;
  /**
   * The value of the textfield.
   */
  value?: string;
  /**
   * show keyboard type
   */
  keyboardType?: KeyboardTypeOptions;
  /**
   * set max length of input
   */
  maxLength?: number;
  /**
   * set background color of text field
   */
  backgroundColor?: ThemeScale['colors'];
  /**
   * set background color of text field
   */
  textColor?: ThemeScale['colors'];
  /**
   * set background color of text field
   */
  textColorDisabled?: ThemeScale['colors'];
  /**
   * Handler called when the input is blurred.
   */
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /**
   * Handler called when the inputs value changes.
   */
  onChange?: (text: string) => void;
  /**
   * set border color
   */
  borderColor?: ThemeScale['colors'];
  style?: StyleProp<ViewStyle>;
};

export const SearchBar = React.forwardRef<TextInput, SearchBarProps>(
  (
    {
      accessibilityLabel,
      backgroundColor = 'defaultGlobalSurface',
      borderColor = 'primaryOutline',
      iconAfter = 'search-outlined',
      isDisabled = false,
      isReadOnly,
      keyboardType,
      maxLength,
      onBlur,
      onChange,
      placeholder,
      style,
      testId,
      textColor = 'onDefaultGlobalSurface',
      textColorDisabled = 'disabledOnDefaultGlobalSurface',
      value = '',
      width,
    },
    ref
  ) => {
    const { colors, fonts, fontSizes } = useTheme();
    const [isFocused, setFocused] = useState(false);

    const handleFocus = () => {
      setFocused(true);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(false);
      onBlur?.(e);
    };

    const clearText = useCallback(() => {
      onChange?.('');
    }, [onChange]);

    return (
      <Box
        marginTop="xsmall"
        justifyContent="center"
        borderRadius="medium"
        borderWidth={isFocused ? 'base' : 'medium'}
        borderColor={isDisabled || isReadOnly ? 'disabledOutline' : borderColor}
        backgroundColor={backgroundColor}
        accessible
        accessibilityLabel={`${accessibilityLabel}${!(isDisabled || isReadOnly) ? ': Disabled' : ''}`}
        accessibilityState={{ disabled: !(isDisabled || isReadOnly) }}
        style={[{ height: 48, width }, style]}
      >
        <Box flexDirection="row" justifyContent="center" alignItems="center">
          <TextInput
            ref={ref}
            editable={!(isDisabled || isReadOnly)}
            selectTextOnFocus={!(isDisabled || isReadOnly)}
            placeholder={placeholder}
            placeholderTextColor={colors.mutedOnDefaultGlobalSurface}
            style={{
              flex: 1,
              height: 48,
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 16,
              paddingRight: 16,
              fontFamily: fonts.neutral.regular,
              fontSize: fontSizes.large,
              color: isDisabled ? colors[textColorDisabled] : colors[textColor],
            }}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={onChange}
            testID={testId}
            allowFontScaling={false}
            blurOnSubmit
            keyboardType={keyboardType}
            maxLength={maxLength}
          />
          {value?.length ? (
            <Pressable
              onPress={clearText}
              style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center' }}
              testID={`${testId}-clear-button`}
            >
              <Icon icon="circle-cancel" size="small" intent={isDisabled ? 'disabled-text' : 'text'} />
            </Pressable>
          ) : (
            iconAfter && (
              <Box marginRight="medium">
                <Icon icon="search-outlined" size="small" intent={isDisabled ? 'disabled-text' : 'text'} />
              </Box>
            )
          )}
        </Box>
      </Box>
    );
  }
);
