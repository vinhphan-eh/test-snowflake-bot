import React from 'react';
import { Box, Button, useTheme } from '@hero-design/rn';
import type { CategoryFilterProps } from './CategoryFilter';
import { CategoryFilter } from './CategoryFilter';
import { OptimizedSearchBarV2 } from '../../../../common/components/search-bar/OptimizedSearchBarV2';

type SearchOfferConProps = {
  placeHolder: string;
  onGoBack?: () => void;
  onChangeText: (text: string) => void;
  isShowCategoryFilter?: boolean;
  defaultValue?: string;
} & CategoryFilterProps;

const searchBarHeight = 48;

export const SearchOfferCon = ({
  defaultValue,
  isShowCategoryFilter = true,
  onChangeText,
  onGoBack,
  placeHolder,
  ...categoryFilterProps
}: SearchOfferConProps) => {
  const { borderWidths, space } = useTheme();

  return (
    <Box
      style={{
        maxHeight: searchBarHeight,
        flexGrow: 1,
        marginLeft: !onGoBack ? space.smallMedium : undefined,
        marginRight: !isShowCategoryFilter ? space.medium : undefined,
      }}
      flexDirection="row"
      alignItems="center"
    >
      {!!onGoBack && (
        <Button.Icon
          style={{ marginHorizontal: space.smallMedium }}
          size="small"
          testID="back-btn"
          intent="primary"
          onPress={onGoBack}
          icon="single-left-arrow"
        />
      )}
      <OptimizedSearchBarV2
        defaultValue={defaultValue}
        placeholder={placeHolder}
        testId="search-bar"
        style={{ borderWidth: borderWidths.base }}
        onChange={text => {
          onChangeText(text);
        }}
      />
      {isShowCategoryFilter && <CategoryFilter {...categoryFilterProps} />}
    </Box>
  );
};
