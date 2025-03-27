import React, { useCallback, useEffect } from 'react';
import type {
  FlatListProps,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { FlatList } from 'react-native';
import { Box, Spinner, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash.debounce';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../../common/components/layout/page';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { SearchOfferCon } from '../../cash-back/containers/SearchOfferCon';
import { HeroPointsBalanceCard } from '../components/HeroPointsBalanceCard';
import { DefaultProductItemSkeleton } from '../components/skeletons/DefaultProductItemSkeleton';
import { CategoryCodes } from '../constants/benefits';
import type { SearchLocation } from '../hooks/useBenefitsTracking';
import { useBenefitsTracking } from '../hooks/useBenefitsTracking';

const heightRatio = 112 / 178;

type ProductSearchTemplateProps<T> = {
  location: SearchLocation;
  onChangeText: (text: string) => void;
  title: string;
  placeholder: string;
  products: T[];
  renderItem: ListRenderItem<T>;
  testID?: string;
  isLoading: boolean;
  isError: boolean;
  onEndReached: () => void;
  isShowSearchBar?: boolean;
  isShowNavBar?: boolean;
  isFetchingNextPage: boolean;
  style?: StyleProp<ViewStyle>;
  numColumns?: number;
  categoryCode?: string;
  renderItemSkeleton?: () => React.ReactNode;
  renderTop?: () => React.ReactNode;
  keyExtractor: ((item: T, index: number) => string) | undefined;
  ListHeaderComponent?: React.FC;
  defaultQuery?: string;
  selectedCategory?: string;
  onScroll?: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | undefined;
  extraPaddingBottom?: number;
  isShowBackIcon?: boolean;
};

const AnimatedFlatList = (<T,>() => Animated.createAnimatedComponent<FlatListProps<T>>(FlatList))();

export const ProductSearchTemplate = <T,>({
  categoryCode,
  defaultQuery,
  extraPaddingBottom = 0,
  isError,
  isFetchingNextPage,
  isLoading,
  isShowBackIcon = true,
  isShowNavBar = true,
  isShowSearchBar = true,
  keyExtractor,
  ListHeaderComponent,
  location,
  numColumns = 2,
  onChangeText,
  onEndReached,
  onScroll,
  placeholder,
  products,
  renderItem,
  renderItemSkeleton = () => <DefaultProductItemSkeleton heightRatio={heightRatio} />,
  renderTop,
  selectedCategory = '',
  style,
  testID,
  title,
}: ProductSearchTemplateProps<T>) => {
  const { colors, space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { formatMessage } = useIntl();
  const navigation = useNavigation();
  const { trackTypeAndSearch } = useBenefitsTracking();

  const flatlistRef = useAnimatedRef<FlatList>();

  useEffect(() => {
    flatlistRef.current?.scrollToOffset({ animated: false, offset: 0 });
  }, [categoryCode]);

  const renderNotFound = useCallback(() => {
    return (
      <OutcomeTemplate
        bodyStyle={{ justifyContent: 'flex-start' }}
        title={formatMessage({ id: 'benefits.error.noResults' })}
        content={formatMessage({ id: 'benefits.error.pleaseAdjustYourSearch' })}
        imageName="goggles"
        backgroundColor="defaultGlobalSurface"
      />
    );
  }, []);

  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return (
        <Box testID="skeleton-loading" flex={1} flexDirection="row" justifyContent="space-between" flexWrap="wrap">
          {renderItemSkeleton()}
          {renderItemSkeleton()}
          {renderItemSkeleton()}
          {renderItemSkeleton()}
          {renderItemSkeleton()}
          {renderItemSkeleton()}
        </Box>
      );
    }
    return renderNotFound();
  }, [isLoading]);

  const onChangeTextWithDebounce = debounce((text: string) => {
    trackTypeAndSearch({
      query: text,
      location,
      selectedCategory,
    });
    onChangeText(text);
  }, 500);

  return (
    <Box testID={testID} style={[{ flex: 1 }, style]}>
      {isShowNavBar && (
        <>
          <CustomStatusBar backgroundColor={colors.defaultGlobalSurface} />
          {!isShowSearchBar && (
            <Page.TopBar backgroundColor="defaultGlobalSurface" onBack={navigation.goBack} hideRight />
          )}
        </>
      )}
      <Box paddingTop={isShowNavBar ? 'small' : undefined} flex={1} backgroundColor="defaultGlobalSurface">
        {isShowSearchBar && (
          <SearchOfferCon
            location={location}
            defaultValue={defaultQuery}
            placeHolder={placeholder}
            onChangeText={onChangeTextWithDebounce}
            isShowCategoryFilter={false}
            onGoBack={isShowBackIcon ? navigation.goBack : undefined}
          />
        )}
        {renderTop?.()}
        <AnimatedFlatList
          ref={flatlistRef as never}
          testID={`${testID}-listview`}
          style={{ flex: 1, paddingHorizontal: space.medium }}
          contentContainerStyle={{
            paddingTop: space.large,
            paddingBottom: (bottomInset || space.medium) + extraPaddingBottom,
          }}
          numColumns={numColumns}
          data={isError ? [] : products}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          keyExtractor={keyExtractor}
          keyboardDismissMode="on-drag"
          accessibilityLabel="product list"
          accessibilityRole="menu"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
          onEndReached={isError ? () => {} : onEndReached}
          ListEmptyComponent={renderEmpty}
          onEndReachedThreshold={0.3}
          alwaysBounceVertical={false}
          onScroll={onScroll}
          ListHeaderComponent={
            ListHeaderComponent ||
            (() => {
              return (
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  style={{ marginBottom: space.large }}
                >
                  <Typography.Title accessibilityLabel={title} level="h3" typeface="playful">
                    {title}
                  </Typography.Title>
                  {selectedCategory === CategoryCodes.GiftCard && (
                    <HeroPointsBalanceCard testID="hero-points-balance" accessibilityLabel="Hero points balance" />
                  )}
                </Box>
              );
            })
          }
          columnWrapperStyle={numColumns === 1 ? undefined : { justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            isFetchingNextPage ? (
              <Box style={{ width: '100%', height: space.medium }}>
                <Spinner accessibilityLabel="spinner" size="small" intent="primary" />
              </Box>
            ) : null
          }
        />
      </Box>
    </Box>
  );
};
