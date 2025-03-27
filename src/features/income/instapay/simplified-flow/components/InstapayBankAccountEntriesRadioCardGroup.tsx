import type { ReactElement } from 'react';
import React from 'react';
import { View } from 'react-native';
import { Box } from '@hero-design/rn';
import { InstapayBankAccountEntriesRadioCard } from './InstapayBankAccountEntriesRadioCard';
import type { RadioCardGroupProps, RadioCardOption } from '../../../../../common/components/radio-card-group';

const getKey = <T,>(
  option: RadioCardOption<T>,
  index: number,
  keyExtractor?: (opt: RadioCardOption<T>, i?: number) => string
) => {
  let key: React.Key = '';
  if (keyExtractor !== undefined) {
    key = keyExtractor(option, index);
  } else if (option.key !== undefined) {
    ({ key } = option);
  } else {
    key = index;
  }

  return key;
};

export const InstapayBankAccountEntriesRadioCardGroup = <T,>({
  keyExtractor,
  onChange: onPress,
  options,
  style,
  testID,
  value,
}: RadioCardGroupProps<T>): ReactElement => {
  return (
    <View style={style} testID={testID}>
      {options.map((option, index) => (
        <React.Fragment key={getKey(option, index, keyExtractor)}>
          {index !== 0 && <Box marginTop="small" />}
          {InstapayBankAccountEntriesRadioCard({
            ...option,
            testID: `${option.title}-checked`,
            checked: option.value === value,
            onPress: () => onPress(option.value),
            accessibilityLabel: 'radio-card-item',
          })}
        </React.Fragment>
      ))}
    </View>
  );
};
