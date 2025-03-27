import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Box, useTheme } from '@hero-design/rn';
import SearchBar from '../../../../common/components/search-bar';

type IdleSearchBoxProps = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  placeholder: string;
};

export const IdleSearchBox = ({ onPress, placeholder, style }: IdleSearchBoxProps) => {
  const { borderWidths, space } = useTheme();

  return (
    <TouchableOpacity
      testID="search-box"
      accessibilityLabel="Search box"
      style={[{ marginHorizontal: space.medium }, style]}
      onPress={onPress}
    >
      <Box pointerEvents="box-only">
        <SearchBar style={{ borderWidth: borderWidths.base }} placeholder={placeholder} />
      </Box>
    </TouchableOpacity>
  );
};
