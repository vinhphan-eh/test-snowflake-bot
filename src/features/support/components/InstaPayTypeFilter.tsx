import React, { useRef } from 'react';
import { Pressable } from 'react-native';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import type { BottomSheetRef } from '../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetFlatList } from '../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import type { InstapayPayType } from '../../../new-graphql/generated';
import { useIntl } from '../../../providers/LocalisationProvider';

type FilterItemProps = {
  onPress: (selectedItem: InstaPayTypeFilterItem) => void;
  item: InstaPayTypeFilterItem;
  selected: boolean;
};

export type InstaPayTypeFilterItem = {
  label: string;
  value: 'ALL' | InstapayPayType;
};

const FilterItem = ({ item, onPress, selected }: FilterItemProps) => {
  const { colors } = useTheme();
  return (
    <Pressable onPress={() => onPress(item)}>
      <Box
        paddingHorizontal="smallMedium"
        paddingVertical="medium"
        flex={1}
        marginHorizontal="smallMedium"
        style={{ backgroundColor: selected ? colors.neutralGlobalSurface : colors.defaultGlobalSurface }}
      >
        <Typography.Body>{item.label}</Typography.Body>
      </Box>
    </Pressable>
  );
};

type InstaPayTypeFilterProps = {
  items: InstaPayTypeFilterItem[];
  selectedItem: InstaPayTypeFilterItem;
  onItemSelected: (selectedItem: InstaPayTypeFilterItem) => void;
};

export const InstaPayTypeFilter = ({ items, onItemSelected, selectedItem }: InstaPayTypeFilterProps) => {
  const bsRef = useRef<BottomSheetRef>(null);
  const { colors, space } = useTheme();
  const { formatMessage } = useIntl();

  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(false);

  return (
    <>
      <Button.Utility
        icon={selectedItem.value !== 'ALL' ? 'funnel-filter' : 'funnel-filter-outline'}
        text={
          selectedItem.value !== 'ALL'
            ? formatMessage({ id: 'support.instapayHistory.appliedFilters' }, { count: 1 })
            : formatMessage({ id: 'support.instapayHistory.filter' })
        }
        onPress={() => bsRef.current?.open()}
        style={{ backgroundColor: colors.neutralGlobalSurface, marginTop: space.medium }}
      />
      <BottomSheetWithHD
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        handleIconName="cancel"
        handleIconSize="small"
        title={formatMessage({ id: 'support.instapayHistory.filter' })}
        ref={bsRef}
        themeName="wallet"
      >
        <BottomSheetFlatList
          onLayout={handleContentLayout}
          data={items}
          style={contentContainerHeightStyle}
          renderItem={e => (
            <FilterItem
              key={e.item.label}
              item={e.item}
              onPress={item => {
                onItemSelected(item);
                bsRef.current?.close();
              }}
              selected={e.item.label === selectedItem.label}
            />
          )}
        />
      </BottomSheetWithHD>
    </>
  );
};
