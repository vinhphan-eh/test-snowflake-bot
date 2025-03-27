import React from 'react';
import type { StyleProp, ViewStyle, ListRenderItem } from 'react-native';
import { FlatList } from 'react-native';
import { Box, useTheme } from '@hero-design/rn';
import type { IconProps } from '@hero-design/rn/types/components/Icon';
import type { Category } from '../../../../new-graphql/generated';
import { useGetBenefitsCategoriesQuery } from '../../../../new-graphql/generated';
import { RoundedCategory } from '../components/RoundedCategory';
import { RoundedCategorySkeleton } from '../components/skeletons/RoundedCategorySkeleton';
import { getBadgeIconCategory, getIconCategoryV2 } from '../utils/category';

export type ShortcutOption = {
  label: string;
  icon: IconProps['icon'] | undefined;
  badgeIcon: IconProps['icon'] | undefined;
  onPress: () => void;
};

type BenefitsCategoriesCTAProps = {
  style?: StyleProp<ViewStyle>;
  testID?: string;
  onItemPress: (item: Category) => void;
};

export const BenefitsCategoriesCTA = ({ onItemPress, style, testID }: BenefitsCategoriesCTAProps) => {
  const { space } = useTheme();
  const { data: cashbackCategories, isError, isLoading } = useGetBenefitsCategoriesQuery();
  const categories = cashbackCategories?.me?.benefits?.categories ?? [];

  const options: Array<ShortcutOption> = categories.map(category => {
    return {
      label: category.name,
      icon: getIconCategoryV2(category.categoryCode),
      badgeIcon: getBadgeIconCategory(category.categoryCode),
      onPress: () => onItemPress(category),
    };
  });

  const isEmptyAfterFetch = !isLoading && options.length === 0 && !isError;

  const renderItem: ListRenderItem<ShortcutOption> = ({ item }) => {
    const { badgeIcon, icon, label, onPress } = item;
    return (
      <RoundedCategory
        testID={label}
        style={{ marginLeft: space.medium }}
        icon={icon}
        badgeIcon={badgeIcon}
        label={label}
        onPress={onPress}
        accessibilityLabel={`${label} shortcut`}
      />
    );
  };

  if (isEmptyAfterFetch || isError) {
    return null;
  }

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <Box testID="loading-skeleton" marginLeft="medium" flexDirection="row">
          <RoundedCategorySkeleton marginRight="medium" />
          <RoundedCategorySkeleton marginRight="medium" />
          <RoundedCategorySkeleton marginRight="medium" />
          <RoundedCategorySkeleton marginRight="medium" />
          <RoundedCategorySkeleton marginRight="medium" />
          <RoundedCategorySkeleton marginRight="medium" />
        </Box>
      );
    }
    return null;
  };

  return (
    <Box testID={testID} style={style}>
      <FlatList
        testID="shop-by-categories"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: space.medium }}
        renderItem={renderItem}
        data={options}
        ListEmptyComponent={renderEmpty}
        horizontal
      />
    </Box>
  );
};
