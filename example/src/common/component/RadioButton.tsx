import { Box, Typography } from '@hero-design/rn';
import React from 'react';
import { TouchableOpacity, type ViewStyle, type StyleProp } from 'react-native';

type RadioButtonProps<T> = {
  title: string;
  selected: boolean;
  value: T;
  onPress: (value: T) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const RadioButton = <T,>({
  title,
  selected,
  value,
  onPress,
  style,
  testID,
}: RadioButtonProps<T>) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={() => onPress(value)}
      style={[
        {
          flexDirection: 'row',
        },
        style,
      ]}>
      <Box
        style={{
          width: 16,
          height: 16,
          borderRadius: 8,
          borderWidth: 2,
          borderColor: 'black',
          marginRight: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {selected ? (
          <Box
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: 'black',
            }}
          />
        ) : null}
      </Box>
      <Typography.Caption>{title}</Typography.Caption>
    </TouchableOpacity>
  );
};

export default RadioButton;
