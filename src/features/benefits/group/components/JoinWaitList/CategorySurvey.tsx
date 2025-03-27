import React from 'react';
import { Box } from '@hero-design/rn';
import CategoryChip from './CategoryChip';
import type { TUseJoinWaitListOutput } from './useJoinWaitList';

export type TCategorySurveyProps = Pick<TUseJoinWaitListOutput, 'categories' | 'selectedCategories' | 'toggleById'>;

const CategorySurvey = ({ categories, selectedCategories, toggleById }: TCategorySurveyProps) => {
  return (
    <Box flexDirection="row" flexWrap="wrap">
      {categories.map(category => {
        return (
          <CategoryChip
            selected={!!selectedCategories[category.id]}
            key={category.id}
            label={category.name}
            onPress={() => toggleById(category.id)}
          />
        );
      })}
    </Box>
  );
};

export default CategorySurvey;
