import React from 'react';
import type { TabType } from '@hero-design/rn';
import { Tabs, useTheme } from '@hero-design/rn';
import { capitalize } from '../../../../common/utils/string';
import { useGetBenefitsCategoriesQuery } from '../../../../new-graphql/generated';
import { CategoryCodes } from '../constants/benefits';
import type { SearchLocation } from '../hooks/useBenefitsTracking';
import { useBenefitsTracking } from '../hooks/useBenefitsTracking';

type BenefitsCategoryTabsProps = {
  onTabChange: (key: string, tabName: string) => void;
  tabKey: string;
  location: SearchLocation;
};

export const BenefitsCategoryTabs = ({ location, onTabChange, tabKey }: BenefitsCategoryTabsProps) => {
  const { data, isError, isLoading } = useGetBenefitsCategoriesQuery();
  const { colors } = useTheme();
  const { trackSelectCategory } = useBenefitsTracking();

  const categories = data?.me?.benefits?.categories ?? [];
  const foundAllCategory = categories.find(category => category.categoryCode === 'all');
  if (!foundAllCategory && categories.length > 0 && !isLoading && !isError) {
    categories.unshift({
      categoryCode: CategoryCodes.All,
      name: capitalize(CategoryCodes.All),
      imageUrl: '',
    });
  }

  const tabs: TabType[] = categories.map(category => ({
    key: category.categoryCode,
    testID: category.categoryCode,
    activeItem: category.name,
    component: null,
  }));

  if (categories.length === 0 || isError || isLoading) {
    return null;
  }

  return (
    <Tabs.Scroll
      testID="benefits-category-tabs"
      containerStyle={{ flex: 0 }}
      barStyle={{
        backgroundColor: colors.defaultGlobalSurface,
      }}
      selectedTabKey={tabKey}
      onTabPress={key => {
        const foundCategory = categories.find(category => category.categoryCode === key);
        trackSelectCategory({
          selectedCategory: foundCategory?.name.toLowerCase() ?? '',
          location,
        });
        onTabChange(key, foundCategory?.name ?? '');
      }}
      tabs={tabs}
    />
  );
};
