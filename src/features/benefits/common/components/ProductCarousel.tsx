import React from 'react';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';

type ProductCarouselProps<T> = {
  title: string;
  onPress: () => void;
  renderItem: ListRenderItem<T>;
  renderItemSkeleton: () => React.ReactNode;
  products: T[];
  testID?: string;
  style?: StyleProp<ViewStyle>;
  isLoading: boolean;
  keyExtractor: ((item: T, index: number) => string) | undefined;
  hideHeaderIcon?: boolean;
  renderSecondaryButton?: () => React.ReactNode;
  isEmptyAfterFetch?: boolean;
  renderEmptyState?: () => React.ReactNode;
};

export const ProductCarousel = <T,>({
  hideHeaderIcon = false,
  isEmptyAfterFetch,
  isLoading,
  keyExtractor,
  onPress,
  products,
  renderEmptyState,
  renderItem,
  renderItemSkeleton,
  renderSecondaryButton,
  style,
  testID,
  title,
}: ProductCarouselProps<T>) => {
  const { space } = useTheme();

  const renderHeader = () => (
    <Box
      flex={1}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: space.medium,
        paddingHorizontal: space.medium,
        gap: space.medium,
      }}
    >
      <Box
        style={{
          flexGrow: 1,
        }}
      >
        <Typography.Body accessibilityLabel={title} variant="small">
          {title}
        </Typography.Body>
      </Box>
      <Box
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        style={{
          gap: space.medium,
          flexShrink: 1,
        }}
      >
        {renderSecondaryButton?.()}
        {!hideHeaderIcon && (
          <TouchableOpacity hitSlop={10} testID={`${testID}-header-icon`} onPress={onPress} activeOpacity={0.5}>
            <Icon accessibilityLabel={title} icon="arrow-right" intent="primary" />
          </TouchableOpacity>
        )}
      </Box>
    </Box>
  );

  if (isLoading) {
    return (
      <Box testID="skeleton-loading" style={style}>
        {renderHeader()}
        <Box style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: space.medium }}>
          {renderItemSkeleton()}
          {renderItemSkeleton()}
          {renderItemSkeleton()}
        </Box>
      </Box>
    );
  }

  return (
    <Box style={style} testID={testID}>
      {renderHeader()}
      {isEmptyAfterFetch && renderEmptyState?.()}
      <FlatList
        testID={`${testID}-list`}
        keyboardShouldPersistTaps="handled"
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingHorizontal: space.medium }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={products}
        renderItem={renderItem}
      />
    </Box>
  );
};
