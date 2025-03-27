import React, { useState } from 'react';
import type { ListRenderItem, FlatListProps, StyleProp, ViewStyle } from 'react-native';
import { FlatList, TouchableOpacity, Keyboard } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import debounce from 'lodash.debounce';
import type { GoogleAddress, GoogleAddressDetails } from '../../../new-graphql/generated';
import { useGetLocationByPlaceIdQuery, useGetLocationsQuery } from '../../../new-graphql/generated';
import type { SearchBarProps } from '../search-bar/OptimizedSearchBar';
import { OptimizedSearchBarV2 } from '../search-bar/OptimizedSearchBarV2';

type GoogleAddressInputProps = {
  inputProps?: Omit<SearchBarProps, 'onChange'>;
  listProps?: Omit<FlatListProps<GoogleAddress>, 'data'>;
  inbetweenCompo?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  onSearchTextChange?: (text: string) => void;
  onLocationSelect: (address?: GoogleAddressDetails) => void;
  country?: string;
};

export const GoogleAddressInput = ({
  country = '',
  inbetweenCompo = null,
  inputProps,
  listProps,
  onLocationSelect,
  onSearchTextChange,
  style,
  testID,
}: GoogleAddressInputProps) => {
  const { space } = useTheme();
  const [query, setQuery] = useState(inputProps?.defaultValue || '');
  const [selectedPlaceId, setSelectedPlaceId] = useState('');
  const { data } = useGetLocationsQuery(
    {
      input: {
        query,
        country,
      },
    },
    { enabled: !!query }
  );
  useGetLocationByPlaceIdQuery(
    { placeId: selectedPlaceId },
    {
      enabled: !!selectedPlaceId,
      cacheTime: 0,
      onSuccess: detailData => {
        const detail = detailData?.getLocationByPlaceId?.addressDetails;
        if (detail) {
          onLocationSelect?.(detail);
        }
      },
    }
  );
  const locations = (data?.getLocations?.addresses || []) as Array<GoogleAddress>;

  const onSelect = (placeId?: string) => {
    if (!placeId) {
      return;
    }
    Keyboard.dismiss();
    setSelectedPlaceId(placeId);
  };

  const renderItem: ListRenderItem<GoogleAddress> = ({ item }) => {
    return (
      <TouchableOpacity
        testID={item.placeId || ''}
        onPress={() => onSelect(item?.placeId || '')}
        style={{ marginVertical: space.small }}
        accessibilityLabel={item.formattedAddress}
      >
        <Typography.Body testID={item.formattedAddress}>{item.formattedAddress}</Typography.Body>
      </TouchableOpacity>
    );
  };

  const onChange = debounce((text: string) => {
    onSearchTextChange?.(text);
    setQuery(text);
  }, 500);

  return (
    <Box flexDirection="column" testID={testID} style={style}>
      <OptimizedSearchBarV2 testId={`${testID}-search-input`} {...inputProps} onChange={onChange} />
      {inbetweenCompo}
      <FlatList
        testID="google-address-list"
        style={{ marginTop: space.medium }}
        renderItem={renderItem}
        keyExtractor={item => `${item?.placeId}`}
        data={locations}
        {...listProps}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
      />
    </Box>
  );
};
