import React from 'react';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';

type ProductGridProps<T> = {
  title: string;
  onPress: () => void;
  products: T[];
  renderItem: ListRenderItem<T>;
  renderItemSkeleton: () => React.ReactNode;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  isLoading: boolean;
};

export const ProductGrid = <T,>({
  isLoading,
  onPress,
  products,
  renderItem,
  renderItemSkeleton,
  style,
  testID,
  title,
}: ProductGridProps<T>) => {
  const { space } = useTheme();

  const renderHeader = () => (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: space.medium,
      }}
    >
      <Typography.Body accessibilityLabel={title} variant="small">
        {title}
      </Typography.Body>
      <TouchableOpacity hitSlop={10} testID={`${testID}-header-icon`} onPress={onPress} activeOpacity={0.5}>
        <Icon accessibilityLabel={`${title}-icon`} icon="arrow-right" intent="primary" />
      </TouchableOpacity>
    </Box>
  );
  if (isLoading) {
    return (
      <Box testID={`${testID}skeleton-loading`} style={style}>
        {renderHeader()}
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {renderItemSkeleton()}
          {renderItemSkeleton()}
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {renderItemSkeleton()}
          {renderItemSkeleton()}
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {renderItemSkeleton()}
          {renderItemSkeleton()}
        </Box>
      </Box>
    );
  }
  return (
    <Box style={style} testID={testID}>
      {renderHeader()}
      <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {products.map((item, index) =>
          renderItem({
            item,
            index,
            separators: { highlight: () => {}, unhighlight: () => {}, updateProps: () => {} },
          })
        )}
      </Box>
    </Box>
  );
};
