import React, { useCallback, useEffect, useRef } from 'react';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { FlatList, Keyboard } from 'react-native';
import { Box, Spinner, useTheme } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import type { Category, InStoreOffer, OnlineOffer } from '../../../../new-graphql/generated';
import { OfferType, useInfiniteGetCashbackOffersQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { isOnlineOffer } from '../../common/utils/cashbackOffer';
import { OfferSkeleton } from '../components/skeletons/OfferSkeleton';
import { InstoreOfferItem } from '../instore-offer/components/InstoreOfferItem';
import { OnlineOfferItem } from '../online-offer/components/OnlineOfferItem';
import type { CashbackSearchType } from '../types';

type OfferListViewProps = {
  style?: StyleProp<ViewStyle>;
  onItemPress: (item: OnlineOffer | InStoreOffer) => void;
  testID?: string;
  searchQuery: string;
  categoryFilter?: Category;
  selectedType: CashbackSearchType;
};

const ITEM_PER_PAGE = 10;

export const OfferListView = ({
  categoryFilter,
  onItemPress,
  searchQuery,
  selectedType,
  style,
  testID,
}: OfferListViewProps) => {
  const { space } = useTheme();
  const flatlistRef = useRef<FlatList<OnlineOffer | InStoreOffer>>(null);
  const { bottom: bottomInset } = useSafeAreaInsets();
  const Intl = useIntl();
  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage, isLoading } =
    useInfiniteGetCashbackOffersQuery(
      {
        input: {
          first: ITEM_PER_PAGE,
          query: searchQuery,
          ...(selectedType ? { type: OfferType.Online } : {}),
          ...(categoryFilter ? { categoryCode: categoryFilter.categoryCode } : {}),
        },
      },
      {
        cacheTime: 0,
        getNextPageParam: previousPage => {
          const { pageInfo } = previousPage.me?.cashback?.allOffers || {
            pageInfo: {
              hasNextPage: false,
              endCursor: null,
            },
          };
          if (pageInfo.hasNextPage) {
            return {
              input: {
                first: ITEM_PER_PAGE,
                after: pageInfo.endCursor,
                query: searchQuery,
                ...(selectedType ? { type: OfferType.Online } : {}),
                ...(categoryFilter ? { categoryCode: categoryFilter.categoryCode } : {}),
              },
            };
          }
          return undefined;
        },
      }
    );

  useEffect(() => {
    flatlistRef.current?.scrollToOffset({ animated: false, offset: 0 });
  }, [selectedType]);

  const offers = (data?.pages?.flatMap(page => page.me?.cashback?.allOffers.edges)?.map(e => e?.node) ?? []) as Array<
    OnlineOffer | InStoreOffer
  >;

  const onEndReached = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  const renderNotFound = useCallback(() => {
    return (
      <OutcomeTemplate
        bodyStyle={{ justifyContent: 'flex-start' }}
        title={Intl.formatMessage({ id: 'benefits.error.noResults' })}
        content={Intl.formatMessage({ id: 'benefits.error.pleaseAdjustYourSearch' })}
        imageName="goggles"
        backgroundColor="defaultGlobalSurface"
      />
    );
  }, []);

  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return (
        <Box testID="skeleton-loading">
          <OfferSkeleton />
          <OfferSkeleton marginTop="medium" />
          <OfferSkeleton marginTop="medium" />
          <OfferSkeleton marginTop="medium" />
          <OfferSkeleton marginTop="medium" />
          <OfferSkeleton marginTop="medium" />
        </Box>
      );
    }
    return renderNotFound();
  }, [isLoading]);

  if (isError) {
    return (
      <Box marginTop="medium" flex={1}>
        {renderNotFound()}
      </Box>
    );
  }

  const onItemPressWrapper = (item: OnlineOffer | InStoreOffer) => {
    Keyboard.dismiss();
    onItemPress(item);
  };

  const renderItem: ListRenderItem<OnlineOffer | InStoreOffer> = ({ index, item }) => {
    // eslint-disable-next-line no-underscore-dangle
    if (isOnlineOffer(item)) {
      return (
        <OnlineOfferItem
          testID={`online-offer-${index}`}
          style={{ marginTop: index === 0 ? space.small : 0, marginBottom: space.medium }}
          item={item}
          onPress={() => onItemPressWrapper(item)}
        />
      );
    }
    return (
      <InstoreOfferItem
        testID={`instore-offer-${index}`}
        style={{ marginBottom: space.medium, marginTop: index === 0 ? space.small : 0 }}
        item={item}
        onPress={() => onItemPressWrapper(item)}
      />
    );
  };

  return (
    <FlatList<OnlineOffer | InStoreOffer>
      ref={flatlistRef}
      testID={testID}
      style={[{ flex: 1 }, style]}
      data={offers}
      keyboardDismissMode="on-drag"
      accessibilityLabel="Search offers list"
      accessibilityRole="menu"
      renderItem={renderItem}
      keyboardShouldPersistTaps="handled"
      onEndReached={onEndReached}
      keyExtractor={item => item.id}
      ListEmptyComponent={renderEmpty}
      onEndReachedThreshold={0.3}
      contentContainerStyle={{ paddingHorizontal: space.medium, paddingBottom: bottomInset }}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        isFetchingNextPage ? (
          <Box style={{ width: '100%', height: space.large }}>
            <Spinner accessibilityLabel="spinner" size="small" intent="primary" />
          </Box>
        ) : null
      }
    />
  );
};
