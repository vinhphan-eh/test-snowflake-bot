import React, { useState } from 'react';
import type {
  FlexStyle,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  ViewStyle,
} from 'react-native';
import { TextInput } from 'react-native';
import { Box, useTheme } from '@hero-design/rn';
import type { HeroDesignColors } from '../../types/hero-design';

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
  backgroundColor?: HeroDesignColors;
  /**
   * set background color of text field
   */
  textColor?: HeroDesignColors;
  /**
   * set background color of text field
   */
  textColorDisabled?: HeroDesignColors;
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
  borderColor?: HeroDesignColors;
  /**
   * enable autofocus of text input
   */
  autofocus?: boolean;
  defaultValue?: string;

  style?: StyleProp<ViewStyle>;
};

const OptimizedSearchBar = React.forwardRef<TextInput, SearchBarProps>(
  (
    {
      accessibilityLabel,
      autofocus = false,
      backgroundColor = 'surfaceDefault',
      borderColor = 'borderDefault',
      defaultValue = '',
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
      textColorDisabled = 'mutedArchived',
      width,
    },
    ref
  ) => {
    const { colors, fontSizes, space } = useTheme();
    const [isFocused, setFocused] = useState(false);

    const getBorderColor = (): HeroDesignColors => {
      if (isDisabled || isReadOnly) {
        return 'secondaryOutline';
      }
      return borderColor as HeroDesignColors;
    };

    const handleFocus = () => {
      setFocused(true);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(false);
      onBlur?.(e);
    };

    /**
     * This function acts like an event handler for TextInputProps.onChange, instead of TextInputProps.onChangeText.
     * The reason was unit test detected input to be an event, this could be a bug from react native.
     * Either way, this function will handle both event and text.
     * @param input text or event
     */
    const onChangeTextWrapper = (input: string | { nativeEvent: { text: string } }) => {
      const extractedText = typeof input === 'string' ? input : input.nativeEvent?.text;
      onChange?.(extractedText);
    };

    return (
      <Box
        testID={`${testId}-container`}
        justifyContent="center"
        borderRadius="medium"
        borderWidth={isFocused ? 'medium' : 'base'}
        borderColor={getBorderColor()}
        backgroundColor={backgroundColor as HeroDesignColors}
        accessible
        accessibilityLabel={`${accessibilityLabel}${!(isDisabled || isReadOnly) ? ': Disabled' : ''}`}
        accessibilityState={{ disabled: !(isDisabled || isReadOnly) }}
        style={[
          {
            height: 48,
            width,
          },
          style,
        ]}
      >
        <Box flexDirection="row" justifyContent="center" alignItems="center">
          <TextInput
            defaultValue={defaultValue}
            ref={ref}
            editable={!(isDisabled || isReadOnly)}
            selectTextOnFocus={!(isDisabled || isReadOnly)}
            placeholder={placeholder}
            placeholderTextColor={colors.mutedOnDefaultGlobalSurface}
            style={{
              flex: 1,
              height: 48,
              paddingVertical: space.smallMedium,
              paddingHorizontal: space.medium,
              fontSize: fontSizes.large,
              color: isDisabled ? colors[textColorDisabled] : colors[textColor],
            }}
            numberOfLines={1}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={onChangeTextWrapper}
            testID={testId}
            allowFontScaling={false}
            blurOnSubmit
            keyboardType={keyboardType}
            maxLength={maxLength}
            autoFocus={autofocus}
            clearButtonMode="while-editing"
          />
        </Box>
      </Box>
    );
  }
);

export default OptimizedSearchBar;
