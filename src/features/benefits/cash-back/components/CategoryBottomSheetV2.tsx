import React from 'react';
import { useTheme, Box, List, Icon } from '@hero-design/rn';
import type { IconProps } from '@hero-design/rn/types/components/Icon';
import type { BottomSheetRef, ButtonAction } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { useMixpanel } from '../../../../common/hooks/useMixpanel';
import { EventTrackingCategory } from '../../../../common/stores/useSessionStore';
import type { Category } from '../../../../new-graphql/generated';
import { getIconCategory } from '../../common/utils/category';
import { CLICK_ONLINE_OFFERS_CATEGORY, ONLINE_OFFERS_MODULE } from '../constants';

type CategoryBottomSheetProps = {
  /**
   * label for bottom sheet
   */
  label?: string;
  /**
   * category options
   */
  categories: Array<Category>;
  /**
   * category to be highlighted
   */
  selectedCategory?: string;
  /**
   * Handler called when the selected value changed.
   */
  onSelectionChanged?: (option: Category) => void;
  /**
   * Ref to use handler from BottomSheetRef
   */
  btsRef?: React.RefObject<BottomSheetRef>;
  actions?: ButtonAction[];
};

export const CategoryBottomSheetV2 = ({
  actions,
  btsRef,
  categories,
  label = 'Categories',
  onSelectionChanged,
  selectedCategory,
}: CategoryBottomSheetProps) => {
  const { space } = useTheme();
  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(!!actions);
  const { eventTracking } = useMixpanel();

  const renderOptionItem = (item: Category) => {
    const icon = getIconCategory(item.name) as IconProps['icon'];
    const onItemPress = () => {
      eventTracking({
        event: CLICK_ONLINE_OFFERS_CATEGORY,
        categoryName: EventTrackingCategory.USER_ACTION,
        metaData: {
          module: ONLINE_OFFERS_MODULE,
          categoryName: item.name,
        },
      });
      onSelectionChanged?.(item);
      btsRef?.current?.close();
    };

    return (
      <List.BasicItem
        testID={item.categoryCode + (selectedCategory === item.categoryCode ? '_selected' : '')}
        key={item.categoryCode}
        selected={selectedCategory === item.categoryCode}
        title={item.name}
        prefix={
          icon ? (
            <Box marginRight="smallMedium">
              <Icon icon={icon} />
            </Box>
          ) : undefined
        }
        onPress={onItemPress}
      />
    );
  };
  return (
    <BottomSheetWithHD
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      handleIconName="cancel"
      themeName="eBens"
      handleIconSize="xsmall"
      title={label}
      ref={btsRef}
      actions={actions}
    >
      <BottomSheetScrollView
        style={contentContainerHeightStyle}
        onLayout={handleContentLayout}
        contentContainerStyle={{ paddingHorizontal: space.small }}
      >
        {categories.map(e => renderOptionItem(e))}
      </BottomSheetScrollView>
    </BottomSheetWithHD>
  );
};
