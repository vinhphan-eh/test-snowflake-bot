import React, { useRef } from 'react';
import { Keyboard } from 'react-native';
import { Button, useTheme } from '@hero-design/rn';
import type { IconButtonProps } from '@hero-design/rn/types/components/Button/IconButton';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import type { Category } from '../../../../new-graphql/generated';
import { useCashbackCategoriesQuery } from '../../../../new-graphql/generated';
import type { SearchLocation } from '../../common/hooks/useBenefitsTracking';
import { useBenefitsTracking } from '../../common/hooks/useBenefitsTracking';
import { CategoryBottomSheetV2 } from '../components/CategoryBottomSheetV2';

export type CategoryFilterProps = {
  selectedCategory?: string;
  onSelectionChange?: (option: Category) => void;
  onClearFilter?: () => void;
  location: SearchLocation;
};

export const CategoryFilter = ({
  location,
  onClearFilter,
  onSelectionChange,
  selectedCategory,
}: CategoryFilterProps) => {
  const { space } = useTheme();
  const categoryBtsRef = useRef<BottomSheetRef>(null);
  const { trackSelectCategory } = useBenefitsTracking();
  const { data: cashbackCategories, isError } = useCashbackCategoriesQuery();

  const cashbackCategoriesOption = cashbackCategories?.me?.cashback?.categories ?? [];

  const onClear = () => {
    categoryBtsRef.current?.close();
    onClearFilter?.();
  };

  const icon: IconButtonProps['icon'] = selectedCategory ? 'filter' : 'filter-outlined';

  const onSelect = (option: Category) => {
    trackSelectCategory({
      location,
      selectedCategory: option.name.toLowerCase(),
    });
    onSelectionChange?.(option);
  };

  return (
    <>
      <Button.Icon
        style={{ marginHorizontal: space.smallMedium }}
        testID={`${icon}-btn`}
        intent="primary"
        onPress={() => {
          Keyboard.dismiss();
          categoryBtsRef.current?.open();
        }}
        size="small"
        icon={icon}
        disabled={isError}
      />
      <CategoryBottomSheetV2
        btsRef={categoryBtsRef}
        categories={cashbackCategoriesOption}
        selectedCategory={selectedCategory}
        onSelectionChanged={onSelect}
        actions={[
          {
            testID: 'clear-filter-btn',
            title: 'Clear filter',
            onPress: onClear,
            isDisabled: !selectedCategory,
          },
        ]}
      />
    </>
  );
};
