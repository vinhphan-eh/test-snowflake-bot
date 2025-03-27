import React, { useCallback, useEffect, useState } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, Pressable } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomSheetRef } from '../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../common/components/bottom-sheet/BottomSheetWithHD';
import SearchBar from '../../common/components/search-bar';
import TouchOutsideDismissKeyboard from '../../common/components/touch-dismiss-keyboard';
import { COUNTRIES } from '../../common/constants/countries';

type SelectCountryBottomSheetProps = {
  /**
   * Ref to use handler from BottomSheetRef
   */
  btsRef?: React.RefObject<BottomSheetRef> | null;
  /**
   * Called when a country is selected
   */
  onSelectCountry: (code: string) => void;
  title: string;
  description: string;
};

interface CountryOption {
  key: string;
  label: string;
}

const countryOptions: CountryOption[] = COUNTRIES.map(country => ({ key: country.code, label: country.name }));

export const SelectCountryBottomSheet = ({
  btsRef = null,
  description,
  onSelectCountry,
  title,
}: SelectCountryBottomSheetProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [optionsFiltered, setOptionFiltered] = useState(countryOptions);
  const { colors, radii, space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();

  const onSearchTextChange = useCallback((e: string) => {
    setSearchText(e);
  }, []);

  const renderOptionItem = useCallback<ListRenderItem<CountryOption>>(
    ({ item }) => {
      const onItemPress = () => {
        onSelectCountry(item.key);
        setSearchText('');
        btsRef?.current?.close();
      };

      return (
        <Pressable
          onPress={onItemPress}
          testID={item.key}
          accessibilityLabel={item.label}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.decorativePrimarySurface : 'transparent',
              padding: space.medium,
              borderRadius: radii.medium,
            },
          ]}
        >
          <Typography.Body variant="regular">{item.label}</Typography.Body>
        </Pressable>
      );
    },
    [onSelectCountry, btsRef]
  );

  useEffect(() => {
    const newOptionFiltered = countryOptions.filter(o => o.label.toLowerCase().includes(searchText.toLowerCase()));
    setOptionFiltered(newOptionFiltered);
  }, [searchText]);

  return (
    <BottomSheetWithHD themeName="swag" snapPoints={['1%', '100%']} title={title} ref={btsRef} hideRightBtn>
      <>
        <TouchOutsideDismissKeyboard>
          <Box paddingHorizontal="large">
            <Typography.Body variant="regular" style={{ marginBottom: space.medium }}>
              {description}
            </Typography.Body>
            <SearchBar onChange={onSearchTextChange} value={searchText} testId="searchBar" />
          </Box>
        </TouchOutsideDismissKeyboard>
        <FlatList
          style={{ flex: 1 }}
          data={optionsFiltered}
          renderItem={renderOptionItem}
          keyExtractor={item => item.key}
          contentContainerStyle={{
            flexGrow: 1,
            marginTop: space.smallMedium,
            paddingHorizontal: space.smallMedium,
            paddingBottom: bottomInset || space.medium,
          }}
          keyboardShouldPersistTaps="handled"
        />
      </>
    </BottomSheetWithHD>
  );
};
