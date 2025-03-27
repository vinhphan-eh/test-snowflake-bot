import type { ReactElement } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import { Box } from '@hero-design/rn';
import { RadioCard } from './RadioCard';

export interface RadioCardComponentProps {
  content: string | ReactElement;
  checked: boolean;
  onPress: () => void;
  testID?: string;
  accessibilityLabel?: string;
}

export type RadioCardGroupProps<T> = {
  /**
   * An array of radio options to be selected.
   */
  options: RadioCardOption<T>[];
  /**
   * Radio input value.
   */
  value: T;
  /**
   * Changing event handler receiving selected radio's value.
   */
  onChange: (value: T) => void;
  /**
   * Used to extract a unique key for a given option at the specified index. Key is used for caching and as the react key to track item re-ordering.
   * The default extractor checks option.key, and then falls back to using the index, like React does.
   */
  keyExtractor?: (option: RadioCardOption<T>, index?: number) => string;
  /**
   * Additional style.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Testing id of the component.
   */
  testID?: string;
  RadioCardComponent?: (props: RadioCardComponentProps) => ReactElement;
};

export type RadioCardOption<T> = {
  value: T;
  key?: string;
  title?: string;
  subtitle?: string;
  content: string | ReactElement;
};

function getKey<T>(
  option: RadioCardOption<T>,
  index: number,
  keyExtractor?: (opt: RadioCardOption<T>, i?: number) => string
) {
  let key: React.Key = '';
  if (keyExtractor !== undefined) {
    key = keyExtractor(option, index);
  } else if (option.key !== undefined) {
    ({ key } = option);
  } else {
    key = index;
  }

  return key;
}

export const RadioCardGroup = <T,>({
  keyExtractor,
  onChange: onPress,
  options,
  RadioCardComponent = RadioCard,
  style,
  testID,
  value,
}: RadioCardGroupProps<T>): ReactElement => {
  return (
    <View style={style} testID={testID}>
      {options.map((option, index) => (
        <React.Fragment key={getKey(option, index, keyExtractor)}>
          {index !== 0 && <Box marginTop="medium" />}
          <RadioCardComponent
            {...option}
            testID={`${option.title}-checked`}
            checked={option.value === value}
            onPress={() => onPress(option.value)}
            accessibilityLabel="radio-card-item"
          />
        </React.Fragment>
      ))}
    </View>
  );
};
