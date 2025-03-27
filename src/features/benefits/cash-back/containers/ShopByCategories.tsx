import React from 'react';
import type { StyleProp, ViewStyle, ListRenderItem } from 'react-native';
import { FlatList } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import type { IconProps } from '@hero-design/rn/types/components/Icon';
import type { Category } from '../../../../new-graphql/generated';
import { useCashbackCategoriesQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { RoundedCategory } from '../../common/components/RoundedCategory';
import { RoundedCategorySkeleton } from '../../common/components/skeletons/RoundedCategorySkeleton';
import { getIconCategoryV2 } from '../../common/utils/category';

export type ShortcutOption = {
  label: string;
  icon: IconProps['icon'] | undefined;
  onPress: () => void;
};

type ShopByCategoriesProps = {
  style?: StyleProp<ViewStyle>;
  testID?: string;
  onItemPress: (item: Category) => void;
  hideTitle?: boolean;
};

export const ShopByCategories = ({ hideTitle = false, onItemPress, style, testID }: ShopByCategoriesProps) => {
  const { space } = useTheme();
  const { data: cashbackCategories, isError, isLoading } = useCashbackCategoriesQuery();
  const Intl = useIntl();
  const categories = cashbackCategories?.me?.cashback?.categories ?? [];

  const cashbackToOptions: Array<ShortcutOption> = categories.map(category => {
    return {
      label: category.name,
      icon: getIconCategoryV2(category.categoryCode),
      onPress: () => onItemPress(category),
    };
  });

  const isEmptyAfterFetch = !isLoading && cashbackToOptions.length === 0 && !isError;

  const renderItem: ListRenderItem<ShortcutOption> = ({ item }) => {
    const { icon, label, onPress } = item;
    return (
      <RoundedCategory
        testID={label}
        style={{ marginLeft: space.medium }}
        icon={icon}
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
      {!hideTitle && (
        <Typography.Body
          variant="small"
          accessibilityLabel="Shop by category"
          style={{ marginBottom: space.medium, marginLeft: space.medium }}
        >
          {Intl.formatMessage({ id: 'benefits.cashback.shopByCategory' })}
        </Typography.Body>
      )}
      <FlatList
        testID="shop-by-categories"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: space.medium }}
        renderItem={renderItem}
        data={cashbackToOptions}
        ListEmptyComponent={renderEmpty}
        horizontal
      />
    </Box>
  );
};
